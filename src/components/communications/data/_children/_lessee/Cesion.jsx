import React from "react";
import { Row, Col, Divider, Typography, Radio, Checkbox, Input } from "antd";
import { CessionType, CommunicationType } from "../../../../../helpers/types";
import useComunicados from "../../../../../hooks/useComunicados";

const Cesion = ({ blockLesseeModification = false }) => {
  const { Text, Title } = Typography;
  const { state, onChange } = useComunicados();
  const { validating, isModification, communication } = state;
  const { communicationType, lessee } = communication;
  const { cession } = lessee;

  if (
    communicationType === CommunicationType.Subrogacion ||
    communicationType === CommunicationType.Bonificacion ||
    communicationType === CommunicationType.Recision
  )
    return null;

  return (
    <>
      <Title level={4}>CESIÓN</Title>
      <Row className="mb-3" gutter={16}>
        <Col span={12} offset={4}>
          <Checkbox
            name="cession.clause"
            checked={cession.clause}
            disabled={isModification && blockLesseeModification}
            onChange={(e) =>
              onChange(e.target.checked, "clause", [
                "communication",
                "lessee",
                "cession",
              ])
            }
          >
            Cláusula franquicia
          </Checkbox>
        </Col>
      </Row>
      <Row className="mb-3" gutter={16}>
        <Col span={4} className="text-right pt-1 pb-2">
          Posibilidad de cesión:
        </Col>
        <Col span={20} className="pt-1">
          <Radio.Group
            name="cession.cessionType"
            value={cession.cessionType}
            onChange={(e) => {
              onChange(e.target.value, "cessionType", [
                "communication",
                "lessee",
                "cession",
              ]);
              if (e.target.value !== CessionType.Terceros) {
                onChange("", "businessName", [
                  "communication",
                  "lessee",
                  "cession",
                ]);
              }
            }}
            disabled={isModification && blockLesseeModification}
          >
            <Radio value={CessionType.Tipo1}>Tipo 1</Radio>
            <Radio value={CessionType.Tipo2}>Tipo 2</Radio>
            <Radio value={CessionType.Tipo3}>Tipo 3</Radio>
            <Radio value={CessionType.Tipo4}>Tipo 4</Radio>
            <Radio value={CessionType.Terceros}>A Terceros</Radio>
            <Radio value={CessionType.Grupo}>A un Grupo</Radio>
            <Radio value={CessionType.No}>No</Radio>
          </Radio.Group>
        </Col>
      </Row>
      {cession.cessionType === CessionType.Terceros && (
        <Row className="mb-3" gutter={16}>
          <Col span={4} className="text-right pt-1 pb-2">
            <Text className="text-red-700">*</Text>&nbsp;Nombre empresa:
          </Col>
          <Col span={14}>
            <Input
              status={
                validating &&
                cession.cessionType === CessionType.Terceros &&
                !cession.businessName &&
                "error"
              }
              name="cession.businessName"
              value={cession.businessName}
              onChange={(e) =>
                onChange(e.target.value, "businessName", [
                  "communication",
                  "lessee",
                  "cession",
                ])
              }
              disabled={isModification && blockLesseeModification}
            />
          </Col>
        </Row>
      )}
      <Divider />
    </>
  );
};

export default Cesion;
