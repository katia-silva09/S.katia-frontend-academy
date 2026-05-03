import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, GraduationCap } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="grid gap-6 md:grid-cols-2 w-full max-w-3xl">
        <Card className="shadow-md hover:shadow-lg transition">
          <CardHeader className="flex flex-row items-center gap-3">
            <Users className="w-6 h-6 text-blue-500" />
            <CardTitle>Estudiantes</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-4">
            <p className="text-sm text-gray-500">
              Gestiona la información de los estudiantes registrados.
            </p>

            <Link href="/estudiantes">
              <Button className="w-full bg-blue-500 hover:bg-blue-600">
                Ver estudiantes
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition">
          <CardHeader className="flex flex-row items-center gap-3">
            <GraduationCap className="w-6 h-6 text-green-500" />
            <CardTitle>Docentes</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-4">
            <p className="text-sm text-gray-500">
              Administra la información de los docentes.
            </p>

            <Link href="/docentes">
              <Button className="w-full bg-green-500 hover:bg-green-600">
                Ver docentes
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
