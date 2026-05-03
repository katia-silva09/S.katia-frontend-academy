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
