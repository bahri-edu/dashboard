"use client";
import { useAppDispatch } from "@/store";
import { ArrowPathIcon, TrashIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

function DeleteItem({
  dispatchAction,
  id,
}: {
  dispatchAction(): void;
  id: string;
}) {
  const dispatch = useAppDispatch();
  const [idDelete, setIdDelete] = useState("");

  async function handleDelete(id: string) {
    if (confirm("sure you want to delete")) {
      setIdDelete(id);
      await dispatchAction();
      setIdDelete("");
    }
  }
  return (
    <button
      onClick={() => handleDelete(id)}
      className="text-gray-500 group  hover:text-gray-900"
    >
      {idDelete == id ? (
        <ArrowPathIcon className="w-6 h-6 animate-spin" />
      ) : (
        <TrashIcon className="w-6 h-6 group-hover:scale-110 duration-300 transform transition-all" />
      )}
    </button>
  );
}

export default DeleteItem;
