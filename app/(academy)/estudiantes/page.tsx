import { getAllStudents } from '@/actions';
import TableStudents from '@/components/student/tableStudents';

export default async function ObtenerEstudiantes() {
  const estudiantes = await getAllStudents();

  return (
    <div className="p-4">
      <TableStudents estudiantes={estudiantes} />
    </div>
  );
}
