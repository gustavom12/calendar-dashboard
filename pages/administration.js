import React from "react";
import Header from "../components/Header.components";
import { useTranslation } from "../contexts/LocalizeContext";
import Section from "../layouts/section.layout";
export default function Administration() {
  const { ADMINISTRATION } = useTranslation();
  return (
    <Section>
      <Header title={ADMINISTRATION.HEADER} />
    </Section>
  );
}
