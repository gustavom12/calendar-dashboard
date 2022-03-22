import React, { useCallback, useMemo } from "react";
import { useTranslation } from "../../contexts/LocalizeContext";

const CandidatesLocations = ({ candidatesLocations }) => {
  const { DASHBOARD } = useTranslation();
  const dataParsed = useMemo(() => {
    const data = {};
    let percentaje = 0;
    candidatesLocations?.forEach((el) => {
      data[el.city]
        ? (data[el.city].value += 1)
        : (data[el.city] = { ...el, value: 1 });
      percentaje += 1;
    });
    return { data, percentaje };
  }, [candidatesLocations]);

  return (
    <div className="CandidatesLocations card_group mt-0">
      <h5 className="title"> {DASHBOARD.INTERVIEWS_ACTIVITIES} </h5>
      <div className="cardBody">
        <div className="scrollable">
          {Object.values(dataParsed?.data || {}).map((v, i) => (
            <div
              className="d-flex justify-between w-100"
              style={{ marginTop: i === 0 ? 0 : 25 }}
              key={i}
            >
              <span>{v.city}</span>
              <span style={{ color: "#A1ACC2" }}>
                {Math.round((v.value / dataParsed.percentaje) * 100)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CandidatesLocations;
