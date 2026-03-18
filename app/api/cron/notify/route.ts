import { NextResponse } from 'next/server';
import { sendPushToAll, PushPayload } from '@/lib/push';

// ═══════════════════════════════════════════════════════════
// BIOKIDS NOTIFICATION SYSTEM — Big 7 Architecture
// ═══════════════════════════════════════════════════════════
//
// 6 daily notifications + 1 weekly. Each one is a single
// clear action. The parent should never feel overwhelmed —
// just reminded of the one thing that matters right now.
//
// Schedule (all times ET / UTC):
//   7:00 AM /  11 UTC — Breakfast + Dairy #1 + CLO (skip cereal)
//  12:00 PM /  16 UTC — Lunch: growth proteins + fermented side + protein check
//   3:00 PM /  19 UTC — Sprint/Jump Stack + Dairy #2
//   6:00 PM /  22 UTC — Dinner + gelatin (no exercise after this)
//   7:00 PM /  23 UTC — Bedtime sequence (earlier = more growth reps, 8 PM cutoff)
//
// Weekly (Sunday only):
//  10:00 AM /  14 UTC — Weekly pro tip
//
// TONE: Jony Ive. One clear action. The parent sees this on
// her lock screen and knows exactly what to do right now.
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
// 6 notifications per day. Each one is a single action.
// Name the material. Be specific. One thing per notification.
// A mom should glance at her lock screen and know what to do.

// ── Protein math ──
// Target: 1.2–1.5 g protein per kg body weight
// In pounds: ~0.55–0.68 g per pound
// 60 lb kid → 33–41 g/day
// 80 lb kid → 44–54 g/day
// 100 lb kid → 55–68 g/day

// ── Day-of-week helper ──
function isSprintDay(): boolean {
  const now = new Date();
  const etOffset = now.getUTCMonth() >= 2 && now.getUTCMonth() <= 10 ? -4 : -5;
  const etHour = now.getUTCHours() + etOffset;
  let day = now.getUTCDay();
  if (etHour < 0) {
    const yesterday = new Date(now);
    yesterday.setUTCDate(yesterday.getUTCDate() - 1);
    day = yesterday.getUTCDay();
  }
  // Alternate days: Mon, Wed, Fri, Sun = sprint; Tue, Thu, Sat = jump
  return [0, 1, 3, 5].includes(day);
}

const SLOTS: NotificationSlot[] = [
  // ══════════════════════════════════════════════════════════
  // 7 AM ET — Breakfast + Dairy #1 + CLO
  // ══════════════════════════════════════════════════════════
  // No cereal, no juice boxes, no refined sugar (suppresses
  // up to 80% of GH). Eggs + red bell pepper for choline +
  // iron absorption. Dairy #1. CLO for receptor fuel.
  {
    name: 'morning',
    utcHour: 11,
    messages: [
      {
        title: "Breakfast + Dairy Serving #1 + CLO",
        body: "No cereal, no juice boxes — they suppress up to 80% of growth hormone. Eggs with red bell pepper (choline primes the growth axis + 2–3× iron absorption). Dairy Serving #1: cold A2 milk with honey, a yogurt bowl, or a smoothie. Half a spoon of lemon CLO (hide it in the smoothie). No liver on CLO days.",
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
  // 12 PM ET — Lunch: growth proteins + fermented side
  // ══════════════════════════════════════════════════════════
  // This is where the fermented side goes (not dinner).
  // Protein check built in. No dairy at lunch.
  {
    name: 'lunch',
    utcHour: 16,
    messages: [
      {
        title: "Lunch — growth protein + fermented side",
        body: "Rotate the growth proteins: liver meatballs (2–3×/wk), beef, chicken, turkey, wild salmon, eggs, oysters (1×/wk = full week of zinc), lentils. Cooked veg + a fermented side — sauerkraut or kimchi (GABA for tonight's GH release). No dairy at lunch — save it for the sprint stack. Protein check: ~0.6 g per lb (80 lb = 48 g, 100 lb = 60 g).",
        url: "/home#item-lunch",
        tag: "biokids-lunch",
      },
    ],
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
  // 6 PM ET — Dinner + Gelatin (no exercise after this)
  // ══════════════════════════════════════════════════════════
  // Protein + lentils + veg. No ferments here (those are lunch).
  // Gelatin as bone broth, jello, gummies, or homemade ice cream.
  // No dairy. Screens off. Kitchen closes 2-3 hrs before bed.
  {
    name: 'dinner',
    utcHour: 22,
    messages: [
      {
        title: "Growth dinner + gelatin — screens off after this",
        body: "Rotated protein + lentils + cooked vegetables. No dairy — save it for the bedtime drink. Gelatin in any form: bone broth, jello, gummies, or homemade ice cream. It's glycine — builds growth plates + lowers core temp. No exercise after dinner. Screens off. Kitchen closes 2–3 hours before bed — insulin must clear for tonight's GH surge.",
        url: "/home#item-lunch",
        tag: "biokids-dinner",
      },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // 7 PM ET — Bedtime sequence (earlier = more growth reps)
  // ══════════════════════════════════════════════════════════
  // Start as early as you can. 8 PM lights out is the latest.
  // Every hour earlier = another 90-min growth cycle gained.
  {
    name: 'bedtime',
    utcHour: 23,
    messages: [
      {
        title: "Bedtime sequence — the earlier you start, the more growth reps tonight",
        body: "Tart cherry and/or A2 milk now (4 oz milk, 1 oz cherry, unsweetened — 60–90 min before lights out). Magnesium lotion on their feet while they read — two levers at once. Physical book, not a screen. 65°F, fan on. Blackout curtains, tape every LED. Nose breathing only. 8 PM lights out is the latest. Minimum 10 hours sleep. Ages 6+: 12+ hours offers the most gains.",
        url: "/home#item-dark",
        tag: "biokids-bedtime",
      },
    ],
  },
];

// Protein message is now inlined in SLOTS — no rotation logic needed.
// All growth proteins listed every day. Parents rotate freely.

// ── Sprint Stack ──
// Alternates sprint days and jump days
// Snack: peanut butter + egg (niacin + choline) OR a liver meatball (has both)
// Always includes: snack → activity → stretch → cold milk (dairy #2, or #3 for 10+)
function getSprintStackMessage(): PushPayload[] {
  if (isSprintDay()) {
    return [
      {
        title: "Sprint Stack + Dairy Serving #2",
        body: "Snack first: one egg + spoon of peanut butter (niacin + choline) or a liver meatball (has both). Then 6 all-out 30-sec sprints, full rest between. Stretch. Cold A2 milk with honey within 30 min — that's Dairy Serving #2. Kids 10+: this is Serving #3.",
        url: "/home#item-spr",
        tag: "biokids-sprint-stack",
      },
    ];
  }

  // Jump day
  return [
    {
      title: "Jump Stack + Dairy Serving #2",
      body: "Snack first: one egg + spoon of peanut butter (niacin + choline) or a liver meatball (has both). Then 50 jumps — rope, box, just jumping. Stretch. Cold A2 milk with honey within 30 min — that's Dairy Serving #2. Kids 10+: this is Serving #3.",
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
