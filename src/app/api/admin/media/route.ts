import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUser } from '@/lib/auth'
import * as dataAdapter from '@/lib/data-adapter'

export async function GET() {
  try {
    const media = await dataAdapter.getMedia()
    return NextResponse.json(media)
  } catch (error) {
    console.error('Get media error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des médias' },
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
    const updated = await dataAdapter.updateMedia(body)
    
    return NextResponse.json(updated)
  } catch (error) {
    console.error('Update media error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour des médias' },
      { status: 500 }
    )
  }
}
