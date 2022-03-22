import React from "react";
import Tagger from "../../base/Tagger.base";
import { useTranslation } from "../../contexts/LocalizeContext";

export default function Skills({ candidate }) {
  const {
    CANDIDATES: { SKILLS },
  } = useTranslation();
  return (
    <div>
      <div className="candidates__group">
        <h3>{SKILLS.LANGUAJES}</h3>
        <Tagger defaultTags={candidate.skills.languajes} onChange={(v) => {}} />
      </div>

      <div className="candidates__group" style={{ marginTop: 30 }}>
        <h3>{SKILLS.SKILLS}</h3>
        <Tagger defaultTags={candidate.skills.skills} onChange={(v) => {}} />
      </div>
    </div>
  );
}
