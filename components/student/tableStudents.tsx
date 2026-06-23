'use client';

import {
  deleteFileByModel,
  deleteStudent,
  getFileByModel,
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from 'lucide-react';

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

                        const avatar = await getFileByModel(id);

                        return {
                          student,
                          avatar,
                        };
                      }}
                      render={({ student, avatar }) => (
                        <div className="space-y-3">
                          <div className="flex justify-center">
                            <Avatar className="w-24 h-24">
                              {avatar ? (
                                <AvatarImage
                                  src={getStudentAvatar(student.id)}
                                  alt="Avatar del estudiante"
                                />
                              ) : null}

                              <AvatarFallback>
                                {student?.nombres?.[0] ||
                                student?.paterno?.[0] ? (
                                  `${student?.nombres?.[0] ?? ''}${student?.paterno?.[0] ?? ''}`
                                ) : (
                                  <User className="h-10 w-10" />
                                )}
                              </AvatarFallback>
                            </Avatar>
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
