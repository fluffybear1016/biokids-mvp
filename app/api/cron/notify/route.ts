import { NextResponse } from 'next/server';
import { sendPushToAll, PushPayload } from '@/lib/push';

// Push notification endpoint — runs HOURLY via GitHub Actions
// Each hour sends a notification from the next slot in rotation
//
// ═══════════════════════════════════════════════════════
// NOTIFICATION SLOTS (rotate hourly, all day)
// ═══════════════════════════════════════════════════════
//
// Morning, Lunch, Exercise, Dinner, Bedtime
// Cycles through all 5 slots every 5 hours, repeating.
// GitHub Actions triggers every hour from 11 UTC to 3 UTC
// (~7 AM to ~11 PM ET), sending one notification per hour.
// ═══════════════════════════════════════════════════════

type NotificationSlot = {
  name: string;
  messages: PushPayload[];
};

const SLOTS: NotificationSlot[] = [
  {
    name: 'morning',
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

// Cycle through slots based on current UTC hour
// Each hour picks the next slot in rotation: morning → lunch → exercise → dinner → bedtime → repeat
function getCurrentSlot(): NotificationSlot {
  const now = new Date();
  const hour = now.getUTCHours();
  const slotIndex = hour % SLOTS.length;
  return SLOTS[slotIndex];
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
    let slot: NotificationSlot;
    let slotSource = 'auto';

    if (explicitSlot) {
      const found = SLOTS.find(s => s.name === explicitSlot);
      if (!found) {
        return NextResponse.json(
          { error: 'Invalid slot. Valid: morning, lunch, exercise, dinner, bedtime' },
          { status: 400 }
        );
      }
      slot = found;
      slotSource = 'explicit';
    } else {
      slot = getCurrentSlot();
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
