import React from "react";
import { Typography } from "antd";
import Generation from "./_Generation";
import Table from "./_Table";
import useComunicados from "../../../hooks/useComunicados";

const GenerationContract = () => {
  const { Title } = Typography;
  const { state } = useComunicados();
  const { communication } = state;
  const { generationFiles } = communication;
  const options = [
    {
      value: "M24",
      label: "M24-CONTRATO-EUROPEO",
    },
    {
      value: "M25",
      label: "M25-RENOVACION-CONTRATO-EUROPEO",
    },
    {
      value: "M26",
      label: "M26-NCONDOMINA-CCOMERCIAL-EUROPEO",
    },
    {
      value: "M27",
      label: "M27-PLENILUNIO-CCOMERCIAL-EUROPEO",
    },
  ];

  const dataTable = generationFiles.items
    .filter((item) => item.type === 1 && item.deleted === false)
    .sort((a, b) => a.model - b.model);

  return (
    <>
      <Title level={4}>Lista de Contratos y versiones</Title>
      <Generation
        caption="Generación de Contractos"
        options={options}
        dataTable={generationFiles.items}
        type={1}
      />
      <br />
      <br />
      <Table data={dataTable} />
    </>
  );
};

export default GenerationContract;
