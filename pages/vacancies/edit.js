import { DatePicker, Select, Switch } from "antd";
import React, { useEffect, useState } from "react";
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
    VACANCIES: { NEW, EDIT },
  } = useTranslation();
  const [loading, setLoading] = useState(true);
  const { back } = useRouter();
  const { getOne, updateOne } = useVacancy();
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
    updateOne(query?.id, vacancy)
      .then(() => {
        back();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    // console.log(query.id);
    getOne(query.id)
      .then((data) => {
        setVacancy(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <Section>
      <Header withBackbutton title={EDIT.TITLE} />
      <div className="employer-branding-grid">
        <div className="employer-branding-grid-c">
          <Page>
            <Input
              onChange={(v) => updateState("title", v)}
              withLabel={FORM.TITLE}
              value={vacancy?.title}
            />
            <Input
              onChange={(v) => updateState("shortDescription", v)}
              style={{ marginTop: 25 }}
              withLabel={FORM.SHORT_DESCRIPTION}
              value={vacancy.shortDescription}
            />
            <Input style={{ marginTop: 25 }} withLabel={FORM.DESCRIPTION}>
              <TextEditor
                value={vacancy.description}
                onChange={(v) => updateState("description", v)}
              />
            </Input>

            <Input style={{ marginTop: 25 }} withLabel={FORM.SKILLS}>
              <Tagger
                defaultTags={vacancy.skills}
                onChange={(v) => updateState("skills", v)}
              />
            </Input>

            <Input style={{ marginTop: 25 }} withLabel={FORM.TAGS}>
              <Tagger
                onChange={(v) => updateState("tags", v)}
                defaultTags={vacancy.tags}
              />
            </Input>

            <div className="grid-50-50" style={{ marginTop: 20 }}>
              <Input
                withLabel={FORM.AREA}
                value={vacancy.area}
                onChange={(v) => updateState("area", v)}
              />
              <Input
                withLabel={FORM.POSITION}
                value={vacancy.position}
                onChange={(v) => updateState("position", v)}
              />
              <Input
                withLabel={FORM.LOCATION}
                value={vacancy.location}
                onChange={(v) => updateState("location", v)}
              />
              <Input
                withLabel={FORM.MODALITY}
                value={vacancy.modality}
                onChange={(v) => updateState("modality", v)}
              />
            </div>
            <div className="grid-50-50" style={{ marginTop: 20 }}>
              <Input
                withLabel={FORM.CURRENCY}
                value={vacancy.currency}
                onChange={(v) => updateState("currency", v)}
              />
              <Input
                withLabel={FORM.PAYMENT}
                value={vacancy.payment}
                onChange={(v) => updateState("payment", v)}
              />
              <Input
                withLabel={FORM.PERIOD}
                value={vacancy.period}
                onChange={(v) => updateState("period", v)}
              />
            </div>
            <h2 className="branding-sub-title">{FORM.BENEFITS}</h2>
            <Input style={{ marginTop: 15 }} withLabel={FORM.NAME}>
              <Tagger
                onChange={(v) => updateState("benefits", v)}
                defaultTags={vacancy.benefits}
              />
            </Input>
          </Page>

          <div className="branding-bottom-buttons">
            {/* <div style={{ display: "flex", width: 355 }}> */}
            <Button onClick={handleSubmit}>{FORM.UPDATE}</Button>
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
        </div>
      </div>
    </Section>
  );
}

export default withRouter(New);
