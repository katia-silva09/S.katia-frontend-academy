'use client';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';
import { MoreVertical } from 'lucide-react';

interface Props {
  onEdit: React.ReactNode;
  onDelete: React.ReactNode;
  onView?: React.ReactNode;
}

export default function ActionsMenu({ onEdit, onDelete, onView }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {onView ?? <DropdownMenuItem>Ver</DropdownMenuItem>}

        {onEdit}

        {onDelete}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
