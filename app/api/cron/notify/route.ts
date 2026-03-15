import { NextResponse } from 'next/server';
import { sendPushToAll, PushPayload } from '@/lib/push';

// ═══════════════════════════════════════════════════════════
// BIOKIDS NOTIFICATION SYSTEM — Time-Based Architecture
// ═══════════════════════════════════════════════════════════
//
// GitHub Actions fires every hour from 11 UTC to 3 UTC+1
// (~7 AM to ~11 PM Eastern). Each slot is assigned a specific
// UTC hour window. The system picks the right notification
// for the current time — no more rotation bugs.
//
// Eastern Time = UTC - 4 (EDT) or UTC - 5 (EST)
// We target EDT (summer) as the baseline.
//
// Schedule (all times ET / UTC):
//   7:00 AM /  11 UTC — Morning protocol
//   8:00 AM /  12 UTC — Cod liver oil
//   9:00 AM /  13 UTC — Dairy serving 1
//  12:00 PM /  16 UTC — Lunch
//   1:00 PM /  17 UTC — Dairy serving 2
//   3:00 PM /  19 UTC — Exercise
//   5:00 PM /  21 UTC — Dairy serving 3
//   6:00 PM /  22 UTC — Dinner
//   8:00 PM /   0 UTC — Bedtime
//
// Weekly (Sunday only):
//  10:00 AM /  14 UTC — Weekly article
//
// ═══════════════════════════════════════════════════════════

type NotificationSlot = {
  name: string;
  utcHour: number;
  weekdayOnly?: boolean; // true = skip weekends
  sundayOnly?: boolean;  // true = only on Sundays
  messages: PushPayload[];
};

const SLOTS: NotificationSlot[] = [
  // ── 7 AM ET ── Morning
  {
    name: 'morning',
    utcHour: 11,
    messages: [
      {
        title: "Morning",
        body: "Sun. Stretch. Breakfast. The first hour matters most.",
        url: "/home#item-sun",
        tag: "biokids-morning",
      },
      {
        title: "Morning",
        body: "10 min sunlight, then breakfast. Simple start.",
        url: "/home#item-bkf",
        tag: "biokids-morning",
      },
    ],
  },

  // ── 8 AM ET ── Cod liver oil
  {
    name: 'cod-liver-oil',
    utcHour: 12,
    messages: [
      {
        title: "Cod Liver Oil",
        body: "One spoon with breakfast. Vitamin A, D, and omega-3.",
        url: "/home#item-clo",
        tag: "biokids-clo",
      },
      {
        title: "Pro Tip",
        body: "Cod liver oil absorbs best with fat. Pair it with eggs or avocado.",
        url: "/home#item-clo",
        tag: "biokids-clo",
      },
    ],
  },

  // ── 9 AM ET ── Dairy serving 1
  {
    name: 'dairy-1',
    utcHour: 13,
    messages: [
      {
        title: "Dairy Serving #1",
        body: "A2 milk, yogurt bowl, or smoothie. Serving 1 of 3.",
        url: "/home#item-d1",
        tag: "biokids-dairy-1",
      },
      {
        title: "Pro Tip",
        body: "Any A2 milk works — cow A2, goat, sheep, buffalo. Just avoid A1 casein.",
        url: "/home#item-d1",
        tag: "biokids-dairy-1",
      },
    ],
  },

  // ── 10 AM ET (Sunday only) ── Weekly Pro Tip
  {
    name: 'weekly-article',
    utcHour: 14,
    sundayOnly: true,
    messages: getWeeklyMessages(),
  },

  // ── 12 PM ET ── Lunch
  {
    name: 'lunch',
    utcHour: 16,
    messages: [
      {
        title: "Growth Meal",
        body: "Protein, iron, zinc. Pair iron with vitamin C for 2–3× absorption.",
        url: "/home#item-lunch",
        tag: "biokids-lunch",
      },
      {
        title: "Pro Tip",
        body: "Squeeze lemon on meat or lentils. Vitamin C doubles iron absorption.",
        url: "/home#item-lunch",
        tag: "biokids-lunch",
      },
    ],
  },

  // ── 1 PM ET ── Dairy serving 2
  {
    name: 'dairy-2',
    utcHour: 17,
    messages: [
      {
        title: "Dairy Serving #2",
        body: "A2 milk + raw honey after activity. Serving 2 of 3.",
        url: "/home#item-pm",
        tag: "biokids-dairy-2",
      },
      {
        title: "Pro Tip",
        body: "Post-exercise milk converts the GH spike into actual growth signal. Don't skip it.",
        url: "/home#item-pm",
        tag: "biokids-dairy-2",
      },
    ],
  },

  // ── 3 PM ET ── Exercise
  {
    name: 'exercise',
    utcHour: 19,
    messages: [
      {
        title: "Exercise",
        body: "Sprints or jumps. 6 rounds, 30 seconds each. Then stretch.",
        url: "/home#item-spr",
        tag: "biokids-exercise",
      },
      {
        title: "Pro Tip",
        body: "30-second sprints trigger the largest natural GH spike. Nothing else comes close.",
        url: "/home#item-spr",
        tag: "biokids-exercise",
      },
    ],
  },

  // ── 5 PM ET ── Dairy serving 3
  {
    name: 'dairy-3',
    utcHour: 21,
    messages: [
      {
        title: "Dairy Serving #3",
        body: "Last serving. A2 milk, kefir, or cheese. All 3 done.",
        url: "/home#item-drink",
        tag: "biokids-dairy-3",
      },
      {
        title: "Pro Tip",
        body: "Spacing dairy across the day beats one big serving. Absorption peaks then resets.",
        url: "/home#item-drink",
        tag: "biokids-dairy-3",
      },
    ],
  },

  // ── 6 PM ET ── Dinner
  {
    name: 'dinner',
    utcHour: 22,
    messages: [
      {
        title: "Dinner",
        body: "Eat early. Bone broth, protein, vegetables. Finish 2–3 hrs before bed.",
        url: "/home#item-din",
        tag: "biokids-dinner",
      },
      {
        title: "Pro Tip",
        body: "Glycine from bone broth lowers core temp for deeper sleep. Start dinner with a cup.",
        url: "/home#item-din",
        tag: "biokids-dinner",
      },
    ],
  },

  // ── 8 PM ET ── Bedtime
  {
    name: 'bedtime',
    utcHour: 0,
    messages: [
      {
        title: "Sleep",
        body: "Bath. Magnesium. Sleep Drink. Dark room. This is where growth happens.",
        url: "/home#item-bath",
        tag: "biokids-bedtime",
      },
      {
        title: "Pro Tip",
        body: "60–80% of daily growth hormone releases in the first 90 minutes of sleep. Protect it.",
        url: "/home#item-bed",
        tag: "biokids-bedtime",
      },
    ],
  },
];

// ── Weekly Pro Tips ──
// Rotates by week number — one high-leverage insight each Sunday
function getWeeklyMessages(): PushPayload[] {
  const tips = [
    {
      title: "Pro Tip · Sunday",
      body: "One sugar spike suppresses GH for up to 2 hours. Raw honey and fruit are fine. Refined sugar isn't.",
      url: "/home#item-nse",
      tag: "biokids-weekly",
    },
    {
      title: "Pro Tip · Sunday",
      body: "Morning sunlight sets the circadian clock. 10 min within an hour of waking. No sunglasses.",
      url: "/home#item-sun",
      tag: "biokids-weekly",
    },
    {
      title: "Pro Tip · Sunday",
      body: "Consistent wake time matters more than total hours. Same time every day, even weekends.",
      url: "/home#item-wake",
      tag: "biokids-weekly",
    },
    {
      title: "Pro Tip · Sunday",
      body: "Dead hangs decompress the spine. Just 30–60 seconds reverses daily compression from gravity.",
      url: "/home#item-stretch",
      tag: "biokids-weekly",
    },
    {
      title: "Pro Tip · Sunday",
      body: "Nose breathing during sleep raises oxygen absorption and supports deeper SWS. Mouth tape helps.",
      url: "/home#item-airway",
      tag: "biokids-weekly",
    },
    {
      title: "Pro Tip · Sunday",
      body: "Magnesium is a gateway mineral. Most kids are deficient. Lotion on feet before bed absorbs well.",
      url: "/home#item-mag",
      tag: "biokids-weekly",
    },
    {
      title: "Pro Tip · Sunday",
      body: "The sleep drink — A2 milk, tart cherry, honey — delivers tryptophan, melatonin, and casein overnight.",
      url: "/home#item-drink",
      tag: "biokids-weekly",
    },
    {
      title: "Pro Tip · Sunday",
      body: "Jumping builds bone density at the growth plate. 10 min of jump rope outperforms most sports.",
      url: "/home#item-jump",
      tag: "biokids-weekly",
    },
  ];

  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const weekNum = Math.floor(((now.getTime() - startOfYear.getTime()) / 86400000 + startOfYear.getDay() + 1) / 7);
  const tip = tips[weekNum % tips.length];
  return [tip];
}

// Find the right slot for the current UTC hour
function getCurrentSlot(): NotificationSlot | null {
  const now = new Date();
  const utcHour = now.getUTCHours();
  const utcDay = now.getUTCDay(); // 0 = Sunday

  // Find matching slot for this hour
  const matching = SLOTS.filter(slot => {
    if (slot.utcHour !== utcHour) return false;
    if (slot.sundayOnly && utcDay !== 0) return false;
    return true;
  });

  if (matching.length === 0) return null;

  // If multiple match (shouldn't normally happen), pick the first non-sunday-only one,
  // or the sunday one if it's Sunday
  return matching[0];
}

// Verify this is a legitimate cron request
function verifyCron(request: Request): boolean {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    return authHeader === `Bearer ${cronSecret}`;
  }
  return true;
}

export async function GET(request: Request) {
  if (!verifyCron(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const explicitSlot = searchParams.get('slot');

  try {
    let slot: NotificationSlot | null;
    let slotSource = 'auto';

    if (explicitSlot) {
      const found = SLOTS.find(s => s.name === explicitSlot);
      if (!found) {
        const validNames = [...new Set(SLOTS.map(s => s.name))].join(', ');
        return NextResponse.json(
          { error: `Invalid slot. Valid: ${validNames}` },
          { status: 400 }
        );
      }
      slot = found;
      slotSource = 'explicit';
    } else {
      slot = getCurrentSlot();
    }

    if (!slot) {
      return NextResponse.json({
        success: true,
        message: 'No notification scheduled for this hour',
        utcHour: new Date().getUTCHours(),
        sent: 0,
      });
    }

    // Pick a random message from the slot's variants
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
