"use client";
import DeleteItem from "@/components/DeleteItem";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import { useAppDispatch } from "@/store";
import {
  deleteCollege,
  fetchColleges,
  setCurrentCollege,
  useCollege,
} from "@/store/college";
import { PencilSquareIcon, PlusIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import Main from "../Main";
import CollegeForm from "./CollegeForm";

function College() {
  const dispatch = useAppDispatch();

  const { colleges, currentCollegeId } = useCollege();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    (() => dispatch(fetchColleges()))();
  }, [dispatch]);

  useEffect(() => {
    if (open === false) {
      dispatch(setCurrentCollege(null));
    }
  }, [open]);

  async function editCollege(id: string) {
    setOpen(true);
    dispatch(setCurrentCollege(id));
  }

  return (
    <>
      <Header title="Colleges">
        <button className="btn btn--primary mt-3" onClick={() => setOpen(true)}>
          <PlusIcon className="w-6 h-6" />
          Add new College
        </button>
      </Header>
      <Modal open={open} setOpen={setOpen} title="Add New College">
        <CollegeForm setClose={setOpen} />
      </Modal>

      <Main>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead className="text-xs font-semibold uppercase text-gray-600 bg-gray-100">
              <tr>
                <th className="p-2 font-semibold text-left">#</th>
                <th className="p-2 font-semibold text-left">Name</th>
                <th className="p-2 font-semibold text-left">Code</th>
                <th className="p-2 font-semibold text-left">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-300">
              {colleges.map((college, x) => (
                <tr key={college.id}>
                  <td className="p-2">{x + 1}</td>
                  <td className="p-2">{college?.nameEn}</td>
                  <td className="p-2">{college?.code}</td>
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <button
                        className="group"
                        onClick={() => editCollege(college.id)}
                      >
                        <PencilSquareIcon className="w-6 h-6 transform transition-all group-hover:scale-110 text-gray-500 hover:text-gray-900" />
                      </button>
                      <DeleteItem
                        id={college.id}
                        dispatchAction={() =>
                          dispatch(deleteCollege(college.id))
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

export default College;
