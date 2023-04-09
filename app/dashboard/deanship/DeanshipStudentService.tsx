"use client";
import DeleteItem from "@/components/DeleteItem";
import Modal from "@/components/Modal";
import { useAppDispatch } from "@/store";
import {
  deleteDeanshipStudentService,
  fetchDeanshipStudentServices,
  setCurrentDeanshipStudentService,
  sortDeanshipStudentService,
  sortDeanshipStudentServices,
  useDeanshipStudentService,
} from "@/store/deanship";

import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { PencilSquareIcon, PlusIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import Main from "../Main";
import { SortableItem } from "@/components/SortableItem";
import DeanshipStudentServiceForm from "./DeanshipStudentServiceForm";

function DeanshipStudentService({ deanshipType }: { deanshipType: string }) {
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();

  const { deanshipStudentServices, loading } = useDeanshipStudentService();

  useEffect(() => {
    dispatch(fetchDeanshipStudentServices(deanshipType));
  }, []);

  useEffect(() => {
    if (open === false) {
      dispatch(setCurrentDeanshipStudentService(null));
    }
  }, [open]);

  async function editNews(id: string) {
    setOpen(true);
    dispatch(setCurrentDeanshipStudentService(id));
  }
  return (
    <>
      <div>
        <button className="btn btn--primary mt-3" onClick={() => setOpen(true)}>
          <PlusIcon className="w-6 h-6" />
          Add New Deanship Student Service
        </button>
      </div>

      <Modal
        open={open}
        setOpen={setOpen}
        title="Add New Deanship Student Service"
        width="max-w-5xl"
      >
        <DeanshipStudentServiceForm
          setClose={setOpen}
          deanshipType={deanshipType}
        />
      </Modal>
      <Main>
        <div className="overflow-x-auto ">
          <table className="table-auto w-full ">
            <thead className="text-xs font-semibold uppercase text-gray-600 bg-gray-100">
              <tr>
                <th className="p-2 font-semibold text-left">#</th>
                <th className="p-2 font-semibold text-left">#</th>
                <th className="p-2 font-semibold text-left">title</th>
                <th className="p-2 font-semibold text-left">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-300">
              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={deanshipStudentServices}
                  strategy={verticalListSortingStrategy}
                >
                  {deanshipStudentServices.map((nw, x) => (
                    <SortableItem key={nw.id} id={nw.id}>
                      <td className="p-2">{x + 1}</td>
                      <td className="p-2">{nw?.title?.en}</td>
                      <td className="p-2">
                        <div className="flex items-center gap-2">
                          <button
                            className="group"
                            onClick={(e) => editNews(nw.id)}
                          >
                            <PencilSquareIcon className="w-6 h-6 transform transition-all group-hover:scale-110 text-gray-500 hover:text-gray-900" />
                          </button>
                          <DeleteItem
                            id={nw.id}
                            dispatchAction={() =>
                              dispatch(deleteDeanshipStudentService(nw.id))
                            }
                          />
                        </div>
                      </td>
                    </SortableItem>
                  ))}
                </SortableContext>
              </DndContext>
            </tbody>
          </table>
        </div>
      </Main>
    </>
  );

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      const activeIndex = deanshipStudentServices
        .map((r) => r.id)
        .indexOf(active.id);
      const overIndex = deanshipStudentServices
        .map((r) => r.id)
        .indexOf(over.id);

      const items = arrayMove(deanshipStudentServices, activeIndex, overIndex);

      dispatch(sortDeanshipStudentServices(items));

      const itemsAfterSort = items.map((item, x) => ({
        id: item.id,
        seqNo: x,
      }));

      dispatch(sortDeanshipStudentService(itemsAfterSort));
    }
  }
}

export default DeanshipStudentService;
