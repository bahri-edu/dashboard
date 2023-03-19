"use client";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import { useAppDispatch } from "@/store";
import { fetchContact, setCurrentContact, useContact } from "@/store/contact";

import {
  EnvelopeIcon,
  MapPinIcon,
  PencilIcon,
  PhoneIcon,
  PlusIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import Main from "../Main";
import ContactForm from "./ContactForm";

function Contact() {
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();

  const { loading, contact } = useContact();

  const [con] = contact;

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

        <ContactForm setClose={setOpen} />
      </Modal>
      <Main>
        <div className="flex flex-col gap-4 divide-y">
          <div className="flex flex-col">
            <span className="flex text-sm text-gray-400 gap-2">
              <MapPinIcon className="w-4 h-4" />
              <span>Location</span>
            </span>
            <p>{con?.location?.en}</p>
          </div>

          <div className="flex flex-col">
            <span className="flex text-sm text-gray-400 gap-2">
              <EnvelopeIcon className="w-4 h-4" />
              <span>email</span>
            </span>
            <p>{con?.email}</p>
          </div>

          <div className="flex flex-col">
            <span className="flex text-sm text-gray-400 gap-2">
              <PhoneIcon className="w-4 h-4" />
              <span>phons</span>
            </span>
            {con?.phone?.map((p) => (
              <span key={p}>{p}</span>
            ))}
          </div>
          <div className="flex flex-col">
            <span className="flex text-sm text-gray-400 gap-2">
              <ShareIcon className="w-4 h-4" />
              <span>socials</span>
            </span>
            {con?.socials?.map((s) => (
              <span key={crypto.randomUUID()}>{crypto.randomUUID()}</span>
            ))}
          </div>
        </div>
      </Main>
    </>
  );
}

export default Contact;
