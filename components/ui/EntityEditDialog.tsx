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
import { Pencil } from 'lucide-react';

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
          <div className="flex items-center gap-2">
            <Pencil className="w-4 h-4" />
            {trigger}
          </div>
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
