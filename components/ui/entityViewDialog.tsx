'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Eye } from 'lucide-react';

interface Props {
  title: string;
  id: number;
  fetcher: (id: number) => Promise<any>;
  render: (data: any) => React.ReactNode;
}

export default function EntityViewDialog({
  title,
  id,
  fetcher,
  render,
}: Props) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!open) return;

    fetcher(id).then(setData).catch(console.error);
  }, [open, id, fetcher]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Ver
          </div>{' '}
        </DropdownMenuItem>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        {data ? render(data) : <p>Cargando...</p>}
      </DialogContent>
    </Dialog>
  );
}
