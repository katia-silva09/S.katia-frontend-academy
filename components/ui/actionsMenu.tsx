'use client';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';
import { MoreVertical } from 'lucide-react';

export default function ActionsMenu({ student }: any) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <div className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100">
          Ver
        </div>
        <div className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100">
          editar
        </div>
        <div className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100">
          eliminar
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
