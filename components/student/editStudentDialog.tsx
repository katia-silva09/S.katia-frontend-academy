'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import FormStudent from './formStudent';

export default function EditStudentDialog({ student }: any) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          Editar
        </DropdownMenuItem>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar estudiante</DialogTitle>
        </DialogHeader>

        <FormStudent student={student} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
