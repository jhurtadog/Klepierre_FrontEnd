import React from "react";
import dayjs from "dayjs";
import {
  Modal,
  Row,
  Col,
  Input,
  InputNumber,
  Typography,
  Button,
  Divider,
} from "antd";
import useComunicados from "../../../../../../hooks/useComunicados";
import { DateFormat } from "../../../../../../helpers/types";

const ModalLocalOpeningDate = ({ isModalOpen, handleCancel }) => {
  const { Text } = Typography;
  const { state, onChange, generateOpeningDate, generateEndDate } =
    useComunicados();
  const { suspensiveCondition, communication } = state;
  const { contract } = communication;
  const { duration } = contract;
  return (
    <Modal
      title="Apertura del local"
      open={isModalOpen}
      footer={[
        <Button key="submit" onClick={handleCancel}>
          Cancelar
        </Button>,
        <Button
          key="cancel"
          onClick={() => {
            generateOpeningDate(duration.localDeliveryDate, duration);
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
          <Text>Fecha entrega del local</Text>
        </Col>
        <Col span={12}>
          <Input
            placeholder="Fecha entrega"
            value={
              duration.localDeliveryDate
                ? dayjs(duration.localDeliveryDate).format(DateFormat)
                : ""
            }
            readOnly
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col span={24}>
          <Text>Apertura del local</Text>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col span={24}>
          <Text className="text-xs">
            Especifique los días, meses y años desde la entrega del local
          </Text>
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
            name="duration.compLocalOpeningDate.nDays"
            value={duration.compLocalOpeningDate.nDays}
            onChange={(e) =>
              onChange(e, "nDays", [
                "communication",
                "contract",
                "duration",
                "compLocalOpeningDate",
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
            name="duration.compLocalOpeningDate.nMonths"
            value={duration.compLocalOpeningDate.nMonths}
            onChange={(e) =>
              onChange(e, "nMonths", [
                "communication",
                "contract",
                "duration",
                "compLocalOpeningDate",
              ])
            }
          />
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
            name="duration.compLocalOpeningDate.nYears"
            value={duration.compLocalOpeningDate.nYears}
            onChange={(e) =>
              onChange(e, "nYears", [
                "communication",
                "contract",
                "duration",
                "compLocalOpeningDate",
              ])
            }
          />
        </Col>
      </Row>
    </Modal>
  );
};

export default ModalLocalOpeningDate;
