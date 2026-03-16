import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { supabase } from './supabase';

// Configure how notifications appear when app is foregrounded
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function registerForPushNotifications(): Promise<string | null> {
  if (!Device.isDevice) {
    console.log('Push notifications require a physical device');
    return null;
  }

  // Check existing permission
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    return null;
  }

  // Get Expo push token
  const tokenData = await Notifications.getExpoPushTokenAsync({
    projectId: '', // Will be set via EAS
  });

  const token = tokenData.data;

  // Android needs a notification channel
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('protocol', {
      name: 'Protocol Reminders',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 100, 50, 100],
      lightColor: '#065f46',
    });
  }

  // Save token to Supabase for server-side sending
  const { data: { session } } = await supabase.auth.getSession();
  if (session?.user) {
    await supabase.from('expo_push_tokens').upsert({
      user_id: session.user.id,
      token,
      platform: Platform.OS,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id' });
  }

  return token;
}

// ═══════════════════════════════════════════════════════════
// BIG 5 LOCAL NOTIFICATIONS
// ═══════════════════════════════════════════════════════════
// 4 daily reminders aligned to the Big 5 framework:
//   7:00 AM — Dairy #1 + CLO
//  12:00 PM — Protein target
//   3:00 PM — Sprint Stack
//   8:00 PM — Sleep
// ═══════════════════════════════════════════════════════════

export async function scheduleProtocolReminders() {
  // Cancel existing scheduled notifications
  await Notifications.cancelAllScheduledNotificationsAsync();

  const reminders = [
    {
      hour: 7, minute: 0,
      title: 'A2 milk + lemon CLO',
      body: 'Dairy serving #1: cold A2 milk with honey, yogurt bowl, or smoothie — pick one. Then half a spoon of lemon cod liver oil. Skip CLO on liver days.',
    },
    {
      hour: 12, minute: 0,
      title: 'Protein check — 0.6 g per pound',
      body: 'The growth proteins — rotate these: liver meatballs, beef, chicken, turkey, wild salmon, eggs, oysters, lentils. Cooked vegetables + a fermented side.',
    },
    {
      hour: 15, minute: 0,
      title: 'Sprint Stack — snack first',
      body: 'Snack: peanut butter + egg (niacin + choline) or a liver meatball (has both). Then sprints or jumps. Stretch. Cold A2 milk with honey within 30 min.',
    },
    {
      hour: 20, minute: 0,
      title: '10+ hours of complete darkness',
      body: 'Blackout curtains. Tape every LED. Everything today — the milk, the protein, the sprints — was building to this moment. You showed up today.',
    },
  ];

  for (const r of reminders) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: r.title,
        body: r.body,
        sound: 'default',
        data: { screen: 'Home' },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour: r.hour,
        minute: r.minute,
      },
    });
  }
}
