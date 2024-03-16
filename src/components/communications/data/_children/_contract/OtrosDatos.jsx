import React from "react";
import { Row, Col, Divider, Typography, Radio, InputNumber } from "antd";
import useComunicados from "../../../../../hooks/useComunicados";
import {
  formatterNumber,
  parserNumber,
} from "../../../../../helpers/formatUtils";

const OtrosDatos = () => {
  const { Title, Text } = Typography;
  const { state, onChange } = useComunicados();
  const { isModification, blockContractModification, communication } = state;
  const { contract } = communication;
  const {
    otherData: { minorWorks, months, days, entranceFee },
  } = contract;
  return (
    <>
      <Title level={4}>OTROS DATOS</Title>
      <Row className="mb-3" gutter={16}>
        <Col span={7}>
          <Text>Obras Menores</Text>
        </Col>
        <Col span={8} offset={2}>
          <Radio.Group
            defaultValue={1}
            name="minorWorks"
            value={minorWorks}
            disabled={isModification && blockContractModification}
            onChange={(e) =>
              onChange(e.target.value, "minorWorks", [
                "communication",
                "contract",
                "otherData",
              ])
            }
          >
            <Radio value={true}>Si</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </Col>
      </Row>
      <Row className="mb-3 mt-3" gutter={16}>
        <Col span={7}>
          <Text>Plazo de Obras de la Apertura del Local</Text>
        </Col>
        <Col span={2} className="text-right pt-1 pb-2">
          Meses:
        </Col>
        <Col span={2}>
          <InputNumber
            type="number"
            min={0}
            name={"months"}
            value={months}
            disabled={isModification && blockContractModification}
            onChange={(e) =>
              onChange(e, "months", ["communication", "contract", "otherData"])
            }
          />
        </Col>
        <Col span={2} className="text-right pt-1 pb-2">
          Días:
        </Col>
        <Col span={2}>
          <InputNumber
            type="number"
            min={0}
            name={"days"}
            value={days}
            disabled={isModification && blockContractModification}
            onChange={(e) =>
              onChange(e, "days", ["communication", "contract", "otherData"])
            }
          />
        </Col>
      </Row>
      <Row className="mt-3" gutter={16}>
        <Col span={7}>
          <Text>Canon de entrada</Text>
        </Col>
        <Col span={2} className="text-right pt-1 pb-2">
          Importe:
        </Col>
        <Col span={3}>
          <InputNumber
            className="text-right w-full"
            name="entranceFee"
            value={entranceFee}
            disabled={isModification && blockContractModification}
            onChange={(e) =>
              onChange(e, "entranceFee", [
                "communication",
                "contract",
                "otherData",
              ])
            }
            formatter={(e) => formatterNumber(e)}
            parser={(e) => parserNumber(e)}
          />
        </Col>
        <Col span={2} className="text-right pt-1 pb-2"></Col>
        <Col span={2}></Col>
      </Row>
      <Divider />
    </>
  );
};

export default OtrosDatos;
