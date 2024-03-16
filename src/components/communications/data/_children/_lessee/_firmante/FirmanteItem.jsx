import React from "react";
import { Row, Col, Divider, Typography, Radio, Input, Button } from "antd";
import { PeopleType, DocumentType } from "../../../../../../helpers/types";
import useComunicados from "../../../../../../hooks/useComunicados";

const FirmanteItem = ({
  isMain,
  data,
  blockLesseeModification = false,
  index,
}) => {
  const partialReadonly = false;
  const { Text } = Typography;
  const { state, onChange, deleteExtraSigner, onChangeExtraSigner } =
    useComunicados();
  const { isModification, validating, communication } = state;
  const { lessee } = communication;
  const { peopleType } = lessee;

  return (
    <>
      <Row className="mb-3" gutter={16}>
        <Col span={20}>
          <Text>
            {isMain ? "FIRMANTE PRINCIPAL" : `FIRMANTE ADICIONAL ${index + 1}`}{" "}
          </Text>
        </Col>
        <Col span={4}>
          {!isMain && (
            <Button
              type="dashed"
              //icon="delete"
              disabled={isModification && blockLesseeModification}
              onClick={() => deleteExtraSigner(index)}
            >
              Eliminar
            </Button>
          )}
        </Col>
      </Row>
      <Row className="mb-3" gutter={16}>
        <Col span={4} className="text-right pt-1 pb-2">
          <Text className="text-red-700">*</Text>&nbsp;Nombre:
        </Col>
        <Col span={12}>
          <Input
            status={validating && !data.name && "error"}
            name="signerGESAL.name"
            disabled={
              (partialReadonly && peopleType === PeopleType.Fisica) ||
              (isModification && blockLesseeModification)
            }
            value={data ? data.name : ""}
            onChange={(e) =>
              isMain
                ? onChange(e.target.value, "name", [
                    "communication",
                    "lessee",
                    "signerGESAL",
                  ])
                : onChangeExtraSigner(e.target.value, index, "name")
            }
          />
        </Col>
      </Row>
      <Row style={{ marginBottom: "20px" }} gutter={16}>
        <Col span={4} className="text-right pt-1 pb-2">
          <Text className="text-red-700">*</Text>&nbsp;Documento:
        </Col>
        <Col span={4}>
          <Input
            status={validating && !data.documentNumber && "error"}
            name="signerGESAL.documentNumber"
            disabled={
              (partialReadonly && peopleType === PeopleType.Fisica) ||
              (isModification && blockLesseeModification)
            }
            value={data ? data.documentNumber : ""}
            onChange={(e) =>
              isMain
                ? onChange(e.target.value, "documentNumber", [
                    "communication",
                    "lessee",
                    "signerGESAL",
                  ])
                : onChangeExtraSigner(e.target.value, index, "documentNumber")
            }
          />
        </Col>
        <Col span={14} offset={2}>
          <Radio.Group
            defaultValue={DocumentType.NIF}
            name="signerGESAL.documentType"
            disabled={
              (partialReadonly && peopleType === PeopleType.Fisica) ||
              (isModification && blockLesseeModification)
            }
            value={data ? data.documentType : ""}
            onChange={(e) =>
              isMain
                ? onChange(e.target.value, "documentType", [
                    "communication",
                    "lessee",
                    "signerGESAL",
                  ])
                : onChangeExtraSigner(e.target.value, index, "documentType")
            }
          >
            <Radio value={DocumentType.NIF}>N.I.F.</Radio>
            <Radio value={DocumentType.NIE}>N.I.E.</Radio>
            <Radio value={DocumentType.Passport}>Pasaporte</Radio>
          </Radio.Group>
        </Col>
      </Row>
      <Row className="mb-3" gutter={16}>
        <Col span={24}>
          <Text>Domicilio</Text>
        </Col>
      </Row>
      <Row className="mb-3" gutter={16}>
        <Col span={4} className="text-right pt-1 pb-2">
          <Text className="text-red-700">*</Text>&nbsp;Dirección:
        </Col>
        <Col span={14}>
          <Input
            status={validating && !data.domicile.address && "error"}
            name="signerGESAL.domicile.address"
            disabled={
              (partialReadonly && peopleType === PeopleType.Fisica) ||
              (isModification && blockLesseeModification)
            }
            value={data ? data.domicile.address : ""}
            onChange={(e) =>
              isMain
                ? onChange(e.target.value, "address", [
                    "communication",
                    "lessee",
                    "signerGESAL",
                    "domicile",
                  ])
                : onChangeExtraSigner(e.target.value, index, "address", [
                    "domicile",
                  ])
            }
            placeholder="(Siglas, Calle, Número, Escalera, Piso, Puerta)"
          />
        </Col>
        <Col span={2} className="text-right pt-1 pb-2">
          <Text className="text-red-700">*</Text>&nbsp;C.P.:
        </Col>
        <Col span={4}>
          <Input
            status={validating && !data.domicile.zipCode && "error"}
            name="signerGESAL.domicile.zipCode"
            disabled={
              (partialReadonly && peopleType === PeopleType.Fisica) ||
              (isModification && blockLesseeModification)
            }
            value={data ? data.domicile.zipCode : ""}
            onChange={(e) =>
              isMain
                ? onChange(e.target.value, "zipCode", [
                    "communication",
                    "lessee",
                    "signerGESAL",
                    "domicile",
                  ])
                : onChangeExtraSigner(e.target.value, index, "zipCode", [
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
            status={validating && !data.domicile.town && "error"}
            name="signerGESAL.domicile.town"
            disabled={
              (partialReadonly && peopleType === PeopleType.Fisica) ||
              (isModification && blockLesseeModification)
            }
            value={data ? data.domicile.town : ""}
            onChange={(e) =>
              isMain
                ? onChange(e.target.value, "town", [
                    "communication",
                    "lessee",
                    "signerGESAL",
                    "domicile",
                  ])
                : onChangeExtraSigner(e.target.value, index, "town", [
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
            status={validating && !data.domicile.state && "error"}
            name="signerGESAL.domicile.state"
            disabled={
              (partialReadonly && peopleType === PeopleType.Fisica) ||
              (isModification && blockLesseeModification)
            }
            value={data ? data.domicile.state : ""}
            onChange={(e) =>
              isMain
                ? onChange(e.target.value, "state", [
                    "communication",
                    "lessee",
                    "signerGESAL",
                    "domicile",
                  ])
                : onChangeExtraSigner(e.target.value, index, "state", [
                    "domicile",
                  ])
            }
          />
        </Col>
      </Row>
      <Row className="mb-3" gutter={16}>
        <Col span={4} className="text-right pt-1 pb-2">
          Teléfono:
        </Col>
        <Col span={4}>
          <Input
            name="signerGESAL.phone"
            disabled={
              (partialReadonly && peopleType === PeopleType.Fisica) ||
              (isModification && blockLesseeModification)
            }
            value={data ? data.phone : ""}
            onChange={(e) =>
              isMain
                ? onChange(e.target.value, "phone", [
                    "communication",
                    "lessee",
                    "signerGESAL",
                  ])
                : onChangeExtraSigner(e.target.value, index, "phone")
            }
          />
        </Col>
      </Row>
      {index >= 0 && <Divider />}
    </>
  );
};

export default FirmanteItem;
