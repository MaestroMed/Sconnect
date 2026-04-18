import { NextRequest, NextResponse } from 'next/server';
import { authenticateUser, setAuthCookie } from '@/lib/auth';
import { rateLimit, getClientIdentifier, rateLimitResponse } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  // Strict rate limit on login: 5 attempts / 5 min per IP
  const id = getClientIdentifier(request, '/api/admin/auth/login');
  const limit = rateLimit({ identifier: id, limit: 5, windowMs: 5 * 60_000 });
  const limited = rateLimitResponse(limit);
  if (limited) return limited;

  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email et mot de passe requis' },
        { status: 400 }
      );
    }

    const result = await authenticateUser(email, password);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 401 }
      );
    }

    // Set the auth cookie
    await setAuthCookie(result.token!);

    return NextResponse.json({
      success: true,
      user: result.user
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la connexion' },
      { status: 500 }
    );
  }
}




