import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUser } from '@/lib/auth'
import * as dataAdapter from '@/lib/data-adapter'

export async function GET() {
  try {
    const data = await dataAdapter.getRealizations()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Get realizations error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des réalisations' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser()
    if (!user) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    }

    const body = await request.json()
    const newRealization = await dataAdapter.addRealization(body)
    
    return NextResponse.json(newRealization, { status: 201 })
  } catch (error) {
    console.error('Create realization error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création de la réalisation' },
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
    const { id, ...updates } = body
    
    if (!id) {
      return NextResponse.json({ error: 'ID requis' }, { status: 400 })
    }

    const updated = await dataAdapter.updateRealization(id, updates)
    
    if (!updated) {
      return NextResponse.json({ error: 'Réalisation non trouvée' }, { status: 404 })
    }
    
    return NextResponse.json(updated)
  } catch (error) {
    console.error('Update realization error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour de la réalisation' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser()
    if (!user) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID requis' }, { status: 400 })
    }

    const deleted = await dataAdapter.deleteRealization(id)
    
    if (!deleted) {
      return NextResponse.json({ error: 'Réalisation non trouvée' }, { status: 404 })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete realization error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de la réalisation' },
      { status: 500 }
    )
  }
}
