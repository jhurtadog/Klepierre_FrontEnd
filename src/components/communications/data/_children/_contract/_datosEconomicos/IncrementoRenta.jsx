import React from "react";
import dayjs from "dayjs";
import {
  Row,
  Col,
  Divider,
  Typography,
  DatePicker,
  InputNumber,
  Radio,
} from "antd";
import useComunicados from "../../../../../../hooks/useComunicados";
import { DateFormat } from "../../../../../../helpers/types";
import {
  formatterNumber,
  parserNumber,
} from "../../../../../../helpers/formatUtils";

const IncrementoRenta = () => {
  const { Text } = Typography;
  const { state, onChange } = useComunicados();
  const { isModification, validating, communication } = state;
  const { contract } = communication;
  const { rentIncrease } = contract;
  function onSelectDate(dateString) {
    onChange(dateString, "date", ["communication", "contract", "rentIncrease"]);
  }
  return (
    <>
      <Row className="mb-3" gutter={16}>
        <Col span={24}>
          <Text>Incremento Renta (Independiente de IPC)</Text>
        </Col>
      </Row>
      <Row className="mb-3" gutter={16}>
        <Col span={4} className="text-right pt-1 pb-2">
          <Text>Fecha:</Text>
        </Col>
        <Col span={4}>
          <DatePicker
            className="w-full"
            value={rentIncrease.date && dayjs(rentIncrease.date)}
            disabled={isModification}
            onChange={onSelectDate}
            defaultValue={dayjs()}
            format={DateFormat}
          />
        </Col>
        <Col span={4} className="text-right pt-1 pb-2">
          <Text>% Porcentaje:</Text>
        </Col>
        <Col span={4}>
          <InputNumber
            name="rentIncrease.percentage"
            className="text-right w-full"
            value={rentIncrease.percentage}
            disabled={isModification}
            onChange={(e) =>
              onChange(e, "percentage", [
                "communication",
                "contract",
                "rentIncrease",
              ])
            }
            formatter={(e) => formatterNumber(e)}
            parser={(e) => parserNumber(e)}
          />
        </Col>
      </Row>
      <Row className="mb-3" gutter={16}>
        <Col span={8} offset={4} className="text-right pt-1 pb-2">
          <Text>Indemnización por Ocupación (importe sin IVA):</Text>
        </Col>
        <Col span={4}>
          <InputNumber
            name="rentIncrease.occupationalCompensation"
            className="text-right w-full"
            value={rentIncrease.occupationalCompensation}
            disabled={isModification}
            onChange={(e) =>
              onChange(e, "occupationalCompensation", [
                "communication",
                "contract",
                "rentIncrease",
              ])
            }
            formatter={(e) => formatterNumber(e)}
            parser={(e) => parserNumber(e)}
          />
        </Col>
      </Row>
      <Row className="mb-3" gutter={16}>
        <Col span={4} className="pr-2 text-right">
          <Text>Facturar IBI</Text>
        </Col>
        <Col span={4}>
          <Radio.Group
            name="rentIncrease.invoiceIbi"
            value={rentIncrease.invoiceIbi}
            disabled={isModification}
            onChange={(e) => {
              onChange(e.target.value, "invoiceIbi", [
                "communication",
                "contract",
                "rentIncrease",
              ]);
              if (e.target.value === false) {
                onChange(0, "amountIbi", [
                  "communication",
                  "contract",
                  "rentIncrease",
                ]);
              }
            }}
          >
            <Radio value={true}>Sí</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </Col>
        {rentIncrease.invoiceIbi && (
          <>
            <Col span={4} className="text-right pt-1 pb-2">
              <Text className="text-red-700">*</Text>&nbsp;Importe IBI:
            </Col>
            <Col span={4}>
              <InputNumber
                status={
                  validating &&
                  rentIncrease.invoiceIbi &&
                  !rentIncrease.amountIbi &&
                  "error"
                }
                name="rentIncrease.amountIbi"
                className="text-right w-full"
                value={rentIncrease.amountIbi}
                disabled={isModification}
                onChange={(e) =>
                  onChange(e, "amountIbi", [
                    "communication",
                    "contract",
                    "rentIncrease",
                  ])
                }
                formatter={(e) => formatterNumber(e)}
                parser={(e) => parserNumber(e)}
              />
            </Col>
          </>
        )}
      </Row>
      <Row className="mb-3" gutter={16}>
        <Col span={8} offset={4} className="text-right pt-1 pb-2">
          <Text>Importe de gastos y honorarios:</Text>
        </Col>
        <Col span={4}>
          <InputNumber
            name="rentIncrease.amountExpensesFees"
            className="text-right w-full"
            value={rentIncrease.amountExpensesFees}
            disabled={isModification}
            onChange={(e) =>
              onChange(e, "amountExpensesFees", [
                "communication",
                "contract",
                "rentIncrease",
              ])
            }
            formatter={(e) => formatterNumber(e)}
            parser={(e) => parserNumber(e)}
          />
        </Col>
      </Row>
      <Divider />
    </>
  );
};

export default IncrementoRenta;
