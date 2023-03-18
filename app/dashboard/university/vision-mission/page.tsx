"use client";
import DeleteItem from "@/components/DeleteItem";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import { useAppDispatch } from "@/store";
import {
  deleteVisionMission,
  fetchVisionMission,
  setCurrentVisionMission,
  sortItems,
  sortVisionMission,
  useVisionMission,
} from "@/store/university";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { PencilSquareIcon, PlusIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
// import { useDrag } from "react-dnd";

import Main from "../../Main";
import { SortableItem } from "../../../../components/SortableItem";
import VisionForm from "./VisionForm";

function VisionMission() {
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();

  const { visionMission, loading } = useVisionMission();

  useEffect(() => {
    dispatch(fetchVisionMission());
  }, []);

  useEffect(() => {
    if (open === false) {
      dispatch(setCurrentVisionMission(null));
    }
  }, [open]);

  async function editNews(id: string) {
    setOpen(true);
    dispatch(setCurrentVisionMission(id));
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
        width="max-w-full"
      >
        <VisionForm setClose={setOpen} />
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
                  items={visionMission}
                  strategy={verticalListSortingStrategy}
                >
                  {visionMission.map((nw, x) => (
                    <SortableItem key={nw.id} id={nw.id}>
                      <td className="p-2">{x + 1}</td>
                      <td className="p-2">{nw?.titleEn}</td>
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
                              dispatch(deleteVisionMission(nw.id))
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
      const activeIndex = visionMission.map((r) => r.id).indexOf(active.id);
      const overIndex = visionMission.map((r) => r.id).indexOf(over.id);

      const items = arrayMove(visionMission, activeIndex, overIndex);

      dispatch(sortItems(items));

      const itemsAfterSort = items.map((item, x) => ({
        id: item.id,
        seqNo: x,
      }));

      dispatch(sortVisionMission(itemsAfterSort));
    }
  }
}

export default VisionMission;
