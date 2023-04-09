"use client";
import DeleteItem from "@/components/DeleteItem";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import { useAppDispatch } from "@/store";

import { PencilSquareIcon, PlusIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import Main from "../Main";
import {
  deleteStaff,
  fetchStaffs,
  setCurrentStaff,
  useStaff,
} from "@/store/staff";
import StaffForm from "./StaffForm";

function Staff() {
  const dispatch = useAppDispatch();

  const { staffs, currentStaffId } = useStaff();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    (() => dispatch(fetchStaffs()))();
  }, [dispatch]);

  useEffect(() => {
    if (open === false) {
      dispatch(setCurrentStaff(null));
    }
  }, [open]);

  async function editCollege(id: string) {
    setOpen(true);
    dispatch(setCurrentStaff(id));
  }

  return (
    <>
      <Header title="Staff">
        <button className="btn btn--primary mt-3" onClick={() => setOpen(true)}>
          <PlusIcon className="w-6 h-6" />
          Add new Staff
        </button>
      </Header>
      <Modal
        open={open}
        setOpen={setOpen}
        title="Add New College"
        width="max-w-4xl"
      >
        <StaffForm setClose={setOpen} />
      </Modal>

      <Main>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead className="text-xs font-semibold uppercase text-gray-600 bg-gray-100">
              <tr>
                <th className="p-2 font-semibold text-left">#</th>
                <th className="p-2 font-semibold text-left">Name</th>
                <th className="p-2 font-semibold text-left">Possion</th>
                <th className="p-2 font-semibold text-left">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-300">
              {staffs.map(({ id, name, possison }, x) => (
                <tr key={id}>
                  <td className="p-2">{x + 1}</td>
                  <td className="p-2">{name?.en}</td>
                  <td className="p-2">{possison?.en}</td>
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <button className="group" onClick={() => editCollege(id)}>
                        <PencilSquareIcon className="w-6 h-6 transform transition-all group-hover:scale-110 text-gray-500 hover:text-gray-900" />
                      </button>
                      <DeleteItem
                        id={id}
                        dispatchAction={() => dispatch(deleteStaff(id))}
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

export default Staff;
