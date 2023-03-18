"use client";
import DeleteItem from "@/components/DeleteItem";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import { SortableItem } from "@/components/SortableItem";
import { useAppDispatch } from "@/store";
import {
  deleteEService,
  fetchEServices,
  setCurrentEService,
  sortEService,
  sortEServices,
  useEService,
} from "@/store/electronic-service";

import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { PencilSquareIcon, PlusIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import Main from "../Main";
import EserviceForm from "./EServiceForm";

function Eservice() {
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();

  const { eServices, loading } = useEService();

  useEffect(() => {
    dispatch(fetchEServices());
  }, []);

  useEffect(() => {
    if (open === false) {
      dispatch(setCurrentEService(null));
    }
  }, [open]);

  async function editEservice(id: string) {
    setOpen(true);
    dispatch(setCurrentEService(id));
  }
  return (
    <>
      <Header title="News">
        <button className="btn btn--primary mt-3" onClick={() => setOpen(true)}>
          <PlusIcon className="w-6 h-6" />
          Add New Vision & Mission
        </button>
      </Header>

      <Modal
        open={open}
        setOpen={setOpen}
        title="Add New College"
        width="max-w-3xl"
      >
        <EserviceForm setClose={setOpen} />
      </Modal>
      <Main>
        <div className="overflow-x-auto ">
          <table className="table-auto w-full ">
            <thead className="text-xs font-semibold uppercase text-gray-600 bg-gray-100">
              <tr>
                <th className="p-2 font-semibold text-left">#</th>
                <th className="p-2 font-semibold text-left">#</th>
                <th className="p-2 font-semibold text-left">Name</th>
                <th className="p-2 font-semibold text-left">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-300">
              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={eServices}
                  strategy={verticalListSortingStrategy}
                >
                  {eServices.map((nw, x) => (
                    <SortableItem key={nw.id} id={nw.id}>
                      <td className="p-2">{x + 1}</td>
                      <td className="p-2">
                        <div className="flex items-center gap-1">
                          {nw?.icon && (
                            <i
                              className={`${nw.icon} text-brand-600 text-2xl`}
                            ></i>
                          )}
                          {nw?.titleEn}
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="flex items-center gap-2">
                          <button
                            className="group"
                            onClick={(e) => editEservice(nw.id)}
                          >
                            <PencilSquareIcon className="w-6 h-6 transform transition-all group-hover:scale-110 text-gray-500 hover:text-gray-900" />
                          </button>
                          <DeleteItem
                            id={nw.id}
                            dispatchAction={() =>
                              dispatch(deleteEService(nw.id))
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
    console.log("Drag end called");
    const { active, over } = event;
    console.log("ACTIVE: " + active.id);
    console.log("OVER :" + over.id);

    if (active.id !== over.id) {
      const activeIndex = eServices.map((r) => r.id).indexOf(active.id);
      const overIndex = eServices.map((r) => r.id).indexOf(over.id);

      const items = arrayMove(eServices, activeIndex, overIndex);

      dispatch(sortEService(items));

      const itemsAfterSort = items.map((item, x) => ({
        id: item.id,
        seqNo: x,
      }));

      dispatch(sortEServices(itemsAfterSort));
    }
  }
}

export default Eservice;
