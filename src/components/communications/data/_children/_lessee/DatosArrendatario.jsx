import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Row, Col, Divider, Typography, Radio, Input } from "antd";
import { PeopleType, SocietyType } from "../../../../../helpers/types";
import useComunicados from "../../../../../hooks/useComunicados";

const DatosArrendatario = ({
  blockLesseeModification = false,
  partialReadonly,
}) => {
  const [lesseeNotFound, setLesseeNotFound] = useState(false);
  const { Text, Title } = Typography;
  const { state, onChange, getLesseeId, getLesseeDebt } = useComunicados();
  const { readOnly, isCompAgreement, isModification, communication } = state;
  const { lessee } = communication;
  const { documentNumber, peopleType, societyType } = lessee;

  const lesseeCifNifSearch = async () => {
    const lessee = await getLesseeId(documentNumber);
    setLesseeNotFound(lessee);
    getLesseeDebt(documentNumber);
    /*this.findLesseePromise(this.props.lessee.documentNumber).then((lesseeSP) => {
    
          if(this.props.lessee.peopleType == PeopleType.Fisica && this.props.lessee.societyType == SocietyType.Fisica) {
            this.props.getSignerFromLessee(lesseeSP);
            this.props.updateLesseeValue(LesseeFactory.Prototype().society, 'society'); // to reset society lessee data
          }
          else {
            this.getRegisterDataPromise(this.props.lessee.society, this.props.lessee.signatoryPower).then(() => {
      
              if(this.props.lessee.society.registryData && this.props.lessee.society.registryData.agentId) {
                this.props.updateLesseeValue(this.props.lessee.society.registryData.agentId, 'searchTerm');
                this.props.findLesseeSigner(this.props.lessee.society.registryData.agentId, this.props.lessee);
              }
      
            });
          }
        });*/

    //this.props.getLesseeDebt(this.props.lessee.documentNumber);
  };

  return (
    <>
      {!readOnly && (
        <Row gutter={16}>
          <Col span={24}>
            <Title level={4}>DATOS DEL ARRENDATARIO</Title>
          </Col>
        </Row>
      )}
      {!readOnly && !partialReadonly && (
        <>
          <Row gutter={16}>
            <Col span={4} className="text-right pt-1 pb-2">
              CIF/NIF:
            </Col>
            <Col span={6}>
              <Input
                name="documentNumber"
                value={documentNumber}
                onChange={(e) =>
                  onChange(e.target.value, "documentNumber", [
                    "communication",
                    "lessee",
                  ])
                }
                addonAfter={
                  <SearchOutlined onClick={() => lesseeCifNifSearch()} />
                }
                disabled={isModification && blockLesseeModification}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={4} className="text-right pt-1 pb-2"></Col>
            <Col span={6} style={{ marginBottom: "7px" }}>
              {lesseeNotFound && (
                <Text className="text-red-700">CIF/NIF no encontrado</Text>
              )}
            </Col>
          </Row>
        </>
      )}
      {readOnly && isCompAgreement && (
        <>
          <Row gutter={16}>
            <Col span={14}>
              <Title level={3} className="underline">
                DATOS DEL ARRENDATARIO
              </Title>
            </Col>
          </Row>
          <div
            style={{
              background: "black",
              opacity: 0.1,
              width: "100%",
              height: isModification
                ? "100%"
                : peopleType === PeopleType.Fisica
                ? "1017px"
                : "1500px",
              position: "absolute",
              zIndex: 1,
              marginTop: "0px",
            }}
          ></div>
        </>
      )}
      <Row gutter={16}>
        <Col span={4}> </Col>
        <Col span={14}>
          <Radio.Group
            defaultValue={PeopleType.Juridica}
            name="peopleType"
            value={peopleType}
            disabled={
              partialReadonly || (isModification && blockLesseeModification)
            }
            onChange={(e) =>
              onChange(e.target.value, "peopleType", [
                "communication",
                "lessee",
              ])
            }
          >
            <Radio value={PeopleType.Fisica} disabled={partialReadonly}>
              Persona Fisica
            </Radio>
            <Radio value={PeopleType.Juridica} disabled={partialReadonly}>
              Persona Jurídica
            </Radio>
          </Radio.Group>
        </Col>
      </Row>
      {peopleType === PeopleType.Fisica && (
        <Row style={{ marginBottom: "10px", marginTop: "10px" }} gutter={16}>
          <Col span={20} offset={4}>
            <Radio.Group
              name="societyType"
              defaultValue={SocietyType.Fisica}
              value={societyType}
              disabled={
                partialReadonly || (isModification && blockLesseeModification)
              }
              onChange={(e) =>
                onChange(e.target.value, "societyType", [
                  "communication",
                  "lessee",
                ])
              }
            >
              <Radio value={SocietyType.Fisica} disabled={partialReadonly}>
                Persona Fisica
              </Radio>
              <Radio value={SocietyType.Comunidad} disabled={partialReadonly}>
                Comunidad de Bienes
              </Radio>
              <Radio value={SocietyType.Sociedad} disabled={partialReadonly}>
                Sociedad Civil
              </Radio>
            </Radio.Group>
          </Col>
        </Row>
      )}
      <Divider />
    </>
  );
};

export default DatosArrendatario;
