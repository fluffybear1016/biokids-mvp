import { NextResponse } from 'next/server';
import { sendPushToAll, PushPayload } from '@/lib/push';

// Vercel Cron Job — sends timed push notifications for each protocol block
// Each cron schedule passes a ?slot= query param to select which notification to send

// ═══════════════════════════════════════════════════════
// NOTIFICATION SCHEDULE
// ═══════════════════════════════════════════════════════
//
// Slot 1: 6:45 AM  — Morning wake-up & breakfast protocol
// Slot 2: 11:30 AM — Lunch & hydration reminder
// Slot 3: 3:00 PM  — Afternoon exercise protocol
// Slot 4: 5:30 PM  — Dinner & evening wind-down
// Slot 5: 7:30 PM  — Bedtime sleep protocol
//
// All times are US Eastern (ET). Vercel cron uses UTC.
// ET = UTC-5 (EST) or UTC-4 (EDT)
// We use EDT (UTC-4) offsets since most of the year is DST:
//   6:45 AM ET  = 10:45 UTC
//   11:30 AM ET = 15:30 UTC
//   3:00 PM ET  = 19:00 UTC
//   5:30 PM ET  = 21:30 UTC
//   7:30 PM ET  = 23:30 UTC
// ═══════════════════════════════════════════════════════

type NotificationSlot = {
  messages: PushPayload[];
};

const SLOTS: Record<string, NotificationSlot> = {
  morning: {
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

  lunch: {
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

  exercise: {
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

  dinner: {
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

  bedtime: {
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
};

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

  const { searchParams } = new URL(request.url);
  const slot = searchParams.get('slot');

  if (!slot || !SLOTS[slot]) {
    return NextResponse.json(
      { error: 'Invalid slot. Valid: morning, lunch, exercise, dinner, bedtime' },
      { status: 400 }
    );
  }

  try {
    const slotData = SLOTS[slot];
    // Pick a random message from the slot's rotation
    const message = slotData.messages[Math.floor(Math.random() * slotData.messages.length)];

    const result = await sendPushToAll(message);

    return NextResponse.json({
      success: true,
      slot,
      message: message.title,
      ...result,
    });
  } catch (err) {
    console.error(`Cron notify error (${slot}):`, err);
    return NextResponse.json(
      { error: 'Failed to send notifications', details: String(err) },
      { status: 500 }
    );
  }
}
