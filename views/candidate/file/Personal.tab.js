import React from "react";
import Input from "../../../base/Input.base";
import { useTranslation } from "../../../contexts/LocalizeContext";

export default function PersonalTab({ candidate, disabled = true }) {
  const {
    CANDIDATES: {
      FILE: { PERSONAL },
    },
  } = useTranslation();

  return (
    <div className="grid-50-50">
      <div className="grid-column">
        <Input
          disabled={disabled}
          withLabel={PERSONAL.FIRST_NAME}
          value={candidate?.personalData?.firstName}
        />
        <Input
          disabled={disabled}
          withLabel={PERSONAL.FIRST_LAST_NAME}
          value={candidate?.personalData?.lastName}
        />
        <Input
          disabled={disabled}
          withLabel={PERSONAL.BIRTHDAY}
          //   value={candidate.name}
        />
        <Input
          disabled={disabled}
          withLabel={PERSONAL.NACIONALITY}
          //   value={candidate.name}
        />
        <Input
          disabled={disabled}
          withLabel={PERSONAL.DOCUMENT_TYPE}
          //   value={candidate.name}
        />
        <Input
          disabled={disabled}
          withLabel={PERSONAL.DOCUMENT_VTO}
          //   value={candidate.name}
        />
        <Input
          disabled={disabled}
          withLabel={PERSONAL.STUDY}
          //   value={candidate.name}
        />
      </div>
      <div className="grid-column">
        <Input
          disabled={disabled}
          withLabel={PERSONAL.SECOND_NAME}
          value={candidate?.personalData?.secondName}
          //   value={candidate.name}
        />
        <Input
          disabled={disabled}
          withLabel={PERSONAL.SECONDA_LAST_NAME}
          value={candidate?.personalData?.secondLastName}
          //   value={candidate.name}
        />
        <Input
          disabled={disabled}
          withLabel={PERSONAL.GENRE}
          //   value={candidate.name}
        />
        <Input
          disabled={disabled}
          withLabel={PERSONAL.COUNTRY_BIRTH}
          //   value={candidate.name}
        />
        <Input
          disabled={disabled}
          withLabel={PERSONAL.DOCUMENT_NUMBER}
          //   value={candidate.name}
        />
        <Input
          disabled={disabled}
          withLabel={PERSONAL.STATUS}
          //   value={candidate.name}
        />
        <Input
          disabled={disabled}
          withLabel={PERSONAL.LANGUAJES}
          //   value={candidate.name}
        />
      </div>
    </div>
  );
}
