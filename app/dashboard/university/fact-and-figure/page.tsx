"use client";
import DeleteItem from "@/components/DeleteItem";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import { useAppDispatch } from "@/store";
import {
  deleteFactAndFigure,
  FactType,
  fetchFactAndFigure,
  setCurrentFactAndFigure,
  useFactAndFigure,
} from "@/store/university";
import { PencilSquareIcon, PlusIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import Main from "../../Main";
import FactAndFigureForm from "./FactAndFigureForm";

function FactAndFigure() {
  const dispatch = useAppDispatch();

  const { factAndFigure } = useFactAndFigure();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    (() => dispatch(fetchFactAndFigure()))();
  }, [dispatch]);

  useEffect(() => {
    if (open === false) {
      dispatch(setCurrentFactAndFigure(null));
    }
  }, [open]);

  async function editsetCurrentFactAndFigure(id: string) {
    setOpen(true);
    dispatch(setCurrentFactAndFigure(id));
  }

  return (
    <>
      <Header title="News">
        <button className="btn btn--primary mt-3" onClick={() => setOpen(true)}>
          <PlusIcon className="w-6 h-6" />
          Add Fact And Figure
        </button>
      </Header>
      <Modal open={open} setOpen={setOpen} title="Add New Fact And Figure">
        <FactAndFigureForm setClose={setOpen} />
      </Modal>

      <Main>
        <div className="overflow-x-auto ">
          <table className="table-auto w-full ">
            <thead className="text-xs font-semibold uppercase text-gray-600 bg-gray-100">
              <tr>
                <th className="p-2 font-semibold text-left">#</th>
                <th className="p-2 font-semibold text-left">Count</th>
                <th className="p-2 font-semibold text-left">Description</th>
                <th className="p-2 font-semibold text-left">Type</th>
                <th className="p-2 font-semibold text-left">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-300">
              {factAndFigure.map((nw, x) => (
                <tr key={nw.id}>
                  <td className="p-2">{x + 1}</td>
                  <td className="p-2">{nw?.count}</td>
                  <td className="p-2">{nw?.descriptionEn}</td>
                  <td className="p-2">
                    {nw.type === FactType.STAFF ? (
                      <span className="bg-blue-100 p-1 rounded-lg text-blue-600">
                        Staff
                      </span>
                    ) : (
                      <span className="bg-green-100 p-1 rounded-lg text-green-600">
                        Student
                      </span>
                    )}
                  </td>
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <button
                        className="group"
                        onClick={() => editsetCurrentFactAndFigure(nw.id)}
                      >
                        <PencilSquareIcon className="w-6 h-6 transform transition-all group-hover:scale-110 text-gray-500 hover:text-gray-900" />
                      </button>
                      <DeleteItem
                        id={nw.id}
                        dispatchAction={() =>
                          dispatch(deleteFactAndFigure(nw.id))
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

export default FactAndFigure;
