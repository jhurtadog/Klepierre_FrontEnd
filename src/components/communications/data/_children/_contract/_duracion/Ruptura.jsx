import React from "react";
import {
  Row,
  Col,
  Divider,
  Typography,
  Radio,
  Button,
  InputNumber,
} from "antd";
import RuptureItem from "./_rupture/RuptureItem";
import useComunicados from "../../../../../../hooks/useComunicados";

const Ruptura = () => {
  const { Text } = Typography;
  const { state, onChange, addRupture } = useComunicados();
  const { readOnly, isModification, blockContractModification, communication } =
    state;
  const { contract } = communication;
  const { duration } = contract;
  return (
    <>
      <Row className="mb-3" gutter={16}>
        <Col span={4}>
          <Text>Ruptura</Text>
        </Col>
        <Col span={4}>
          <Radio.Group
            value={duration.ruptureEnabled}
            disabled={isModification && blockContractModification}
            onChange={(e) => {
              onChange(e.target.value, "ruptureEnabled", [
                "communication",
                "contract",
                "duration",
              ]);
              if (e.target.value === false) {
                onChange([], "rupture", [
                  "communication",
                  "contract",
                  "duration",
                ]);
                onChange(2, "forewarningTypeId", [
                  "communication",
                  "contract",
                  "duration",
                  "ruptureNotice",
                ]);
                onChange(0, "nYears", [
                  "communication",
                  "contract",
                  "duration",
                  "ruptureNotice",
                  "date",
                ]);
                onChange(0, "nMonths", [
                  "communication",
                  "contract",
                  "duration",
                  "ruptureNotice",
                  "date",
                ]);
                onChange(0, "nDays", [
                  "communication",
                  "contract",
                  "duration",
                  "ruptureNotice",
                  "date",
                ]);
              }
            }}
          >
            <Radio value={true}>Si</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </Col>
        {duration.ruptureEnabled && (
          <Col span={5}>
            {!readOnly && (
              <Button
                disabled={isModification && blockContractModification}
                onClick={() => addRupture()}
              >
                Añadir ruptura
              </Button>
            )}
          </Col>
        )}
      </Row>
      {duration.rupture.map((item, i) => {
        return <RuptureItem key={i} item={item} index={i} />;
      })}
      <Divider />
      {duration.ruptureEnabled && duration.rupture.length > 0 && (
        <>
          <Row style={{ marginBottom: "10px" }} gutter={16}>
            <Col span={4}>
              <Text strong>Preavisos de Rupturas</Text>
            </Col>
            <Col span={5}>
              <Radio.Group
                name="duration.ruptureNotice.forewarningTypeId"
                value={duration.ruptureNotice.forewarningTypeId}
                disabled={isModification && blockContractModification}
                onChange={(e) =>
                  onChange(e.target.value, "forewarningTypeId", [
                    "communication",
                    "contract",
                    "duration",
                    "ruptureNotice",
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
                name={"duration.ruptureNotice.date.nYears"}
                value={duration.ruptureNotice.date.nYears}
                disabled={isModification && blockContractModification}
                onChange={(e) =>
                  onChange(e, "nYears", [
                    "communication",
                    "contract",
                    "duration",
                    "ruptureNotice",
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
                name={"duration.ruptureNotice.date.nMonths"}
                value={duration.ruptureNotice.date.nMonths}
                disabled={isModification && blockContractModification}
                onChange={(e) =>
                  onChange(e, "nMonths", [
                    "communication",
                    "contract",
                    "duration",
                    "ruptureNotice",
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
                name={"duration.ruptureNotice.date.nDays"}
                value={duration.ruptureNotice.date.nDays}
                disabled={isModification && blockContractModification}
                onChange={(e) =>
                  onChange(e, "nDays", [
                    "communication",
                    "contract",
                    "duration",
                    "ruptureNotice",
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

export default Ruptura;
