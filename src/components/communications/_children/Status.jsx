import React from "react";
import { Tag } from "antd";
import useComunicados from "../../../hooks/useComunicados";
import { CommunicationStatus } from "../../../helpers/types";

const Status = () => {
  const { state } = useComunicados();
  const { communication, communicationModification } = state;
  const { communicationStatus } = communication;
  return (
    <>
      ESTATUS:
      {communicationStatus === CommunicationStatus.Aprobado && (
        <Tag color="green" className="ml-4">
          {communicationModification == true && "CERRADO"}
          {communicationModification == false && "APROBADO"}
        </Tag>
      )}
      {communicationStatus === CommunicationStatus.Borrador && (
        <Tag
          style={{
            background: "#fff",
            borderStyle: "dashed",
            marginLeft: "15px",
          }}
        >
          BORRADOR
        </Tag>
      )}
      {communicationStatus === CommunicationStatus.Anulado && (
        <Tag
          style={{
            background: "#ffc3c6",
            borderStyle: "dashed",
            marginLeft: "15px",
          }}
        >
          ANULADO
        </Tag>
      )}
      {communicationModification === true && (
        <Tag
          style={{
            background: "#e4f2ff",
            borderStyle: "dashed",
            marginLeft: "10px",
            fontWeight: "bold",
          }}
        >
          MODIFICACIÓN
        </Tag>
      )}
    </>
  );
};

export default Status;
