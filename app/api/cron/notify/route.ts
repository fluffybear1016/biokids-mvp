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
  // Ive: one material per step. No menus. No alternatives in the title.
  // Each notification should feel like one small, effortless thing.
  // Step 1: Claire de Lune + sunlight (sets the circadian clock)
  // Step 2: A glass of A2 milk (dairy serving #1 — that's it)
  // Step 3: Eggs + cod liver oil
  {
    name: 'morning',
    utcHour: 11,
    sendAll: true,
    messages: [
      {
        title: "Claire de Lune + stretch + sunlight",
        body: "Play Claire de Lune. Gentle stretch. Then 10 minutes outside — even the porch counts. This sets tonight's sleep clock.",
        url: "/home#item-music-am",
        tag: "biokids-morning-1",
      },
      {
        title: "A glass of cold A2 milk",
        body: "Dairy serving #1. Cold A2 milk, drizzle of honey. That's it. Why A2 specifically? Tap to see.",
        url: "/home#item-d1",
        tag: "biokids-morning-2",
      },
      {
        title: "Sunny side up eggs + cod liver oil",
        body: "2–3 eggs. Half a spoon of CLO hidden in a berry smoothie — they won't taste it. Skip CLO on liver days. There's a reason we say sunny side up.",
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

  // ── 12 PM ET ── Lunch (rotation — these are alternatives, not steps)
  // Ive: the title is the ingredient. The body ends with a thread.
  {
    name: 'lunch',
    utcHour: 16,
    messages: [
      {
        title: "Beef liver meatballs",
        body: "2 tbsp liver mixed into ground beef. They'll never know. Red bell pepper alongside. One bite of this has more growth fuel than a month of vitamins.",
        url: "/home#item-lunch",
        tag: "biokids-lunch",
      },
      {
        title: "Two spoonfuls of sauerkraut",
        body: "Alongside whatever protein you're serving. Just two spoonfuls. It produces something called GABA — tap to see what that does.",
        url: "/home#item-lunch",
        tag: "biokids-lunch",
      },
      {
        title: "Lentils + pumpkin seeds",
        body: "Lentils in soup or as a side. Pumpkin seeds sprinkled on top. Broccoli alongside. This combination was in an actual growth trial.",
        url: "/home#item-lunch",
        tag: "biokids-lunch",
      },
    ],
  },

  // ── 3 PM ET ── Exercise (rotation)
  // Ive: the action is singular. Outside is the real product.
  {
    name: 'exercise',
    utcHour: 19,
    messages: [
      {
        title: "Six 30-second sprints",
        body: "Backyard, park, hill — anywhere. All out, 30 seconds, six times. Then hang from something for 20 seconds. This triggers the biggest growth signal of the day.",
        url: "/home#item-spr",
        tag: "biokids-exercise",
      },
      {
        title: "50 jumps + a dead hang",
        body: "Jump rope, drop jumps, just jumping. Then hang from anything — monkey bars, a door frame. Why hanging? Tap to see.",
        url: "/home#item-jump",
        tag: "biokids-exercise",
      },
    ],
  },

  // ── 4 PM ET ── Post-exercise dairy
  // Ive: one instruction. The science hides behind the tap.
  {
    name: 'post-exercise',
    utcHour: 20,
    messages: [
      {
        title: "Cold A2 milk, one spoon of honey",
        body: "Dairy serving #2. Within 30 minutes of activity. Without this step, today's sprint is wasted. There's a 30-minute window — here's why.",
        url: "/home#item-pm",
        tag: "biokids-dairy-2",
      },
    ],
  },

  // ── 5 PM ET ── Dinner (FULL PROTOCOL — sends all 3 in order)
  // Ive: no "Step 1/2/3" labels. The sequence is the order they arrive.
  {
    name: 'dinner',
    utcHour: 21,
    sendAll: true,
    messages: [
      {
        title: "A warm mug of bone broth",
        body: "Start dinner with this. Store-bought is fine. One amino acid in here does three things at once tonight — tap to see which one.",
        url: "/home#item-din",
        tag: "biokids-dinner-1",
      },
      {
        title: "Cooked vegetables — no salads tonight",
        body: "Spinach, broccoli, carrots, Brussels sprouts — whatever you have, cooked. There's a reason we say no raw salads at dinner.",
        url: "/home#item-din",
        tag: "biokids-dinner-2",
      },
      {
        title: "Gelatin jello for dessert",
        body: "Bovine gelatin + tart cherry juice + monk fruit. Set it now. They'll think it's regular jello. It's building growth plates.",
        url: "/home#item-gly",
        tag: "biokids-dinner-3",
      },
    ],
  },

  // ── 7 PM ET ── Wind-down (FULL PROTOCOL — sends all 3 in order)
  // Ive: each notification is one quiet action. No checklists.
  {
    name: 'wind-down',
    utcHour: 23,
    sendAll: true,
    messages: [
      {
        title: "Chopin Nocturnes on",
        body: "Screens off. Music on. The pace changes now. This becomes a sleep trigger — their brain will learn to wind down when it hears this.",
        url: "/home#item-music-pm",
        tag: "biokids-winddown-1",
      },
      {
        title: "Tart cherry + A2 milk",
        body: "4 oz milk, 1 oz tart cherry juice, unsweetened. This is the highest food source of melatonin on earth. Tap to see how it works with tonight's sleep.",
        url: "/home#item-drink",
        tag: "biokids-winddown-2",
      },
      {
        title: "Epsom bath, then a book in bed",
        body: "Warm bath, 20 min. Magnesium lotion on their feet. Then read together until they're drowsy. Even one of these steps tonight matters.",
        url: "/home#item-rtn",
        tag: "biokids-winddown-3",
      },
    ],
  },

  // ── 8 PM ET ── Bedtime
  // Ive: the product disappears. Just reassurance.
  {
    name: 'bedtime',
    utcHour: 0,
    messages: [
      {
        title: "65°F, dark, quiet",
        body: "Blackout curtains. Tape any LEDs. Nose breathing. Everything today was building to this moment.",
        url: "/home#item-dark",
        tag: "biokids-bedtime",
      },
      {
        title: "Growth is happening right now",
        body: "The casein is slow-releasing. The glycine is lowering core temp. The melatonin is firing. Sleep does the rest. You showed up today.",
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
  // Ive: each tip is one ingredient, one surprising fact, one thread to pull.
  const tips = [
    {
      title: "Sheep yogurt",
      body: "35× more lactoferrin than cow milk. Most parents have never heard of lactoferrin. Tap to see why it matters.",
      url: "/home#item-d1",
      tag: "biokids-weekly",
    },
    {
      title: "Broccoli sprouts",
      body: "100× more sulforaphane than regular broccoli. A small handful in a smoothie after junk food. Here's what sulforaphane actually does.",
      url: "/home#item-junk",
      tag: "biokids-weekly",
    },
    {
      title: "Bovine gelatin",
      body: "Your kids think it's jello. It's pure glycine — the amino acid that does three things at once while they sleep.",
      url: "/home#item-gly",
      tag: "biokids-weekly",
    },
    {
      title: "Tart cherry juice",
      body: "The highest food source of melatonin on earth. Not a supplement — a juice. Here's how 1 oz changes tonight's sleep.",
      url: "/home#item-drink",
      tag: "biokids-weekly",
    },
    {
      title: "Cod liver oil",
      body: "Three growth levers in one spoon. Hidden in a berry smoothie, they'll never taste it. Here's what those three levers are.",
      url: "/home#item-clo",
      tag: "biokids-weekly",
    },
    {
      title: "Sauerkraut",
      body: "Two spoonfuls. That's all it takes. Fermentation produces something called GABA. Tap to see what GABA does to growth hormone.",
      url: "/home#item-lunch",
      tag: "biokids-weekly",
    },
    {
      title: "Epsom salt baths",
      body: "A warm bath 60 min before bed. The trick isn't the warming — it's what happens after. Tap to see the cooling effect.",
      url: "/home#item-bath",
      tag: "biokids-weekly",
    },
    {
      title: "Pistachios",
      body: "The highest melatonin per gram of any nut. Better than any supplement. The perfect evening snack — and here's why evening specifically.",
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
