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

const F = "'Courier New', Courier, monospace";
const C = {
  bg: '#fafaf9', title: '#1c1917', body: '#57534e', light: '#a8a29e',
  green: '#065f46', card: '#fff', border: '#e7e5e4',
};

export default function AustinPage() {
  return (
    <Suspense>
      <Austin />
    </Suspense>
  );
}

function Austin() {
  const searchParams = useSearchParams();
  const childName = useChildName();
  const child = { ...mockChild, name: childName };
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hi! I'm Austin, your GH optimization assistant. I can answer questions about growth hormone, sleep timing, nutrition, exercise — anything related to helping your child reach their growth potential.\n\nWhat would you like to know?`,
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
    <div style={{ minHeight: '100vh', background: C.bg, fontFamily: F, display: 'flex', flexDirection: 'column' }}>
      <Nav currentChild={child} />

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', maxWidth: 540, margin: '0 auto', width: '100%', padding: '24px 20px' }}>

        {/* Header */}
        <header style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: C.green, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a4 4 0 0 1 4 4v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V6a4 4 0 0 1 4-4z" />
              <path d="M9 8v1a3 3 0 0 0 6 0V8" />
              <path d="M12 12v3" />
              <path d="M8 21h8" />
              <path d="M12 15v6" />
            </svg>
          </div>
          <h1 style={{ fontFamily: F, fontSize: 22, fontWeight: 800, color: C.title, letterSpacing: '-0.02em', margin: '0 0 4px' }}>Austin</h1>
          <p style={{ fontSize: 13, color: C.light, margin: 0, fontFamily: F }}>Your GH optimization AI assistant</p>
        </header>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
          {messages.map((message) => (
            <div
              key={message.id}
              style={{ display: 'flex', justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start' }}
            >
              <div
                style={{
                  maxWidth: '85%', borderRadius: 14, padding: '14px 18px',
                  ...(message.role === 'user'
                    ? { background: C.green, color: '#fff' }
                    : { background: '#f0fdf4', borderLeft: `3px solid ${C.green}`, borderTop: `1px solid #e7e5e4`, borderRight: `1px solid #e7e5e4`, borderBottom: `1px solid #e7e5e4` }
                  ),
                }}
              >
                <div style={{ fontSize: 14, whiteSpace: 'pre-wrap', lineHeight: 1.75, fontFamily: F, color: message.role === 'user' ? '#fff' : C.body }}>
                  {message.content}
                </div>
              </div>
            </div>
          ))}
          {isLoading && messages[messages.length - 1]?.role === 'user' && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div style={{ background: '#f0fdf4', borderLeft: `3px solid ${C.green}`, borderTop: '1px solid #e7e5e4', borderRight: '1px solid #e7e5e4', borderBottom: '1px solid #e7e5e4', borderRadius: 14, padding: '14px 18px' }}>
                <div style={{ display: 'flex', gap: 4 }}>
                  <span style={{ width: 6, height: 6, background: C.green, opacity: 0.5, borderRadius: '50%', animation: 'bounce 1s infinite', animationDelay: '0ms' }} />
                  <span style={{ width: 6, height: 6, background: C.green, opacity: 0.5, borderRadius: '50%', animation: 'bounce 1s infinite', animationDelay: '150ms' }} />
                  <span style={{ width: 6, height: 6, background: C.green, opacity: 0.5, borderRadius: '50%', animation: 'bounce 1s infinite', animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions */}
        {messages.length <= 2 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16, justifyContent: 'center' }}>
            {suggestedQuestions.map((q) => (
              <button
                key={q}
                onClick={() => handleSuggestionClick(q)}
                style={{
                  padding: '6px 14px', background: '#f0fdf4', borderRadius: 20, fontSize: 11,
                  color: C.green, border: `1px solid #bbf7d0`, cursor: 'pointer', fontFamily: F,
                  fontWeight: 600, transition: 'all 0.15s',
                }}
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form onSubmit={handleSubmit} style={{ position: 'relative' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about GH optimization..."
            disabled={isLoading}
            style={{
              width: '100%', padding: '14px 52px 14px 18px', background: C.card,
              borderRadius: 14, border: `1px solid ${C.border}`, fontFamily: F,
              fontSize: 14, color: C.title, outline: 'none', boxSizing: 'border-box',
            }}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            style={{
              position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)',
              width: 36, height: 36, background: C.green, borderRadius: 10,
              border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: (!input.trim() || isLoading) ? 0.4 : 1,
            }}
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: 11, color: C.green, opacity: 0.6, marginTop: 14, fontFamily: F }}>
          Austin provides educational information based on peer-reviewed research. Always consult a pediatrician for medical advice.
        </p>

      </main>
    </div>
  );
}
