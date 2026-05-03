'use client';

import { createDocente, updateDocente } from '@/actions/docentes';
import { useRouter } from 'next/navigation';

export default function FormDocente({
  docente,
  onSuccess,
}: {
  docente?: any;
  onSuccess?: () => void;
}) {
  const router = useRouter();
  const isEdit = !!docente;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const raw = {
      nombres: formData.get('nombres'),
      apellidos: formData.get('apellidos'),
      email: formData.get('email'),
      direccion: formData.get('direccion'),
      cedula: formData.get('cedula'),
      telefono: formData.get('telefono'),
      etnia_id: formData.get('etnia_id'),
      cargo_id: formData.get('cargo_id'),
      sexo_id: formData.get('sexo_id'),
    };

    const data: any = {};

    Object.entries(raw).forEach(([key, value]) => {
      if (value !== null && value !== '') {
        data[key] = key.includes('_id') ? Number(value) : String(value);
      }
    });

    try {
      if (isEdit) {
        await updateDocente(docente.id, data);
      } else {
        await createDocente(data);
      }

      onSuccess?.();
      router.refresh();
    } catch (error) {
      console.error(error);
      alert('Error al guardar docente');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        name="nombres"
        placeholder="Nombres"
        defaultValue={docente?.nombres}
        required
        className="border p-2 rounded"
      />

      <input
        name="apellidos"
        placeholder="Apellidos"
        defaultValue={docente?.apellidos}
        required
        className="border p-2 rounded"
      />

      <input
        name="email"
        placeholder="Email"
        defaultValue={docente?.email || ''}
        className="border p-2 rounded"
      />

      <input
        name="cedula"
        placeholder="Cédula"
        defaultValue={docente?.cedula || ''}
        className="border p-2 rounded"
      />

      <input
        name="telefono"
        placeholder="Teléfono"
        defaultValue={docente?.telefono || ''}
        className="border p-2 rounded"
      />

      <input
        name="direccion"
        placeholder="Dirección"
        defaultValue={docente?.direccion || ''}
        className="border p-2 rounded"
      />

      <select
        name="sexo_id"
        defaultValue={docente?.sexo_id || ''}
        required
        className="border p-2 rounded"
      >
        <option value="">Seleccione sexo</option>
        <option value="1">Masculino</option>
        <option value="2">Femenino</option>
      </select>

      <select
        name="etnia_id"
        defaultValue={docente?.etnia_id || ''}
        required
        className="border p-2 rounded"
      >
        <option value="">Seleccione etnia</option>
        <option value="1">Mestizo</option>
        <option value="2">Indígena</option>
      </select>

      <select
        name="cargo_id"
        defaultValue={docente?.cargo_id || ''}
        required
        className="border p-2 rounded"
      >
        <option value="">Seleccione cargo</option>
        <option value="1">Docente Titular</option>
        <option value="2">Docente Auxiliar</option>
      </select>

      <button className="bg-green-500 text-white p-2 rounded hover:bg-green-600">
        {isEdit ? 'Actualizar' : 'Crear'}
      </button>
    </form>
  );
}
