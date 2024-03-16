import React from "react";
import dayjs from "dayjs";
import {
  Row,
  Col,
  Divider,
  Typography,
  Radio,
  InputNumber,
  DatePicker,
} from "antd";
import useComunicados from "../../../../../../hooks/useComunicados";
import { DateFormat } from "../../../../../../helpers/types";

const DevengoGasto = ({ blockContractModification = false }) => {
  const { Text } = Typography;
  const { state, onChange } = useComunicados();
  const { isModification, communication } = state;
  const { contract } = communication;
  const { rentIncrease } = contract;
  function onSelectDate(dateString) {
    onChange(dateString, "date", [
      "communication",
      "contract",
      "rentIncrease",
      "accrualCommunity",
    ]);
  }
  return (
    <>
      <Row className="mb-3" gutter={16}>
        <Col span={8}>
          <Text>Comienzo Devengo Gastos de Comunidad</Text>
        </Col>
        <Col span={11}>
          <Radio.Group
            name="rentIncrease.accrualCommunity.accrualTypeId"
            value={rentIncrease.accrualCommunity.accrualTypeId}
            disabled={isModification && blockContractModification}
            onChange={(e) => {
              onChange(e.target.value, "accrualTypeId", [
                "communication",
                "contract",
                "rentIncrease",
                "accrualCommunity",
              ]);
              if (e.target.value === 3) {
                onSelectDate(null);
              } else {
                onChange(0, "months", [
                  "communication",
                  "contract",
                  "rentIncrease",
                  "accrualCommunity",
                ]);
              }
            }}
          >
            <Row>
              <Radio value={1}>Fecha Determinada</Radio>
            </Row>
            <Row>
              <Radio value={2}>
                La Primera de las 2 situaciones siguientes:
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;- Apertura del local al público o<br />
                &nbsp;&nbsp;&nbsp;&nbsp;- Fecha determinada
              </Radio>
            </Row>
            <Row>
              <Radio value={3}>Meses desde la entrega del local</Radio>
            </Row>
          </Radio.Group>
        </Col>
        {(rentIncrease.accrualCommunity.accrualTypeId === 1 ||
          rentIncrease.accrualCommunity.accrualTypeId === 2) && (
          <Col span={4}>
            <DatePicker
              className="w-full"
              value={
                rentIncrease.accrualCommunity.date &&
                dayjs(rentIncrease.accrualCommunity.date)
              }
              disabled={isModification && blockContractModification}
              onChange={onSelectDate}
              format={DateFormat}
            />
          </Col>
        )}
        {rentIncrease.accrualCommunity.accrualTypeId === 3 && (
          <>
            <Col span={2} className="text-right pt-1 pb-2">
              <Text>Meses:</Text>
            </Col>
            <Col span={2}>
              <InputNumber
                type="number"
                min={0}
                name={"rentIncrease.accrualCommunity.months"}
                value={rentIncrease.accrualCommunity.months}
                disabled={isModification && blockContractModification}
                onChange={(e) =>
                  onChange(e, "months", [
                    "communication",
                    "contract",
                    "rentIncrease",
                    "accrualCommunity",
                  ])
                }
              />
            </Col>
          </>
        )}
      </Row>
      <Divider />
    </>
  );
};

export default DevengoGasto;
