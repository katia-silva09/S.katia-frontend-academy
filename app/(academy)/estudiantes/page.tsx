import { getAllStudents } from '@/actions';
import TableStudents from '@/components/ui/tableStudents';

export default async function ObtenerEstudiantes() {
  const estudiantes = await getAllStudents();

  return (
    <div className="p-4">
      <TableStudents estudiantes={estudiantes} />
    </div>
  );
}
