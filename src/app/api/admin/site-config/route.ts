import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUser } from '@/lib/auth'
import * as dataAdapter from '@/lib/data-adapter'

export async function GET() {
  try {
    const config = await dataAdapter.getSiteConfig()
    return NextResponse.json(config)
  } catch (error) {
    console.error('Get site config error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération de la configuration' },
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
    const updatedConfig = await dataAdapter.updateSiteConfig(body)
    
    return NextResponse.json(updatedConfig)
  } catch (error) {
    console.error('Update site config error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour de la configuration' },
      { status: 500 }
    )
  }
}
