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
  // BIG 5 #1 & #2 — 7 AM ET — Dairy serving #1 + CLO
  // ══════════════════════════════════════════════════════════
  // One notification. Two actions. Both take 60 seconds.
  {
    name: 'morning',
    utcHour: 11,
    messages: [
      {
        title: "A2 milk + lemon CLO",
        body: "Dairy serving #1: cold A2 milk with honey, yogurt bowl, or smoothie — pick one. Then half a spoon of lemon cod liver oil (hidden in the smoothie works). Skip CLO on liver days. Serving #2 when they get home from school. Kids 10+: add a 3rd serving (e.g. post-sprint milk).",
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
  // BIG 5 #3 — 12 PM ET — Protein target + power foods
  // ══════════════════════════════════════════════════════════
  // List ALL the growth proteins. Give the g/lb target.
  // Don't prescribe days — let parents rotate freely.
  {
    name: 'protein',
    utcHour: 16,
    messages: [
      {
        title: "Protein check — 0.6 g per pound",
        body: "Daily target: ~0.6 g per lb body weight (80 lb = 48 g, 100 lb = 60 g). The growth proteins — rotate these: liver meatballs (beef or chicken liver, 2–3×/wk), beef, chicken, turkey, wild salmon, eggs, oysters (1×/wk = full week of zinc), lentils. Cooked vegetables + a fermented side (sauerkraut, kimchi). No dairy at lunch — save it for the sprint stack.",
        url: "/home#item-lunch",
        tag: "biokids-protein",
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
        title: "Sprint Stack — snack first",
        body: "Snack: peanut butter + egg (niacin + choline) or a liver meatball (has both). Then 6 all-out 30-sec sprints, full rest between. Stretch. Cold A2 milk with honey within 30 min — dairy serving #2 (for kids 10+, this is #3). That sequence is the most powerful growth trigger in the protocol.",
        url: "/home#item-spr",
        tag: "biokids-sprint-stack",
      },
    ];
  }

  // Jump day
  return [
    {
      title: "Jump Stack — snack first",
      body: "Snack: peanut butter + egg (niacin + choline) or a liver meatball (has both). Then 50 jumps — rope, box, just jumping. Stretch. Cold A2 milk with honey within 30 min — dairy serving #2 (for kids 10+, this is #3). Alternate with sprints tomorrow.",
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
