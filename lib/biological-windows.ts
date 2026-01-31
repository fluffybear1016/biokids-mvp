export type WindowStatus = 'open' | 'closing' | 'closed';

export interface BiologicalWindow {
  id: string;
  name: string;
  status: WindowStatus;
  percentageDeveloped: number;
  description: string;
}

// Age thresholds for each biological window
const WINDOW_THRESHOLDS = {
  growthPlates: { openEnd: 12, closingEnd: 16, maxAge: 18 },
  ghProduction: { openEnd: 10, closingEnd: 14, maxAge: 18 },
  brainPruning: { openEnd: 8, closingEnd: 12, maxAge: 16 },
  languageWindow: { openEnd: 6, closingEnd: 10, maxAge: 12 },
  motorCortex: { openEnd: 10, closingEnd: 14, maxAge: 18 },
};

function calculateWindowStatus(
  ageYears: number,
  thresholds: { openEnd: number; closingEnd: number; maxAge: number }
): { status: WindowStatus; percentageDeveloped: number } {
  if (ageYears < thresholds.openEnd) {
    // Window is fully open
    const percentageDeveloped = Math.round((ageYears / thresholds.maxAge) * 100);
    return { status: 'open', percentageDeveloped: Math.min(percentageDeveloped, 30) };
  } else if (ageYears < thresholds.closingEnd) {
    // Window is closing
    const progress = (ageYears - thresholds.openEnd) / (thresholds.closingEnd - thresholds.openEnd);
    const percentageDeveloped = 30 + Math.round(progress * 40);
    return { status: 'closing', percentageDeveloped };
  } else if (ageYears < thresholds.maxAge) {
    // Window nearly closed
    const progress = (ageYears - thresholds.closingEnd) / (thresholds.maxAge - thresholds.closingEnd);
    const percentageDeveloped = 70 + Math.round(progress * 25);
    return { status: 'closing', percentageDeveloped };
  } else {
    // Window closed
    return { status: 'closed', percentageDeveloped: 95 };
  }
}

export function getAgeFromBirthDate(birthDate: string): { years: number; months: number; totalMonths: number } {
  const birth = new Date(birthDate);
  const now = new Date();
  const totalMonths = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  return { years, months, totalMonths };
}

export function formatRemainingTime(birthDate: string): string {
  const { years } = getAgeFromBirthDate(birthDate);
  const remainingYears = Math.max(0, 18 - years);
  const remainingMonths = Math.max(0, (18 * 12) - getAgeFromBirthDate(birthDate).totalMonths);

  if (remainingYears > 0) {
    return `${remainingYears} years, ${remainingMonths % 12} months remaining`;
  }
  return 'Growth windows have closed';
}

export function getBiologicalWindows(birthDate: string): BiologicalWindow[] {
  const { years } = getAgeFromBirthDate(birthDate);

  const windows: Array<{ id: string; name: string; thresholdKey: keyof typeof WINDOW_THRESHOLDS }> = [
    { id: 'growthPlates', name: 'Growth Plates', thresholdKey: 'growthPlates' },
    { id: 'ghProduction', name: 'GH Production', thresholdKey: 'ghProduction' },
    { id: 'brainPruning', name: 'Brain Pruning', thresholdKey: 'brainPruning' },
    { id: 'languageWindow', name: 'Language Window', thresholdKey: 'languageWindow' },
    { id: 'motorCortex', name: 'Motor Cortex', thresholdKey: 'motorCortex' },
  ];

  return windows.map(w => {
    const thresholds = WINDOW_THRESHOLDS[w.thresholdKey];
    const { status, percentageDeveloped } = calculateWindowStatus(years, thresholds);

    let description = '';
    if (status === 'open') {
      description = `${100 - percentageDeveloped}% of peak capacity`;
    } else if (status === 'closing') {
      description = `${percentageDeveloped}% developed`;
    } else {
      description = `${percentageDeveloped}% developed`;
    }

    return {
      id: w.id,
      name: w.name,
      status,
      percentageDeveloped,
      description,
    };
  });
}

export function getStatusBadgeClass(status: WindowStatus): string {
  switch (status) {
    case 'open':
      return 'bg-green-100 text-green-800';
    case 'closing':
      return 'bg-amber-100 text-amber-800';
    case 'closed':
      return 'bg-gray-100 text-gray-600';
  }
}

export function getProgressBarColor(status: WindowStatus): string {
  switch (status) {
    case 'open':
      return 'bg-green-500';
    case 'closing':
      return 'bg-amber-500';
    case 'closed':
      return 'bg-gray-400';
  }
}
