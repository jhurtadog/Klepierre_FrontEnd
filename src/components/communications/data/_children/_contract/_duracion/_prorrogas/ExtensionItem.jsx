import React from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Row, Col, Typography, Button, InputNumber } from "antd";
import useComunicados from "../../../../../../../hooks/useComunicados";

const ExtensionItem = ({ blockContractModification = false, index, item }) => {
  const { Text } = Typography;
  const { state, deleteExtension, onChangeExtension } = useComunicados();
  const { readOnly, isModification } = state;
  return (
    <Row style={{ marginBottom: "10px" }} gutter={16}>
      <Col span={4} className="text-right pt-1 pb-2">
        <Text className="text-red-700">*</Text>&nbsp;<Text>Períodos:</Text>
      </Col>
      <Col span={2}>
        <InputNumber
          type="number"
          min={1}
          name={"duration.extension.nPeriods"}
          value={item.nPeriods || 1}
          disabled={isModification && blockContractModification}
          onChange={(e) => onChangeExtension(e, index, "nPeriods")}
        />
      </Col>
      <Col span={2} offset={3} className="text-right pt-1 pb-2">
        <Text>Años:</Text>
      </Col>
      <Col span={2}>
        <InputNumber
          type="number"
          min={0}
          name={"duration.extension.date.nYears"}
          value={item.date.nYears || 0}
          disabled={isModification && blockContractModification}
          onChange={(e) => onChangeExtension(e, index, "nYears", ["date"])}
        />
      </Col>
      <Col span={2} className="text-right pt-1 pb-2">
        <Text>Meses:</Text>
      </Col>
      <Col span={2}>
        <InputNumber
          type="number"
          min={0}
          name={"duration.extension.date.nMonths"}
          value={item.date.nMonths || 0}
          disabled={isModification && blockContractModification}
          onChange={(e) => onChangeExtension(e, index, "nMonths", ["date"])}
        />
      </Col>
      <Col span={2} className="text-right pt-1 pb-2">
        <Text>Días:</Text>
      </Col>
      <Col span={2}>
        <InputNumber
          type="number"
          min={0}
          name={"duration.extension.date.nDays"}
          value={item.date.nDays || 0}
          disabled={isModification && blockContractModification}
          onChange={(e) => onChangeExtension(e, index, "nDays", ["date"])}
        />
      </Col>
      <Col span={2} offset={1}>
        {!readOnly && (
          <Button
            type="dashed"
            icon={<DeleteOutlined />}
            disabled={isModification && blockContractModification}
            onClick={() => deleteExtension(index)}
          ></Button>
        )}
      </Col>
    </Row>
  );
};

export default ExtensionItem;
