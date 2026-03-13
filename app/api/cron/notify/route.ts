import { NextResponse } from 'next/server';
import { sendPushToAll, PushPayload } from '@/lib/push';

// Vercel Cron Job — single endpoint that runs every 30 minutes
// Determines which notification slot (if any) matches the current time
//
// ═══════════════════════════════════════════════════════
// NOTIFICATION SCHEDULE (US Eastern Time)
// ═══════════════════════════════════════════════════════
//
// Morning:   6:45 AM ET  → 10:45 UTC
// Lunch:     11:30 AM ET → 15:30 UTC
// Exercise:  3:00 PM ET  → 19:00 UTC
// Dinner:    5:30 PM ET  → 21:30 UTC
// Bedtime:   7:30 PM ET  → 23:30 UTC
//
// Using EDT (UTC-4) offsets. During EST (UTC-5) notifications
// will arrive 1 hour later in local time, which is acceptable.
//
// The cron runs every 30 min. We check if current UTC time
// is within ±20 min of any target slot.
// ═══════════════════════════════════════════════════════

type NotificationSlot = {
  name: string;
  utcHour: number;
  utcMinute: number;
  messages: PushPayload[];
};

const SLOTS: NotificationSlot[] = [
  {
    name: 'morning',
    utcHour: 10, utcMinute: 45,
    messages: [
      {
        title: "Rise & shine — start the protocol",
        body: "Same wake time (±30 min) → morning sunlight + stretch → Growth Bowl / Smoothie. Today's growth starts now.",
        tag: "biokids-morning",
      },
      {
        title: "Morning protocol time",
        body: "Wake time locked? Get outside for 10 min sunlight + dead hang. Then: Growth Bowl with sheep yogurt, PB, berries & seeds.",
        tag: "biokids-morning",
      },
      {
        title: "Growth starts this morning",
        body: "Consistent wake time → sunlight → Growth Bowl → cod liver oil → no sugar until lunch. Every morning counts.",
        tag: "biokids-morning",
      },
      {
        title: "Today's height protocol begins",
        body: "3 things right now: same wake time ✓ morning sunlight + stretch ✓ Growth Bowl or Smoothie ✓",
        tag: "biokids-morning",
      },
      {
        title: "New day, new gains",
        body: "Morning sunlight sets tonight's GH pulse. Dead hang decompresses the spine. Growth Bowl fuels the whole axis. Let's go.",
        tag: "biokids-morning",
      },
    ],
  },
  {
    name: 'lunch',
    utcHour: 15, utcMinute: 30,
    messages: [
      {
        title: "Growth Meal time",
        body: "Lunch = The Growth Meal. Protein + iron + zinc. Water or A2 milk between meals. No naps after 3 PM.",
        tag: "biokids-lunch",
      },
      {
        title: "Midday check-in",
        body: "How's the protocol going? Lunch should be protein-rich. Stay hydrated with water or milk. No sugary drinks.",
        tag: "biokids-lunch",
      },
      {
        title: "Lunchtime — fuel the growth",
        body: "Growth Meal: protein, healthy fats, veggies. Vitamin C with iron-rich foods for 2-3× absorption. Keep hydrating.",
        tag: "biokids-lunch",
      },
    ],
  },
  {
    name: 'exercise',
    utcHour: 19, utcMinute: 0,
    messages: [
      {
        title: "Sprint & jump protocol time",
        body: "Pre-sprint snack → 6×30-sec all-out sprints (M/W/F) or jumping protocol (T/Th/Sa) → stretch → A2 milk + honey after.",
        tag: "biokids-exercise",
      },
      {
        title: "Time to move — GH spike incoming",
        body: "Sprint days: 6×30s all-out. Jump days: jumping protocol. Always follow with 10 min stretching + A2 milk with raw honey.",
        tag: "biokids-exercise",
      },
      {
        title: "Afternoon exercise check",
        body: "Did they get their sprints or jumps in today? Pre-sprint snack 60 min before. A2 milk + honey immediately after. Don't skip the stretch.",
        tag: "biokids-exercise",
      },
    ],
  },
  {
    name: 'dinner',
    utcHour: 21, utcMinute: 30,
    messages: [
      {
        title: "Dinner & wind-down protocol",
        body: "Dinner by 6 PM. No screens after dinner. Start winding down — the sleep protocol begins now.",
        tag: "biokids-dinner",
      },
      {
        title: "Evening protocol starting",
        body: "Dinner → gelatin jello with tart cherry → no screens → finish all food 2-3 hrs before bed. Protecting tonight's GH.",
        tag: "biokids-dinner",
      },
      {
        title: "Dinner time — protect the sleep window",
        body: "Growth happens overnight. Dinner by 6, screens off after. Gelatin jello + tart cherry for the evening snack.",
        tag: "biokids-dinner",
      },
    ],
  },
  {
    name: 'bedtime',
    utcHour: 23, utcMinute: 30,
    messages: [
      {
        title: "Bedtime protocol — this is the big one",
        body: "Warm bath + Epsom salts → magnesium lotion → Sleep Drink (60 min before bed) → books → cool, dark room → nose breathing.",
        tag: "biokids-bedtime",
      },
      {
        title: "Sleep protocol time",
        body: "60-80% of daily GH is released during sleep. Bath → mag lotion → Sleep Drink → same routine → dark, cool room. Every night.",
        tag: "biokids-bedtime",
      },
      {
        title: "Time for the Sleep Drink",
        body: "Bath with Epsom salts ✓ Magnesium glycinate lotion ✓ Sleep Drink (A2 milk + tart cherry + honey) ✓ Dark, cool room ✓",
        tag: "biokids-bedtime",
      },
    ],
  },
];

// Find which slot matches the current UTC time (within ±45 min window)
// Wider window because Vercel Hobby plan has "flexible 1-hour" cron timing
function getCurrentSlot(): NotificationSlot | null {
  const now = new Date();
  const currentMinutes = now.getUTCHours() * 60 + now.getUTCMinutes();

  let bestSlot: NotificationSlot | null = null;
  let bestDiff = Infinity;

  for (const slot of SLOTS) {
    const targetMinutes = slot.utcHour * 60 + slot.utcMinute;
    let diff = Math.abs(currentMinutes - targetMinutes);
    // Handle midnight wraparound
    if (diff > 720) diff = 1440 - diff;
    // Within 45-minute window (handles Vercel Hobby's flexible timing)
    if (diff <= 45 && diff < bestDiff) {
      bestSlot = slot;
      bestDiff = diff;
    }
  }
  return bestSlot;
}

// Verify this is a legitimate cron request from Vercel
function verifyCron(request: Request): boolean {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  // If CRON_SECRET is set, verify it
  if (cronSecret) {
    return authHeader === `Bearer ${cronSecret}`;
  }

  // If no secret configured, allow (for development)
  return true;
}

export async function GET(request: Request) {
  // Verify cron authorization
  if (!verifyCron(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Support explicit ?slot= param for manual testing
  const { searchParams } = new URL(request.url);
  const explicitSlot = searchParams.get('slot');

  try {
    let slot: NotificationSlot | null = null;
    let slotSource = 'auto';

    if (explicitSlot) {
      slot = SLOTS.find(s => s.name === explicitSlot) || null;
      slotSource = 'explicit';
      if (!slot) {
        return NextResponse.json(
          { error: 'Invalid slot. Valid: morning, lunch, exercise, dinner, bedtime' },
          { status: 400 }
        );
      }
    } else {
      slot = getCurrentSlot();
    }

    if (!slot) {
      // No slot matches current time — this is normal, just skip
      return NextResponse.json({
        success: true,
        skipped: true,
        reason: 'No notification slot matches current UTC time',
        currentUTC: new Date().toISOString(),
      });
    }

    // Pick a random message from the slot's rotation
    const message = slot.messages[Math.floor(Math.random() * slot.messages.length)];

    const result = await sendPushToAll(message);

    return NextResponse.json({
      success: true,
      slot: slot.name,
      slotSource,
      message: message.title,
      ...result,
    });
  } catch (err) {
    console.error('Cron notify error:', err);
    return NextResponse.json(
      { error: 'Failed to send notifications', details: String(err) },
      { status: 500 }
    );
  }
}
// deploy trigger 1773437783
