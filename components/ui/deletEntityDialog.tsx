'use client';

import { useState } from 'react';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface Props {
  id: number;
  label: string;
  onDelete: (id: number) => Promise<void> | void;
}

export default function DeleteEntityDialog({ id, label, onDelete }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      await onDelete(id);

      setOpen(false);
    } catch (error) {
      console.error(`Error eliminando ${label}`, error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="px-3 py-2 text-sm cursor-pointer hover:bg-red-100 text-red-600 flex items-center gap-2">
          <Trash2 className="w-4 h-4" />
          Eliminar
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eliminar {label}</DialogTitle>

          <DialogDescription>
            Esta acción no se puede deshacer. El {label} será eliminado
            permanentemente.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={loading}>
              Cancelar
            </Button>
          </DialogClose>

          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? 'Eliminando...' : 'Eliminar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
