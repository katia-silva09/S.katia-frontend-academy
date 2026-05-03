import { Docente } from '@/types/docentes.interface';

const URL = process.env.NEXT_PUBLIC_GATEWAY_URL;
export async function getAllDocentes(): Promise<Docente[]> {
  const response = await fetch(`${URL}/docentes`, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error('Error al obtener docentes');
  }

  const data = await response.json();

  if (Array.isArray(data?.data)) return data.data;
  console.error('Error al obtener la data:', data);
  return [];
}

export async function createDocente(data: any) {
  const res = await fetch(`${URL}/docentes`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const responseData = await res.json();

  if (!res.ok) {
    throw new Error(responseData?.message || 'Error al crear docente');
  }

  return responseData;
}
export async function updateDocente(id: number, data: any) {
  const res = await fetch(`${URL}/docentes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const responseData = await res.json();
  console.log('BODY:', responseData);

  if (!res.ok) {
    throw new Error(responseData?.message || 'Error al actualizar docente');
  }

  return responseData;
}

export async function getDocenteById(id: number) {
  const res = await fetch(`${URL}/docentes/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Error al obtener docente');

  return res.json();
}
