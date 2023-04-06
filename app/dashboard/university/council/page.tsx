"use client";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import { useAppDispatch } from "@/store";
import {
  deleteCouncil,
  fetchCouncils,
  setCurrentCouncil,
  useCouncil,
} from "@/store/university";
import { PencilSquareIcon, PlusIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";
import Main from "../../Main";
import DeleteItem from "@/components/DeleteItem";
import CouncilForm from "./CouncilForm";

function Council() {
  const dispatch = useAppDispatch();

  const { councils } = useCouncil();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    (() => dispatch(fetchCouncils()))();
  }, [dispatch]);

  useEffect(() => {
    if (open === false) {
      dispatch(setCurrentCouncil(null));
    }
  }, [open]);

  async function editNews(id: string) {
    setOpen(true);
    dispatch(setCurrentCouncil(id));
  }

  return (
    <>
      <Header title="Councils">
        <button className="btn btn--primary mt-3" onClick={() => setOpen(true)}>
          <PlusIcon className="w-6 h-6" />
          Add Council
        </button>
      </Header>
      <Modal
        open={open}
        setOpen={setOpen}
        title="Add New Council"
        width="max-w-7xl"
      >
        <CouncilForm setClose={setOpen} />
      </Modal>

      <Main>
        <div className="overflow-x-auto ">
          <table className="table-auto w-full ">
            <thead className="text-xs font-semibold uppercase text-gray-600 bg-gray-100">
              <tr>
                <th className="p-2 font-semibold text-left">#</th>
                <th className="p-2 font-semibold text-left">Image</th>
                <th className="p-2 font-semibold text-left">Title</th>
                <th className="p-2 font-semibold text-left">Type</th>
                <th className="p-2 font-semibold text-left">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-300">
              {councils.map((nw, x) => (
                <tr key={nw.id}>
                  <td className="p-2">{x + 1}</td>
                  <td className="p-2">
                    {nw?.image && (
                      <img
                        className="w-12 h-12 rounded-full"
                        src={uploadFileUrl + nw.image}
                        alt="image"
                      />
                    )}
                  </td>
                  <td className="p-2">{nw?.title?.["en"]}</td>
                  <td className="p-2">{nw?.councilType}</td>
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <button className="group" onClick={() => editNews(nw.id)}>
                        <PencilSquareIcon className="w-6 h-6 transform transition-all group-hover:scale-110 text-gray-500 hover:text-gray-900" />
                      </button>
                      <DeleteItem
                        id={nw.id}
                        dispatchAction={() => dispatch(deleteCouncil(nw.id))}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Main>
    </>
  );
}

export default Council;
