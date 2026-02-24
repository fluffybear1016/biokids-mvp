'use client';

import { useState, useEffect } from 'react';

interface GoalProgressProps {
  goal: 'concerned' | 'foundation' | 'elite';
  completedCount: number;
  totalCount: number;
  childName: string;
}

const goalConfig = {
  concerned: {
    title: 'Growth Support',
    icon: '💙',
    color: 'text-sky-600',
    bgColor: 'bg-sky-100',
    targetPercent: 70,
    getMessage: (percent: number) => {
      if (percent === 0) return "Start with one thing today — small steps add up.";
      if (percent < 40) return "You're taking action. That's what matters most.";
      if (percent < 70) return "Great progress! Every item helps.";
      if (percent < 90) return "Strong commitment showing!";
      return "Amazing dedication! You're doing everything you can.";
    }
  },
  foundation: {
    title: 'Healthy Foundation',
    icon: '🌿',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100',
    targetPercent: 50,
    getMessage: (percent: number) => {
      if (percent < 30) return "Focus on the basics today — every bit helps.";
      if (percent < 50) return "You're building momentum!";
      if (percent < 75) return "Solid progress! The foundation is forming.";
      return "Wonderful! You're giving your child a great foundation.";
    }
  },
  elite: {
    title: 'Maximum Potential',
    icon: '🏆',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    targetPercent: 95,
    getMessage: (percent: number) => {
      if (percent < 50) return "Every rep counts toward the goal.";
      if (percent < 75) return "Building champion habits!";
      if (percent < 95) return "Strong day — almost at 100%!";
      return "Elite performance! Nothing left on the table.";
    }
  }
};

export default function GoalProgress({ goal, completedCount, totalCount, childName }: GoalProgressProps) {
  const config = goalConfig[goal];
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const message = config.getMessage(percent);
  const onTrack = percent >= config.targetPercent;

  return (
    <div className="bg-white rounded-xl border border-stone-200 p-4" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {/* Goal Badge */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={`${config.bgColor} ${config.color} px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1`}>
            <span>{config.icon}</span>
            <span>{config.title}</span>
          </span>
        </div>
        <span className="text-xs text-stone-400">{childName}'s daily rhythm</span>
      </div>

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-stone-600">{completedCount} of {totalCount} today</span>
          <span className={`font-medium ${onTrack ? 'text-emerald-600' : 'text-stone-500'}`}>
            {percent}%
          </span>
        </div>
        <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-500 ${
              percent >= 90 ? 'bg-emerald-500' :
              percent >= 70 ? 'bg-emerald-400' :
              percent >= 50 ? 'bg-amber-400' :
              'bg-stone-300'
            }`}
            style={{ width: `${percent}%` }}
          />
        </div>
        {config.targetPercent > 0 && (
          <div className="relative h-0">
            <div 
              className="absolute -top-2 w-0.5 h-2 bg-stone-400"
              style={{ left: `${config.targetPercent}%` }}
            />
          </div>
        )}
      </div>

      {/* Supportive Message */}
      <p className="text-sm text-stone-600">
        {message}
      </p>

      {/* Gentle Encouragement (not guilt) */}
      {percent < config.targetPercent && percent > 0 && (
        <p className="text-xs text-stone-400 mt-2">
          Your target: {config.targetPercent}% • No worries if today's different — tomorrow's a new day.
        </p>
      )}
    </div>
  );
}

// Completion Celebration Component
export function CompletionCelebration({ goal, percent }: { goal: string, percent: number }) {
  const celebrations = {
    concerned: [
      { threshold: 1, message: "You showed up today 💙", subtext: "That's the most important step." },
      { threshold: 50, message: "Halfway there! 💪", subtext: "Your dedication is inspiring." },
      { threshold: 70, message: "Target reached! 🌟", subtext: "You're giving your child every advantage." },
      { threshold: 100, message: "Everything done! ✨", subtext: "Incredible commitment to your child's growth." },
    ],
    foundation: [
      { threshold: 50, message: "Solid foundation! 🌿", subtext: "The basics are covered." },
      { threshold: 75, message: "Strong day! 💪", subtext: "Your consistency is showing." },
      { threshold: 100, message: "Perfect foundation! 🎉", subtext: "Every building block in place." },
    ],
    elite: [
      { threshold: 85, message: "Elite effort! 🏆", subtext: "Champion habits forming." },
      { threshold: 95, message: "Almost perfect! 🥇", subtext: "D1 caliber commitment." },
      { threshold: 100, message: "Perfect execution! 🏆✨", subtext: "Nothing left on the table." },
    ],
  };

  const goalCelebrations = celebrations[goal as keyof typeof celebrations] || celebrations.foundation;
  const celebration = [...goalCelebrations].reverse().find(c => percent >= c.threshold);

  if (!celebration) return null;

  return (
    <div className="text-center py-4">
      <p className="text-lg font-semibold text-stone-900">{celebration.message}</p>
      <p className="text-sm text-stone-500">{celebration.subtext}</p>
    </div>
  );
}
