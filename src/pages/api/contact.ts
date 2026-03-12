// src/pages/api/contact.ts
// Astro API endpoint — handles contact form POST requests
// Sends email via Resend (https://resend.com)
import type { APIRoute } from 'astro';
import { z } from 'zod';

const schema = z.object({
  name:    z.string().min(2),
  email:   z.string().email(),
  subject: z.string().min(3),
  message: z.string().min(10),
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const data = schema.parse(body);

    // ── Send via Resend ──────────────────────────────
    // Set RESEND_API_KEY in your .env file:
    //   RESEND_API_KEY=re_xxxxxxxxxxxx
    //
    const apiKey = import.meta.env.RESEND_API_KEY;
    if (!apiKey) {
      // In dev without API key — just log and return OK
      console.log('📬 Contact form submission (no RESEND_API_KEY):', data);
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }

    const res = await fetch('https://api.resend.com/emails', {
      method:  'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({
        from:    'Portfolio <noreply@kacper.design>',
        to:      ['kacper@kacper.design'],
        subject: `[Portfolio] ${data.subject}`,
        html: `
          <p><strong>Od:</strong> ${data.name} &lt;${data.email}&gt;</p>
          <p><strong>Temat:</strong> ${data.subject}</p>
          <hr/>
          <p>${data.message.replace(/\n/g, '<br/>')}</p>
        `,
        reply_to: data.email,
      }),
    });

    if (!res.ok) throw new Error(await res.text());

    return new Response(JSON.stringify({ ok: true }), { status: 200 });

  } catch (err) {
    console.error('Contact API error:', err);
    return new Response(
      JSON.stringify({ error: 'Nie udało się wysłać wiadomości.' }),
      { status: 500 }
    );
  }
};

// Disable for static output — use on server/edge:
// export const prerender = false;
