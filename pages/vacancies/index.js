import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import Button from "../../base/Button.base";
import { AddFolder, Folder } from "../../components/Folder.components";
import Header from "../../components/Header.components";
import Modal from "../../components/Modal.components";
import { useFolder } from "../../contexts/FolderContext";
import { useTranslation } from "../../contexts/LocalizeContext";
import Page from "../../layouts/page.layout";
import Section from "../../layouts/section.layout";
import CreateFolderModal from "../../modals/folders/CreateFolder.modal";
import DeleteFolderModal from "../../modals/folders/DeleteFolder.model";
import EditFolderModal from "../../modals/folders/EditFolder.modal";

export default function Vacancies() {
  const { folders, get } = useFolder();
  const { VACANCIES } = useTranslation();
  const { push } = useRouter();
  const ref = useRef();
  const editRef = useRef();
  const deleteRef = useRef();

  useEffect(() => {
    get();
  }, []);

  return (
    <Section>
      <Header title={VACANCIES.HEADER} />
      <CreateFolderModal ref={ref} />
      <EditFolderModal ref={editRef} />
      <DeleteFolderModal ref={deleteRef} />
      <Page>
        <div className="folder-grid" style={{ minHeight: 280 }}>
          <AddFolder onClick={() => ref.current.open()} />
          {folders.map((i) => (
            <Folder
              onDelete={() => deleteRef.current.open(i)}
              onEdit={() => editRef.current.open(i)}
              {...i}
              key={i._id}
              _key={i._id}
              onClick={() =>
                push({
                  pathname: `/vacancies/${i._id}`,
                  query: {
                    title: i.title,
                    id: i._id,
                  },
                })
              }
            />
          ))}
        </div>
      </Page>
    </Section>
  );
}
