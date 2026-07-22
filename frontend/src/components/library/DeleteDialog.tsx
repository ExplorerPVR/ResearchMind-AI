"use client";

interface Props {

  open: boolean;

  onClose: () => void;

  onConfirm: () => void;

}

export default function DeleteDialog({

  open,

  onClose,

  onConfirm,

}: Props) {

  if (!open) return null;

  return (

    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-card rounded-3xl shadow-2xl p-8 w-[420px]">

        <h2 className="text-2xl font-bold">

          Delete Paper?

        </h2>

        <p className="text-muted-foreground mt-3">

          This action cannot be undone.

        </p>

        <div className="flex justify-end gap-4 mt-8">

          <button
            onClick={onClose}
            className="rounded-xl border px-5 py-2"
          >

            Cancel

          </button>

          <button
            onClick={onConfirm}
            className="rounded-xl bg-red-600 text-white px-5 py-2"
          >

            Delete

          </button>

        </div>

      </div>

    </div>

  );

}