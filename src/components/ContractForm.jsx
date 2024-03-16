import React from "react";
import { Card } from "antd";
import Header from "./contracts/Header";
import Body from "./contracts/Body";
import useComunicados from "../hooks/useComunicados";

const ContractForm = () => {
  const { state } = useComunicados();
  const { communication } = state;
  const { reference } = communication;

  return (
    <div className="p-7 w-full">
      <Card title={`REF: ${reference}`} bordered={false}>
        <Header />
        <Body />
      </Card>
    </div>
  );
};

export default ContractForm;
