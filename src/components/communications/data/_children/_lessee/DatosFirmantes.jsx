import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Row, Col, Divider, Typography, Input, Button } from "antd";
import { PeopleType, SocietyType } from "../../../../../helpers/types";
import FirmanteItem from "./_firmante/FirmanteItem";
import useComunicados from "../../../../../hooks/useComunicados";

const DatosFirmantes = ({
  blockLesseeModification = false,
  partialReadonly,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { Text, Title } = Typography;
  const { state, getSignerId, addExtraSigner } = useComunicados();
  const { readOnly, isModification, communication } = state;
  const { lessee } = communication;
  const { signerExtra, signerGESAL, societyType, peopleType } = lessee;

  return (
    <>
      <Title level={4}>DATOS DE FIRMANTES</Title>
      {!readOnly && (!partialReadonly || peopleType !== PeopleType.Fisica) && (
        <>
          <Row className="mb-3" gutter={16}>
            <Col span={4} className="text-right pt-1 pb-2">
              Buscar firmante:
            </Col>
            <Col span={6}>
              <Input
                name="searchTerm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled={isModification && blockLesseeModification}
                addonAfter={
                  (!isModification || !blockLesseeModification) && (
                    <SearchOutlined
                      onClick={() => {
                        getSignerId(searchTerm);
                      }}
                    />
                  )
                }
              />
            </Col>
          </Row>
          <Divider />
        </>
      )}
      <FirmanteItem isMain={true} data={signerGESAL} />
      {peopleType === PeopleType.Fisica &&
        societyType === SocietyType.Fisica && <Divider />}
      {(societyType !== SocietyType.Fisica ||
        peopleType === PeopleType.Juridica) &&
        !readOnly && (
          <>
            <Row style={{ marginBottom: "10px" }} gutter={16}>
              <Col span={20}>
                <Text strong>FIRMANTES EXTRA</Text>
              </Col>
              <Col span={4}>
                <Button
                  //type="primary"
                  //icon="user-add"
                  disabled={isModification && blockLesseeModification}
                  onClick={addExtraSigner}
                >
                  Añadir firmante
                </Button>
              </Col>
            </Row>
            <Divider />
            {signerExtra.map((signer, i) => {
              return (
                <FirmanteItem key={i} isMain={false} data={signer} index={i} />
              );
            })}
          </>
        )}
    </>
  );
};

export default DatosFirmantes;
