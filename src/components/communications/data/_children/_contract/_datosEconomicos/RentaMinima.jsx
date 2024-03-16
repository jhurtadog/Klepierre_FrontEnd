import React from "react";
import { Row, Col, Divider, Typography, Input, InputNumber } from "antd";
import useComunicados from "../../../../../../hooks/useComunicados";
import {
  formatterNumber,
  parserNumber,
} from "../../../../../../helpers/formatUtils";

const RentaMinima = () => {
  const { Text } = Typography;
  const { state, calculateMinimumRentData } = useComunicados();
  const { isModification, validating, lists, communication } = state;
  const { contract } = communication;
  const {
    economicData: { guaranteedMinimumIncome },
  } = contract;
  return (
    <>
      <Row className="mb-3" gutter={16}>
        <Col span={24}>
          <Text>Renta Minima Garantizada TOTAL (incluida Terraza)</Text>
        </Col>
      </Row>
      <Row className="mb-3" gutter={16}>
        <Col span={4} className="text-right pt-1 pr-2">
          <Text className="text-red-700">*</Text>&nbsp;Propuesta:
        </Col>
        <Col span={4}>
          <InputNumber
            status={validating && !guaranteedMinimumIncome.proposal && "error"}
            name="economicData.guaranteedMinimumIncome.proposal"
            className="text-right w-full"
            value={guaranteedMinimumIncome.proposal}
            disabled={isModification}
            onChange={(e) => {
              calculateMinimumRentData(lists.local, e, "proposal", [
                "communication",
                "contract",
                "economicData",
                "guaranteedMinimumIncome",
              ]);
            }}
            formatter={(e) => formatterNumber(e)}
            parser={(e) => parserNumber(e)}
          />
        </Col>
        <Col span={4} className="text-right pt-1 pr-2 text-blue-600">
          Renta neta anterior:
        </Col>
        <Col span={4}>
          <Input
            name="economicData.guaranteedMinimumIncome.previousNetIncome"
            className="text-right"
            value={guaranteedMinimumIncome.previousNetIncome.toFixed(2)}
            readOnly
            disabled
          />
        </Col>
        <Col span={4} className="text-right pt-1 pr-2">
          <Text>Incremento(%):</Text>
        </Col>
        <Col span={4}>
          <Input
            readOnly
            name="economicData.guaranteedMinimumIncome.increase"
            className="text-right"
            value={guaranteedMinimumIncome.increase.toFixed(2)}
            disabled
          />
        </Col>
      </Row>
      <Row className="mb-3" gutter={16}>
        <Col span={4} className="text-right pt-1 pr-2">
          <Text>Presupuestada:</Text>
        </Col>
        <Col span={4}>
          <InputNumber
            name="economicData.guaranteedMinimumIncome.budgeted"
            className="text-right w-full"
            value={guaranteedMinimumIncome.budgeted}
            disabled={isModification}
            onChange={(e) => {
              calculateMinimumRentData(lists.local, e, "budgeted", [
                "communication",
                "contract",
                "economicData",
                "guaranteedMinimumIncome",
              ]);
            }}
            formatter={(e) => formatterNumber(e)}
            parser={(e) => parserNumber(e)}
          />
        </Col>
        <Col span={4} className="text-right pt-1 pr-2">
          <Text>Incremento presup.(%):</Text>
        </Col>
        <Col span={4}>
          <Input
            readOnly
            name="economicData.guaranteedMinimumIncome.increasedBudget"
            className="text-right"
            value={guaranteedMinimumIncome.increasedBudget.toFixed(2)}
            disabled
          />
        </Col>
      </Row>
      <Row className="mb-3" gutter={16}>
        <Col span={4} className="text-right pt-1 pr-2">
          <Text>€/m2 Propuesta:</Text>
        </Col>
        <Col span={4}>
          <Input
            readOnly
            name="economicData.guaranteedMinimumIncome.proposedEurom2"
            className="text-right"
            value={guaranteedMinimumIncome.proposedEurom2.toFixed(2)}
            disabled
          />
        </Col>
        <Col span={4} className="text-right pt-1 pr-2">
          <Text>€/m2 Anterior:</Text>
        </Col>
        <Col span={4}>
          <Input
            readOnly
            name="economicData.guaranteedMinimumIncome.previousEurom2"
            className="text-right"
            value={guaranteedMinimumIncome.previousEurom2.toFixed(2)}
            disabled
          />
        </Col>
      </Row>
      <Row className="mb-3" gutter={16}>
        <Col span={4} className="text-right pt-1 pr-2">
          <Text>Importe terraza:</Text>
        </Col>
        <Col span={4}>
          <InputNumber
            name="economicData.guaranteedMinimumIncome.terraceAmount"
            value={guaranteedMinimumIncome.terraceAmount}
            className="text-right w-full"
            disabled={isModification}
            onChange={(e) => {
              calculateMinimumRentData(lists.local, e, "terraceAmount", [
                "communication",
                "contract",
                "economicData",
                "guaranteedMinimumIncome",
              ]);
            }}
            formatter={(e) => formatterNumber(e)}
            parser={(e) => parserNumber(e)}
          />
        </Col>
        <Col span={4} className="text-right pt-1 pr-2">
          <Text>Superficie terraza:</Text>
        </Col>
        <Col span={4}>
          <InputNumber
            name="economicData.guaranteedMinimumIncome.terraceSurface"
            value={guaranteedMinimumIncome.terraceSurface}
            className="text-right w-full"
            disabled={isModification}
            onChange={(e) => {
              calculateMinimumRentData(lists.local, e, "terraceSurface", [
                "communication",
                "contract",
                "economicData",
                "guaranteedMinimumIncome",
              ]);
            }}
            formatter={(e) => formatterNumber(e)}
            parser={(e) => parserNumber(e)}
          />
        </Col>
        <Col span={4} className="text-right pt-1 pr-2">
          <Text>€/m2 Terraza:</Text>
        </Col>
        <Col span={4}>
          <Input
            readOnly
            name="economicData.guaranteedMinimumIncome.terraceEurom2"
            className="text-right"
            value={guaranteedMinimumIncome.terraceEurom2.toFixed(2)}
            disabled
          />
        </Col>
      </Row>
      <Divider />
    </>
  );
};

export default RentaMinima;
