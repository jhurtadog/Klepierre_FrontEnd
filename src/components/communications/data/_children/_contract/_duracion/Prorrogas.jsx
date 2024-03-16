import React from "react";
import {
  Row,
  Col,
  Divider,
  Typography,
  Button,
  Radio,
  InputNumber,
} from "antd";
import ExtensionItem from "./_prorrogas/ExtensionItem";
import useComunicados from "../../../../../../hooks/useComunicados";

const Prorrogas = ({ blockContractModification = false }) => {
  const { Text } = Typography;
  const { state, addExtension, onChange } = useComunicados();
  const { readOnly, isModification, communication } = state;
  const { contract } = communication;
  const { duration } = contract;

  return (
    <>
      <Row className="mb-3" gutter={16}>
        <Col span={4}>
          <Text>Prórrogas</Text>
        </Col>
        <Col span={15}>
          {!readOnly && (
            <Button
              disabled={isModification && blockContractModification}
              onClick={addExtension}
            >
              Añadir prórroga
            </Button>
          )}
        </Col>
      </Row>
      {duration.extension.map((item, i) => {
        return <ExtensionItem key={i} item={item} index={i} />;
      })}
      <Divider />
      {duration.extension.length > 0 && (
        <>
          <Row style={{ marginBottom: "10px" }} gutter={16}>
            <Col span={4}>
              <Text strong>Preavisos de Prórrogas</Text>
            </Col>
            <Col span={5}>
              <Radio.Group
                name="duration.extensionNotice.forewarningTypeId"
                value={duration.extensionNotice.forewarningTypeId}
                disabled={isModification && blockContractModification}
                onChange={(e) =>
                  onChange(e.target.value, "forewarningTypeId", [
                    "communication",
                    "contract",
                    "duration",
                    "extensionNotice",
                  ])
                }
              >
                <Row>
                  <Radio value={1}>del Arrendador</Radio>
                </Row>
                <Row>
                  <Radio value={2}>del Arrendatario</Radio>
                </Row>
                <Row>
                  <Radio value={3}>de Ambos</Radio>
                </Row>
              </Radio.Group>
            </Col>
            <Col span={2} className="text-right pt-1 pb-2">
              Años:
            </Col>
            <Col span={2}>
              <InputNumber
                type="number"
                min={0}
                name={"duration.extensionNotice.date.nYears"}
                value={duration.extensionNotice.date.nYears}
                disabled={isModification && blockContractModification}
                onChange={(e) =>
                  onChange(e, "nYears", [
                    "communication",
                    "contract",
                    "duration",
                    "extensionNotice",
                    "date",
                  ])
                }
              />
            </Col>
            <Col span={2} className="text-right pt-1 pb-2">
              Meses:
            </Col>
            <Col span={2}>
              <InputNumber
                type="number"
                min={0}
                name={"duration.extensionNotice.date.nMonths"}
                value={duration.extensionNotice.date.nMonths}
                disabled={isModification && blockContractModification}
                onChange={(e) =>
                  onChange(e, "nMonths", [
                    "communication",
                    "contract",
                    "duration",
                    "extensionNotice",
                    "date",
                  ])
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
                name={"duration.extensionNotice.date.nDays"}
                value={duration.extensionNotice.date.nDays}
                disabled={isModification && blockContractModification}
                onChange={(e) =>
                  onChange(e, "nDays", [
                    "communication",
                    "contract",
                    "duration",
                    "extensionNotice",
                    "date",
                  ])
                }
              />
            </Col>
            <Col span={3}>&nbsp;</Col>
          </Row>
          <Divider />
        </>
      )}
    </>
  );
};

export default Prorrogas;
