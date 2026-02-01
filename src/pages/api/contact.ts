import type { APIRoute } from 'astro';

// Lazy initialize Resend only when needed
let resend: any = null;

async function getResend() {
  const apiKey = import.meta.env.RESEND_API_KEY || process.env.RESEND_API_KEY;
  if (!apiKey) {
    return null;
  }

  if (!resend) {
    const { Resend } = await import('resend');
    resend = new Resend(apiKey);
  }

  return resend;
}

// Simple in-memory rate limiting (reset every hour)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const MAX_REQUESTS_PER_HOUR = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + 60 * 60 * 1000, // 1 hour
    });
    return true;
  }

  if (entry.count >= MAX_REQUESTS_PER_HOUR) {
    return false;
  }

  entry.count++;
  return true;
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  try {
    // Rate limiting
    if (!checkRateLimit(clientAddress)) {
      return new Response(
        JSON.stringify({
          error: 'Too many requests. Please try again later.',
        }),
        {
          status: 429,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const body = await request.json();
    const { name, email, message, subject, honeypot } = body;

    // Honeypot check (anti-spam)
    if (honeypot) {
      return new Response(
        JSON.stringify({ success: true }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Validation
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({
          error: 'Missing required fields',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({
          error: 'Invalid email address',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Check if Resend is configured
    const resendClient = await getResend();

    if (!resendClient) {
      console.warn('Resend API key not configured. Email not sent.');
      console.log('Contact form submission:', { name, email, message });

      // Return success in development even without API key
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Email logged (Resend not configured)',
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Send email via Resend
    const result = await resendClient.emails.send({
      from: 'TRAVI Contact Form <noreply@travi.world>',
      to: 'contact@travi.world', // Replace with your actual email
      replyTo: email,
      subject: subject || `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Sent from TRAVI World Contact Form</small></p>
      `,
    });

    if (result.error) {
      console.error('Resend error:', result.error);
      return new Response(
        JSON.stringify({
          error: 'Failed to send email',
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Email sent successfully',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
