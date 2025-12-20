import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUser } from '@/lib/auth'
import * as dataAdapter from '@/lib/data-adapter'

export async function GET() {
  try {
    const data = await dataAdapter.getServices()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Get services error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des services' },
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
    const updated = await dataAdapter.updateServices(body)
    
    return NextResponse.json(updated)
  } catch (error) {
    console.error('Update services error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour des services' },
      { status: 500 }
    )
  }
}
