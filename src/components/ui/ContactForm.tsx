// src/components/ui/ContactForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';

const schema = z.object({
  name:    z.string().min(2, 'Podaj imię i nazwisko'),
  email:   z.string().email('Nieprawidłowy adres email'),
  subject: z.string().min(3, 'Podaj temat'),
  message: z.string().min(10, 'Wiadomość jest zbyt krótka'),
});

type FormData = z.infer<typeof schema>;

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  }

  const inputStyle: React.CSSProperties = {
    background:  'var(--surface)',
    border:      '1px solid var(--border)',
    color:       'var(--fg)',
    padding:     '14px 18px',
    fontFamily:  'var(--font-body)',
    fontSize:    '14px',
    outline:     'none',
    width:       '100%',
    transition:  'border-color .2s',
    resize:      'none',
  };

  const labelStyle: React.CSSProperties = {
    fontSize:      '10px',
    letterSpacing: '.18em',
    textTransform: 'uppercase',
    color:         'var(--fg-30)',
    marginBottom:  '6px',
    display:       'block',
  };

  const errorStyle: React.CSSProperties = {
    fontSize: '11px',
    color:    '#ff6b6b',
    marginTop:'4px',
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ display:'flex', flexDirection:'column', gap:'16px' }}>

      <div>
        <label style={labelStyle}>Imię i nazwisko</label>
        <input
          {...register('name')}
          type="text"
          placeholder="Jan Kowalski"
          style={{
            ...inputStyle,
            ...(errors.name ? { borderColor:'#ff6b6b' } : {}),
          }}
          onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
          onBlur={e  => (e.target.style.borderColor = errors.name ? '#ff6b6b' : 'var(--border)')}
        />
        {errors.name && <p style={errorStyle}>{errors.name.message}</p>}
      </div>

      <div>
        <label style={labelStyle}>Email</label>
        <input
          {...register('email')}
          type="email"
          placeholder="jan@firma.pl"
          style={{
            ...inputStyle,
            ...(errors.email ? { borderColor:'#ff6b6b' } : {}),
          }}
          onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
          onBlur={e  => (e.target.style.borderColor = errors.email ? '#ff6b6b' : 'var(--border)')}
        />
        {errors.email && <p style={errorStyle}>{errors.email.message}</p>}
      </div>

      <div>
        <label style={labelStyle}>Temat</label>
        <input
          {...register('subject')}
          type="text"
          placeholder="Projekt UI/UX · Branding · Konsultacja"
          style={{
            ...inputStyle,
            ...(errors.subject ? { borderColor:'#ff6b6b' } : {}),
          }}
          onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
          onBlur={e  => (e.target.style.borderColor = errors.subject ? '#ff6b6b' : 'var(--border)')}
        />
        {errors.subject && <p style={errorStyle}>{errors.subject.message}</p>}
      </div>

      <div>
        <label style={labelStyle}>Wiadomość</label>
        <textarea
          {...register('message')}
          rows={5}
          placeholder="Opisz krótko projekt lub pytanie..."
          style={{
            ...inputStyle,
            height: '120px',
            ...(errors.message ? { borderColor:'#ff6b6b' } : {}),
          }}
          onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
          onBlur={e  => (e.target.style.borderColor = errors.message ? '#ff6b6b' : 'var(--border)')}
        />
        {errors.message && <p style={errorStyle}>{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        style={{
          fontFamily:    'var(--font-display)',
          fontWeight:    700,
          fontSize:      '11px',
          letterSpacing: '.16em',
          textTransform: 'uppercase',
          padding:       '15px',
          background:    status === 'success' ? '#22c55e' : 'var(--accent)',
          color:         '#000',
          border:        'none',
          cursor:        'none',
          transition:    'background .2s, opacity .2s',
          opacity:       status === 'sending' ? .6 : 1,
          width:         '100%',
        }}
      >
        {status === 'idle'    && 'Wyślij wiadomość →'}
        {status === 'sending' && 'Wysyłanie…'}
        {status === 'success' && '✓ Wysłano! Odezwę się wkrótce.'}
        {status === 'error'   && 'Błąd — spróbuj ponownie'}
      </button>

    </form>
  );
}
