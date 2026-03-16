import { NextResponse } from 'next/server';
import { sendPushToAll, PushPayload } from '@/lib/push';

// ═══════════════════════════════════════════════════════════
// BIOKIDS NOTIFICATION SYSTEM — Time-Based Architecture
// ═══════════════════════════════════════════════════════════
//
// GitHub Actions fires at specific UTC hours. Each slot is
// assigned a specific UTC hour. The system picks the right
// notification for the current time.
//
// Eastern Time = UTC - 4 (EDT) or UTC - 5 (EST)
// We target EDT (summer) as the baseline.
//
// Schedule (all times ET / UTC):
//   7:00 AM /  11 UTC — Morning (sunlight + Growth Bowl + eggs + CLO)
//  12:00 PM /  16 UTC — Lunch (Growth Meal)
//   3:00 PM /  19 UTC — Exercise (sprints or jumps + stretching)
//   4:00 PM /  20 UTC — Post-exercise dairy #2
//   5:00 PM /  21 UTC — Dinner (start now, finish by 6)
//   7:00 PM /  23 UTC — Wind-down (bath, magnesium, sleep drink)
//   8:00 PM /   0 UTC — Bedtime (dark room, lights out)
//
// Weekly (Sunday only):
//  10:00 AM /  14 UTC — Weekly pro tip
//
// TONE: Warm, encouraging, never pressuring. These should
// feel like a friend gently reminding you — parents should
// look forward to opening the app, never feel anxious.
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
  // ── 7 AM ET ── Morning (sunlight + Growth Bowl + eggs + CLO — all one meal)
  // The Growth Bowl (sheep yogurt + toppings) IS dairy serving #1 AND breakfast.
  // CLO goes in the smoothie version or on its own spoon. One notification covers it all.
  {
    name: 'morning',
    utcHour: 11,
    messages: [
      {
        title: "Good morning",
        body: "A few minutes of sunlight, then the Growth Bowl. You've got this.",
        url: "/home#item-sun",
        tag: "biokids-morning",
      },
      {
        title: "Good morning",
        body: "Sunlight, stretch, Growth Bowl with eggs. A beautiful start to the day.",
        url: "/home#item-d1",
        tag: "biokids-morning",
      },
      {
        title: "Good morning",
        body: "Step outside together for a few minutes, then breakfast. That's the whole morning.",
        url: "/home#item-sun",
        tag: "biokids-morning",
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
        title: "Lunch time",
        body: "Protein + iron + a squeeze of lemon. Simple and powerful.",
        url: "/home#item-lunch",
        tag: "biokids-lunch",
      },
      {
        title: "Lunch time",
        body: "Liver meatballs, lentils, or salmon — whatever's easy today. Vitamin C alongside.",
        url: "/home#item-lunch",
        tag: "biokids-lunch",
      },
    ],
  },

  // ── 3 PM ET ── Exercise (sprints or jumps + stretching)
  {
    name: 'exercise',
    utcHour: 19,
    messages: [
      {
        title: "Time to move",
        body: "Sprints, jumps, or just chasing each other around. Then stretch together.",
        url: "/home#item-spr",
        tag: "biokids-exercise",
      },
      {
        title: "Time to move",
        body: "Tag, races, hill sprints — whatever gets them going all out. Stretch after.",
        url: "/home#item-spr",
        tag: "biokids-exercise",
      },
    ],
  },

  // ── 4 PM ET ── Post-exercise dairy #2
  // The protocol says: within 30 min of exercise, cold A2 milk + raw honey.
  // This converts the GH spike into actual growth signal (IGF-1).
  {
    name: 'post-exercise',
    utcHour: 20,
    messages: [
      {
        title: "Dairy Serving #2",
        body: "Cold A2 milk with a little honey after activity. This is the conversion window.",
        url: "/home#item-pm",
        tag: "biokids-dairy-2",
      },
      {
        title: "Dairy Serving #2",
        body: "Post-activity milk turns today's exercise into tonight's growth signal.",
        url: "/home#item-pm",
        tag: "biokids-dairy-2",
      },
    ],
  },

  // ── 5 PM ET ── Dinner (start now, aim to finish by 6)
  // Protocol says "Dinner (by 6 PM)" — so the reminder needs to come
  // early enough for parents to actually prepare and serve.
  {
    name: 'dinner',
    utcHour: 21,
    messages: [
      {
        title: "Dinner",
        body: "Good time to start — bone broth, protein, veggies. Aim to wrap up by 6.",
        url: "/home#item-din",
        tag: "biokids-dinner",
      },
      {
        title: "Dinner",
        body: "Start with a mug of bone broth, then whatever protein you have. Finish by 6 if you can.",
        url: "/home#item-din",
        tag: "biokids-dinner",
      },
    ],
  },

  // ── 7 PM ET ── Wind-down (bath, magnesium, sleep drink, screens off)
  // This is the gap that was completely missing. The Sleep Stack has a
  // whole evening sequence: screens off → bath with Epsom salts → magnesium
  // lotion → Sleep Drink (dairy #3 = A2 milk + tart cherry) → lights out.
  {
    name: 'wind-down',
    utcHour: 23,
    messages: [
      {
        title: "Wind-down time",
        body: "Screens off, warm bath, magnesium lotion, then the Sleep Drink. Cozy evening ahead.",
        url: "/home#item-bath",
        tag: "biokids-winddown",
      },
      {
        title: "Wind-down time",
        body: "Bath with Epsom salts, magnesium on feet, Sleep Drink. The evening routine does so much.",
        url: "/home#item-bath",
        tag: "biokids-winddown",
      },
      {
        title: "Wind-down time",
        body: "Time to slow down together. Bath, lotion, Sleep Drink, then a book. They'll be drowsy soon.",
        url: "/home#item-rtn",
        tag: "biokids-winddown",
      },
    ],
  },

  // ── 8 PM ET ── Bedtime (dark room, lights out)
  {
    name: 'bedtime',
    utcHour: 0,
    messages: [
      {
        title: "Bedtime",
        body: "Dark room, cool air, nose breathing. Tonight's growth is on its way.",
        url: "/home#item-bed",
        tag: "biokids-bedtime",
      },
      {
        title: "Bedtime",
        body: "Lights out, every LED covered. Everything you did today builds to this moment.",
        url: "/home#item-dark",
        tag: "biokids-bedtime",
      },
    ],
  },
];

// ── Weekly Pro Tips ──
// Rotates by week number — one high-leverage insight each Sunday
// Tone: warm, encouraging, share the "why" without pressure
function getWeeklyMessages(): PushPayload[] {
  const tips = [
    {
      title: "Sunday Tip",
      body: "Raw honey and fruit are perfectly fine. It's the refined sugar in packaged snacks that quietly stalls growth for hours.",
      url: "/home#item-nse",
      tag: "biokids-weekly",
    },
    {
      title: "Sunday Tip",
      body: "Even 5 minutes of morning sunlight programs tonight's sleep quality. Overcast days still count.",
      url: "/home#item-sun",
      tag: "biokids-weekly",
    },
    {
      title: "Sunday Tip",
      body: "A consistent wake time — even on weekends — does more for growth than almost anything else. And it's free.",
      url: "/home#item-wake",
      tag: "biokids-weekly",
    },
    {
      title: "Sunday Tip",
      body: "Dead hangs are wonderful. Just 30 seconds reverses a full day of spinal compression from gravity.",
      url: "/home#item-stretch",
      tag: "biokids-weekly",
    },
    {
      title: "Sunday Tip",
      body: "Watch your child sleep tonight. If their mouth is open, it might be worth a chat with your pediatrician.",
      url: "/home#item-airway",
      tag: "biokids-weekly",
    },
    {
      title: "Sunday Tip",
      body: "Magnesium lotion on their feet before bed — it absorbs well and helps them fall into deeper sleep.",
      url: "/home#item-mag",
      tag: "biokids-weekly",
    },
    {
      title: "Sunday Tip",
      body: "The Sleep Drink is the quiet star of the protocol. A2 milk + tart cherry — casein feeds growth all night long.",
      url: "/home#item-drink",
      tag: "biokids-weekly",
    },
    {
      title: "Sunday Tip",
      body: "10 minutes of jump rope builds more bone density at the growth plate than most sports. A great rainy-day option.",
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

// Verify this is a legitimate cron request (fail-closed: deny if no secret configured)
function verifyCron(request: Request): boolean {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    return false; // Deny access if CRON_SECRET is not configured
  }
  return authHeader === `Bearer ${cronSecret}`;
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
