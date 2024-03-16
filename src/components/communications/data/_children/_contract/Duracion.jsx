import React, { useState } from "react";
import dayjs from "dayjs";
import { Input, Row, Col, DatePicker, Divider, Typography } from "antd";
import useComunicados from "../../../../../hooks/useComunicados";
import ModalLocalOpeningDate from "../_contract/_modal/ModalLocalOpeningDate";
import ModalContractEndDate from "../_contract/_modal/ModalContractEndDate";
import Prorrogas from "./_duracion/Prorrogas";
import Ruptura from "./_duracion/Ruptura";
import Obras from "./_duracion/Obras";
import { DateFormat, CommunicationType } from "../../../../../helpers/types";

const Duracion = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenContractEnd, setIsModalOpenContractEnd] = useState(false);
  const { Title, Text } = Typography;
  const { state, generateOpeningDate, generateEndDate } = useComunicados();
  const { readOnly, isModification, communication, validating } = state;
  const { communicationType, lessee, contract } = communication;
  const { modifyContractChanges, duration } = contract;
  const { suspensiveCondition } = lessee;
  const { localDeliveryDate, signatureDate, compLocalOpeningDate } = duration;
  const { nDays, nMonths, nYears } = compLocalOpeningDate;

  const showModal = () => {
    setIsModalOpen(true);
  };
  const showModalContractEnd = () => {
    setIsModalOpenContractEnd(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleCancelContractEnd = () => {
    setIsModalOpenContractEnd(false);
  };
  function onSelectDate(dateString) {
    generateOpeningDate(dateString, duration);
    generateEndDate(
      dateString,
      duration.signatureDate,
      duration,
      suspensiveCondition
    );
  }
  return (
    <>
      {(communicationType !== CommunicationType.AcuerdoComplementario ||
        (communicationType === CommunicationType.AcuerdoComplementario &&
          readOnly) ||
        (communicationType === CommunicationType.AcuerdoComplementario &&
          !readOnly &&
          modifyContractChanges)) && <Title level={4}>DURACIÓN</Title>}
      {communicationType !== CommunicationType.AcuerdoComplementario && (
        <Row className="mb-3" gutter={16}>
          <Col span={4} className="text-right pt-1 pb-2">
            <Text className="text-red-600">*</Text>&nbsp;Fecha de entrega:
          </Col>
          <Col span={4}>
            <DatePicker
              status={validating && !localDeliveryDate && "error"}
              value={localDeliveryDate && dayjs(localDeliveryDate)}
              format={DateFormat}
              onChange={onSelectDate}
              className="w-full"
              disabled={isModification}
              placeholder="Fecha entrega"
            />
            {localDeliveryDate &&
              signatureDate &&
              localDeliveryDate < signatureDate && (
                <Text className="text-xs w-full text-red-700">
                  La fecha de entrega debe ser mayor o igual que la fecha de
                  firma.
                </Text>
              )}
          </Col>
          <Col span={4} className="text-right pt-1 pb-2">
            <Text className="text-red-600">*</Text>&nbsp;Fecha de apertura:
          </Col>

          <Col span={1} style={{ marginRight: "18px" }}>
            <Input
              name={"nDays"}
              value={nDays}
              style={{ width: "45px" }}
              disabled={isModification}
              onClick={showModal}
              readOnly
            />
            <Text>días</Text>
          </Col>

          <Col span={1} style={{ marginRight: "18px" }}>
            <Input
              name={"nMonths"}
              value={nMonths}
              style={{ width: "45px" }}
              disabled={isModification}
              onClick={showModal}
              readOnly
            />
            <Text>meses</Text>
          </Col>

          <Col span={1} style={{ marginRight: "18px" }}>
            <Input
              name={"nYears"}
              value={nYears}
              style={{ width: "45px" }}
              disabled={isModification}
              onClick={showModal}
              readOnly
            />
            <Text>años</Text>
          </Col>

          <Col span={6} style={{ paddingTop: "5px" }}>
            <Text>(desde la entrega del local)</Text>
          </Col>
        </Row>
      )}
      <Row className="mb-3" gutter={16}>
        <Col span={4} className="text-right pt-1 pb-2">
          <Text className="text-red-600">*</Text>&nbsp;Fecha de la firma:
        </Col>
        <Col span={4}>
          <Input
            status={validating && !duration.signatureDate && "error"}
            placeholder="Fecha firma"
            readOnly
            value={
              duration.signatureDate
                ? dayjs(duration.signatureDate).format(DateFormat)
                : ""
            }
            disabled={isModification}
            onClick={showModalContractEnd}
          />
        </Col>
        <Col span={4} className="text-right pt-1 pb-2">
          <Text>Fecha fin:</Text>
        </Col>
        <Col span={4}>
          <Input
            placeholder="Fecha fin"
            value={
              duration.endDate ? dayjs(duration.endDate).format(DateFormat) : ""
            }
            readOnly
            disabled
          />
        </Col>
      </Row>
      <Row className="mb-3" gutter={16}>
        <Col span={4} className="text-right pt-1 pb-2">
          Duración:
        </Col>
        <Col span={4} className="text-right">
          <span>&nbsp;Nº Años:&nbsp;&nbsp;</span>
          <Input
            value={duration.compEndDate.nYears}
            style={{ width: "47%" }}
            readOnly
            disabled
          />
        </Col>
        <Col span={4} className="text-right pt-1 pb-2">
          Nº Meses:
        </Col>
        <Col span={2}>
          <Input value={duration.compEndDate.nMonths} readOnly disabled />
        </Col>
        <Col span={4} className="text-right pt-1 pb-2">
          Nº Días:
        </Col>
        <Col span={2}>
          <Input value={duration.compEndDate.nDays} readOnly disabled />
        </Col>
      </Row>
      <Divider />
      <Prorrogas />
      <Ruptura />
      <Obras />
      <ModalLocalOpeningDate
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
      />
      <ModalContractEndDate
        isModalOpen={isModalOpenContractEnd}
        handleCancel={handleCancelContractEnd}
      />
    </>
  );
};

export default Duracion;
