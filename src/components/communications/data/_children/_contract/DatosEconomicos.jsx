import React from "react";
import { Row, Col, Divider, Typography, Radio, InputNumber } from "antd";
import useComunicados from "../../../../../hooks/useComunicados";
import RentaMinima from "./_datosEconomicos/RentaMinima";
import IPCIndexes from "./_datosEconomicos/IPCIndexes";
import IncrementoRenta from "./_datosEconomicos/IncrementoRenta";
import RentaVariable from "./_datosEconomicos/RentaVariable";
import DevengoGasto from "./_datosEconomicos/DevengoGasto";
import DevengoRenta from "./_datosEconomicos/DevengoRenta";
import {
  formatterNumber,
  parserNumber,
} from "../../../../../helpers/formatUtils";

const DatosEconomicos = () => {
  const { Title, Text } = Typography;
  const { state, onChange } = useComunicados();
  const { isModification, blockContractModification, communication } = state;
  const { contract } = communication;
  const { economicData } = contract;

  return (
    <>
      <Title level={4}>DATOS ECONÓMICOS</Title>
      <Row className="mb-3 mt-3" gutter={16}>
        <Col span={6}>
          <Text>Facturar Gastos de Comunidad:</Text>
        </Col>
        <Col span={5}>
          <Radio.Group
            defaultValue={0}
            name="economicData.communityExpenses"
            value={economicData.communityExpenses}
            onChange={(e) => {
              onChange(e.target.value, "communityExpenses", [
                "communication",
                "contract",
                "economicData",
              ]);
              if (e.target.value === false) {
                onChange(0, "coefficient", [
                  "communication",
                  "contract",
                  "economicData",
                ]);
                onChange(0, "amount", [
                  "communication",
                  "contract",
                  "economicData",
                ]);
                onChange(0, "previous", [
                  "communication",
                  "contract",
                  "economicData",
                ]);
              }
            }}
            disabled={isModification && blockContractModification}
          >
            <Radio value={true}>Si</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </Col>
      </Row>
      {economicData.communityExpenses && (
        <Row className="mb-3 mt-3" gutter={16}>
          <Col span={4} className="text-right pt-1 pb-2">
            <Text>% Coeficiente:</Text>
          </Col>
          <Col span={4}>
            <InputNumber
              name="economicData.coefficient"
              className="text-right w-full"
              value={economicData.coefficient}
              disabled={isModification && blockContractModification}
              onChange={(e) =>
                onChange(e, "coefficient", [
                  "communication",
                  "contract",
                  "economicData",
                ])
              }
              formatter={(e) => formatterNumber(e)}
              parser={(e) => parserNumber(e)}
            />
          </Col>
          <Col span={4} className="text-right pt-1 pb-2">
            <Text>Importe:</Text>
          </Col>
          <Col span={4}>
            <InputNumber
              name="economicData.amount"
              className="text-right w-full"
              value={economicData.amount}
              disabled={isModification && blockContractModification}
              onChange={(e) =>
                onChange(e, "amount", [
                  "communication",
                  "contract",
                  "economicData",
                ])
              }
              formatter={(e) => formatterNumber(e)}
              parser={(e) => parserNumber(e)}
            />
          </Col>
          <Col span={4} className="text-right pt-1 pb-2">
            <Text>Importe anterior:</Text>
          </Col>
          <Col span={4}>
            <InputNumber
              name="economicData.previous"
              className="text-right w-full"
              value={economicData.previous}
              disabled={isModification && blockContractModification}
              onChange={(e) =>
                onChange(e, "previous", [
                  "communication",
                  "contract",
                  "economicData",
                ])
              }
              formatter={(e) => formatterNumber(e)}
              parser={(e) => parserNumber(e)}
            />
          </Col>
        </Row>
      )}
      <Divider />
      <RentaMinima />
      <IPCIndexes />
      <IncrementoRenta />
      <RentaVariable />
      <DevengoRenta />
      <DevengoGasto />
    </>
  );
};

export default DatosEconomicos;
