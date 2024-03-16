import React from "react";
import dayjs from "dayjs";
import {
  Row,
  Col,
  Divider,
  Typography,
  Radio,
  DatePicker,
  InputNumber,
} from "antd";
import useComunicados from "../../../../../../hooks/useComunicados";
import { DateFormat } from "../../../../../../helpers/types";

const DevengoRenta = ({ blockContractModification = false }) => {
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
      "accrualRent",
    ]);
  }
  return (
    <>
      <Row className="mb-3" gutter={16}>
        <Col span={8}>
          <Text>Comienzo Devengo Renta</Text>
        </Col>
        <Col span={11}>
          <Radio.Group
            name="rentIncrease.accrualRent.accrualTypeId"
            value={rentIncrease.accrualRent.accrualTypeId}
            disabled={isModification && blockContractModification}
            onChange={(e) => {
              onChange(e.target.value, "accrualTypeId", [
                "communication",
                "contract",
                "rentIncrease",
                "accrualRent",
              ]);
              if (e.target.value === 3) {
                onSelectDate(null);
              } else {
                onChange(0, "months", [
                  "communication",
                  "contract",
                  "rentIncrease",
                  "accrualRent",
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
        {(rentIncrease.accrualRent.accrualTypeId === 1 ||
          rentIncrease.accrualRent.accrualTypeId === 2) && (
          <Col span={4}>
            <DatePicker
              className="w-full"
              value={
                rentIncrease.accrualRent.date &&
                dayjs(rentIncrease.accrualRent.date)
              }
              disabled={isModification && blockContractModification}
              onChange={onSelectDate}
              format={DateFormat}
            />
          </Col>
        )}
        {rentIncrease.accrualRent.accrualTypeId === 3 && (
          <>
            <Col span={2} className="text-right pt-1 pb-2">
              <Text>Meses:</Text>
            </Col>
            <Col span={2}>
              <InputNumber
                type="number"
                min={0}
                name={"rentIncrease.accrualRent.months"}
                value={rentIncrease.accrualRent.months || 0}
                disabled={isModification && blockContractModification}
                onChange={(e) =>
                  onChange(e || 0, "months", [
                    "communication",
                    "contract",
                    "rentIncrease",
                    "accrualRent",
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

export default DevengoRenta;
