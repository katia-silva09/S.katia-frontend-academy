import { getAllStudents } from '@/actions';
import Link from 'next/link';

export default async function ObtenerEstudiantes() {
  const estudiantes = await getAllStudents();

  return (
    <div>
      <h1 className="font-bold p-3">Estudiantes</h1>
      <Link href="/estudiantes/create">
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          + Agregar
        </button>
      </Link>
      <div>
        <table>
          <thead>
            <tr>
              <th className="p-3">Nombres1</th>
              <th className="p-3">Paterno</th>
              <th className="p-3">Materno</th>
              <th className="p-3">Direccion</th>
            </tr>
          </thead>
          <tbody>
            {estudiantes.map((est) => (
              <tr key={est.id} className="border-t">
                <td className="p-3">{est.nombres}</td>
                <td className="p-3">{est.paterno}</td>
                <td className="p-3">{est.materno}</td>
                <td className="p-3">{est.direccion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
