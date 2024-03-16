import React from "react";
import { Select, Card } from "antd";
import useComunicados from "../../../hooks/useComunicados";
import Status from "./Status";

const TypeForm = () => {
  const { state, onChange } = useComunicados();
  const { communicationReference, communication, lists } = state;
  const { communicationType, _id, reference } = communication;
  return (
    <Card
      title={`REF: ${_id === 0 ? communicationReference : reference}`}
      bordered={false}
    >
      <Select
        loading={lists.types.length === 0}
        placeholder="Tipo de comunicado..."
        value={communicationType}
        disabled={_id && _id !== 0}
        style={{ width: 260 }}
        onChange={(e) => onChange(e, "communicationType", ["communication"])}
        options={lists.types.map((type) => ({
          value: type.id,
          label: type.title,
        }))}
      />
      <br />
      <br />
      <Status />
    </Card>
  );
};

export default TypeForm;
