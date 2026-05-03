'use client';

import { deleteDocente, getDocenteById } from '@/actions/docentes';
import ActionsMenu from '../ui/actionsMenu';
import EntityViewDialog from '../ui/entityViewDialog';
import CreateDocenteDialog from './createDocenteDialog';
import EntityEditDialog from '../ui/EntityEditDialog';
import FormDocente from './formDocente';
import DeleteEntityDialog from '../ui/deletEntityDialog';

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
              <td>
                <ActionsMenu
                  onView={
                    <EntityViewDialog
                      title="Detalle del docente"
                      id={doc.id}
                      fetcher={getDocenteById}
                      render={(data) => (
                        <div className="space-y-2">
                          <p>
                            <b>Nombre:</b> {data.nombres}
                          </p>
                          <p>
                            <b>Apellido:</b> {data.paterno}
                          </p>
                          <p>
                            <b>Dirección:</b> {data.direccion}
                          </p>
                        </div>
                      )}
                    />
                  }
                  onEdit={
                    <EntityEditDialog
                      title="Editar docente"
                      trigger={<div>Editar</div>}
                    >
                      {({ close }) => (
                        <FormDocente docente={doc} onSuccess={close} />
                      )}
                    </EntityEditDialog>
                  }
                  onDelete={
                    <DeleteEntityDialog
                      id={doc.id}
                      label="docente"
                      onDelete={deleteDocente}
                    />
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
