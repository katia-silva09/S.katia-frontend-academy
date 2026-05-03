import { Estudiante } from '@/types/estudiantes.interface';

const URL = `${process.env.GATEWAY_URL}`;

export async function getAllStudents(): Promise<Estudiante[]> {
  const response = await fetch(`${URL}/estudiantes`, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error('Error al obtener estudiantes');
  }

  const data = await response.json();

  if (Array.isArray(data)) return data;

  return [];
}
