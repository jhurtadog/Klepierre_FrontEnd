import React from "react";
import { Row, Col, Divider, Typography, Input } from "antd";
import {
  PeopleType,
  SocietyType,
  CommunicationType,
} from "../../../../../helpers/types";
import useComunicados from "../../../../../hooks/useComunicados";
import RegistreData from "./_society/RegistryData";

const Sociedad = ({ blockLesseeModification = false, partialReadonly }) => {
  const { Text, Title } = Typography;
  const { state, onChange } = useComunicados();
  const { isModification, validating, communicationType, communication } =
    state;
  const { lessee } = communication;
  const { society, peopleType, societyType } = lessee;

  if (peopleType === PeopleType.Fisica && societyType === SocietyType.Fisica)
    return null;

  return (
    <>
      <Title level={4}>SOCIEDAD</Title>
      <Row className="mb-3" gutter={16}>
        <Col span={4} className="text-right pt-1 pb-2">
          <Text className="text-red-700">*</Text>&nbsp;
          <Text>Razón Social:</Text>
        </Col>
        <Col span={8}>
          <Input
            status={
              ((validating &&
                peopleType === PeopleType.Juridica &&
                !society.businessName) ||
                (validating &&
                  peopleType === PeopleType.Fisica &&
                  societyType !== SocietyType.Fisica &&
                  !society.businessName)) &&
              "error"
            }
            name="society.businessName"
            value={society.businessName}
            placeholder="Razón social"
            disabled={
              partialReadonly || (isModification && blockLesseeModification)
            }
            onChange={(e) =>
              onChange(e.target.value, "businessName", [
                "communication",
                "lessee",
                "society",
              ])
            }
          />
        </Col>
        <Col span={2} className="text-right pt-1 pb-2">
          <Text className="text-red-700">*</Text>&nbsp;<Text>CIF:</Text>
        </Col>
        <Col span={4}>
          <Input
            name="society.documentNumber"
            value={society.documentNumber}
            placeholder={"CIF"}
            disabled={
              partialReadonly || (isModification && blockLesseeModification)
            }
            onChange={(e) =>
              onChange(e.target.value, "documentNumber", [
                "communication",
                "lessee",
                "society",
              ])
            }
            status={
              ((validating &&
                peopleType === PeopleType.Juridica &&
                !society.documentNumber) ||
                (validating &&
                  peopleType === PeopleType.Fisica &&
                  societyType !== SocietyType.Fisica &&
                  !society.documentNumber)) &&
              "error"
            }
          />
        </Col>
        <Col span={2} className="text-right pt-1 pb-2">
          <Text>Teléfono:</Text>
        </Col>
        <Col span={4}>
          <Input
            name="society.phone"
            value={society.phone}
            disabled={
              (partialReadonly &&
                communicationType !==
                  CommunicationType.AcuerdoComplementario) ||
              (isModification && blockLesseeModification)
            }
            onChange={(e) =>
              onChange(e.target.value, "phone", [
                "communication",
                "lessee",
                "society",
              ])
            }
          />
        </Col>
      </Row>
      <RegistreData partialReadonly={partialReadonly} />
      <Row className="mb-3" gutter={16}>
        <Col span={16}>
          <Text>DOMICILIO SOCIAL</Text>
        </Col>
      </Row>
      <Row className="mb-3" gutter={16}>
        <Col span={4} className="text-right pt-1 pb-2">
          <Text className="text-red-700">*</Text>&nbsp;Dirección:
        </Col>
        <Col span={14}>
          <Input
            status={
              ((validating &&
                peopleType === PeopleType.Juridica &&
                !society.domicile.address) ||
                (validating &&
                  peopleType === PeopleType.Fisica &&
                  societyType !== SocietyType.Fisica &&
                  !society.domicile.address)) &&
              "error"
            }
            name="society.domicile.address"
            disabled={
              partialReadonly || (isModification && blockLesseeModification)
            }
            value={society.domicile.address}
            onChange={(e) =>
              onChange(e.target.value, "address", [
                "communication",
                "lessee",
                "society",
                "domicile",
              ])
            }
            placeholder="(Siglas, Calle, Número, Escalera, Piso, Puerta)"
          />
        </Col>
        <Col span={2} className="text-right pt-1 pb-2">
          <Text className="text-red-700">*</Text>&nbsp;C. P.:
        </Col>
        <Col span={4}>
          <Input
            status={
              ((validating &&
                peopleType === PeopleType.Juridica &&
                !society.domicile.zipCode) ||
                (validating &&
                  peopleType === PeopleType.Fisica &&
                  societyType !== SocietyType.Fisica &&
                  !society.domicile.zipCode)) &&
              "error"
            }
            name="society.domicile.zipCode"
            disabled={
              partialReadonly || (isModification && blockLesseeModification)
            }
            value={society.domicile.zipCode}
            onChange={(e) =>
              onChange(e.target.value, "zipCode", [
                "communication",
                "lessee",
                "society",
                "domicile",
              ])
            }
          />
        </Col>
      </Row>
      <Row className="mb-3" gutter={16}>
        <Col span={4} className="text-right pt-1 pb-2">
          <Text className="text-red-700">*</Text>&nbsp;Municipio:
        </Col>
        <Col span={8}>
          <Input
            status={
              ((validating &&
                peopleType === PeopleType.Juridica &&
                !society.domicile.town) ||
                (validating &&
                  peopleType === PeopleType.Fisica &&
                  societyType !== SocietyType.Fisica &&
                  !society.domicile.town)) &&
              "error"
            }
            name="society.domicile.town"
            disabled={
              partialReadonly || (isModification && blockLesseeModification)
            }
            value={society.domicile.town}
            onChange={(e) =>
              onChange(e.target.value, "town", [
                "communication",
                "lessee",
                "society",
                "domicile",
              ])
            }
          />
        </Col>
        <Col span={4} className="text-right pt-1 pb-2">
          <Text className="text-red-700">*</Text>&nbsp;Provincia:
        </Col>
        <Col span={8}>
          <Input
            status={
              ((validating &&
                peopleType === PeopleType.Juridica &&
                !society.domicile.state) ||
                (validating &&
                  peopleType === PeopleType.Fisica &&
                  societyType !== SocietyType.Fisica &&
                  !society.domicile.state)) &&
              "error"
            }
            name="society.domicile.state"
            disabled={
              partialReadonly || (isModification && blockLesseeModification)
            }
            value={society.domicile.state}
            onChange={(e) =>
              onChange(e.target.value, "state", [
                "communication",
                "lessee",
                "society",
                "domicile",
              ])
            }
          />
        </Col>
      </Row>
      <Divider />
    </>
  );
};

export default Sociedad;
