import React from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Row, Col, Typography, Button, Input, InputNumber } from "antd";
import { EquitiesType } from "../../../../../../../helpers/types";
import {
  formatterNumber,
  parserNumber,
} from "../../../../../../../helpers/formatUtils";
import useComunicados from "../../../../../../../hooks/useComunicados";

const EquityItem = ({ blockContractModification = false, index, item }) => {
  const { Text } = Typography;
  const { state, onChangeEquity, deleteEquity } = useComunicados();
  const { readOnly, isModification, equity, validating, communication } = state;
  const { contract } = communication;
  const { rentIncrease } = contract;

  return (
    <>
      <div>
        <Row style={{ marginBottom: "10px", marginTop: "10px" }} gutter={16}>
          {rentIncrease.equitiesType === EquitiesType.Percentage && (
            <Col span={4} className="text-right pt-1 pr-2">
              <Text className="text-red-700">*</Text>&nbsp;Porcentaje:
            </Col>
          )}
          {rentIncrease.equitiesType !== EquitiesType.Percentage && (
            <Col span={4} className="text-right pt-1 pr-2">
              <Text className="text-red-700">*</Text>&nbsp;Porcentaje o importe:
            </Col>
          )}
          <Col span={4}>
            <InputNumber
              status={validating && !equity.percentageOrAmount && "error"}
              className="w-full"
              name="equity.percentageOrAmount"
              value={item.percentageOrAmount}
              disabled={isModification && blockContractModification}
              onChange={(e) => onChangeEquity(e, index, "percentageOrAmount")}
              formatter={(e) => formatterNumber(e)}
              parser={(e) => parserNumber(e)}
            />
          </Col>
          {rentIncrease.equitiesType === EquitiesType.Sections && (
            <>
              <Col span={4} className="text-right pt-1 pr-2">
                <Text className="text-red-700">*</Text>&nbsp;Tramo:
              </Col>
              <Col span={8}>
                <Input
                  status={validating && !rentIncrease.equity.section && "error"}
                  name="equity.section"
                  value={item.section}
                  disabled={isModification && blockContractModification}
                  onChange={(e) =>
                    onChangeEquity(e.target.value, index, "section")
                  }
                />
              </Col>
            </>
          )}
          {rentIncrease.equitiesType === EquitiesType.Activity && (
            <>
              <Col span={4} className="text-right pt-1 pr-2">
                <Text className="text-red-700">*</Text>&nbsp;Actividad:
              </Col>
              <Col span={8}>
                <Input
                  status={
                    validating && !rentIncrease.equity.activity && "error"
                  }
                  name="equity.activity"
                  value={item.activity}
                  disabled={isModification && blockContractModification}
                  onChange={(e) =>
                    onChangeEquity(e.target.value, index, "activity")
                  }
                />
              </Col>
            </>
          )}
          {rentIncrease.equitiesType !== EquitiesType.Percentage && (
            <Col span={2} offset={2}>
              {!readOnly && (
                <Button
                  type="dashed"
                  icon={<DeleteOutlined />}
                  disabled={isModification && blockContractModification}
                  onClick={() => deleteEquity(index)}
                ></Button>
              )}
            </Col>
          )}
        </Row>
      </div>
    </>
  );
};

export default EquityItem;
