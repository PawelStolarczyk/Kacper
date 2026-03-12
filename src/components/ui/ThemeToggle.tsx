// src/components/ui/ThemeToggle.tsx
import { useState, useEffect } from 'react';

type Theme = 'dark' | 'light';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark');

  // Sync with DOM on mount (avoids SSR mismatch)
  useEffect(() => {
    const saved = (localStorage.getItem('kd-theme') as Theme) ?? 'dark';
    setTheme(saved);
  }, []);

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    if (next === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('kd-theme', next);
    // Dispatch custom event so Nav.astro can react
    document.dispatchEvent(new CustomEvent('themechange'));
  }

  return (
    <button
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Włącz tryb jasny' : 'Włącz tryb ciemny'}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '7px 14px',
        border: '1px solid var(--border2)',
        background: 'transparent',
        cursor: 'none',
        fontFamily: 'var(--font-display)',
        fontSize: '10px',
        fontWeight: 600,
        letterSpacing: '.12em',
        textTransform: 'uppercase' as const,
        color: 'var(--fg-60)',
        transition: 'border-color .2s, color .2s',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--accent)';
        (e.currentTarget as HTMLButtonElement).style.color = 'var(--accent)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border2)';
        (e.currentTarget as HTMLButtonElement).style.color = 'var(--fg-60)';
      }}
    >
      {theme === 'dark' ? (
        // Moon — switch to light
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
        </svg>
      ) : (
        // Sun — switch to dark
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1"  x2="12" y2="3"  />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22"  y1="4.22"  x2="5.64"  y2="5.64"  />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1"  y1="12" x2="3"  y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22"  y1="19.78" x2="5.64"  y2="18.36" />
          <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"  />
        </svg>
      )}
      {theme === 'dark' ? 'Light' : 'Dark'}
    </button>
  );
}
