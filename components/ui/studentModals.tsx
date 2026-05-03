'use client';

import { useState } from 'react';
import Modal from './modals';
import FormStudent from './formStudent';

export default function StudentModal({ student }: any) {
  const [open, setOpen] = useState(false);

  const isEdit = !!student;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`px-3 py-1 rounded text-white ${
          isEdit ? 'bg-yellow-500' : 'bg-green-500'
        }`}
      >
        {isEdit ? 'Editar' : '+ Agregar'}
      </button>

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <h2 className="text-lg font-bold mb-4">
          {isEdit ? 'Editar estudiante' : 'Crear estudiante'}
        </h2>

        <FormStudent student={student} onSuccess={() => setOpen(false)} />
      </Modal>
    </>
  );
}
