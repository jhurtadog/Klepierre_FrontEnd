import React from "react";
import { Button, Row, Col, Divider, Typography, Radio, Input } from "antd";
import useComunicados from "../../../hooks/useComunicados";
import BonusItem from "./_children/_bonification/BonusItem";
import BonusExisting from "./_children/_bonification/BonusExisting";

const Bonification = () => {
  const { Text } = Typography;
  const { state, onChange, addBonus } = useComunicados();
  const {
    readOnly,
    isModification,
    blockBonificationModification,
    communication,
  } = state;
  const { bonification } = communication;
  const { bonificationTypeId, items } = bonification;

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
      <BonusExisting />
      <Row className="mb-3">
        <Col span={24}>
          <Radio.Group
            name="bonificationTypeId"
            value={bonificationTypeId}
            defaultValue={1}
            disabled={isModification && blockBonificationModification}
            onChange={(e) =>
              onChange(e.target.value, "bonificationTypeId", [
                "communication",
                "bonification",
              ])
            }
          >
            <Radio value={1}>Fechas determinadas</Radio>
            <Radio value={2}>Devengo del contrato</Radio>
          </Radio.Group>
        </Col>
      </Row>
      <Divider />
      <Row className="mb-3" gutter={32}>
        <Col span={8}>
          <Text strong>Nuevas Bonificaciones</Text>
        </Col>
        <Col span={16}>
          <Button
            disabled={isModification && blockBonificationModification}
            onClick={addBonus}
          >
            Añadir bonificación
          </Button>
        </Col>
      </Row>
      {items.map((item, i) => (
        <BonusItem key={i} bonus={item} index={i} />
      ))}
    </div>
  );
};

export default Bonification;
