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
  sendAll?: boolean;     // true = send every message in order (full protocol)
  messages: PushPayload[];
};

// ── Design philosophy (Ive) ──
// Name the ingredient, not the category. "Sheep yogurt" not "dairy."
// "Beef liver meatballs" not "protein." "Tart cherry" not "the Sleep Drink."
// The exotic specificity IS the brand. It signals: this is not your
// pediatrician's generic advice. Trust the material. Let curiosity
// pull the parent into the app.

const SLOTS: NotificationSlot[] = [
  // ── 7 AM ET ── Morning (FULL PROTOCOL — sends all 3 in order)
  // Parents get the complete morning sequence so nothing gets missed.
  // Step 1: Music + sunlight + stretch (sets the circadian clock)
  // Step 2: Dairy — let the kids build their own bowl
  // Step 3: Eggs + cod liver oil
  {
    name: 'morning',
    utcHour: 11,
    sendAll: true,
    messages: [
      {
        title: "Step 1: Claire de Lune + sunlight + stretch",
        body: "Put on something slow — Debussy, Bach, anything calm. Then 10 min outside with a gentle stretch. Even the porch counts. You're setting tonight's sleep clock right now.",
        url: "/home#item-music-am",
        tag: "biokids-morning-1",
      },
      {
        title: "Step 2: The Growth Bowl — let them build it",
        body: "Sheep yogurt (or any A2/whole milk yogurt), pumpkin seeds, berries, raw honey. Let the kids pour, sprinkle, build. A smoothie or cold milk works too. The ritual matters.",
        url: "/home#item-d1",
        tag: "biokids-morning-2",
      },
      {
        title: "Step 3: Sunny side up eggs + cod liver oil",
        body: "2–3 eggs, any way they'll eat them. Half a spoon of CLO hidden in the smoothie — they won't taste it. Skip CLO on liver days. That's the morning done.",
        url: "/home#item-bkf",
        tag: "biokids-morning-3",
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
        title: "Beef liver meatballs + lemon",
        body: "Mix 2 tbsp liver into ground beef — they'll never know. Squeeze lemon on top for iron absorption. Load the plate with vegetables — any kind, lots of variety.",
        url: "/home#item-lunch",
        tag: "biokids-lunch",
      },
      {
        title: "Sauerkraut — even two spoonfuls",
        body: "A small side of sauerkraut alongside today's protein. It produces GABA naturally. No need to force it — even a taste counts. Pile on the cooked veggies.",
        url: "/home#item-lunch",
        tag: "biokids-lunch",
      },
      {
        title: "Lentils + broccoli + pumpkin seeds",
        body: "Lentils in soup or as a side, lemon on top. Broccoli steamed or roasted. Pumpkin seeds sprinkled on anything. Add spinach, carrots, whatever's in the fridge.",
        url: "/home#item-lunch",
        tag: "biokids-lunch",
      },
    ],
  },

  // ── 3 PM ET ── Exercise
  // "Be outside" is the real message.
  {
    name: 'exercise',
    utcHour: 19,
    messages: [
      {
        title: "Sprints + dead hangs",
        body: "6 × 30 seconds, all out — backyard, park, hill, anywhere. Then hang from anything for 20 sec. Even monkey bars count. Get them outside.",
        url: "/home#item-spr",
        tag: "biokids-exercise",
      },
      {
        title: "50 jumps + stretching",
        body: "Jump rope, drop jumps, just jumping around — doesn't need to be formal. Then hang and stretch. The more time outside the better today.",
        url: "/home#item-jump",
        tag: "biokids-exercise",
      },
    ],
  },

  // ── 4 PM ET ── Post-exercise dairy
  {
    name: 'post-exercise',
    utcHour: 20,
    messages: [
      {
        title: "Cold A2 milk + raw honey",
        body: "Right after activity. Any A2 or whole milk works — the key is protein within 30 min. One spoon of honey. This turns the sprint into actual growth.",
        url: "/home#item-pm",
        tag: "biokids-dairy-2",
      },
      {
        title: "Post-sprint milk",
        body: "Cold milk, one spoon of honey. Without dairy after sprints, the growth signal is wasted. A2 is ideal — any whole milk is good.",
        url: "/home#item-pm",
        tag: "biokids-dairy-2",
      },
    ],
  },

  // ── 5 PM ET ── Dinner (FULL PROTOCOL — sends all 3 in order)
  {
    name: 'dinner',
    utcHour: 21,
    sendAll: true,
    messages: [
      {
        title: "Step 1: Bone broth first",
        body: "A warm mug to start dinner. Glycine lowers core temp for deep sleep tonight. Store-bought is fine — homemade when you can.",
        url: "/home#item-din",
        tag: "biokids-dinner-1",
      },
      {
        title: "Step 2: Cooked spinach + broccoli tonight",
        body: "Load the plate with cooked vegetables — spinach, carrots, Brussels sprouts, whatever you have. No raw salads at dinner — cook everything for better sleep.",
        url: "/home#item-din",
        tag: "biokids-dinner-2",
      },
      {
        title: "Step 3: Bovine gelatin jello",
        body: "Gelatin + tart cherry juice + monk fruit. Set it now — they'll think it's regular jello. Even store-bought gelatin works. This is dessert that builds growth plates.",
        url: "/home#item-gly",
        tag: "biokids-dinner-3",
      },
    ],
  },

  // ── 7 PM ET ── Wind-down (FULL PROTOCOL — sends all 3 in order)
  {
    name: 'wind-down',
    utcHour: 23,
    sendAll: true,
    messages: [
      {
        title: "Step 1: Chopin Nocturnes on",
        body: "Soft classical music. This signals the transition — screens off, pace slows. The whole evening ritual starts here.",
        url: "/home#item-music-pm",
        tag: "biokids-winddown-1",
      },
      {
        title: "Step 2: Tart cherry + A2 milk",
        body: "The Sleep Drink. 4 oz milk, 1 oz tart cherry, unsweetened. Any A2 or whole milk works. This is the melatonin + casein one-two punch.",
        url: "/home#item-drink",
        tag: "biokids-winddown-2",
      },
      {
        title: "Step 3: Epsom bath + book in bed",
        body: "Warm bath, 20 min. Magnesium lotion on feet. Then read together until they're drowsy. You're doing great — even one of these steps tonight matters.",
        url: "/home#item-rtn",
        tag: "biokids-winddown-3",
      },
    ],
  },

  // ── 8 PM ET ── Bedtime
  {
    name: 'bedtime',
    utcHour: 0,
    messages: [
      {
        title: "Dark room, cool air",
        body: "65°F if you can. Blackout curtains. Tape any LEDs. Nose breathing. Everything today builds to this moment. You showed up — that's what matters.",
        url: "/home#item-dark",
        tag: "biokids-bedtime",
      },
      {
        title: "Growth is happening",
        body: "The casein is slow-releasing. The glycine is lowering core temp. The melatonin is firing. You did the hard part. Sleep does the rest.",
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

    if (slot.sendAll) {
      // Full protocol — send every message in order so parents don't miss a step
      const results = [];
      for (const message of slot.messages) {
        const result = await sendPushToAll(message);
        results.push({ title: message.title, ...result });
      }
      return NextResponse.json({
        success: true,
        slot: slot.name,
        slotSource,
        mode: 'full-protocol',
        messagesSent: results.length,
        results,
      });
    } else {
      // Rotation — pick one random variant (for slots with alternatives, not steps)
      const message = slot.messages[Math.floor(Math.random() * slot.messages.length)];
      const result = await sendPushToAll(message);
      return NextResponse.json({
        success: true,
        slot: slot.name,
        slotSource,
        mode: 'rotation',
        message: message.title,
        ...result,
      });
    }
  } catch (err) {
    console.error('Cron notify error:', err);
    return NextResponse.json(
      { error: 'Failed to send notifications', details: String(err) },
      { status: 500 }
    );
  }
}
