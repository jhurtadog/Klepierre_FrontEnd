import React from "react";
import dayjs from "dayjs";
import { Row, Col, Divider, Typography, Input } from "antd";
import useComunicados from "../../../../../hooks/useComunicados";
import { CommunicationType, DateFormat } from "../../../../../helpers/types";

const BonusExisting = () => {
  const { Title, Text } = Typography;
  const { state } = useComunicados();
  const { readOnly, isModification, communication } = state;
  const { communicationType, bonus } = communication;
  const { items } = bonus;

  return (
    <div className={readOnly ? "pointer-events-none cursor-none" : ""}>
      {readOnly && (
        <div
          style={{
            background: "black",
            opacity: 0.1,
            width: "100%",
            height: isModification ? "100%" : "0%",
            position: "absolute",
            zIndex: 1,
          }}
        ></div>
      )}
      {(communicationType === CommunicationType.Renovacion ||
        communicationType === CommunicationType.Bonificacion ||
        communicationType === CommunicationType.AcuerdoComplementario) && (
        <>
          <Row className="mb-3" gutter={16}>
            <Col span={24}>
              <Title level={4}>BONIFICACIONES EXISTENTES</Title>
            </Col>
          </Row>
          {items.map((b, i) => (
            <div key={i}>
              <Row className="mb-3" gutter={16}>
                <Col span={4} className="text-right pt-1 pr-2">
                  Tipo:
                </Col>
                <Col span={4}>
                  <Input defaultValue={b.type} disabled />
                </Col>
                <Col span={4} className="text-right pt-1 pr-2">
                  Importe:
                </Col>
                <Col span={4}>
                  <Input defaultValue={b.amount} readOnly disabled />
                </Col>
                <Col span={4} className="text-right pt-1 pr-2">
                  Porcentaje:
                </Col>
                <Col span={4}>
                  <Input defaultValue={b.percentage} readOnly disabled />
                </Col>
              </Row>
              <Row className="mb-3" gutter={16}>
                <Col span={4} className="text-right pt-1 pr-2">
                  Fecha inicio:
                </Col>
                <Col span={4}>
                  <Input
                    defaultValue={dayjs(b.startDate).format(DateFormat)}
                    readOnly
                    disabled
                  />
                </Col>
                <Col span={4} className="text-right pt-1 pr-2">
                  Fecha fin:
                </Col>
                <Col span={4}>
                  <Input
                    defaultValue={dayjs(b.endDate).format(DateFormat)}
                    readOnly
                    disabled
                  />
                </Col>
              </Row>
              <Divider />
            </div>
          ))}
          {items.length === 0 && (
            <>
              <Text strong>No hay bonificaciones existentes.</Text>
              <Divider />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default BonusExisting;
