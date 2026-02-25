'use client';

import { useState, useEffect } from 'react';

export function useChildName(fallback = 'Your child') {
  const [name, setName] = useState(fallback);

  useEffect(() => {
    const saved = localStorage.getItem('childName');
    if (saved) setName(saved);
  }, []);

  return name;
}
