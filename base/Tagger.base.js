import { Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "../contexts/LocalizeContext";
import Input from "./Input.base";
import SecondaryButton from "./SecondaryButton.base";
import TertiaryButton from "./TertiaryButton.base";

export default function Tagger({ onChange, defaultTags = [] }) {
  const [tags, setTags] = useState(defaultTags);
  const [tag, setTag] = useState("");
  const { VACANCIES } = useTranslation();

  useEffect(() => {
    onChange(tags);
  }, [tags]);

  return (
    <div className="tagger__container">
      <div className="tagger__top">
        <Input value={tag} onChange={setTag} />
        <TertiaryButton
          style={{ marginTop: 5 }}
          onClick={() => {
            if (tag) {
              setTags((prev) => [...prev, tag]);
              setTag("");
            }
          }}
        >
          {VACANCIES.NEW.FORM.ADD}
        </TertiaryButton>
      </div>
      {tags.length ? (
        <div className="tagger__list">
          {tags.map((i, index) => (
            <Tag
              closable
              onClose={(e) => {
                e.preventDefault();
                const arr = [...tags].filter((i, _index) => _index != index);
                setTags(arr);
              }}
            >
              {i}
            </Tag>
          ))}
        </div>
      ) : null}
    </div>
  );
}
