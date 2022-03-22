import { DatePicker, Select, Switch } from "antd";
import React, { useState } from "react";
import Input from "../../base/Input.base";
import TextEditor from "../../base/TextEditor.base";
import ButtonRow from "../../components/ButtonRow.components";
import Card from "../../components/Card.components";
import Dragger from "../../components/Dragger.components";
import Header from "../../components/Header.components";
import { useTranslation } from "../../contexts/LocalizeContext";
import Page from "../../layouts/page.layout";
import moment from "moment";
import Section from "../../layouts/section.layout";
import Tagger from "../../base/Tagger.base";
import Button from "../../base/Button.base";
import { useVacancy } from "../../contexts/VacancyContext";
import { useRouter, withRouter } from "next/router";

function New({ router: { query } }) {
  const {
    VACANCIES: { NEW },
  } = useTranslation();
  const { back } = useRouter();
  const { createOne } = useVacancy();
  const { FORM } = NEW;
  const [withVacancyDate, setWithVacancyDate] = useState(false);

  const [vacancy, setVacancy] = useState({
    folderId: query.id,
    state: "ACTIVE",
    show: false,
    title: "",
    shortDescription: "",
    description: "",
    skills: [],
    tags: [],
    area: "",
    position: "",
    location: "",
    modality: "",
    currency: "",
    payment: "",
    period: "",
    benefits: [],
    template: "",
    candidates: 0,
  });

  const updateState = (name, value) =>
    setVacancy((prev) => ({
      ...prev,
      [name]: value,
    }));

  const handleSubmit = () => {
    createOne(query?.id, vacancy)
      .then(() => {
        back();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Section>
      <Header withBackbutton title={NEW.TITLE} />
      <div className="employer-branding-grid">
        <div className="employer-branding-grid-c">
          <Page>
            <Input
              onChange={(v) => updateState("title", v)}
              withLabel={FORM.TITLE}
            />
            <Input
              onChange={(v) => updateState("shortDescription", v)}
              style={{ marginTop: 25 }}
              withLabel={FORM.SHORT_DESCRIPTION}
            />
            <Input style={{ marginTop: 25 }} withLabel={FORM.DESCRIPTION}>
              <TextEditor
                value={vacancy.description}
                onChange={(v) => updateState("description", v)}
              />
            </Input>

            <Input style={{ marginTop: 25 }} withLabel={FORM.SKILLS}>
              <Tagger onChange={(v) => updateState("skills", v)} />
            </Input>

            <Input style={{ marginTop: 25 }} withLabel={FORM.TAGS}>
              <Tagger onChange={(v) => updateState("tags", v)} />
            </Input>

            <div className="grid-50-50" style={{ marginTop: 20 }}>
              <Input
                withLabel={FORM.AREA}
                onChange={(v) => updateState("area", v)}
              />
              <Input
                withLabel={FORM.POSITION}
                onChange={(v) => updateState("position", v)}
              />
              <Input
                withLabel={FORM.LOCATION}
                onChange={(v) => updateState("location", v)}
              />
              <Input
                withLabel={FORM.MODALITY}
                onChange={(v) => updateState("modality", v)}
              />
            </div>
            <div className="grid-50-50" style={{ marginTop: 20 }}>
              <Input
                withLabel={FORM.CURRENCY}
                onChange={(v) => updateState("currency", v)}
              />
              <Input
                withLabel={FORM.PAYMENT}
                onChange={(v) => updateState("payment", v)}
              />
              <Input
                withLabel={FORM.PERIOD}
                onChange={(v) => updateState("period", v)}
              />
            </div>
            <h2 className="branding-sub-title">{FORM.BENEFITS}</h2>
            <Input style={{ marginTop: 15 }} withLabel={FORM.NAME}>
              <Tagger onChange={(v) => updateState("benefits", v)} />
            </Input>
          </Page>
          <Page>
            <Input withLabel={FORM.SELECT_TEMPLATE}>
              <Select
                onChange={(v) => updateState("template", v)}
                className="hiring-select"
              ></Select>
            </Input>
          </Page>
          <div className="branding-bottom-buttons">
            {/* <div style={{ display: "flex", width: 355 }}> */}
            <Button onClick={handleSubmit}>{FORM.CREATE}</Button>
            {/* <ButtonRow onLeftClick={} leftValue={FORM.SAVE} rightValue={FORM.CREATE} /> */}
            {/* </div> */}
          </div>
        </div>
        <div className="employer-branding-grid-c">
          <Dragger title={NEW.IMAGES} />
          <Card
            topStyle={withVacancyDate ? {} : { borderBottom: "0px" }}
            bodyStyle={withVacancyDate ? {} : { display: "none" }}
            title={NEW.VACANCY.TITLE}
            withHeader={
              <Switch
                checked={withVacancyDate}
                onChange={(v) => setWithVacancyDate(v)}
              />
            }
          >
            <Input withLabel={NEW.VACANCY.DATE}>
              <DatePicker
                disabledDate={(current) => {
                  let customDate = moment().format("YYYY-MM-DD");
                  return current && current < moment(customDate, "YYYY-MM-DD");
                }}
                onChange={(v) => {}}
                className="hiring-select"
              />
            </Input>
          </Card>
          {/* <Card title={NEW.FOLDER.TITLE}>
            <Input withLabel={NEW.FOLDER.SELECT}>
              <Select className="hiring-select" mode="multiple"></Select>
            </Input>
          </Card> */}
        </div>
      </div>
    </Section>
  );
}

export default withRouter(New);
