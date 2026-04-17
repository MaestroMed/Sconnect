import { NextRequest, NextResponse } from 'next/server';
import {
  isPersistenceAvailable,
  consumePasswordResetToken,
  updateAdminUserPasswordHash,
} from '@/lib/data-adapter';
import { hashPassword } from '@/lib/auth';
import { rateLimit, getClientIdentifier, rateLimitResponse } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const id = getClientIdentifier(request, '/api/admin/auth/reset');
  const limit = rateLimit({ identifier: id, limit: 5, windowMs: 15 * 60_000 });
  const limited = rateLimitResponse(limit);
  if (limited) return limited;

  if (!isPersistenceAvailable()) {
    return NextResponse.json({ error: 'Service indisponible' }, { status: 503 });
  }

  const { token, password } = (await request.json()) as {
    token?: string;
    password?: string;
  };

  if (!token || !password || password.length < 8) {
    return NextResponse.json(
      { error: 'Mot de passe invalide (8 caractères minimum)' },
      { status: 400 },
    );
  }

  const consumed = await consumePasswordResetToken(token);
  if (!consumed) {
    return NextResponse.json(
      { error: 'Lien de réinitialisation invalide ou expiré' },
      { status: 400 },
    );
  }

  const hash = await hashPassword(password);
  const updated = await updateAdminUserPasswordHash(consumed.user_id, hash);
  if (!updated) {
    return NextResponse.json(
      { error: 'Mise à jour du mot de passe échouée' },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
