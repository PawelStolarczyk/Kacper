// lib/theme.ts — theme persistence & toggle

export type Theme = 'dark' | 'light';

const KEY = 'kd-theme';

export function getTheme(): Theme {
  if (typeof localStorage === 'undefined') return 'dark';
  return (localStorage.getItem(KEY) as Theme) ?? 'dark';
}

export function setTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === 'light') {
    root.setAttribute('data-theme', 'light');
  } else {
    root.removeAttribute('data-theme');
  }
  localStorage.setItem(KEY, theme);
}

export function toggleTheme(): Theme {
  const current = getTheme();
  const next: Theme = current === 'dark' ? 'light' : 'dark';
  setTheme(next);
  return next;
}

// Inline script string — injected in <head> to avoid FOUC
export const themeInitScript = `
(function() {
  var t = localStorage.getItem('kd-theme');
  if (t === 'light') document.documentElement.setAttribute('data-theme', 'light');
})();
`;
