'use client';

import { createStudent } from '@/actions';

export default function FormStudent() {
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    await createStudent({
      nombres: formData.get('nombres'),
      paterno: formData.get('paterno'),
      materno: formData.get('materno') || null,
      sexo_id: Number(formData.get('sexo_id')),
      direccion: formData.get('direccion'),
      etnia_id: Number(formData.get('etnia_id')),
    });

    alert('Estudiante creado');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-4">
      <input name="nombres" placeholder="Nombres" required />
      <input name="paterno" placeholder="Apellido paterno" required />
      <input name="materno" placeholder="Apellido materno" />

      <select name="sexo_id" required>
        <option value="">Seleccione sexo</option>
        <option value="1">Masculino</option>
        <option value="2">Femenino</option>
      </select>

      <input name="direccion" placeholder="Dirección" required />

      <select name="etnia_id" required>
        <option value="">Seleccione etnia</option>
        <option value="1">Mestizo</option>
        <option value="2">Indígena</option>
      </select>

      <button className="bg-green-500 text-white p-2 rounded">Guardar</button>
    </form>
  );
}
