import React from "react";
import dayjs from "dayjs";
import {
  Modal,
  Row,
  Col,
  DatePicker,
  InputNumber,
  Typography,
  Divider,
  Button,
} from "antd";
import useComunicados from "../../../../../../hooks/useComunicados";
import { DateFormat } from "../../../../../../helpers/types";
import { CommunicationType } from "../../../../../../helpers/types";

const ModalContractEndDate = ({ isModalOpen, handleCancel }) => {
  const { Text } = Typography;
  const { state, onChange, generateEndDate } = useComunicados();
  const { communication } = state;
  const { communicationType, contract, lessee } = communication;
  const { suspensiveCondition } = lessee;
  const { duration } = contract;
  function onSelectDate(dateString) {
    generateEndDate(
      duration.localDeliveryDate,
      dateString,
      duration,
      suspensiveCondition
    );
  }
  const isCompAgreement =
    communicationType === CommunicationType.AcuerdoComplementario;

  return (
    <Modal
      open={isModalOpen}
      title="Duración del Contrato"
      footer={[
        <Button key="submit" onClick={handleCancel}>
          Cancelar
        </Button>,
        <Button
          key="cancel"
          onClick={() => {
            generateEndDate(
              duration.localDeliveryDate,
              duration.signatureDate,
              duration,
              suspensiveCondition
            );
            handleCancel();
          }}
        >
          Aceptar
        </Button>,
      ]}
      onCancel={handleCancel}
    >
      <Divider />
      <Row className="mb-3">
        <Col span={12}>
          <Text>Fecha firma</Text>&nbsp;<Text className="text-red-700">*</Text>
        </Col>
        <Col span={12}>
          <DatePicker
            className="w-full"
            placeholder="Fecha firma"
            value={duration.signatureDate && dayjs(duration.signatureDate)}
            disabled={isCompAgreement}
            onChange={onSelectDate}
            format={DateFormat}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col span={24}>
          <Text>Duración</Text>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col span={24}>
          <Text className="text-xs">
            Especifique los días, meses y años que durará el contrato
          </Text>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col span={8}>
          <Text>Nº Años:</Text>
        </Col>
        <Col span={8}>
          <InputNumber
            type="number"
            min={0}
            max={12}
            name="duration.compEndDate.nYears"
            value={duration.compEndDate.nYears}
            onChange={(e) =>
              onChange(e, "nYears", [
                "communication",
                "contract",
                "duration",
                "compEndDate",
              ])
            }
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col span={8}>
          <Text>Nº Meses:</Text>
        </Col>
        <Col span={8}>
          <InputNumber
            type="number"
            min={0}
            max={12}
            name="duration.compEndDate.nMonths"
            value={duration.compEndDate.nMonths}
            onChange={(e) =>
              onChange(e, "nMonths", [
                "communication",
                "contract",
                "duration",
                "compEndDate",
              ])
            }
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col span={8}>
          <Text>Nº Días:</Text>
        </Col>
        <Col span={8}>
          <InputNumber
            type="number"
            min={0}
            name="duration.compEndDate.nDays"
            value={duration.compEndDate.nDays}
            onChange={(e) =>
              onChange(e, "nDays", [
                "communication",
                "contract",
                "duration",
                "compEndDate",
              ])
            }
          />
        </Col>
      </Row>
    </Modal>
  );
};

export default ModalContractEndDate;
