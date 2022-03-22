import Head from "next/head";
import React, { useEffect, useState } from "react";
import { X } from "react-feather";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import Button from "../base/Button.base";
import Input from "../base/Input.base";
import PlaceBase from "../base/Place.base";
import SecondaryButton from "../base/SecondaryButton.base";
import Tagger from "../base/Tagger.base";
import TextArea from "../base/TextArea.base";
import TextEditor from "../base/TextEditor.base";
import Card from "../components/Card.components";
import Dragger from "../components/Dragger.components";
import Header from "../components/Header.components";
import ImageDragger from "../components/ImageDragger.components";
import { useCompany } from "../contexts/CompanyContext";
import { useTranslation } from "../contexts/LocalizeContext";
import Page from "../layouts/page.layout";
import Section from "../layouts/section.layout";
import apiConnection from "./api/api-connection";

const Location = ({ state, setState, i, index }) => {
  const {
    BRANDING: { FORM },
  } = useTranslation();
  const [addressMap, setAddressMap] = useState(i.location.address);
  const handleChangeAddress = (address, index) => {
    setAddressMap(address);
    const arr = [...state.locations];
    arr[index].location = {
      lat: 0,
      lng: 0,
      address: address,
    };
    setState((prev) => ({
      ...prev,
      locations: arr,
    }));
  };
  const handleSelectAddress = (address, index) => {
    setAddressMap(address);
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        setAddressMap(address);
        const arr = [...state.locations];
        arr[index].location = {
          lat: latLng.lat,
          lng: latLng.lng,
          address: address,
        };
        setState((prev) => ({
          ...prev,
          locations: arr,
        }));
      })
      .catch((error) => console.error("Error", error));
  };

  return (
    <Page key={index} style={{ padding: 20, paddingTop: 10 }}>
      <div
        style={{
          position: "relative",
          top: 20,
          width: "100%",
          // background: "#FF0000",
          display: "flex",
          flexDirection: "row-reverse",
        }}
      >
        <button
          style={{ borderStyle: "none", background: "none" }}
          onClick={() => {
            const arr = [...state.locations].filter((i, _i) => _i != index);
            setState((prev) => ({
              ...prev,
              locations: arr,
            }));
          }}
        >
          <X />
        </button>
      </div>
      <div className="grid-50-50" style={{ marginTop: 20 }}>
        <div className="grid-column">
          <Input
            withLabel={FORM.LOCATIONS.NAME}
            placeholder={FORM.LOCATIONS.NAME}
            value={i.name}
            onChange={(v) => {
              const locations = [...state.locations];
              locations[index].name = v;
              setState((prev) => ({
                ...prev,
                locations,
              }));
            }}
          />
        </div>
        <div className="grid-column">
          <Input
            withLabel={FORM.LOCATIONS.LOCATION}
            placeholder={FORM.LOCATIONS.LOCATION}
            value={i.location}
            onChange={(v) => {
              const locations = [...state.locations];
              locations[index].location = v;
              setState((prev) => ({
                ...prev,
                locations,
              }));
            }}
          >
            <PlaceBase
              address={addressMap}
              changeAddress={(address) => handleChangeAddress(address, index)}
              selectAddress={(address) => handleSelectAddress(address, index)}
              label="Address"
              handleChange={(v) => console.log(v)}
            />
          </Input>
        </div>
      </div>
    </Page>
  );
};

function EmployerBranding() {
  const {
    BRANDING,
    BRANDING: { FORM },
  } = useTranslation();
  const {
    get,
    state,
    addQuote,
    addLocation,
    updateState,
    updateImagesState,
    handleSubmit,
    updateMediaState,
    setState,
  } = useCompany();

  useEffect(() => {
    get();
  }, []);

  return (
    <Section>
      <Header title={BRANDING.HEADER}>
        {/* <Button>{BRANDING.HEADER_BUTTON}</Button> */}
      </Header>
      <div className="employer-branding-grid">
        <div className="employer-branding-grid-c">
          <Page>
            <Input
              value={state.name}
              onChange={(v) => {
                updateState("name", v);
              }}
              withLabel={FORM.COMPANY}
              placeholder={FORM.COMPANY}
            />
            <Input
              style={{ marginTop: 25 }}
              withLabel={FORM.ABOUT_US}
              placeholder={FORM.ABOUT_US}
            >
              <TextEditor
                value={state.aboutUs}
                onChange={(v) => {
                  updateState("aboutUs", v);
                }}
              />
            </Input>
            <Input
              style={{ marginTop: 25 }}
              withLabel={FORM.WHAT_WE_DO}
              placeholder={FORM.WHAT_WE_DO}
            >
              <TextEditor
                value={state.whatWeDo}
                onChange={(v) => {
                  updateState("whatWeDo", v);
                }}
              />
            </Input>
            <h2 className="branding-sub-title">{FORM.SOCIAL_MEDIA.TITLE}</h2>
            <div className="grid-50-50" style={{ marginTop: 20 }}>
              <div className="grid-column">
                <Input
                  value={state?.media?.instagram}
                  onChange={(v) => {
                    updateMediaState("instagram", v);
                  }}
                  withLabel={FORM.SOCIAL_MEDIA.INSTAGRAM}
                  placeholder={FORM.SOCIAL_MEDIA.INSTAGRAM}
                />
                <Input
                  value={state?.media?.twitter}
                  onChange={(v) => {
                    updateMediaState("twitter", v);
                  }}
                  withLabel={FORM.SOCIAL_MEDIA.TWITTER}
                  placeholder={FORM.SOCIAL_MEDIA.TWITTER}
                />
                <Input
                  value={state?.media?.linkedin}
                  onChange={(v) => {
                    updateMediaState("linkedin", v);
                  }}
                  withLabel={FORM.SOCIAL_MEDIA.LINKEDIN}
                  placeholder={FORM.SOCIAL_MEDIA.LINKEDIN}
                />
                <Input
                  value={state?.media?.medium}
                  onChange={(v) => {
                    updateMediaState("medium", v);
                  }}
                  withLabel={FORM.SOCIAL_MEDIA.MEDIUM}
                  placeholder={FORM.SOCIAL_MEDIA.MEDIUM}
                />
              </div>
              <div className="grid-column">
                <Input
                  value={state?.media?.facebook}
                  onChange={(v) => {
                    updateMediaState("facebook", v);
                  }}
                  withLabel={FORM.SOCIAL_MEDIA.FACEBOOK}
                  placeholder={FORM.SOCIAL_MEDIA.FACEBOOK}
                />
                <Input
                  value={state?.media?.youtube}
                  onChange={(v) => {
                    updateMediaState("youtube", v);
                  }}
                  withLabel={FORM.SOCIAL_MEDIA.YOUTUBE}
                  placeholder={FORM.SOCIAL_MEDIA.YOUTUBE}
                />
                <Input
                  value={state?.media?.behance}
                  onChange={(v) => {
                    updateMediaState("behance", v);
                  }}
                  withLabel={FORM.SOCIAL_MEDIA.BEHANCE}
                  placeholder={FORM.SOCIAL_MEDIA.BEHANCE}
                />
                <Input
                  value={state?.media?.telegram}
                  onChange={(v) => {
                    updateMediaState("telegram", v);
                  }}
                  withLabel={FORM.SOCIAL_MEDIA.TELEGRAM}
                  placeholder={FORM.SOCIAL_MEDIA.TELEGRAM}
                />
              </div>
            </div>
            <h2 className="branding-sub-title">{FORM.TESTIMONIES.TITLE}</h2>
            {state?.quotes?.map((i, index) => {
              return (
                <Page key={index} style={{ padding: 20, paddingTop: 10 }}>
                  <div
                    style={{
                      position: "relative",
                      top: 20,
                      width: "100%",
                      // background: "#FF0000",
                      display: "flex",
                      flexDirection: "row-reverse",
                    }}
                  >
                    <button
                      style={{ borderStyle: "none", background: "none" }}
                      onClick={() => {
                        const arr = [...state?.quotes].filter(
                          (i, _i) => _i != index
                        );
                        setState((prev) => ({
                          ...prev,
                          quotes: arr,
                        }));
                      }}
                    >
                      <X />
                    </button>
                  </div>
                  <div className="grid-50-50" style={{ marginTop: 20 }}>
                    <div className="grid-column">
                      <Input
                        withLabel={FORM.TESTIMONIES.NAME}
                        placeholder={FORM.TESTIMONIES.NAME}
                        value={i.name}
                        onChange={(v) => {
                          const quotes = [...state?.quotes];
                          quotes[index].name = v;
                          setState((prev) => ({
                            ...prev,
                            quotes,
                          }));
                        }}
                      />
                      <Input
                        withLabel={FORM.TESTIMONIES.QUOTE}
                        placeholder={FORM.TESTIMONIES.QUOTE}
                      >
                        <TextArea
                          value={i.quote}
                          onChange={(v) => {
                            const quotes = [...state?.quotes];
                            quotes[index].quote = v.target.value;
                            setState((prev) => ({
                              ...prev,
                              quotes,
                            }));
                          }}
                        />
                      </Input>
                    </div>
                    <div className="grid-column">
                      <Input
                        withLabel={FORM.TESTIMONIES.POSITION}
                        placeholder={FORM.TESTIMONIES.POSITION}
                        value={i.position}
                        onChange={(v) => {
                          const quotes = [...state?.quotes];
                          quotes[index].position = v;
                          setState((prev) => ({
                            ...prev,
                            quotes,
                          }));
                        }}
                      />
                      <Input withLabel={FORM.TESTIMONIES.PICTURE}>
                        <ImageDragger
                          onChange={(v) => {
                            const quotes = [...state?.quotes];
                            quotes[index].picture = v;
                            setState((prev) => ({
                              ...prev,
                              quotes,
                            }));
                          }}
                          current={i.picture}
                        />
                      </Input>
                    </div>
                  </div>
                </Page>
              );
            })}
            <button className="branding-add" onClick={addQuote}>
              {FORM.TESTIMONIES.ADD}
            </button>
            <h2 className="branding-sub-title">{FORM.LOCATIONS.TITLE}</h2>
            {state?.locations?.map((i, index) => (
              <Location
                key={index}
                index={index}
                i={i}
                state={state}
                setState={setState}
              />
            ))}
            <button className="branding-add" onClick={addLocation}>
              {FORM.LOCATIONS.ADD}
            </button>
            <h2 className="branding-sub-title">{FORM.BENEFITS.TITLE}</h2>

            <div className="grid-50-50" style={{ marginTop: 20 }}>
              <div className="grid-column">
                <Input
                  withLabel={FORM.BENEFITS.NAME}
                  placeholder={FORM.BENEFITS.NAME}
                >
                  <Tagger
                    key={state?.benefits}
                    defaultTags={state.benefits}
                    onChange={(v) => updateState("benefits", v)}
                  />
                </Input>
              </div>
            </div>
          </Page>
          <div className="branding-bottom">
            {/* <SecondaryButton>{FORM.PREVIEW}</SecondaryButton> */}
            <Button onClick={handleSubmit}>{FORM.PUBLISH}</Button>
          </div>
        </div>
        <div className="employer-branding-grid-c">
          <Card title={BRANDING.COLOR}>
            <Input
              type="color"
              value={state.color}
              onChange={(v) => updateState("color", v)}
            />
          </Card>
          <Dragger
            current={state.images?.logo}
            onChange={(v) => updateImagesState("logo", v)}
            title={BRANDING.LOGO}
          />
          <Dragger
            current={state.images?.banner}
            onChange={(v) => updateImagesState("banner", v)}
            title={BRANDING.BANNER}
          />
          <Dragger
            current={state.images?.portrait}
            onChange={(v) => updateImagesState("portrait", v)}
            title={BRANDING.PORTRAIT}
          />
          <Dragger
            multiple
            onChange={(v) =>
              setState((prev) => ({
                ...prev,
                images: {
                  ...prev.images,
                  section1: [...prev.images?.section1, ...v],
                },
              }))
            }
            remove={(index) => {
              const arr = [...state.images?.section1];
              const section1 = arr.filter((i, _i) => _i != index);
              setState((prevState) => ({
                ...prevState,
                images: {
                  ...prevState?.images,
                  section1,
                },
              }));
            }}
            title={BRANDING.SECTIONS._1}
            files={state.images?.section1}
          />
          <Dragger
            multiple
            onChange={(v) =>
              setState((prev) => ({
                ...prev,
                images: {
                  ...prev.images,
                  section2: [...prev?.images?.section2, ...v],
                },
              }))
            }
            title={BRANDING.SECTIONS._2}
            remove={(index) => {
              const arr = [...state.images?.section2];
              const section2 = arr.filter((i, _i) => _i != index);
              setState((prevState) => ({
                ...prevState,
                images: {
                  ...prevState.images,
                  section2,
                },
              }));
            }}
            files={state.images?.section2}
          />
          <Dragger
            multiple
            onChange={(v) =>
              setState((prev) => ({
                ...prev,
                images: {
                  ...prev.images,
                  section3: [...prev.images.section3, ...v],
                },
              }))
            }
            remove={(index) => {
              const arr = [...state.images?.section3];
              const section3 = arr.filter((i, _i) => _i != index);
              setState((prevState) => ({
                ...prevState,
                images: {
                  ...prevState.images,
                  section3,
                },
              }));
            }}
            title={BRANDING.SECTIONS._3}
            files={state.images?.section3}
          />
        </div>
      </div>
    </Section>
  );
}

export default EmployerBranding;
