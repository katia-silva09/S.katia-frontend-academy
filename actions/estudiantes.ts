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

export async function uploadStudentAvatar(studentId: number, file: File) {
  const formData = new FormData();

  formData.append('file', file);
  formData.append('model_id', String(studentId));

  const res = await fetch(`${URL}/files`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Error subiendo avatar');
  }

  return res.json();
}
export async function updateStudent(id: number, data: any) {
  const res = await fetch(`${URL}/estudiantes/${id}`, {
    method: 'PUT',
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

export async function updateStudentAvatar(id: number, file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`${URL}/estudiantes/${id}/avatar`, {
    method: 'PUT',
    body: formData,
  });

  const responseData = await res.json();

  if (!res.ok) {
    throw new Error(responseData?.message || 'Error al subir avatar');
  }

  return responseData;
}

export function getStudentAvatar(id: number) {
  return `${URL}/estudiantes/${id}/avatar`;
}
export async function getFileByModel(modelId: number) {
  const res = await fetch(`${URL}/files/model/${modelId}`);

  const text = await res.text();

  if (!res.ok) {
    return null;
  }

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}
export async function getStudentById(id: number) {
  const res = await fetch(`${URL}/estudiantes/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Error al obtener estudiante');

  return res.json();
}

export async function deleteStudent(id: number) {
  const res = await fetch(`${URL}/estudiantes/${id}`, {
    method: 'DELETE',
  });

  console.log('STATUS:', res.status);

  const data = await res.text();

  console.log('RESPONSE:', data);

  if (!res.ok) {
    throw new Error(data || 'Error eliminando estudiante');
  }

  return;
}

export async function deleteFileByModel(id: number) {
  const res = await fetch(`${URL}/files/students/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Error eliminando archivo');
  }
}
