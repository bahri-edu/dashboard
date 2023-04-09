"use client";
import DeleteItem from "@/components/DeleteItem";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import { useAppDispatch } from "@/store";
import {
  deleteDeanship,
  fetchDeanshipAdministrations,
  fetchDeanships,
  setCurrentDeanship,
  sortDeanship,
  sortDeanships,
  useDeanship,
} from "@/store/deanship";

import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { PencilSquareIcon, PlusIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import DeanshipForm from "../DeanshipForm";
import Main from "../../Main";
import { SortableItem } from "@/components/SortableItem";
import DeanshipAdministration from "../DeanshipAdministration";
import DeanshipStudentService from "../DeanshipStudentService";
import DeanshipDepartment from "../DeanshipDepartment";
// import { useDrag } from "react-dnd";

type Params = {
  params: {
    type: string;
  };
};

function Deanships({ params: { type } }: Params) {
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();

  const { deanships, loading } = useDeanship();

  useEffect(() => {
    dispatch(fetchDeanships(type));
  }, []);

  useEffect(() => {
    if (open === false) {
      dispatch(setCurrentDeanship(null));
    }
  }, [open]);

  async function editNews(id: string) {
    setOpen(true);
    dispatch(setCurrentDeanship(id));
  }
  return (
    <>
      <Header title="Deanship">
        <button className="btn btn--primary mt-3" onClick={() => setOpen(true)}>
          <PlusIcon className="w-6 h-6" />
          Add New Deanship
        </button>
      </Header>

      <Modal
        open={open}
        setOpen={setOpen}
        title="Add New Deanship"
        width="max-w-5xl"
      >
        <DeanshipForm setClose={setOpen} />
      </Modal>
      <Main>
        <div className="overflow-x-auto">
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
                  items={deanships}
                  strategy={verticalListSortingStrategy}
                >
                  {deanships.map((nw, x) => (
                    <SortableItem key={nw.id} id={nw.id}>
                      <td className="p-2">{x + 1}</td>
                      <td className="p-2">
                        {nw?.icon && (
                          <i
                            className={`${nw.icon} text-brand-600 text-2xl`}
                          ></i>
                        )}
                        {nw?.title?.en}
                      </td>
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
                              dispatch(deleteDeanship(nw.id))
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

          <div className="col-span-full flex  flex-col gap-2 ">
            <h2 className="text-3xl text-brand-600">
              {" "}
              Deanship Administration
            </h2>

            <DeanshipAdministration deanshipType={type} />
          </div>

          <div className="col-span-full flex  flex-col gap-2 ">
            <h2 className="text-3xl text-brand-600">
              {" "}
              Deanship Student Service
            </h2>

            <DeanshipStudentService deanshipType={type} />
          </div>

          <div className="col-span-full flex  flex-col gap-2 ">
            <h2 className="text-3xl text-brand-600"> Deanship Department</h2>

            <DeanshipDepartment deanshipType={type} />
          </div>
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
      const activeIndex = deanships.map((r) => r.id).indexOf(active.id);
      const overIndex = deanships.map((r) => r.id).indexOf(over.id);

      const items = arrayMove(deanships, activeIndex, overIndex);

      dispatch(sortDeanships(items));

      const itemsAfterSort = items.map((item, x) => ({
        id: item.id,
        seqNo: x,
      }));

      dispatch(sortDeanship(itemsAfterSort));
    }
  }
}

export default Deanships;
