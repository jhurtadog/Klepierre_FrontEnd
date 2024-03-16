import React from "react";
import { Row, Col, Typography, Input, Button } from "antd";
import {
  PeopleType,
  CommunicationType,
  SocietyType,
} from "../../../../../../helpers/types";
import { regDataCount } from "../../../../../../helpers/validators";
import useComunicados from "../../../../../../hooks/useComunicados";

const RegistreData = ({ blockLesseeModification = false, partialReadonly }) => {
  const { Text } = Typography;
  const { state, onChange, getRegisterData } = useComunicados();
  const {
    readOnly,
    isModification,
    validating,
    communicationType,
    communication,
  } = state;
  const { lessee } = communication;
  const { society, peopleType, societyType, documentNumber } = lessee;

  if (peopleType !== PeopleType.Juridica) return null;

  return (
    <>
      <Row className="mb-3" gutter={16}>
        <Col span={24}>
          <Text>DATOS REGISTRALES</Text>&nbsp;&nbsp;
          {validating &&
            peopleType === PeopleType.Juridica &&
            regDataCount(society.registryData) < 3 && (
              <Text className="text-xs w-full text-red-700">
                Deben informarse al menos tres campos de datos registrales
              </Text>
            )}
          {validating &&
            peopleType === PeopleType.Fisica &&
            societyType !== SocietyType.Fisica &&
            regDataCount(society.registryData) < 3 && (
              <Text className="text-xs w-full text-red-700">
                Deben informarse al menos tres campos de datos registrales
              </Text>
            )}
        </Col>
      </Row>
      <Row>
        {!readOnly &&
          communicationType !== CommunicationType.Bonificacion &&
          !partialReadonly &&
          (!isModification || !blockLesseeModification) && (
            <Col span={24}>
              <Button
                //icon="sync"
                onClick={() => getRegisterData(documentNumber)}
              >
                Obtener datos
              </Button>
            </Col>
          )}
      </Row>
      <Row className="mb-3" gutter={16}>
        <Col span={4} className="text-right pt-1 pb-2">
          Lugar:
        </Col>
        <Col span={4}>
          <Input
            name="society.registryData.site"
            disabled={
              partialReadonly || (isModification && blockLesseeModification)
            }
            value={society.registryData ? society.registryData.site : ""}
            onChange={(e) =>
              onChange(e.target.value, "site", [
                "communication",
                "lessee",
                "society",
                "registryData",
              ])
            }
          />
        </Col>
        <Col span={4} className="text-right pt-1 pb-2">
          Tomo:
        </Col>
        <Col span={4}>
          <Input
            name="society.registryData.volume"
            disabled={
              partialReadonly || (isModification && blockLesseeModification)
            }
            value={society.registryData ? society.registryData.volume : ""}
            onChange={(e) =>
              onChange(e.target.value, "volume", [
                "communication",
                "lessee",
                "society",
                "registryData",
              ])
            }
          />
        </Col>
        <Col span={4} className="text-right pt-1 pb-2">
          Sección:
        </Col>
        <Col span={4}>
          <Input
            name="society.registryData.section"
            disabled={
              partialReadonly || (isModification && blockLesseeModification)
            }
            value={society.registryData ? society.registryData.section : ""}
            onChange={(e) =>
              onChange(e.target.value, "section", [
                "communication",
                "lessee",
                "society",
                "registryData",
              ])
            }
          />
        </Col>
      </Row>
      <Row className="mb-3" gutter={16}>
        <Col span={4} className="text-right pt-1 pb-2">
          Libro:
        </Col>
        <Col span={4}>
          <Input
            name="society.registryData.book"
            disabled={
              partialReadonly || (isModification && blockLesseeModification)
            }
            value={society.registryData ? society.registryData.book : ""}
            onChange={(e) =>
              onChange(e.target.value, "book", [
                "communication",
                "lessee",
                "society",
                "registryData",
              ])
            }
          />
        </Col>
        <Col span={4} className="text-right pt-1 pb-2">
          Folio:
        </Col>
        <Col span={4}>
          <Input
            name="society.registryData.folio"
            disabled={
              partialReadonly || (isModification && blockLesseeModification)
            }
            value={society.registryData ? society.registryData.folio : ""}
            onChange={(e) =>
              onChange(e.target.value, "folio", [
                "communication",
                "lessee",
                "society",
                "registryData",
              ])
            }
          />
        </Col>
        <Col span={4} className="text-right pt-1 pb-2">
          Hoja:
        </Col>
        <Col span={4}>
          <Input
            name="society.registryData.sheet"
            disabled={
              partialReadonly || (isModification && blockLesseeModification)
            }
            value={society.registryData ? society.registryData.sheet : ""}
            onChange={(e) =>
              onChange(e.target.value, "sheet", [
                "communication",
                "lessee",
                "society",
                "registryData",
              ])
            }
          />
        </Col>
      </Row>
      <Row className="mb-3" gutter={16}>
        <Col span={4} className="text-right pt-1 pb-2">
          Inscripción:
        </Col>
        <Col span={4}>
          <Input
            name="society.registryData.inscription"
            disabled={
              partialReadonly || (isModification && blockLesseeModification)
            }
            value={society.registryData ? society.registryData.inscription : ""}
            onChange={(e) =>
              onChange(e.target.value, "inscription", [
                "communication",
                "lessee",
                "society",
                "registryData",
              ])
            }
          />
        </Col>
      </Row>
    </>
  );
};

export default RegistreData;
