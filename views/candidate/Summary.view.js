import { Tag } from "antd";
import React from "react";
import Radio from "../../base/Radio.base";
import Box from "../../components/Box.components";
import { useTranslation } from "../../contexts/LocalizeContext";
import { COLORS, TAGS } from "../../utils/colors";

export default function Summary({ candidate }) {
  const {
    CANDIDATES: { SUMMARY },
  } = useTranslation();

  return (
    <div className="candidates__skills">
      <div className="candidates__skills-c">
        <div />
        {candidate?.outstandingComment ? (
          <div className="outstanding__card">
            <span>
              <img src="/assets/svg/star.svg" />
              <span>{SUMMARY.OUTSTANDING}</span>
            </span>
            <p>{candidate?.outstandingComment}</p>
          </div>
        ) : (
          <div className="outstanding__card">
            <span>
              <img src="/assets/svg/star.svg" />
              <span>{SUMMARY.OUTSTANDING}</span>
            </span>
            <p>Destaca una nota sobre el candidato para visualizarla aquí.</p>
          </div>
        )}
        <Box title={SUMMARY.LANGUAJES}>
          {candidate?.skills?.languajes?.map((i, index) => (
            <div key={index}>
              <span className="candidates__langs">
                <Radio color={COLORS[index % 4]} />
                <span>{i}</span>
              </span>
            </div>
          ))}
        </Box>
        <Box title={SUMMARY.TURNOVER}>
          <div className="candidates__turnover">
            <h2>{SUMMARY[candidate?.turnover]}</h2>
          </div>
        </Box>
      </div>
      <div className="candidates__skills-c">
        <div />
        <Box title={SUMMARY.SKILLS}>
          {candidate?.skills?.skills?.map((i, index) => (
            <Tag
              key={index}
              color={TAGS[index % 10]}
              style={{ marginBottom: 10 }}
            >
              {i}
            </Tag>
          ))}
        </Box>
      </div>
      <div className="candidates__skills-c">
        <div />
        <Box title={SUMMARY.TESTS}></Box>
      </div>
    </div>
  );
}
