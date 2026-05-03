'use client';

import { createStudent, UpdateStudent } from '@/actions';
import { useRouter } from 'next/navigation';

export default function FormStudent({
  student,
  onSuccess,
}: {
  student?: any;
  onSuccess?: () => void;
}) {
  const router = useRouter();
  const isEdit = !!student;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = {
      nombres: formData.get('nombres'),
      paterno: formData.get('paterno'),
      materno: formData.get('materno') || null,
      sexo_id: Number(formData.get('sexo_id')),
      direccion: formData.get('direccion'),
      etnia_id: Number(formData.get('etnia_id')),
    };

    try {
      if (isEdit) {
        await UpdateStudent(student.id, data);
      } else {
        await createStudent(data);
      }

      onSuccess?.();

      router.refresh();
    } catch (error) {
      console.error(error);
      alert('Error al guardar estudiante');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        name="nombres"
        placeholder="Nombres"
        defaultValue={student?.nombres}
        required
        className="border p-2 rounded"
      />

      <input
        name="paterno"
        placeholder="Apellido paterno"
        defaultValue={student?.paterno}
        required
        className="border p-2 rounded"
      />

      <input
        name="materno"
        placeholder="Apellido materno"
        defaultValue={student?.materno || ''}
        className="border p-2 rounded"
      />

      <select
        name="sexo_id"
        defaultValue={student?.sexo_id || ''}
        required
        className="border p-2 rounded"
      >
        <option value="">Seleccione sexo</option>
        <option value="1">Masculino</option>
        <option value="2">Femenino</option>
      </select>

      <input
        name="direccion"
        placeholder="Dirección"
        defaultValue={student?.direccion}
        required
        className="border p-2 rounded"
      />

      <select
        name="etnia_id"
        defaultValue={student?.etnia_id || ''}
        required
        className="border p-2 rounded"
      >
        <option value="">Seleccione etnia</option>
        <option value="1">Mestizo</option>
        <option value="2">Indígena</option>
      </select>

      <button className="bg-green-500 text-white p-2 rounded hover:bg-green-600">
        {isEdit ? 'Actualizar' : 'Crear'}
      </button>
    </form>
  );
}
