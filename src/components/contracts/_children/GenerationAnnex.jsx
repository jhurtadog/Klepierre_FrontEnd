import React from "react";
import { Typography } from "antd";
import Generation from "./_Generation";
import Table from "./_Table";
import useComunicados from "../../../hooks/useComunicados";

const GenerationAnnex = () => {
  const { Title } = Typography;
  const { state } = useComunicados();
  const { communication } = state;
  const { generationFiles } = communication;
  const options = [
    {
      value: "A01",
      label: "A01-ANEXOS",
    },
    {
      value: "A02",
      label: "A01-ANEXOS-NCONDOMINA",
    },
    {
      value: "A03",
      label: "A03-ANEXOS-PLENILUNIO",
    },
    {
      value: "A04",
      label: "A04-ANEXOS-FERIAL",
    },
  ];

  const dataTable = generationFiles.items
    .filter((item) => item.type === 2 && item.deleted === false)
    .sort((a, b) => a.model - b.model);

  return (
    <>
      <Title level={4}>Lista de Anexos y versiones</Title>
      <Generation
        caption="Generación de Anexos"
        options={options}
        dataTable={generationFiles.items}
        type={2}
      />
      <br />
      <br />
      <Table data={dataTable} />
    </>
  );
};

export default GenerationAnnex;
