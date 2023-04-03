"use client";
import DeleteItem from "@/components/DeleteItem";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import { SortableItem } from "@/components/SortableItem";
import { useAppDispatch } from "@/store";
import {
  deleteUploadFile,
  fetchUploadFiles,
  setCurrentUploadFile,
  sortUploadFile,
  sortUploadFiles,
  useUploadFile,
} from "@/store/university";
import { closestCenter, DndContext } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { PencilSquareIcon, PlusIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import Main from "../../Main";
import UploadFileForm from "./UploadFileForm";

function UploadFiles() {
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();

  const { uploadFiles, loading } = useUploadFile();

  useEffect(() => {
    dispatch(fetchUploadFiles());
  }, []);

  useEffect(() => {
    if (open === false) {
      dispatch(setCurrentUploadFile(null));
    }
  }, [open]);

  async function editNews(id: string) {
    setOpen(true);
    dispatch(setCurrentUploadFile(id));
  }
  return (
    <>
      <Header title="Upload Files">
        <button className="btn btn--primary mt-3" onClick={() => setOpen(true)}>
          <PlusIcon className="w-6 h-6" />
          Add Upload File
        </button>
      </Header>

      <Modal
        open={open}
        setOpen={setOpen}
        title="Add New Upload File"
        width="max-w-5xl"
      >
        <UploadFileForm setClose={setOpen} />
      </Modal>
      <Main>
        <div className="overflow-x-auto ">
          <table className="table-auto w-full ">
            <thead className="text-xs font-semibold uppercase text-gray-600 bg-gray-100">
              <tr>
                <th className="p-2 font-semibold text-left">#</th>
                <th className="p-2 font-semibold text-left">#</th>
                <th className="p-2 font-semibold text-left">Title</th>
                <th className="p-2 font-semibold text-left">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-300">
              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={uploadFiles}
                  strategy={verticalListSortingStrategy}
                >
                  {uploadFiles.map((file, x) => (
                    <SortableItem key={file.id} id={file.id}>
                      <td className="p-2">{x + 1}</td>
                      <td>{file?.title?.en}</td>

                      <td className="p-2">
                        <div className="flex items-center gap-2">
                          <button
                            className="group"
                            onClick={(e) => editNews(file.id)}
                          >
                            <PencilSquareIcon className="w-6 h-6 transform transition-all group-hover:scale-110 text-gray-500 hover:text-gray-900" />
                          </button>
                          <DeleteItem
                            id={file.id}
                            dispatchAction={() =>
                              dispatch(deleteUploadFile(file.id))
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
      const activeIndex = uploadFiles.map((r) => r.id).indexOf(active.id);
      const overIndex = uploadFiles.map((r) => r.id).indexOf(over.id);

      const items = arrayMove(uploadFiles, activeIndex, overIndex);

      dispatch(sortUploadFiles(items));

      const itemsAfterSort = items.map((item, x) => ({
        id: item.id,
        seqNo: x,
      }));

      dispatch(sortUploadFile(itemsAfterSort));
    }
  }
}

export default UploadFiles;
