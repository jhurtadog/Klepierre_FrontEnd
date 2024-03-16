import React, { useState } from "react";
import { Row, Col, Divider, Typography, Input, Select } from "antd";
import { BusinessType } from "../../../../../helpers/types";
import ModalDestinyLabel from "../_contract/_modal/ModalDestinyLabel";
import ModalDestinyGroup from "../_contract/_modal/ModalDestinyGroup";
import ModalDestinyActivity from "../_contract/_modal/ModalDestinyActivity";
import useComunicados from "../../../../../hooks/useComunicados";

const Destino = () => {
  const [isModalOpenDestinyLabel, setIsModalOpenDestinyLabel] = useState(false);
  const [isModalOpenDestinyGroup, setIsModalOpenDestinyGroup] = useState(false);
  const [isModalOpenDestinyActivity, setIsModalOpenDestinyActivity] =
    useState(false);
  const { Title, Text } = Typography;
  const { state, onChange } = useComunicados();
  const {
    isModification,
    blockContractModification,
    validating,
    communication,
  } = state;
  const { contract } = communication;
  const { destiny } = contract;

  const showModalDestinyLabel = () => {
    setIsModalOpenDestinyLabel(true);
  };
  const handleOkDestinyLabel = () => {
    setIsModalOpenDestinyLabel(false);
  };
  const handleCancelDestinyLabel = () => {
    setIsModalOpenDestinyLabel(false);
  };
  const showModalDestinyGroup = () => {
    setIsModalOpenDestinyGroup(true);
  };
  const handleOkDestinyGroup = () => {
    setIsModalOpenDestinyGroup(false);
  };
  const handleCancelDestinyGroup = () => {
    setIsModalOpenDestinyGroup(false);
  };
  const showModalDestinyActivity = () => {
    setIsModalOpenDestinyActivity(true);
  };
  const handleOkDestinyActivity = () => {
    setIsModalOpenDestinyActivity(false);
  };
  const handleCancelDestinyActivity = () => {
    setIsModalOpenDestinyActivity(false);
  };
  return (
    <>
      <Title level={4}>DESTINO</Title>
      <Row className="mb-3" gutter={16}>
        <Col span={4} className="text-right pt-1 pb-2">
          <Text className="text-red-700">*</Text>&nbsp;Rótulo:
        </Col>
        <Col span={8}>
          <Input
            status={validating && !destiny.label && "error"}
            name="destiny.label"
            readOnly
            value={
              destiny.label !== ""
                ? destiny.labelId === ""
                  ? "(Nuevo rótulo) " + destiny.label
                  : destiny.label
                : ""
            }
            disabled={isModification && blockContractModification}
            onClick={showModalDestinyLabel}
          />
        </Col>
        <Col span={3} className="text-right pt-1 pb-2">
          <Text className="text-red-700">*</Text>&nbsp;Grupo:
        </Col>
        <Col span={9}>
          <Input
            status={validating && !destiny.group && "error"}
            name="destiny.group"
            readOnly
            value={
              destiny.group !== ""
                ? destiny.groupId === ""
                  ? ""
                  : destiny.group
                : ""
            }
            disabled={isModification}
            onClick={showModalDestinyGroup}
          />
        </Col>
      </Row>
      <Row className="mb-3" gutter={16}>
        <Col span={4} className="text-right pt-1 pb-2">
          <Text className="text-red-700">*</Text>&nbsp;Destino:
        </Col>
        <Col span={8}>
          <Input
            status={validating && !destiny.destiny && "error"}
            name="destiny.destiny"
            value={destiny.destiny}
            disabled={isModification}
            onChange={(e) =>
              onChange(e.target.value, "destiny", [
                "communication",
                "contract",
                "destiny",
              ])
            }
          />
        </Col>
        <Col span={3} className="text-right pt-1 pb-2">
          <Text className="text-red-700">*</Text>&nbsp;Actividad:
        </Col>
        <Col span={9}>
          <Input
            status={validating && !destiny.activity && "error"}
            name="destiny.activity"
            readOnly
            value={
              destiny.activity !== ""
                ? destiny.activityId === "" || destiny.activityId === "0"
                  ? ""
                  : destiny.activity
                : ""
            }
            disabled={isModification}
            onClick={showModalDestinyActivity}
          />
        </Col>
      </Row>
      <Row className="mb-3" gutter={16}>
        <Col span={4} className="text-right pt-1 pb-2">
          <Text className="text-red-700">*</Text>&nbsp;Tipo de negocio:
        </Col>
        <Col span={8}>
          <Select
            status={validating && !destiny.destinationBusinessTypeId && "error"}
            value={destiny.destinationBusinessTypeId || undefined}
            placeholder="Seleccione tipo de negocio..."
            className="w-full"
            disabled={isModification}
            onChange={(e) =>
              onChange(e, "destinationBusinessTypeId", [
                "communication",
                "contract",
                "destiny",
              ])
            }
            options={[
              {
                value: BusinessType.Franchisee,
                label: "Franquiciado",
              },
              {
                value: BusinessType.Freelance,
                label: "Independiente",
              },
              {
                value: BusinessType.Chain,
                label: "Cadena",
              },
            ]}
          />
        </Col>
      </Row>
      <Divider />
      <ModalDestinyLabel
        isModalOpen={isModalOpenDestinyLabel}
        handleOk={handleOkDestinyLabel}
        handleCancel={handleCancelDestinyLabel}
      />
      <ModalDestinyGroup
        isModalOpen={isModalOpenDestinyGroup}
        handleOk={handleOkDestinyGroup}
        handleCancel={handleCancelDestinyGroup}
      />
      <ModalDestinyActivity
        isModalOpen={isModalOpenDestinyActivity}
        handleOk={handleOkDestinyActivity}
        handleCancel={handleCancelDestinyActivity}
      />
    </>
  );
};

export default Destino;
