import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUser } from '@/lib/auth'
import * as dataAdapter from '@/lib/data-adapter'

export async function GET() {
  try {
    const homepage = await dataAdapter.getHomepage()
    return NextResponse.json(homepage)
  } catch (error) {
    console.error('Get homepage error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération de la page d\'accueil' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser()
    if (!user) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    }

    const body = await request.json()
    const updated = await dataAdapter.updateHomepage(body)
    
    return NextResponse.json(updated)
  } catch (error) {
    console.error('Update homepage error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour de la page d\'accueil' },
      { status: 500 }
    )
  }
}
