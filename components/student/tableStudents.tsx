'use client';

import {
  deleteStudent,
  getStudentAvatar,
  getStudentById,
  uploadStudentAvatar,
} from '@/actions';
import ActionsMenu from '../ui/actionsMenu';
import CreateStudentDialog from './createStudentDialog';
import FormStudent from './formStudent';
import EntityViewDialog from '../ui/entityViewDialog';
import DeleteEntityDialog from '../ui/deletEntityDialog';
import EntityEditDialog from '../ui/EntityEditDialog';

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
                      fetcher={async (id) => {
                        const [student, avatar] = await Promise.all([
                          getStudentById(id),
                          getStudentAvatar(id),
                        ]);

                        return {
                          student,
                          avatar: avatar ?? null,
                        };
                      }}
                      render={({ student, avatar }) => (
                        <div className="space-y-3">
                          <div>
                            {avatar?.url ? (
                              <img
                                src={avatar.url}
                                className="w-24 h-24 rounded-full object-cover"
                                alt="avatar"
                              />
                            ) : (
                              <div className="w-24 h-24 rounded-full bg-gray-200" />
                            )}
                          </div>

                          <p>
                            <b>Nombre:</b> {student?.nombres}
                          </p>
                          <p>
                            <b>Apellido:</b> {student?.paterno}
                          </p>
                          <p>
                            <b>Dirección:</b> {student?.direccion}
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
                />{' '}
                <label className="text-blue-600 hover:underline text-sm cursor-pointer">
                  Subir avatar
                  <input
                    type="file"
                    hidden
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;

                      await uploadStudentAvatar(est.id, file);
                    }}
                  />
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
