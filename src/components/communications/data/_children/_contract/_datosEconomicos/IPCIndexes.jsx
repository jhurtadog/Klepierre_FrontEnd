import React from "react";
import dayjs from "dayjs";
import { Row, Col, Divider, Typography, DatePicker, InputNumber } from "antd";
import useComunicados from "../../../../../../hooks/useComunicados";
import { MonthFormat } from "../../../../../../helpers/types";
import {
  formatterNumber,
  parserNumber,
} from "../../../../../../helpers/formatUtils";

const IPCIndexes = () => {
  const { Text } = Typography;
  const { state, onChange } = useComunicados();
  const { validating, isModification, communication } = state;
  const { contract } = communication;
  const {
    economicData: { IpcByIndex },
  } = contract;
  const { MonthPicker } = DatePicker;
  return (
    <>
      <Row className="mb-3" gutter={16}>
        <Col span={24}>
          <Text>IPC POR ÍNDICES (a partir de 2012)</Text>
        </Col>
      </Row>
      <Row className="mb-3" gutter={16}>
        <Col span={8} className="text-right pt-1 pr-2">
          <Text className="text-red-700">*</Text>&nbsp;Valor del índice para la
          primera revisión:
        </Col>
        <Col span={4}>
          <InputNumber
            status={validating && !IpcByIndex.firstChecking && "error"}
            name="IpcByIndex.firstChecking"
            className="text-right w-full"
            value={IpcByIndex.firstChecking}
            disabled={isModification && blockContractModification}
            onChange={(e) =>
              onChange(e, "firstChecking", [
                "communication",
                "contract",
                "economicData",
                "IpcByIndex",
              ])
            }
            formatter={(e) => formatterNumber(e)}
            parser={(e) => parserNumber(e)}
          />
        </Col>
        <Col span={6} className="text-right pt-1 pr-2">
          <Text className="text-red-700">*</Text>&nbsp;correspondiente a
          (mm/aaaa):
        </Col>
        <Col span={4}>
          <MonthPicker
            status={validating && !IpcByIndex.date && "error"}
            className="w-full"
            value={IpcByIndex.date}
            disabled={isModification && blockContractModification}
            onChange={(e) =>
              onChange(e, "date", [
                "communication",
                "contract",
                "economicData",
                "IpcByIndex",
              ])
            }
            defaultValue={dayjs(new Date(), MonthFormat)}
            format={MonthFormat}
          />
        </Col>
      </Row>
      <Divider />
    </>
  );
};

export default IPCIndexes;
