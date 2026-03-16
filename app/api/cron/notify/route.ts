import { NextResponse } from 'next/server';
import { sendPushToAll, PushPayload } from '@/lib/push';

// ═══════════════════════════════════════════════════════════
// BIOKIDS NOTIFICATION SYSTEM — Big 5 Architecture
// ═══════════════════════════════════════════════════════════
//
// Rebuilt around the Big 5 — the 5 things that actually
// move the needle. Everything else lives in the app.
// Parents won't open the app every day. The push notification
// IS the product. So it has to be signal, not noise.
//
// Schedule (all times ET / UTC):
//   7:00 AM /  11 UTC — Dairy #1 + CLO (Big 5: items 1 & 2)
//  12:00 PM /  16 UTC — Protein target + rotation (Big 5: item 3)
//   3:00 PM /  19 UTC — The Sprint Stack (Big 5: item 4)
//   8:00 PM /   0 UTC — Sleep (Big 5: item 5)
//
// Weekly (Sunday only):
//  10:00 AM /  14 UTC — Weekly pro tip (earns trust, drives re-engagement)
//
// TONE: One clear action. No menus. The parent should think
// "oh right, that's the one thing I need to do right now."
//
// ═══════════════════════════════════════════════════════════

type NotificationSlot = {
  name: string;
  utcHour: number;
  weekdayOnly?: boolean;
  sundayOnly?: boolean;
  sendAll?: boolean;
  messages: PushPayload[];
};

// ── Design philosophy (Ive) ──
// 4 notifications per day. Each one is a Big 5 action.
// Name the material. Be specific. One thing per notification.
// The parent should never feel overwhelmed — just reminded
// of the one thing that matters right now.

// ── Protein math ──
// Target: 1.2–1.5 g protein per kg body weight
// In pounds: ~0.55–0.68 g per pound
// 60 lb kid → 33–41 g/day
// 80 lb kid → 44–54 g/day
// 100 lb kid → 55–68 g/day

// ── Day-of-week helpers ──
function getDayOfWeek(): number {
  // Approximate ET from UTC (good enough for rotation logic)
  const now = new Date();
  const etOffset = now.getUTCMonth() >= 2 && now.getUTCMonth() <= 10 ? -4 : -5;
  const etHour = now.getUTCHours() + etOffset;
  // If ET hour rolled back to previous day
  if (etHour < 0) {
    const yesterday = new Date(now);
    yesterday.setUTCDate(yesterday.getUTCDate() - 1);
    return yesterday.getUTCDay();
  }
  return now.getUTCDay(); // 0=Sun, 1=Mon, ... 6=Sat
}

function isSprintDay(): boolean {
  // Mon, Wed, Fri, Sun = sprint days
  const day = getDayOfWeek();
  return [0, 1, 3, 5].includes(day);
}

function isLiverDay(): boolean {
  // Mon, Wed, Fri = liver meatball days (2-3x/week)
  const day = getDayOfWeek();
  return [1, 3, 5].includes(day);
}

const SLOTS: NotificationSlot[] = [
  // ══════════════════════════════════════════════════════════
  // BIG 5 #1 & #2 — 7 AM ET — Dairy serving #1 + CLO
  // ══════════════════════════════════════════════════════════
  // One notification. Two actions. Both take 60 seconds.
  {
    name: 'morning',
    utcHour: 11,
    messages: [
      {
        title: "A2 milk + lemon CLO",
        body: "Dairy serving #1: cold A2 milk with honey, yogurt bowl, or smoothie — pick one. Then half a spoon of lemon cod liver oil (hidden in the smoothie works). Skip CLO on liver days.",
        url: "/home#item-d1",
        tag: "biokids-morning",
      },
    ],
  },

  // ── 10 AM ET (Sunday only) ── Weekly Pro Tip
  {
    name: 'weekly-tip',
    utcHour: 14,
    sundayOnly: true,
    messages: getWeeklyMessages(),
  },

  // ══════════════════════════════════════════════════════════
  // BIG 5 #3 — 12 PM ET — Protein target + rotation
  // ══════════════════════════════════════════════════════════
  // Liver meatball days: Mon/Wed/Fri
  // Other days: rotate through protein options
  // Always include the daily target math
  {
    name: 'protein',
    utcHour: 16,
    messages: getProteinMessage(),
  },

  // ══════════════════════════════════════════════════════════
  // BIG 5 #4 — 3 PM ET — The Sprint Stack
  // ══════════════════════════════════════════════════════════
  // The full sequence: snack → activity → stretch → cold milk
  // Sprint days alternate with jump days
  {
    name: 'sprint-stack',
    utcHour: 19,
    messages: getSprintStackMessage(),
  },

  // ══════════════════════════════════════════════════════════
  // BIG 5 #5 — 8 PM ET — Sleep
  // ══════════════════════════════════════════════════════════
  // 10+ hours in complete darkness. This is when 60-80% of
  // growth hormone is released. Non-negotiable.
  {
    name: 'sleep',
    utcHour: 0,
    messages: [
      {
        title: "10+ hours of complete darkness",
        body: "Blackout curtains. Tape every LED. This is when 60–80% of growth hormone is released. Everything today — the milk, the protein, the sprints — was building to this moment. You showed up today.",
        url: "/home#item-dark",
        tag: "biokids-sleep",
      },
    ],
  },
];

// ── Protein rotation ──
// On liver days (Mon/Wed/Fri): liver meatballs
// Other days: rotate through proteins with the daily target
function getProteinMessage(): PushPayload[] {
  if (isLiverDay()) {
    return [
      {
        title: "Liver meatballs today",
        body: "2 tbsp beef or chicken liver mixed into ground beef — they won't taste it. The single most nutrient-dense food on earth. Daily target: ~0.6 g protein per pound of body weight (80 lb kid = 48 g). Rotate proteins across the week.",
        url: "/home#item-lunch",
        tag: "biokids-protein",
      },
    ];
  }

  // Non-liver days: rotate through other proteins
  const day = getDayOfWeek();
  const rotations: PushPayload[] = [
    // Sunday
    {
      title: "Chicken thighs + vegetables today",
      body: "Dark meat has more zinc and iron than breast. Roasted with broccoli, carrots, bell peppers. Daily target: ~0.6 g protein per pound of body weight (80 lb kid = 48 g). Add a spoonful of sauerkraut on the side.",
      url: "/home#item-lunch",
      tag: "biokids-protein",
    },
    // Monday (liver day — won't reach here)
    {
      title: "Liver meatballs today",
      body: "2 tbsp liver mixed into ground beef — they won't taste it.",
      url: "/home#item-lunch",
      tag: "biokids-protein",
    },
    // Tuesday
    {
      title: "Wild salmon + sweet potato today",
      body: "Omega-3s from a whole food, not a pill. Baked or pan-seared with sweet potato and spinach. Daily target: ~0.6 g protein per pound of body weight (80 lb kid = 48 g). Fish days = brain days.",
      url: "/home#item-lunch",
      tag: "biokids-protein",
    },
    // Wednesday (liver day — won't reach here)
    {
      title: "Liver meatballs today",
      body: "2 tbsp liver mixed into ground beef — they won't taste it.",
      url: "/home#item-lunch",
      tag: "biokids-protein",
    },
    // Thursday
    {
      title: "Eggs + ground beef today",
      body: "3 eggs any style + ground beef with roasted vegetables. Simple, fast, protein-dense. Daily target: ~0.6 g protein per pound of body weight (80 lb kid = 48 g). Eggs alone = 18 g. Ground beef patty = 22 g. You're already there.",
      url: "/home#item-lunch",
      tag: "biokids-protein",
    },
    // Friday (liver day — won't reach here)
    {
      title: "Liver meatballs today",
      body: "2 tbsp liver mixed into ground beef — they won't taste it.",
      url: "/home#item-lunch",
      tag: "biokids-protein",
    },
    // Saturday
    {
      title: "Whole chicken or steak today",
      body: "Weekend cooking day. Roast a whole chicken (use bones for broth later) or grill steak with roasted Brussels sprouts. Daily target: ~0.6 g protein per pound of body weight (80 lb kid = 48 g). Leftovers = tomorrow's lunch.",
      url: "/home#item-lunch",
      tag: "biokids-protein",
    },
  ];

  return [rotations[day]];
}

// ── Sprint Stack ──
// Alternates sprint days and jump days
// Always includes: explicit snack → activity → stretch → post-sprint milk
function getSprintStackMessage(): PushPayload[] {
  if (isSprintDay()) {
    return [
      {
        title: "Sprint Stack — snack first",
        body: "Step 1: Peanut butter on toast or a liver meatball + an egg (niacin + choline fuel the sprint). Step 2: Six 30-second all-out sprints, full rest between. Step 3: Stretch. Step 4: Cold A2 milk with honey within 30 min. That sequence is the most powerful growth trigger in the protocol.",
        url: "/home#item-spr",
        tag: "biokids-sprint-stack",
      },
    ];
  }

  // Jump day
  return [
    {
      title: "Jump Stack — snack first",
      body: "Step 1: Peanut butter on toast or a liver meatball + an egg (niacin + choline load the spring). Step 2: 50 jumps — jump rope, box jumps, just jumping. Step 3: Stretch. Step 4: Cold A2 milk with honey within 30 min. Alternate with sprints tomorrow.",
      url: "/home#item-jump",
      tag: "biokids-sprint-stack",
    },
  ];
}

// ── Weekly Pro Tips ──
// Rotates by week number. The deeper-cut knowledge that earns trust
// and re-engagement. These are the "I've never heard that before" moments.
function getWeeklyMessages(): PushPayload[] {
  const tips = [
    {
      title: "Sheep yogurt",
      body: "35× more lactoferrin than cow milk. Most parents have never heard of lactoferrin. Tap to see why it matters for growth.",
      url: "/home#item-d1",
      tag: "biokids-weekly",
    },
    {
      title: "Bovine gelatin",
      body: "Your kids think it's jello. It's pure glycine — the amino acid that builds growth plates while they sleep. 5 ways to serve it daily.",
      url: "/home#item-gly",
      tag: "biokids-weekly",
    },
    {
      title: "Tart cherry juice",
      body: "The highest food source of melatonin on earth. Not a supplement — a juice. 1 oz in their evening milk changes tonight's sleep.",
      url: "/home#item-drink",
      tag: "biokids-weekly",
    },
    {
      title: "Lemon cod liver oil",
      body: "Three growth levers in one spoon: vitamin A, vitamin D, omega-3. Hidden in a berry smoothie, they'll never taste it.",
      url: "/home#item-clo",
      tag: "biokids-weekly",
    },
    {
      title: "The 30-minute window",
      body: "Cold milk with honey within 30 minutes of sprints. Miss this window and the growth signal fades. Here's the science behind the timing.",
      url: "/home#item-pm",
      tag: "biokids-weekly",
    },
    {
      title: "Protein math",
      body: "0.55–0.68 g per pound of body weight, every day. An 80 lb kid needs 44–54 g. Two eggs (12 g) + a glass of A2 milk (8 g) + a chicken thigh (26 g) = you're there.",
      url: "/home#item-lunch",
      tag: "biokids-weekly",
    },
    {
      title: "Sauerkraut — two spoonfuls",
      body: "Fermentation produces GABA. GABA stimulates growth hormone release during sleep. Two spoonfuls alongside any protein. That's it.",
      url: "/home#item-lunch",
      tag: "biokids-weekly",
    },
    {
      title: "Pistachios before bed",
      body: "The highest melatonin per gram of any nut. Better than any supplement. A handful as an evening snack — here's why evening specifically.",
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

  const matching = SLOTS.filter(slot => {
    if (slot.utcHour !== utcHour) return false;
    if (slot.sundayOnly && utcDay !== 0) return false;
    return true;
  });

  if (matching.length === 0) return null;
  return matching[0];
}

// Verify this is a legitimate cron request (fail-closed: deny if no secret configured)
function verifyCron(request: Request): boolean {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    return false;
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
