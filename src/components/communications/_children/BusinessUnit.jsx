import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Row, Col, Input } from "antd";
import useComunicados from "../../../hooks/useComunicados";
import ModalCenters from "./ModalCenters";
import ModalLocals from "./ModalLocals";

const BusinessUnit = () => {
  const { state, onChange, getLocalsByGaleriaId } = useComunicados();
  const { readOnly, communication } = state;
  const {
    buildingName,
    localsAssociated,
    center,
    centerName,
    area,
    floor,
    reference,
  } = communication;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenLocals, setIsModalOpenLocals] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const showModalLocals = () => {
    setIsModalOpenLocals(center ? true : false);
  };
  const handleOk = () => {
    if (center !== "") {
      getLocalsByGaleriaId(center);
    }
    setIsModalOpen(false);
  };
  const handleOkLocals = () => {
    setIsModalOpenLocals(false);
  };
  const handleCancel = () => {
    if (reference === undefined) {
      onChange("", "center", ["communication"]);
      onChange("", "centerName", ["communication"]);
    }
    setIsModalOpen(false);
  };
  const handleCancelLocals = () => {
    if (reference === undefined) {
      onChange([], "selectedLocal", ["communication"]);
      onChange("", "societyName", ["communication"]);
      onChange("", "societyId", ["communication"]);
      onChange("", "area", ["communication"]);
      onChange("", "floor", ["communication"]);
      onChange([], "local", ["lists"]);
    }
    setIsModalOpenLocals(false);
  };

  return (
    <div className={readOnly ? "pointer-events-none cursor-none" : ""}>
      <Row style={{ marginBottom: "10px" }} gutter={32}>
        <Col span={12}>
          <Input
            addonBefore="Centro"
            value={centerName}
            addonAfter={<SearchOutlined onClick={showModal} />}
          />
        </Col>
        <Col span={12}>
          <Input addonBefore="Edificio" value={buildingName} readOnly />
        </Col>
      </Row>
      <Row style={{ marginBottom: "10px" }} gutter={32}>
        <Col span={12}>
          <Input
            addonBefore="Local/es"
            value={communication.local || localsAssociated}
            addonAfter={<SearchOutlined onClick={showModalLocals} />}
          />
        </Col>
        <Col span={6}>
          <Input addonBefore="Planta" value={floor.toUpperCase()} readOnly />
        </Col>
        <Col span={6}>
          <Input
            addonBefore="Superficie"
            value={area}
            readOnly
            addonAfter="m2"
          />
        </Col>
      </Row>
      <ModalCenters
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
      <ModalLocals
        isModalOpenLocals={isModalOpenLocals}
        handleOkLocals={handleOkLocals}
        handleCancelLocals={handleCancelLocals}
      />
    </div>
  );
};

export default BusinessUnit;
