'use client';

import { useState, useRef, useEffect } from 'react';
import Nav from '@/components/Nav';
import { Child } from '@/lib/supabase';

const mockChild: Child = {
  id: '1',
  user_id: '1',
  name: 'Emma',
  birth_date: '2017-03-15',
  gender: 'female',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

const suggestedQuestions = [
  "Why is 8:30pm bedtime important?",
  "What foods boost growth hormone?",
  "How do sprints help with height?",
  "Is milk before bed good or bad?",
  "What is the insulin-GH connection?",
  "How does morning sunlight help?",
];

export default function Jarvis() {
  const [child] = useState<Child>(mockChild);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hi! I'm Jarvis, your GH optimization assistant. I can answer questions about growth hormone, sleep timing, nutrition, exercise — anything related to helping ${mockChild.name} reach their height potential.\n\nWhat would you like to know?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // TODO: Replace with actual API call to Jarvis backend
    setTimeout(() => {
      const responses: Record<string, string> = {
        'bedtime': `Great question! The 8:30pm bedtime is critical because growth hormone is released in pulses during deep sleep, with **70% of daily GH secretion** occurring in the first 3 hours after sleep onset.\n\nIf ${mockChild.name} falls asleep by 9pm, they'll hit the peak GH window between 10pm-1am when secretion is highest.\n\n**Key insight:** It's not just about total sleep duration — it's about *when* that sleep happens. A child sleeping 9pm-6am will have significantly higher GH output than one sleeping 11pm-8am, even though both get 9 hours.\n\n📚 [Van Cauter E. Sleep. 2000]`,
        'food': `For GH optimization, focus on these **Power Foods**:\n\n🥛 **Raw milk or A2 organic** (2-3 cups daily)\n- Contains IGF-1 precursors and A2 casein\n- The Dutch drink more milk than anyone and are the tallest\n\n🥚 **Pasture-raised eggs** (2-3 daily)\n- Complete amino acid profile for protein synthesis\n\n🐟 **Wild-caught salmon** (2x/week)\n- Omega-3s support GH receptor sensitivity\n\n🍖 **Beef liver** (1x/week)\n- Zinc and vitamin A are essential for GH signaling\n\n🦴 **Bone broth**\n- Glycine and collagen for growth plate support\n\n**Timing matters too:** Avoid food 2-3 hours before bed — insulin suppresses GH release.`,
        'sprint': `Sprints are one of the most powerful GH triggers available!\n\n**The Science:**\nHigh-intensity exercise causes acute GH release up to **771% above baseline** [Stokes KA. Sports Med. 2002]. This is dramatically higher than steady-state cardio.\n\n**The Protocol for ${mockChild.name}:**\n- 6 x 30-second all-out sprints\n- 90 seconds rest between sprints\n- 3x per week (not daily — recovery matters)\n- Best done in afternoon, not close to bedtime\n\n**Why it works:**\nHigh-intensity exercise creates metabolic stress that signals the pituitary to release GH. The effect is intensity-dependent — walking doesn't cut it.\n\n**Alternatives:** Swimming sprints, bike sprints, jump rope intervals, or basketball/soccer with sprint elements.`,
        'milk': `This is a nuanced one! **It depends on timing.**\n\n✅ **Milk 30 minutes before bed = GOOD**\n- Casein protein releases tryptophan slowly over 3-7 hours\n- Tryptophan converts to serotonin → melatonin\n- Supports sleep architecture for GH release\n- [Madziva MT. Nutrients. 2023]\n\n❌ **Milk right at bedtime = NOT IDEAL**\n- Any food close to sleep spikes insulin\n- Insulin directly suppresses GH secretion\n\n**The Sweet Spot:**\nGive ${mockChild.name} 6oz of milk about 30 minutes before the target bedtime. This allows insulin to settle before the GH window opens.\n\n**Best milk:** Raw or A2 organic if available. A2 casein is easier to digest than conventional A1 milk.`,
        'insulin': `The **insulin-GH antagonism** is one of the most important concepts for height optimization.\n\n**How it works:**\n1. When you eat, blood sugar rises\n2. Pancreas releases insulin to clear the sugar\n3. Insulin directly suppresses GH secretion from the pituitary\n4. This suppression lasts 2-3 hours\n\n**The Problem:**\nIf ${mockChild.name} eats within 2-3 hours of sleep, insulin is elevated right when the body should be releasing its biggest GH pulses.\n\n**The Data:**\nEating before bed can blunt nocturnal GH release by up to **80%** [Ho KY. J Clin Endocrinol Metab. 1988]\n\n**The Fix:**\n- Dinner by 6pm for an 8:30pm bedtime\n- If hungry later, small protein-only snack (no carbs/sugar)\n- The bedtime milk protocol (30 min before) is an exception because the tryptophan benefits outweigh the insulin cost`,
        'sunlight': `Morning sunlight is the **master reset button** for the entire GH system!\n\n**The Mechanism:**\n1. Light hits melanopsin receptors in the eye\n2. Signals the SCN (suprachiasmatic nucleus) — the master clock\n3. SCN sets timing for melatonin release ~14 hours later\n4. Melatonin gates GH release during sleep\n\n**Without morning light:**\n- Circadian rhythm drifts\n- Melatonin timing shifts\n- GH pulses become misaligned with sleep\n- Growth optimization suffers\n\n**The Protocol for ${mockChild.name}:**\n- 10-30 minutes of outdoor light within 30 min of waking\n- Cloudy days still work (outdoor light >> indoor light)\n- Don't look directly at sun — peripheral exposure is fine\n- Consistent wake time matters (±30 min)\n\n📚 [Roenneberg T. Curr Biol. 2007]`,
      };

      let response = "I can help with that! Could you be more specific about what aspect of GH optimization you'd like to know about? I'm knowledgeable about sleep timing, nutrition, exercise protocols, and the science behind growth hormone.";
      
      const lowerInput = userMessage.content.toLowerCase();
      if (lowerInput.includes('bedtime') || lowerInput.includes('8:30') || lowerInput.includes('sleep time')) {
        response = responses['bedtime'];
      } else if (lowerInput.includes('food') || lowerInput.includes('eat') || lowerInput.includes('nutrition') || lowerInput.includes('diet')) {
        response = responses['food'];
      } else if (lowerInput.includes('sprint') || lowerInput.includes('exercise') || lowerInput.includes('height')) {
        response = responses['sprint'];
      } else if (lowerInput.includes('milk') && lowerInput.includes('bed')) {
        response = responses['milk'];
      } else if (lowerInput.includes('insulin') || lowerInput.includes('connection')) {
        response = responses['insulin'];
      } else if (lowerInput.includes('sunlight') || lowerInput.includes('morning light') || lowerInput.includes('sun')) {
        response = responses['sunlight'];
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleSuggestionClick = (question: string) => {
    setInput(question);
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Nav currentChild={child} />
      
      <main className="flex-1 flex flex-col max-w-3xl mx-auto w-full px-4 py-6">
        
        {/* Header */}
        <header className="text-center mb-6">
          <div className="w-16 h-16 bg-forest rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
            🤖
          </div>
          <h1 className="font-display text-3xl text-gray-900 mb-1">Jarvis</h1>
          <p className="text-gray-500 text-sm">Your GH optimization AI assistant</p>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-5 py-4 ${
                  message.role === 'user'
                    ? 'bg-forest text-white'
                    : 'bg-white shadow-sm'
                }`}
              >
                <div className="text-sm whitespace-pre-wrap leading-relaxed">
                  {message.content}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white shadow-sm rounded-2xl px-5 py-4">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions */}
        {messages.length <= 2 && (
          <div className="flex flex-wrap gap-2 mb-4 justify-center">
            {suggestedQuestions.map((q) => (
              <button
                key={q}
                onClick={() => handleSuggestionClick(q)}
                className="px-4 py-2 bg-white rounded-full text-sm text-gray-600 hover:bg-cream-dark transition-colors shadow-sm"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about GH optimization..."
            className="w-full px-6 py-4 pr-14 bg-white rounded-2xl shadow-lg border-0 focus:outline-none focus:ring-2 focus:ring-forest text-base"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-forest rounded-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-forest-dark transition-colors"
          >
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-4">
          Jarvis provides educational information based on peer-reviewed research. Always consult a pediatrician for medical advice.
        </p>

      </main>
    </div>
  );
}
