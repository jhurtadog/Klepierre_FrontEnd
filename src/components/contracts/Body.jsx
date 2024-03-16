import React from "react";
import { Tabs } from "antd";
import GenerationContract from "./_children/GenerationContract";
import GenerationAnnex from "./_children/GenerationAnnex";

const Body = () => {
  const renderTabs = [
    {
      key: 1,
      label: `Contratos`,
      children: <GenerationContract />,
    },
    {
      key: 2,
      label: `Anexos`,
      children: <GenerationAnnex />,
    },
  ];

  return <Tabs defaultActiveKey="1" tabPosition="left" items={renderTabs} />;
};

export default Body;
