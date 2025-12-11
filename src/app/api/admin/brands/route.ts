import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/auth';
import { getBrands, addBrand, updateBrand, deleteBrand } from '@/lib/data-service';

export async function GET() {
  try {
    const data = getBrands();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Get brands error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des marques' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const body = await request.json();
    const newBrand = addBrand(body);
    
    return NextResponse.json(newBrand, { status: 201 });
  } catch (error) {
    console.error('Add brand error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'ajout de la marque' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const body = await request.json();
    const { id, ...updates } = body;
    
    if (!id) {
      return NextResponse.json({ error: 'ID requis' }, { status: 400 });
    }

    const updated = updateBrand(id, updates);
    
    if (!updated) {
      return NextResponse.json({ error: 'Marque non trouvée' }, { status: 404 });
    }
    
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Update brand error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour de la marque' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'ID requis' }, { status: 400 });
    }

    const deleted = deleteBrand(id);
    
    if (!deleted) {
      return NextResponse.json({ error: 'Marque non trouvée' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete brand error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de la marque' },
      { status: 500 }
    );
  }
}




