"use client";
import Main from "@/app/dashboard/Main";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import { useAppDispatch } from "@/store";
import {
  fetchMessages,
  setCurrentMessage,
  useViceChancellorMessage,
} from "@/store/administration";
import { PencilIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import MessageForm from "./MessageForm";

function ViceChancellorMessage() {
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();

  const { loading, messages } = useViceChancellorMessage();

  const [message] = messages;

  useEffect(() => {
    dispatch(fetchMessages());
  }, []);

  useEffect(() => {
    if (open === false) {
      dispatch(setCurrentMessage(null));
    }
  }, [open, dispatch]);

  //   async function editEservice(id: string) {
  //     setOpen(true);
  //     dispatch(setCurrentRelatedSite(id));
  //   }

  return (
    <>
      <Header title="Vice Chancellor Message">
        <button
          className="btn btn--primary mt-3"
          onClick={() => {
            dispatch(setCurrentMessage(message?.id || null));
            setOpen(true);
          }}
        >
          <PencilIcon className="w-6 h-6" />
          Edit Message
        </button>
      </Header>

      <Modal
        open={open}
        setOpen={setOpen}
        title="Edit Message"
        width="max-w-3xl"
      >
        <MessageForm setClose={setOpen} />
      </Modal>
      <Main>
        <div className="flex flex-col gap-6">
          <h3 className="text-brand-600 font-extrabold text-3xl">
            {message?.title?.en}
          </h3>

          <div className="flex flex-col gap-7">
            {message?.descriptions?.map((mes, x) => (
              <p key={`message-description-${x}`}>{mes?.en}</p>
            ))}
          </div>
        </div>
      </Main>
    </>
  );
}

export default ViceChancellorMessage;
