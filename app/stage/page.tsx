'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import { createClient } from '@/lib/supabase';
import { allStages, stageLabels } from '@/lib/stage-content';



// Helper to get stage from age in months
function getStageFromAge(ageInMonths: number): string {
  if (ageInMonths < 0) return 'early-prenatal';
  if (ageInMonths < 3) return '0-3-months';
  if (ageInMonths < 6) return '3-6-months';
  if (ageInMonths < 12) return '6-12-months';
  if (ageInMonths < 18) return '12-18-months';
  if (ageInMonths < 24) return '18-24-months';
  if (ageInMonths < 36) return 'age-2';
  if (ageInMonths < 48) return 'age-3';
  if (ageInMonths < 60) return 'age-4';
  if (ageInMonths < 72) return 'age-5';
  if (ageInMonths < 84) return 'age-6';
  if (ageInMonths < 96) return 'age-7';
  if (ageInMonths < 108) return 'age-8';
  if (ageInMonths < 120) return 'age-9';
  if (ageInMonths < 132) return 'age-10';
  if (ageInMonths < 144) return 'age-11';
  if (ageInMonths < 156) return 'age-12';
  if (ageInMonths < 168) return 'age-13';
  if (ageInMonths < 180) return 'age-14';
  if (ageInMonths < 192) return 'age-15';
  if (ageInMonths < 204) return 'age-16';
  if (ageInMonths < 216) return 'age-17';
  if (ageInMonths < 228) return 'age-18';
  if (ageInMonths < 240) return 'age-19';
  if (ageInMonths < 252) return 'age-20';
  if (ageInMonths < 264) return 'age-21';
  if (ageInMonths < 276) return 'age-22';
  if (ageInMonths < 288) return 'age-23';
  if (ageInMonths < 300) return 'age-24';
  return 'age-25';
}

// Calculate age in months from birth date
function calculateAgeInMonths(birthDate: string): number {
  const birth = new Date(birthDate);
  const today = new Date();
  const months = (today.getFullYear() - birth.getFullYear()) * 12 + (today.getMonth() - birth.getMonth());
  return months;
}

export default function StagePage() {
  const [currentStageId, setCurrentStageId] = useState<string | null>(null);
  const [openSection, setOpenSection] = useState<number>(0);
  const [showStages, setShowStages] = useState(false);

  // Load child data from Supabase, fallback to localStorage
  useEffect(() => {
    let resolved = false;

    const supabase = createClient();
    if (supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (!session?.user || resolved) return;

        fetch(`/api/auth/user-state?userId=${session.user.id}`)
          .then(res => res.json())
          .then(data => {
            if (resolved) return;
            if (data.children && data.children.length > 0 && data.children[0].birth_date) {
              const ageInMonths = calculateAgeInMonths(data.children[0].birth_date);
              resolved = true;
              setCurrentStageId(getStageFromAge(ageInMonths));
            }
          })
          .catch(() => {});
      });
    }

    // localStorage fallback (runs immediately, Supabase overrides if successful)
    const m = localStorage.getItem('childBirthMonth');
    const y = localStorage.getItem('childBirthYear');
    if (m && y) {
      const birthDate = `${y}-${m.padStart(2, '0')}-01`;
      const ageInMonths = calculateAgeInMonths(birthDate);
      if (!resolved) {
        setCurrentStageId(getStageFromAge(ageInMonths));
      }
    } else if (!resolved) {
      setCurrentStageId('age-2');
    }
  }, []);

  const currentStage = allStages.find(s => s.id === currentStageId) || allStages[allStages.length - 1];

  const toggleSection = (index: number) => {
    setOpenSection(openSection === index ? -1 : index);
  };

  const handleStageSelect = (stageId: string) => {
    setCurrentStageId(stageId);
    setOpenSection(0);
    setShowStages(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  return (
    <div style={{ minHeight: '100vh', background: '#fafaf9', fontFamily: "'Courier New', Courier, monospace" }}>
      <Nav />

      <main style={{ maxWidth: '540px', margin: '0 auto', padding: '0 20px', paddingTop: '48px', paddingBottom: '80px' }}>
        {/* Back link */}
        <Link
          href="/home"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#065f46', textDecoration: 'none', marginBottom: '32px' }}
        >
          <svg style={{ width: '16px', height: '16px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </Link>

        {/* Header */}
        <header style={{ marginBottom: '44px' }}>
          <div style={{ fontSize: '14px', color: '#57534e', marginBottom: '8px' }}>{currentStage.ageRange}</div>
          <h1 style={{ fontWeight: 800, fontSize: '32px', color: '#1c1917', marginBottom: '12px' }}>
            {currentStage.header}
          </h1>
          <p style={{ fontSize: '20px', color: '#57534e', marginBottom: '12px', lineHeight: 1.75 }}>
            {currentStage.subhead}
          </p>
          <p style={{ fontSize: '14px', color: '#065f46', fontWeight: 500 }}>
            {currentStage.supportive}
          </p>
        </header>

        {/* Accordion */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {currentStage.sections.map((section, index) => (
            <div
              key={index}
              style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e7e5e4', overflow: 'hidden' }}
            >
              <button
                onClick={() => toggleSection(index)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 18px', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Courier New', Courier, monospace" }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ width: '32px', height: '32px', background: '#e0f2fe', color: '#065f46', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '14px' }}>
                    {index + 1}
                  </span>
                  <h2 style={{ fontWeight: 600, fontSize: '16px', color: '#1c1917', margin: 0 }}>
                    {section.title}
                  </h2>
                </div>
                <svg
                  style={{ width: '20px', height: '20px', color: '#57534e', transform: openSection === index ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {openSection === index && (
                <div style={{ padding: '0 18px 32px 18px' }}>
                  <div style={{ paddingLeft: '48px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {/* Intro */}
                    <p style={{ color: '#1c1917', fontWeight: 500, fontSize: '14px', lineHeight: 1.75, margin: 0 }}>
                      {section.intro}
                    </p>

                    {/* Explanation */}
                    <p style={{ color: '#57534e', fontSize: '14px', lineHeight: 1.75, margin: 0 }}>
                      {section.explanation}
                    </p>

                    {/* Flow diagram */}
                    <div style={{ background: '#f0fdf4', borderRadius: '14px', padding: '14px 18px', border: '1px solid #86efac' }}>
                      <p style={{ color: '#065f46', fontSize: '14px', fontFamily: "'Courier New', Courier, monospace", lineHeight: 1.75, margin: 0 }}>
                        {section.flow}
                      </p>
                    </div>

                    {/* Citation */}
                    <p style={{ color: '#57534e', fontSize: '14px', fontStyle: 'italic', margin: 0 }}>
                      [{section.citation}]
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* See all stages */}
        <div style={{ marginTop: '32px' }}>
          <button
            onClick={() => setShowStages(!showStages)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#065f46', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500, fontSize: '14px', fontFamily: "'Courier New', Courier, monospace" }}
          >
            <span>See all stages</span>
            <svg
              style={{ width: '16px', height: '16px', transform: showStages ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showStages && (
            <div style={{ marginTop: '16px', background: '#fff', borderRadius: '14px', border: '1px solid #e7e5e4', padding: '14px 18px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {stageLabels.map((stage) => (
                  <button
                    key={stage.id}
                    onClick={() => handleStageSelect(stage.id)}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '6px', textAlign: 'left', background: currentStageId === stage.id ? '#e0f2fe' : 'transparent', color: currentStageId === stage.id ? '#065f46' : '#57534e', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: currentStageId === stage.id ? 600 : 400, fontFamily: "'Courier New', Courier, monospace", transition: 'background-color 0.2s ease' }}
                  >
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: currentStageId === stage.id ? '#065f46' : '#d4d4d8' }} />
                    <span>
                      {stage.label}
                    </span>
                    {currentStageId === stage.id && (
                      <span style={{ fontSize: '12px', background: '#86efac', color: '#065f46', padding: '4px 8px', borderRadius: '999px', marginLeft: 'auto' }}>
                        Current
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <p style={{ fontSize: '14px', color: '#57534e', fontStyle: 'italic', margin: '16px 0 0 0', paddingTop: '12px', borderTop: '1px solid #f5f5f5' }}>
                More stages coming soon...
              </p>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
