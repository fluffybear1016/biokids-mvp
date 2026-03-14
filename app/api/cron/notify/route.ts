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
        title: "Morning protocol",
        body: "Sunlight. Stretch. Growth Bowl. The first hour sets the whole day.",
        tag: "biokids-morning",
      },
      {
        title: "Good morning",
        body: "10 min outdoor light → dead hang → Growth Bowl with berries and seeds. Simple start, big signal.",
        tag: "biokids-morning",
      },
      {
        title: "Rise and build",
        body: "Same wake time. Morning sun. Growth Bowl or Smoothie. Cod liver oil. That's it — that's the morning.",
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
        title: "Cod liver oil",
        body: "Vitamin A + D + omega-3 in one spoon. Best absorbed with breakfast fat. Quick and done.",
        tag: "biokids-clo",
      },
      {
        title: "One spoon",
        body: "Cod liver oil with breakfast. Supports bone mineralization and the growth axis. Takes 5 seconds.",
        tag: "biokids-clo",
      },
      {
        title: "Don't skip this one",
        body: "Cod liver oil — the single highest-leverage supplement in the protocol. With food, every morning.",
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
        title: "Dairy · serving 1 of 3",
        body: "A2 milk, sheep yogurt, or kefir. Calcium + IGF-1 signaling starts here.",
        tag: "biokids-dairy",
      },
      {
        title: "First dairy serving",
        body: "Morning dairy — yogurt with breakfast or a glass of A2 milk. 1 of 3 daily servings.",
        tag: "biokids-dairy",
      },
    ],
  },

  // ── 10 AM ET (Sunday only) ── Weekly article
  {
    name: 'weekly-article',
    utcHour: 14,
    sundayOnly: true,
    messages: getWeeklyArticleMessages(),
  },

  // ── 12 PM ET ── Lunch
  {
    name: 'lunch',
    utcHour: 16,
    messages: [
      {
        title: "Growth Meal",
        body: "Protein + iron + zinc. Pair iron-rich foods with vitamin C for 2–3× absorption.",
        tag: "biokids-lunch",
      },
      {
        title: "Lunchtime",
        body: "The Growth Meal: protein, healthy fats, vegetables. Water or A2 milk — no sugar drinks.",
        tag: "biokids-lunch",
      },
      {
        title: "Midday fuel",
        body: "High-quality protein at lunch drives afternoon IGF-1. Keep it clean, keep it consistent.",
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
        title: "Dairy · serving 2 of 3",
        body: "Afternoon dairy — A2 milk, cheese, or yogurt. Steady calcium input for bone growth.",
        tag: "biokids-dairy",
      },
      {
        title: "Second dairy serving",
        body: "Glass of A2 milk or a yogurt. Spacing dairy through the day optimizes absorption. 2 of 3.",
        tag: "biokids-dairy",
      },
    ],
  },

  // ── 3 PM ET ── Exercise
  {
    name: 'exercise',
    utcHour: 19,
    messages: [
      {
        title: "Sprint + jump protocol",
        body: "Sprints (M/W/F) or jumping (T/Th/Sa). Pre-snack 60 min before. A2 milk + honey after.",
        tag: "biokids-exercise",
      },
      {
        title: "Time to move",
        body: "6 × 30s all-out sprints or jumping protocol. Follow with 10 min stretching. This triggers GH.",
        tag: "biokids-exercise",
      },
      {
        title: "Afternoon exercise",
        body: "The sprint/jump window. Short, intense, effective. Don't skip the post-workout stretch + A2 milk.",
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
        title: "Dairy · serving 3 of 3",
        body: "Final dairy of the day. A2 milk with dinner or as an evening snack. All 3 servings done.",
        tag: "biokids-dairy",
      },
      {
        title: "Last dairy serving",
        body: "Third and final serving — A2 milk, cheese, or kefir. Calcium fuels overnight bone building.",
        tag: "biokids-dairy",
      },
    ],
  },

  // ── 6 PM ET ── Dinner
  {
    name: 'dinner',
    utcHour: 22,
    messages: [
      {
        title: "Dinner protocol",
        body: "Eat by 6 PM. Screens off after. Gelatin jello + tart cherry for evening snack. Protecting tonight's GH.",
        tag: "biokids-dinner",
      },
      {
        title: "Evening wind-down",
        body: "Dinner done → no screens → finish all food 2–3 hours before bed. The sleep window starts now.",
        tag: "biokids-dinner",
      },
      {
        title: "Dinner time",
        body: "Growth happens overnight. Eat early, wind down early. Tart cherry + gelatin for the last snack.",
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
        title: "Sleep protocol",
        body: "Warm bath → Epsom salts → magnesium lotion → Sleep Drink → dark, cool room. This is where growth happens.",
        tag: "biokids-bedtime",
      },
      {
        title: "Bedtime",
        body: "60–80% of daily growth hormone releases during sleep. Bath, mag lotion, Sleep Drink, lights out.",
        tag: "biokids-bedtime",
      },
      {
        title: "The Sleep Drink",
        body: "A2 milk + tart cherry + honey, 60 min before bed. Then: dark room, cool temp, nose breathing.",
        tag: "biokids-bedtime",
      },
    ],
  },
];

// ── Weekly article rotation ──
// Rotates through articles by week number
function getWeeklyArticleMessages(): PushPayload[] {
  const articles = [
    {
      title: "This week's read",
      body: "How milk drives IGF-1 and why A2 matters — the science behind daily dairy for growth.",
      url: "/home",
      tag: "biokids-article",
    },
    {
      title: "This week's read",
      body: "Sleep architecture and growth hormone: why the first 90 minutes of sleep matter most.",
      url: "/home",
      tag: "biokids-article",
    },
    {
      title: "This week's read",
      body: "The jumping study: how 24 weeks of jumps added 4.3 cm vs controls. What parents need to know.",
      url: "/home",
      tag: "biokids-article",
    },
    {
      title: "This week's read",
      body: "Vitamin D, sunlight, and bone growth — why 10 minutes of morning light changes the equation.",
      url: "/home",
      tag: "biokids-article",
    },
    {
      title: "This week's read",
      body: "Sprint-induced growth hormone: the 30-second protocol that triggers a 300–500% GH spike.",
      url: "/home",
      tag: "biokids-article",
    },
    {
      title: "This week's read",
      body: "Iron + vitamin C pairing: how to double nutrient absorption at every meal.",
      url: "/home",
      tag: "biokids-article",
    },
    {
      title: "This week's read",
      body: "The role of zinc in growth plate development — and the best whole-food sources for children.",
      url: "/home",
      tag: "biokids-article",
    },
    {
      title: "This week's read",
      body: "Why consistent wake times matter: circadian rhythm and growth hormone pulsatility.",
      url: "/home",
      tag: "biokids-article",
    },
  ];

  // Pick article based on week number of the year
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const weekNum = Math.floor(((now.getTime() - startOfYear.getTime()) / 86400000 + startOfYear.getDay() + 1) / 7);
  const article = articles[weekNum % articles.length];
  return [article];
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
