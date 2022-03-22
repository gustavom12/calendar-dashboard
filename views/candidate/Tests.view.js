import { Table } from "antd";
import React from "react";
import { useTranslation } from "../../contexts/LocalizeContext";
import renderColumns from "../../tables/tests.table";

function Tests({}) {
  const {
    CANDIDATES: { TESTS },
  } = useTranslation();
  const columns = renderColumns(
    TESTS,
    () => {},
    () => {}
  );

  return (
    <div>
      <Table columns={columns} dataSource={[]} scroll={{ x: "fit-content" }} />
    </div>
  );
}

export default Tests;
