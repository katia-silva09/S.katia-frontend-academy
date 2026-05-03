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

interface Props {
  title: string;
  trigger: React.ReactNode;
  children: (helpers: { close: () => void }) => React.ReactNode;
}

export default function EntityEditDialog({ title, trigger, children }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          {trigger}
        </DropdownMenuItem>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        {children({ close: () => setOpen(false) })}
      </DialogContent>
    </Dialog>
  );
}
