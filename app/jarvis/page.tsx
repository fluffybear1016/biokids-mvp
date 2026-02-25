'use client';

import { useState, useRef, useEffect, Suspense, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Nav from '@/components/Nav';
import { Child } from '@/lib/supabase';
import { useChildName } from '@/lib/useChildName';

const mockChild: Child = {
  id: '1',
  user_id: '1',
  name: 'Your child',
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

export default function JarvisPage() {
  return (
    <Suspense>
      <Jarvis />
    </Suspense>
  );
}

function Jarvis() {
  const searchParams = useSearchParams();
  const childName = useChildName();
  const child = { ...mockChild, name: childName };
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hi! I'm Jarvis, your GH optimization assistant. I can answer questions about growth hormone, sleep timing, nutrition, exercise — anything related to helping your child reach their height potential.\n\nWhat would you like to know?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const hasProcessedQuery = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Calculate child age in years
  const childAge = Math.floor(
    (Date.now() - new Date(child.birth_date).getTime()) / (365.25 * 24 * 60 * 60 * 1000)
  );

  const processMessage = useCallback(async (question: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: question.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Build conversation history for API (exclude the welcome message)
    const apiMessages = [...messages.filter(m => m.id !== '1'), userMessage].map(m => ({
      role: m.role,
      content: m.content,
    }));

    try {
      const response = await fetch('/api/jarvis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: apiMessages,
          childName: child.name,
          childAge,
        }),
      });

      if (!response.ok) {
        const errBody = await response.json().catch(() => ({}));
        throw new Error(errBody.details || errBody.error || `API error ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No reader');

      const decoder = new TextDecoder();
      const assistantId = (Date.now() + 1).toString();
      let fullText = '';

      // Add empty assistant message to stream into
      setMessages(prev => [...prev, {
        id: assistantId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
      }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') break;
            try {
              const parsed = JSON.parse(data);
              if (parsed.text) {
                fullText += parsed.text;
                const currentText = fullText;
                setMessages(prev =>
                  prev.map(m => m.id === assistantId ? { ...m, content: currentText } : m)
                );
              }
            } catch {
              // skip malformed chunks
            }
          }
        }
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Sorry, I had trouble connecting: ${errorMsg}`,
        timestamp: new Date(),
      }]);
    }

    setIsLoading(false);
  }, [messages, child.name, childAge]);

  // Auto-submit query from URL param
  useEffect(() => {
    const q = searchParams.get('q');
    if (q && q.trim() && !hasProcessedQuery.current) {
      hasProcessedQuery.current = true;
      processMessage(q);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    processMessage(input);
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
          {isLoading && messages[messages.length - 1]?.role === 'user' && (
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
