import React from "react";
import { Tabs } from "antd";
import useComunicados from "../../../hooks/useComunicados";
import LastContractItem from "./_children/_lastContract/LastContractItem";

const LastContract = () => {
  const { state } = useComunicados();
  const { lists } = state;

  return lists.lastContracts && lists.lastContracts.length > 1 ? (
    <Tabs
      defaultActiveKey="0"
      items={state.lists.lastContracts.map((lastContracto, i) => {
        return {
          label: `Contrato ${i + 1} (${lastContracto.CONTRATO})`,
          key: lastContracto.CONTRATO,
          children: <LastContractItem lastContracto={lastContracto} />,
        };
      })}
    />
  ) : (
    <LastContractItem
      lastContracto={
        lists.lastContracts !== undefined ? lists.lastContracts[0] : {}
      }
    />
  );
};

export default LastContract;
