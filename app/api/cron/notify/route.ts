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

// ── Design philosophy (Ive) ──
// Name the ingredient, not the category. "Sheep yogurt" not "dairy."
// "Beef liver meatballs" not "protein." "Tart cherry" not "the Sleep Drink."
// The exotic specificity IS the brand. It signals: this is not your
// pediatrician's generic advice. Trust the material. Let curiosity
// pull the parent into the app.

const SLOTS: NotificationSlot[] = [
  // ── 7 AM ET ── Morning
  {
    name: 'morning',
    utcHour: 11,
    messages: [
      {
        title: "Good morning",
        body: "Sunlight. Sheep yogurt. Pumpkin seeds. That's the morning.",
        url: "/home#item-d1",
        tag: "biokids-morning",
      },
      {
        title: "Good morning",
        body: "10 minutes outside, then the Growth Bowl — sheep yogurt, berries, honey, cod liver oil hidden in the smoothie.",
        url: "/home#item-sun",
        tag: "biokids-morning",
      },
      {
        title: "Good morning",
        body: "Stretch in the sun. Sheep yogurt bowl with hemp hearts and chia. Over-easy eggs in olive oil.",
        url: "/home#item-d1",
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
        title: "Lunch",
        body: "Beef liver meatballs with lemon. The most nutrient-dense meal on earth.",
        url: "/home#item-lunch",
        tag: "biokids-lunch",
      },
      {
        title: "Lunch",
        body: "Sauerkraut alongside today's protein. Even two spoonfuls produce GABA naturally.",
        url: "/home#item-lunch",
        tag: "biokids-lunch",
      },
      {
        title: "Lunch",
        body: "Lentils with lemon, broccoli, pumpkin seeds on top. Every topping earns its place.",
        url: "/home#item-lunch",
        tag: "biokids-lunch",
      },
    ],
  },

  // ── 3 PM ET ── Exercise
  {
    name: 'exercise',
    utcHour: 19,
    messages: [
      {
        title: "Sprint time",
        body: "6 × 30 seconds, all out. Hill sprints if you can. Then dead hangs and cobra stretch.",
        url: "/home#item-spr",
        tag: "biokids-exercise",
      },
      {
        title: "Jump time",
        body: "50–100 jumps. Rope, drop jumps, single-leg hops. Then hang and stretch.",
        url: "/home#item-jump",
        tag: "biokids-exercise",
      },
    ],
  },

  // ── 4 PM ET ── Post-exercise dairy #2
  {
    name: 'post-exercise',
    utcHour: 20,
    messages: [
      {
        title: "Cold A2 milk + raw honey",
        body: "Right after activity. Whey converts the sprint into a growth signal. Casein carries it for hours.",
        url: "/home#item-pm",
        tag: "biokids-dairy-2",
      },
      {
        title: "Post-sprint milk",
        body: "Cold A2 milk, one spoon of raw honey. Without this, the GH spike is orphaned.",
        url: "/home#item-pm",
        tag: "biokids-dairy-2",
      },
    ],
  },

  // ── 5 PM ET ── Dinner
  {
    name: 'dinner',
    utcHour: 21,
    messages: [
      {
        title: "Bone broth first",
        body: "A mug of bone broth to start dinner. Glycine lowers core temp for tonight's deep sleep.",
        url: "/home#item-din",
        tag: "biokids-dinner",
      },
      {
        title: "Dinner by 6",
        body: "Bone broth starter, rotated protein, lentils with lemon, broccoli. Wrap up by 6 if you can.",
        url: "/home#item-din",
        tag: "biokids-dinner",
      },
      {
        title: "Gelatin jello tonight?",
        body: "Bovine gelatin + tart cherry juice + monk fruit. Set it now — they'll think it's regular jello.",
        url: "/home#item-gly",
        tag: "biokids-dinner",
      },
    ],
  },

  // ── 7 PM ET ── Wind-down
  {
    name: 'wind-down',
    utcHour: 23,
    messages: [
      {
        title: "Epsom salt bath",
        body: "Warm water, 20 minutes. Then magnesium lotion on their feet. The core temp drop triggers deep sleep.",
        url: "/home#item-bath",
        tag: "biokids-winddown",
      },
      {
        title: "Tart cherry + A2 milk",
        body: "The Sleep Drink. 4 oz A2 milk, 1 oz tart cherry, unsweetened. Casein feeds growth all night.",
        url: "/home#item-drink",
        tag: "biokids-winddown",
      },
      {
        title: "Wind-down",
        body: "Epsom bath. Magnesium on feet. Tart cherry + A2 milk. Book. They'll be drowsy soon.",
        url: "/home#item-rtn",
        tag: "biokids-winddown",
      },
    ],
  },

  // ── 8 PM ET ── Bedtime
  {
    name: 'bedtime',
    utcHour: 0,
    messages: [
      {
        title: "Lights out",
        body: "65°F. Blackout curtains. Every LED taped. Nose breathing. This is where it all compounds.",
        url: "/home#item-dark",
        tag: "biokids-bedtime",
      },
      {
        title: "Lights out",
        body: "Dark room, cool air. The casein is slow-releasing. The glycine is lowering core temp. Growth is happening.",
        url: "/home#item-bed",
        tag: "biokids-bedtime",
      },
    ],
  },
];

// ── Weekly Pro Tips ──
// Rotates by week number. Lead with the specific ingredient or insight
// that makes bioKids different. Let the parent think "I've never heard
// that before" — that's the pull.
function getWeeklyMessages(): PushPayload[] {
  const tips = [
    {
      title: "Sheep yogurt",
      body: "Up to 35× more lactoferrin than cow. 70% more casein. 100% A2 naturally. The Growth Bowl base.",
      url: "/home#item-d1",
      tag: "biokids-weekly",
    },
    {
      title: "Broccoli sprouts",
      body: "20–100× more sulforaphane than mature broccoli. A small handful in a smoothie after junk food accelerates recovery.",
      url: "/home#item-junk",
      tag: "biokids-weekly",
    },
    {
      title: "Bovine gelatin",
      body: "Pure glycine. Lowers core temp for sleep, signals growth, builds growth plate cartilage. Kids think it's regular jello.",
      url: "/home#item-gly",
      tag: "biokids-weekly",
    },
    {
      title: "Tart cherry juice",
      body: "The highest food source of melatonin. In the Sleep Drink, it deepens slow-wave sleep and inhibits aromatase.",
      url: "/home#item-drink",
      tag: "biokids-weekly",
    },
    {
      title: "Cod liver oil",
      body: "Retinol + vitamin D + omega-3 in one spoon. Hidden in a berry smoothie, they'll never taste it.",
      url: "/home#item-clo",
      tag: "biokids-weekly",
    },
    {
      title: "Sauerkraut",
      body: "Even two spoonfuls. Fermentation produces GABA — a natural growth signal that also removes the brake on GH.",
      url: "/home#item-lunch",
      tag: "biokids-weekly",
    },
    {
      title: "Epsom salt baths",
      body: "Transdermal magnesium + a core temp rise that triggers rapid cooling. The fastest path to deep sleep.",
      url: "/home#item-bath",
      tag: "biokids-weekly",
    },
    {
      title: "Pistachios",
      body: "The highest melatonin per gram of any nut. The perfect evening snack — better than anything in a package.",
      url: "/home#item-nse",
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
