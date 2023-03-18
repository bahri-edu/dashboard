"use client";
import DeleteItem from "@/components/DeleteItem";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import { useAppDispatch } from "@/store";
import {
  deleteHistoricalBackground,
  fetchHistoricalBackground,
  setCurrentHistoricalBackground,
  useHistoricalBackground,
} from "@/store/university";
import { PencilSquareIcon, PlusIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import Main from "../../Main";
import HistoricalBackgroundForm from "./HistoricalBackgroundForm";

function HistoricalBackground() {
  const dispatch = useAppDispatch();

  const { historicalBackground } = useHistoricalBackground();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    (() => dispatch(fetchHistoricalBackground()))();
  }, [dispatch]);

  useEffect(() => {
    if (open === false) {
      dispatch(setCurrentHistoricalBackground(null));
    }
  }, [open]);

  async function editHistoricalBackground(id: string) {
    setOpen(true);
    dispatch(setCurrentHistoricalBackground(id));
  }

  return (
    <>
      <Header title="News">
        <button className="btn btn--primary mt-3" onClick={() => setOpen(true)}>
          <PlusIcon className="w-6 h-6" />
          Add Historical Background
        </button>
      </Header>
      <Modal
        open={open}
        setOpen={setOpen}
        title="Add New Historical Background"
        width="max-w-full"
      >
        <HistoricalBackgroundForm setClose={setOpen} />
      </Modal>

      <Main>
        <div className="overflow-x-auto ">
          <table className="table-auto w-full ">
            <thead className="text-xs font-semibold uppercase text-gray-600 bg-gray-100">
              <tr>
                <th className="p-2 font-semibold text-left">#</th>
                <th className="p-2 font-semibold text-left">Name</th>
                <th className="p-2 font-semibold text-left">Code</th>
                <th className="p-2 font-semibold text-left">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-300">
              {historicalBackground.map((nw, x) => (
                <tr key={nw.id}>
                  <td className="p-2">{x + 1}</td>
                  <td className="p-2">{nw?.titleEn}</td>
                  <td className="p-2">{nw?.titleAr}</td>
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <button
                        className="group"
                        onClick={() => editHistoricalBackground(nw.id)}
                      >
                        <PencilSquareIcon className="w-6 h-6 transform transition-all group-hover:scale-110 text-gray-500 hover:text-gray-900" />
                      </button>
                      <DeleteItem
                        id={nw.id}
                        dispatchAction={() =>
                          dispatch(deleteHistoricalBackground(nw.id))
                        }
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

export default HistoricalBackground;
