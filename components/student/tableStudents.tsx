'use client';

import { deleteStudent, getStudentById } from '@/actions';
import ActionsMenu from '../ui/actionsMenu';
import CreateStudentDialog from './createStudentDialog';
import FormStudent from './formStudent';
import EntityViewDialog from '../ui/entityViewDialog';
import { Pencil } from 'lucide-react';
import DeleteEntityDialog from '../ui/deletEntityDialog';
import EntityEditDialog from './EntityEditDialog';

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
                <ActionsMenu
                  onView={
                    <EntityViewDialog
                      title="Detalle estudiante"
                      id={est.id}
                      fetcher={getStudentById}
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
                      title="Editar estudiante"
                      trigger={<div>Editar</div>}
                    >
                      {({ close }) => (
                        <FormStudent student={est} onSuccess={close} />
                      )}
                    </EntityEditDialog>
                  }
                  onDelete={
                    <DeleteEntityDialog
                      id={est.id}
                      label="estudiante"
                      onDelete={deleteStudent}
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
