import { Estudiante } from '@/types/estudiantes.interface';

const URL = process.env.NEXT_PUBLIC_GATEWAY_URL;
export async function getAllStudents(): Promise<Estudiante[]> {
  const response = await fetch(`${URL}/estudiantes`, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error('Error al obtener estudiantes');
  }

  const data = await response.json();

  if (Array.isArray(data)) return data;

  return [];
}

export async function createStudent(data: any) {
  const res = await fetch(`${URL}/estudiantes`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const responseData = await res.json();

  if (!res.ok) {
    throw new Error(responseData?.message || 'Error al crear estudiante');
  }

  return responseData;
}
export async function UpdateStudent(id: number, data: any) {
  const res = await fetch(`${URL}/estudiantes/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const responseData = await res.json();
  console.log('BODY:', responseData);

  if (!res.ok) {
    throw new Error(responseData?.message || 'Error al actualizar estudiante');
  }

  return responseData;
}

export async function getStudentById(id: number) {
  const res = await fetch(`${URL}/estudiantes/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Error al obtener estudiante');

  return res.json();
}
