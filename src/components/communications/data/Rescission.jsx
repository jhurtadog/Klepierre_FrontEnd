import React from "react";
import dayjs from "dayjs";
import {
  Input,
  Row,
  Col,
  Typography,
  Divider,
  DatePicker,
  Select,
  Checkbox,
} from "antd";
import useComunicados from "../../../hooks/useComunicados";
import { DateFormat } from "../../../helpers/types";

const Rescission = () => {
  const { Title, Text } = Typography;
  const { state, onChange } = useComunicados();
  const {
    readOnly,
    isModification,
    blockRescissionModification,
    communication,
  } = state;
  const { debt } = communication;
  const { currentContractDebt, totalDebtMinusGuarantees, rescission } = debt;
  const { rescissionDate, compensatedId, handoverOf, reason } = rescission;
  const HANDOVER_OPTIONS = ["FIANZA", "GARANTÍA ADICIONAL"];
  function onSelectDate(dateString) {
    onChange(dateString, "rescissionDate", [
      "communication",
      "debt",
      "rescission",
    ]);
  }
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

      <Title level={4}>DATOS DE LA RESCISIÓN</Title>
      <Row className="mb-3" gutter={32}>
        <Col span={12}>
          <Input
            addonBefore="Deuda Contrato Actual"
            value={currentContractDebt}
            disabled
          />
        </Col>
        <Col span={12}>
          <Input
            addonBefore="Total Deuda - Garantías"
            value={totalDebtMinusGuarantees}
            disabled
          />
        </Col>
      </Row>
      <Divider />
      <Row className="mb-3" gutter={32}>
        <Col span={6}>
          <Text>Fecha Rescisión</Text>
        </Col>
        <Col span={6}>
          <DatePicker
            value={rescissionDate && dayjs(rescissionDate)}
            disabled={isModification && blockRescissionModification}
            format={DateFormat}
            onChange={onSelectDate}
            className="w-1/2"
          />
        </Col>
        <Col span={6}>
          <Text>Indemnización a favor de:</Text>
        </Col>
        <Col span={6}>
          <Select
            value={compensatedId}
            placeholder="Seleccione..."
            disabled={isModification && blockRescissionModification}
            className="w-1/2"
            onChange={(e) =>
              onChange(e, "compensatedId", [
                "communication",
                "debt",
                "rescission",
              ])
            }
            options={[
              {
                value: 1,
                label: "Arrendadora",
              },
              {
                value: 2,
                label: "Arrendatario",
              },
            ]}
          />
        </Col>
      </Row>
      <Divider />
      <Row className="mb-3" gutter={32}>
        <Col span={12}>
          <Text>En caso de Renovación, traspaso al nuevo contrato de:</Text>
        </Col>
        <Col span={12}>
          <Checkbox.Group
            options={HANDOVER_OPTIONS}
            value={handoverOf}
            disabled={isModification && blockRescissionModification}
            onChange={(e) =>
              onChange(e, "handoverOf", ["communication", "debt", "rescission"])
            }
          />
        </Col>
      </Row>
      <Divider />
      <Row className="mb-3" gutter={32}>
        <Col span={24}>
          <Input
            addonBefore="Motivo"
            name="reason"
            value={reason}
            disabled={isModification && blockRescissionModification}
            onChange={(e) =>
              onChange(e.target.value, "reason", [
                "communication",
                "debt",
                "rescission",
              ])
            }
          />
        </Col>
      </Row>
    </div>
  );
};

export default Rescission;
