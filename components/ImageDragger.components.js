import React, { useCallback } from "react";
import Dropzone from "react-dropzone";
import { X } from "react-feather";
import DraggerIcon from "../assets/Dragger.asset";
import { useTranslation } from "../contexts/LocalizeContext";
import Card from "./Card.components";
function blobToBase64(blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(",")[1]);
    reader.readAsDataURL(blob);
  });
}
export default function ImageDragger({
  onChange,
  multiple = false,
  current,
  files = [],
  remove = (index) => {},
  add = (item) => {},
}) {
  const {
    BRANDING: { DRAGGER },
  } = useTranslation();
  return (
    <div>
      <Dropzone
        accept="image/*"
        multiple={multiple}
        onDrop={async (acceptedFiles) => {
          if (multiple) {
            try {
              const files = await Promise.all(
                acceptedFiles.map((i) => blobToBase64(i))
              );
              onChange(files);
            } catch (err) {
              console.error(err);
            }
          } else {
            blobToBase64(acceptedFiles[0])
              .then((base64) => onChange(base64))
              .catch((err) => console.error(err));
          }
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <section>
            <div
              className="dragger-drop-zone"
              style={{ padding: current && !multiple ? 10 : {} }}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {current && !multiple ? (
                <img
                  style={{ height: "100%" }}
                  src={
                    current?.includes("https://")
                      ? current
                      : `data:image/png;base64,${current}`
                  }
                />
              ) : (
                <>
                  <DraggerIcon />
                  <span className="dragger-drop-zone-s">{DRAGGER}</span>
                </>
              )}
            </div>
          </section>
        )}
      </Dropzone>
      <div>
        {multiple &&
          files.map((i, index) => {
            return (
              <div
                key={index}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <img
                  src={
                    i?.includes("https://") ? i : `data:image/png;base64,${i}`
                  }
                  style={{ height: 50, width: 50, borderRadius: 5 }}
                />
                <div onClick={() => remove(index)}>
                  <X />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
