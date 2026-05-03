import { getAllDocentes } from '@/actions/docentes';
import TableDocentes from '@/components/docente/tableDocente';

export default async function ObtenerDocentes() {
  const docentes = await getAllDocentes();

  return (
    <div className="p-4">
      <TableDocentes docentes={docentes} />
    </div>
  );
}
