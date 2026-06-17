'use client';

import {
  deleteFileByModel,
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
                        const student = await getStudentById(id);

                        return {
                          student,
                          avatar: {
                            url: getStudentAvatar(id),
                          },
                        };
                      }}
                      render={({ student, avatar }) => (
                        <div className="space-y-3">
                          <div>
                            {avatar?.url ? (
                              <img
                                src={avatar.url}
                                alt="Avatar del estudiante"
                                className="w-24 h-24 rounded-full object-cover border"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
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
                <button
                  onClick={async () => {
                    const confirm = window.confirm(
                      '¿Seguro que deseas eliminar el avatar?',
                    );

                    if (!confirm) return;

                    try {
                      await deleteFileByModel(est.id);
                      alert('Avatar eliminado');
                    } catch (err) {
                      console.error(err);
                      alert('Error eliminando avatar');
                    }
                  }}
                  className="text-red-600 hover:underline text-sm ml-3"
                >
                  Eliminar avatar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
