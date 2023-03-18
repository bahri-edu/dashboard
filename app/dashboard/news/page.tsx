"use client";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import { useAppDispatch } from "@/store";
import { fetchNews, setCurrentNews, useNews } from "@/store/news";
import { uploadFileUrl } from "@/utils/http.util";
import { PencilSquareIcon, PlusIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import Main from "../Main";
import DeleteNews from "./DeleteNews";
import NewsForm from "./NewsForm";

function News() {
  const dispatch = useAppDispatch();

  const { news } = useNews();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    (() => dispatch(fetchNews()))();
  }, [dispatch]);

  useEffect(() => {
    if (open === false) {
      dispatch(setCurrentNews(null));
    }
  }, [open]);

  async function editNews(id: string) {
    setOpen(true);
    dispatch(setCurrentNews(id));
  }

  return (
    <>
      <Header title="News">
        <button className="btn btn--primary mt-3" onClick={() => setOpen(true)}>
          <PlusIcon className="w-6 h-6" />
          Add News
        </button>
      </Header>
      <Modal
        open={open}
        setOpen={setOpen}
        title="Add New College"
        width="max-w-7xl"
      >
        <NewsForm setClose={setOpen} />
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
              {news.map((nw, x) => (
                <tr key={nw.id}>
                  <td className="p-2">{x + 1}</td>
                  <td className="p-2">
                    {nw?.images && nw.images.length > 0 && (
                      <img
                        className="w-12 h-12 rounded-full"
                        src={uploadFileUrl + nw.images[0]}
                        alt="image"
                      />
                    )}
                  </td>
                  <td className="p-2">{nw?.titleEn}</td>
                  <td className="p-2">{nw?.type}</td>
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <button className="group" onClick={() => editNews(nw.id)}>
                        <PencilSquareIcon className="w-6 h-6 transform transition-all group-hover:scale-110 text-gray-500 hover:text-gray-900" />
                      </button>
                      <DeleteNews id={nw.id} />
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

export default News;
