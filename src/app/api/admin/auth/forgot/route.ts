import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'node:crypto';
import { Resend } from 'resend';
import {
  isPersistenceAvailable,
  getAdminUserByEmailFromDB,
  createPasswordResetToken,
} from '@/lib/data-adapter';
import { rateLimit, getClientIdentifier, rateLimitResponse } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const id = getClientIdentifier(request, '/api/admin/auth/forgot');
  const limit = rateLimit({ identifier: id, limit: 3, windowMs: 15 * 60_000 });
  const limited = rateLimitResponse(limit);
  if (limited) return limited;

  try {
    const { email } = (await request.json()) as { email?: string };
    if (!email) return NextResponse.json({ ok: true }); // Don't reveal whether email exists

    if (!isPersistenceAvailable()) {
      return NextResponse.json(
        { error: 'Réinitialisation indisponible (Supabase non configuré)' },
        { status: 503 },
      );
    }

    const user = await getAdminUserByEmailFromDB(email.toLowerCase());
    // Always return ok to avoid email enumeration
    if (!user) return NextResponse.json({ ok: true });

    const token = randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1h
    const stored = await createPasswordResetToken(user.id, token, expiresAt);
    if (!stored) {
      console.error('Failed to store password reset token');
      return NextResponse.json({ ok: true });
    }

    const resendKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL ?? 'noreply@sconnectfrance.fr';
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sconnectfrance.fr';
    const resetUrl = `${baseUrl}/admin/login/reset?token=${token}`;

    if (resendKey) {
      const resend = new Resend(resendKey);
      try {
        await resend.emails.send({
          from: `S'Connect Admin <${fromEmail}>`,
          to: [user.email],
          subject: 'Réinitialisation de votre mot de passe',
          html: `<p>Bonjour ${user.name ?? ''},</p>
<p>Vous avez demandé la réinitialisation de votre mot de passe administrateur S'Connect.</p>
<p>Cliquez sur le lien ci-dessous (valable 1 heure) :</p>
<p><a href="${resetUrl}">${resetUrl}</a></p>
<p>Si vous n'êtes pas à l'origine de cette demande, ignorez cet email.</p>`,
        });
      } catch (err) {
        console.error('Failed to send reset email:', err);
      }
    } else {
      console.info('[reset-token]', resetUrl);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('forgot password error:', err);
    return NextResponse.json({ ok: true });
  }
}
