import React from "react";
import dayjs from "dayjs";
import {
  Row,
  Col,
  Divider,
  Typography,
  Radio,
  DatePicker,
  Checkbox,
} from "antd";
import useComunicados from "../../../../../hooks/useComunicados";
import { CommunicationType, DateFormat } from "../../../../../helpers/types";

const CondicionSuspensiva = ({ blockLesseeModification = false }) => {
  const { Text, Title } = Typography;
  const { state, onChange, generateEndDate } = useComunicados();
  const { readOnly, isModification, communication } = state;
  const { communicationType, lessee, contract } = communication;
  const { suspensiveCondition, subrogationDate, modifyLesseeChanges } = lessee;
  const { duration } = contract;
  function onSelectDate(dateString) {
    onChange(dateString, "subrogationDate", ["communication", "lessee"]);
  }

  return (
    <>
      {communicationType === CommunicationType.AcuerdoComplementario && (
        <Title level={3} className="underline">
          CAMBIOS EN ARRENDATARIO
        </Title>
      )}
      {communicationType === CommunicationType.Subrogacion && (
        <Title level={4}>
          DATOS DE LA SUBROGACIÓN Y DEL NUEVO ARRENDATARIO
        </Title>
      )}
      {communicationType !== CommunicationType.Subrogacion && (
        <>
          <Title level={4}>CONDICIÓN SUSPENSIVA</Title>
          <Row className="mb-5" gutter={16}>
            <Col span={8}>
              <Text>¿El Contrato está sujeto a condición suspensiva?</Text>
            </Col>
            <Col span={8}>
              <Radio.Group
                name="suspensiveCondition"
                defaultValue={true}
                value={suspensiveCondition}
                disabled={isModification && blockLesseeModification}
                onChange={(e) => {
                  onChange(e.target.value, "suspensiveCondition", [
                    "communication",
                    "lessee",
                  ]);
                  generateEndDate(
                    duration.localDeliveryDate,
                    duration.signatureDate,
                    duration,
                    e.target.value
                  );
                }}
              >
                <Radio value={true}>Si</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </Col>
          </Row>
          <Divider />
        </>
      )}

      {communicationType === CommunicationType.Subrogacion && !readOnly && (
        <Row className="mb-10" gutter={16}>
          <Col span={4}>
            <Text>Fecha subrogación:</Text>
          </Col>
          <Col span={4}>
            <DatePicker
              className="w-full"
              value={subrogationDate && dayjs(subrogationDate)}
              format={DateFormat}
              onChange={onSelectDate}
              disabled={isModification && blockLesseeModification}
            />
          </Col>
        </Row>
      )}
      {communicationType === CommunicationType.AcuerdoComplementario &&
        !readOnly && (
          <Row style={{ marginBottom: "50px" }} gutter={16}>
            <Col span={12} className="text-right pt-1 pb-2">
              <Text className="text-red-700"></Text>&nbsp;Rellenar
              modificaciones del arrendatario sobre el contrato:
            </Col>
            <Col span={4}>
              <Checkbox
                name="modifyLesseeChanges"
                className="pt-1"
                checked={modifyLesseeChanges}
                onChange={(e) =>
                  onChange(e.target.checked, "modifyLesseeChanges", [
                    "communication",
                    "lessee",
                  ])
                }
                disabled={isModification && blockLesseeModification}
              ></Checkbox>
            </Col>
          </Row>
        )}
    </>
  );
};

export default CondicionSuspensiva;
