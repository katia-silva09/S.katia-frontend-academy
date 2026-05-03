'use client';

import ActionsMenu from './actionsMenu';
import CreateStudentDialog from './createStudentDialog';

export default function TableStudents({ estudiantes }: any) {
  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="font-bold text-xl">Estudiantes</h1>

        <CreateStudentDialog />
      </div>

      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="p-3">Nombres</th>
            <th className="p-3">Paterno</th>
            <th className="p-3">Materno</th>
            <th className="p-3">Dirección</th>
            <th className="p-3">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {estudiantes.map((est: any) => (
            <tr key={est.id} className="border-t">
              <td className="p-3">{est.nombres}</td>
              <td className="p-3">{est.paterno}</td>
              <td className="p-3">{est.materno ?? '-'}</td>
              <td className="p-3">{est.direccion}</td>
              <td className="p-3">
                <ActionsMenu student={est} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
