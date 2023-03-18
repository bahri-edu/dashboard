"use client";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import { useAppDispatch } from "@/store";
import { fetchContact, setCurrentContact, useContact } from "@/store/contact";

import { PencilIcon, PlusIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import Main from "../Main";

function Contact() {
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();

  const { loading, contact } = useContact();

  const [con] = contact

  useEffect(() => {
    dispatch(fetchContact());
  }, []);

  useEffect(() => {
    if (open === false) {
      dispatch(setCurrentContact(null));
    }
  }, [open, dispatch]);

  //   async function editEservice(id: string) {
  //     setOpen(true);
  //     dispatch(setCurrentRelatedSite(id));
  //   }

  return (
    <>
      <Header title="Contact">
        <button className="btn btn--primary mt-3" onClick={() => setOpen(true)}>
          <PencilIcon className="w-6 h-6" />
          Edit Contact
        </button>
      </Header>

      <Modal
        open={open}
        setOpen={setOpen}
        title="Add New College"
        width="max-w-3xl"
      >
        {/* <RealatedSiteForm setClose={setOpen} /> */}
      </Modal>
      <Main>
        <div className="flex flex-col">
          <div className="flex flex-col">
            <span className="text-sm text-gray-400">Location</span>
            <p>{location}</p>
          </div>

          <div className="flex flex-col">
            <span className="text-sm text-gray-400">email</span>
            <p>{JSON.stringify(contact)}</p>
          </div>

          <div className="flex flex-col">
            <span className="text-sm text-gray-400">phons</span>
            <p>السودان - الخرطوم السودان - الخرطوم</p>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-400">socials</span>
            <p>السودان - الخرطوم السودان - الخرطوم</p>
          </div>
        </div>
      </Main>
    </>
  );
}

export default Contact;
