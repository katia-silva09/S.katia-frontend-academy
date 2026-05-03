'use client';

import CreateDocenteDialog from './createDocenteDialog';

export default function TableDocentes({ docentes }: any) {
  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="font-bold text-xl">Docentes</h1>
        <CreateDocenteDialog />
      </div>

      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="p-3">Nombres</th>
            <th className="p-3">Apellidos</th>
            <th className="p-3">Email</th>
            <th className="p-3">Dirección</th>
            <th className="p-3">Teléfono</th>
            <th className="p-3">Cedula</th>
          </tr>
        </thead>

        <tbody>
          {docentes.map((doc: any) => (
            <tr key={doc.id} className="border-t">
              <td className="p-3">{doc.nombres}</td>
              <td className="p-3">{doc.apellidos}</td>
              <td className="p-3">{doc.email ?? '-'}</td>
              <td className="p-3">{doc.direccion ?? '-'}</td>
              <td className="p-3">{doc.telefono ?? '-'}</td>
              <td className="p-3">{doc.cedula ?? '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
