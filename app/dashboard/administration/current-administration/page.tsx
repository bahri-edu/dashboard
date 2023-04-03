"use client";
import DeleteItem from "@/components/DeleteItem";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import { useAppDispatch } from "@/store";
import {
  deleteCurrentAdministration,
  fetchCurrentAdministrations,
  setCurrentAdministration,
  useCurrentAdministration,
} from "@/store/administration";
import { PencilSquareIcon, PlusIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";
import Main from "../../Main";
import CurrentAdminstrationForm from "./CurrentAdminstrationForm";

function CurrentAdministration() {
  const dispatch = useAppDispatch();

  const { currentAdministrations, currentAdministrationId } =
    useCurrentAdministration();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    (() => dispatch(fetchCurrentAdministrations()))();
  }, [dispatch]);

  useEffect(() => {
    if (open === false) {
      dispatch(setCurrentAdministration(null));
    }
  }, [open]);

  async function editCollege(id: string) {
    setOpen(true);
    dispatch(setCurrentAdministration(id));
  }

  return (
    <>
      <Header title="Current Administration">
        <button className="btn btn--primary mt-3" onClick={() => setOpen(true)}>
          <PlusIcon className="w-6 h-6" />
          Add new Current Administration
        </button>
      </Header>
      <Modal
        open={open}
        setOpen={setOpen}
        title="Add New College"
        width="max-w-4xl"
      >
        <CurrentAdminstrationForm setClose={setOpen} />
      </Modal>

      <Main>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead className="text-xs font-semibold uppercase text-gray-600 bg-gray-100">
              <tr>
                <th className="p-2 font-semibold text-left">#</th>
                <th className="p-2 font-semibold text-left"> Position</th>
                <th className="p-2 font-semibold text-left">Name</th>
                <th className="p-2 font-semibold text-left">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-300">
              {currentAdministrations.map((crt, x) => (
                <tr key={crt.id}>
                  <td className="p-2">{x + 1}</td>
                  <td className="p-2">{crt?.position?.en}</td>
                  <td className="p-2">{crt?.name?.en}</td>
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <button
                        className="group"
                        onClick={() => editCollege(crt.id)}
                      >
                        <PencilSquareIcon className="w-6 h-6 transform transition-all group-hover:scale-110 text-gray-500 hover:text-gray-900" />
                      </button>
                      <DeleteItem
                        id={crt.id}
                        dispatchAction={() =>
                          dispatch(deleteCurrentAdministration(crt.id))
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

export default CurrentAdministration;
