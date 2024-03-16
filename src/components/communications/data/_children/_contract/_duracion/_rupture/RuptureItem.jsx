import React from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Row, Col, Typography, Button, InputNumber } from "antd";
import useComunicados from "../../../../../../../hooks/useComunicados";

const RuptureItem = ({ blockContractModification = false, index, item }) => {
  const { Text } = Typography;
  const { state, deleteRupture, onChangeRupture } = useComunicados();
  const { readOnly, isModification } = state;
  return (
    <Row style={{ marginBottom: "10px" }} gutter={16}>
      <Col span={2} offset={9} className="text-right pt-1 pb-2">
        <Text>Años:</Text>
      </Col>
      <Col span={2}>
        <InputNumber
          type="number"
          min={0}
          name={"duration.rupture.date.nYears"}
          value={item.date.nYears || 0}
          disabled={isModification && blockContractModification}
          onChange={(e) => onChangeRupture(e || 0, index, "nYears", ["date"])}
        />
      </Col>
      <Col span={2} className="text-right pt-1 pb-2">
        <Text>Meses:</Text>
      </Col>
      <Col span={2}>
        <InputNumber
          type="number"
          min={0}
          name={"duration.rupture.date.nMonths"}
          value={item.date.nMonths || 0}
          disabled={isModification && blockContractModification}
          onChange={(e) => onChangeRupture(e || 0, index, "nMonths", ["date"])}
        />
      </Col>
      <Col span={2} className="text-right pt-1 pb-2">
        <Text>Días:</Text>
      </Col>
      <Col span={2}>
        <InputNumber
          type="number"
          min={0}
          name={"duration.rupture.date.nDays"}
          value={item.date.nDays || 0}
          disabled={isModification && blockContractModification}
          onChange={(e) => onChangeRupture(e || 0, index, "nDays", ["date"])}
        />
      </Col>
      <Col span={2} offset={1}>
        {!readOnly && (
          <Button
            type="dashed"
            icon={<DeleteOutlined />}
            disabled={isModification && blockContractModification}
            onClick={() => deleteRupture(index)}
          ></Button>
        )}
      </Col>
    </Row>
  );
};

export default RuptureItem;
