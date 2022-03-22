import { Table } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CandidatesEmpty from "../../assets/CandidatesEmpty.asset";
import Header from "../../components/Header.components";
import Loader from "../../components/loader/Loader";
import { useCandidate } from "../../contexts/CandidateContext";
import { useTranslation } from "../../contexts/LocalizeContext";
import Page from "../../layouts/page.layout";
import Section from "../../layouts/section.layout";
import renderColumns from "../../tables/candidates.table";
export default function Candidates() {
  const { candidates, get, deleteOne } = useCandidate();
  const { push } = useRouter();
  const { CANDIDATES, TABLES } = useTranslation();
  const columns = renderColumns(TABLES.CANDIDATES, push, deleteOne);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get()
      .then(() => setLoading(false))
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  return (
    <Section>
      <Header title={CANDIDATES.HEADER} />
      {loading ? (
        <Page>
          <div
            style={{
              width: "100%",
              height: 500,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loader />
          </div>
        </Page>
      ) : candidates.length ? (
        <Page>
          <Table
            scroll={{ x: "fit-content" }}
            columns={columns}
            dataSource={candidates}
          />
        </Page>
      ) : (
        <Page>
          <div className="candidates-container--empty">
            <CandidatesEmpty />
            <span className="candidates-empty-span">{CANDIDATES.EMPTY}</span>
          </div>
        </Page>
      )}
    </Section>
  );
}
