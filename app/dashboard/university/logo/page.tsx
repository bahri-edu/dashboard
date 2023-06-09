"use client";
import DeleteItem from "@/components/DeleteItem";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import { SortableItem } from "@/components/SortableItem";
import { useAppDispatch } from "@/store";
import {
  deleteLogo,
  fetchLogo,
  setCurrentLogo,
  sortLogo,
  sortLogos,
  useLogo,
} from "@/store/university/logo";
import { closestCenter, DndContext } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { PencilSquareIcon, PlusIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import Main from "../../Main";
import LogoForm from "./LogoForm";

function Logo() {
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();

  const { logos, loading } = useLogo();

  useEffect(() => {
    dispatch(fetchLogo());
  }, []);

  useEffect(() => {
    if (open === false) {
      dispatch(setCurrentLogo(null));
    }
  }, [open]);

  async function editNews(id: string) {
    setOpen(true);
    dispatch(setCurrentLogo(id));
  }
  return (
    <>
      <Header title="Logo">
        <button className="btn btn--primary mt-3" onClick={() => setOpen(true)}>
          <PlusIcon className="w-6 h-6" />
          Add Logo Description
        </button>
      </Header>

      <Modal
        open={open}
        setOpen={setOpen}
        title="Add New Vision & Mission"
        width="max-w-5xl"
      >
        <LogoForm setClose={setOpen} />
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
                  items={logos}
                  strategy={verticalListSortingStrategy}
                >
                  {logos.map((logo, x) => (
                    <SortableItem key={logo.id} id={logo.id}>
                      <td className="p-2">{x + 1}</td>
                      <td>{logo?.title?.en}</td>

                      <td className="p-2">
                        <div className="flex items-center gap-2">
                          <button
                            className="group"
                            onClick={(e) => editNews(logo.id)}
                          >
                            <PencilSquareIcon className="w-6 h-6 transform transition-all group-hover:scale-110 text-gray-500 hover:text-gray-900" />
                          </button>
                          <DeleteItem
                            id={logo.id}
                            dispatchAction={() => dispatch(deleteLogo(logo.id))}
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
      const activeIndex = logos.map((r) => r.id).indexOf(active.id);
      const overIndex = logos.map((r) => r.id).indexOf(over.id);

      const items = arrayMove(logos, activeIndex, overIndex);

      dispatch(sortLogos(items));

      const itemsAfterSort = items.map((item, x) => ({
        id: item.id,
        seqNo: x,
      }));

      dispatch(sortLogo(itemsAfterSort));
    }
  }
}

export default Logo;
