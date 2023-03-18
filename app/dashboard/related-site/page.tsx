"use client";
import DeleteItem from "@/components/DeleteItem";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import { SortableItem } from "@/components/SortableItem";
import { useAppDispatch } from "@/store";
import {
  deleteRelatedSite,
  fetchRelatedSite,
  setCurrentRelatedSite,
  sortRelatedSite,
  sortRelatedSiteTemp,
  useRelatedSite,
} from "@/store/related-site";

import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { PencilSquareIcon, PlusIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import Main from "../Main";
import RealatedSiteForm from "./realatedSiteForm";

function RelatedSite() {
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();

  const { loading, relatedSite } = useRelatedSite();

  useEffect(() => {
    dispatch(fetchRelatedSite());
  }, []);

  useEffect(() => {
    if (open === false) {
      dispatch(setCurrentRelatedSite(null));
    }
  }, [open, dispatch]);

  async function editEservice(id: string) {
    setOpen(true);
    dispatch(setCurrentRelatedSite(id));
  }
  return (
    <>
      <Header title="News">
        <button className="btn btn--primary mt-3" onClick={() => setOpen(true)}>
          <PlusIcon className="w-6 h-6" />
          Add New Related Site
        </button>
      </Header>

      <Modal
        open={open}
        setOpen={setOpen}
        title="Add New College"
        width="max-w-3xl"
      >
        <RealatedSiteForm setClose={setOpen} />
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
                  items={relatedSite}
                  strategy={verticalListSortingStrategy}
                >
                  {relatedSite.map((nw, x) => (
                    <SortableItem key={nw.id} id={nw.id}>
                      <td className="p-2">{x + 1}</td>
                      <td className="p-2">
                        {nw.text["ar"]}
                        {/* <div className="flex items-center gap-1">
                          {nw?.icon && (
                            <i
                              className={`${nw.icon} text-brand-600 text-2xl`}
                            ></i>
                          )}
                          {nw?.titleEn}
                        </div> */}
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
                              dispatch(deleteRelatedSite(nw.id))
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
      const activeIndex = relatedSite.map((r) => r.id).indexOf(active.id);
      const overIndex = relatedSite.map((r) => r.id).indexOf(over.id);

      const items = arrayMove(relatedSite, activeIndex, overIndex);

      dispatch(sortRelatedSiteTemp(items));

      const itemsAfterSort = items.map((item, x) => ({
        id: item.id,
        seqNo: x,
      }));

      dispatch(sortRelatedSite(itemsAfterSort));
    }
  }
}

export default RelatedSite;
