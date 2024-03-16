import React from "react";
import dayjs from "dayjs";
import { Row, Col, Divider, Typography, DatePicker, Input } from "antd";
import { PeopleType, DateFormat } from "../../../../../helpers/types";
import useComunicados from "../../../../../hooks/useComunicados";

const PoderesFirmantes = ({ blockLesseeModification = false }) => {
  const { Text, Title } = Typography;
  const { state, onChange } = useComunicados();
  const { validating, isModification, communication } = state;
  const { lessee } = communication;
  const { signatoryPower, peopleType } = lessee;
  function onSelectDate(dateString) {
    onChange(dateString, "date", ["communication", "lessee", "signatoryPower"]);
  }

  if (peopleType !== PeopleType.Juridica) return null;

  return (
    <>
      <Row className="mb-3" gutter={16}>
        <Col span={7}>
          <Title level={4}>PODERES FIRMANTE</Title>
        </Col>
      </Row>
      <Row className="mb-3" gutter={16}>
        <Col span={4} className="text-right pt-1 pb-2">
          <Text className="text-red-700">*</Text>&nbsp;Fecha:
        </Col>
        <Col span={4}>
          <DatePicker
            status={
              validating &&
              peopleType === PeopleType.Juridica &&
              signatoryPower &&
              !signatoryPower.date &&
              "error"
            }
            className="w-full"
            value={signatoryPower.date && dayjs(signatoryPower.date)}
            format={DateFormat}
            disabled={isModification && blockLesseeModification}
            onChange={onSelectDate}
          />
        </Col>
        <Col span={4} offset={4} className="text-right pt-1 pb-2">
          <Text className="text-red-700">*</Text>&nbsp;Protocolo:
        </Col>
        <Col span={8}>
          <Input
            status={
              validating &&
              peopleType === PeopleType.Juridica &&
              signatoryPower &&
              !signatoryPower.protocol &&
              "error"
            }
            name="signatoryPower.protocol"
            value={signatoryPower ? signatoryPower.protocol : ""}
            disabled={isModification && blockLesseeModification}
            onChange={(e) =>
              onChange(e.target.value, "protocol", [
                "communication",
                "lessee",
                "signatoryPower",
              ])
            }
          />
        </Col>
      </Row>
      <Row className="mb-3" gutter={16}>
        <Col span={4} className="text-right pt-1 pb-2">
          <Text className="text-red-700">*</Text>&nbsp;Notario:
        </Col>
        <Col span={8}>
          <Input
            status={
              validating &&
              peopleType === PeopleType.Juridica &&
              signatoryPower &&
              !signatoryPower.notary &&
              "error"
            }
            name="signatoryPower.notary"
            value={signatoryPower ? signatoryPower.notary : ""}
            disabled={isModification && blockLesseeModification}
            onChange={(e) =>
              onChange(e.target.value, "notary", [
                "communication",
                "lessee",
                "signatoryPower",
              ])
            }
          />
        </Col>
        <Col span={4} className="text-right pt-1 pb-2">
          <Text className="text-red-700">*</Text>&nbsp;Lugar:
        </Col>
        <Col span={8}>
          <Input
            status={
              validating &&
              peopleType === PeopleType.Juridica &&
              signatoryPower &&
              !signatoryPower.site &&
              "error"
            }
            name="signatoryPower.site"
            value={signatoryPower ? signatoryPower.site : ""}
            disabled={isModification && blockLesseeModification}
            onChange={(e) =>
              onChange(e.target.value, "site", [
                "communication",
                "lessee",
                "signatoryPower",
              ])
            }
          />
        </Col>
      </Row>
      <Divider />
    </>
  );
};

export default PoderesFirmantes;
