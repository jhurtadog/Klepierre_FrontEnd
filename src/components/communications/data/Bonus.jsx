import React from "react";
import dayjs from "dayjs";
import {
  Typography,
  Radio,
  Input,
  Select,
  Row,
  Col,
  DatePicker,
  InputNumber,
} from "antd";
import useComunicados from "../../../hooks/useComunicados";
import BonusExisting from "./_children/_bonification/BonusExisting";
import { DateFormat, RentBonusType } from "../../../helpers/types";
import { formatterNumber, parserNumber } from "../../../helpers/formatUtils";

const Bonus = () => {
  const { Title, Text } = Typography;
  const {
    state,
    onChange,
    calculateBonusData,
    resetBonusDataPercentage,
    resetBonusDataAmount,
  } = useComunicados();
  const {
    readOnly,
    isModification,
    blockBonusModification,
    validating,
    lists,
    communication,
  } = state;
  const { bonus } = communication;
  const {
    rentTypeId,
    bonificationAmount,
    amountOverMonth,
    amountOverMonthEurosm2,
    startDate,
    endDate,
    budget,
    budgetAmount,
    renewal,
    contractalIncome,
    contractalIncomeEurosm2,
    billedIncome,
    billedIncomeEurosm2,
    bonusIncome,
    bonusIncomeEurosm2,
    reason,
  } = bonus;
  function onSelectDate(dateString) {
    onChange(dateString, "startDate", ["communication", "bonus"]);
  }
  function onSelectDateEndDate(dateString) {
    onChange(dateString, "endDate", ["communication", "bonus"]);
  }
  return (
    <div className={readOnly ? "pointer-events-none cursor-none" : ""}>
      <BonusExisting />
      {!readOnly && (
        <>
          <Row className="mb-3" gutter={16}>
            <Col span={24}>
              <Title level={4}>BONIFICACIÓN</Title>
            </Col>
          </Row>
          <Row className="mb-3" gutter={16}>
            <Col span={4} className="text-right pt-1 pr-2">
              <Text className="text-red-700">*</Text>&nbsp;Tipo:
            </Col>
            <Col span={4}>
              <Select
                className="w-full"
                placeholder="Tipo..."
                value={rentTypeId}
                onChange={(e) => {
                  onChange(e, "rentTypeId", ["communication", "bonus"]);
                  if (e === RentBonusType.Percentage) {
                    resetBonusDataAmount();
                  } else {
                    resetBonusDataPercentage();
                  }
                }}
                disabled={isModification && blockBonusModification}
                options={[
                  {
                    value: RentBonusType.Amount,
                    label: "Importe",
                  },
                  {
                    value: RentBonusType.Percentage,
                    label: "Porcentaje",
                  },
                ]}
              />
            </Col>

            {rentTypeId === RentBonusType.Percentage && (
              <>
                <Col span={4} className="text-right pt-1 pr-2">
                  <Text className="text-red-700">*</Text>&nbsp;% sobre renta
                  mes:
                </Col>
                <Col span={4}>
                  <Input
                    readOnly
                    disabled
                    className="hidden"
                    value={bonificationAmount}
                  />
                  <InputNumber
                    status={
                      validating &&
                      (!amountOverMonth || amountOverMonth == 0) &&
                      "error"
                    }
                    value={amountOverMonth}
                    onChange={(e) => {
                      calculateBonusData(e, lists.local);
                    }}
                    formatter={(e) => formatterNumber(e)}
                    parser={(e) => parserNumber(e)}
                  />
                </Col>
              </>
            )}
            {rentTypeId === RentBonusType.Amount && (
              <>
                <Col span={4} className="text-right pt-1 pr-2">
                  <Text className="text-red-700">*</Text>&nbsp;sobre renta mes:
                </Col>
                <Col span={4}>
                  <Input
                    readOnly
                    disabled
                    className="hidden"
                    value={amountOverMonth}
                  />
                  <InputNumber
                    status={
                      validating &&
                      (!bonificationAmount || bonificationAmount == "") &&
                      "error"
                    }
                    value={bonificationAmount}
                    onChange={(e) => {
                      calculateBonusData(e, lists.local);
                    }}
                    formatter={(e) => formatterNumber(e)}
                    parser={(e) => parserNumber(e)}
                  />
                </Col>
              </>
            )}
            <Col span={4} className="text-right pt-1 pr-2">
              Euros/m<sup>2</sup>:
            </Col>
            <Col span={4}>
              <Input readOnly disabled value={amountOverMonthEurosm2} />
            </Col>
          </Row>
          <Row className="mb-3" gutter={16}>
            <Col span={4} className="text-right pt-1 pr-2">
              <Text className="text-red-700">*</Text>&nbsp;Fecha inicio:
            </Col>
            <Col span={4}>
              <DatePicker
                status={
                  validating && (!startDate || startDate == "") && "error"
                }
                className="w-full"
                onChange={onSelectDate}
                value={startDate && dayjs(startDate)}
                format={DateFormat}
              />
            </Col>
            <Col span={4} className="text-right pt-1 pr-2">
              <Text className="text-red-700">*</Text>&nbsp;Fecha fin:
            </Col>
            <Col span={4}>
              <DatePicker
                status={validating && (!endDate || endDate == "") && "error"}
                className="w-full"
                onChange={onSelectDateEndDate}
                value={endDate && dayjs(endDate)}
                format={DateFormat}
              />
            </Col>
          </Row>
          <Row className="mb-3" gutter={16}>
            <Col span={4} className="text-right pt-1 pr-2">
              Presupuesto:
            </Col>
            <Col span={4}>
              <Radio.Group
                value={budget}
                disabled={isModification && blockBonusModification}
                onChange={(e) => {
                  onChange(e.target.value, "budget", [
                    "communication",
                    "bonus",
                  ]);
                  if (e.target.value === false) {
                    onChange(0, "budgetAmount", ["communication", "bonus"]);
                  }
                }}
              >
                <Radio value={true}>Si</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </Col>
            {budget && (
              <>
                <Col span={4} className="text-right pt-1 pr-2">
                  <Text className="text-red-700">*</Text>&nbsp;Importe presup.:
                </Col>
                <Col span={4}>
                  <InputNumber
                    status={
                      validating &&
                      budget &&
                      (!budgetAmount ||
                        budgetAmount == "" ||
                        budgetAmount == "0" ||
                        budgetAmount == "0,00") &&
                      "error"
                    }
                    className="w-full"
                    value={budgetAmount}
                    onChange={(e) =>
                      onChange(e, "budgetAmount", ["communication", "bonus"])
                    }
                    formatter={(e) => formatterNumber(e)}
                    parser={(e) => parserNumber(e)}
                  />
                </Col>
              </>
            )}
          </Row>
          <Row className="mb-3" gutter={16}>
            <Col span={4} className="text-right pt-1 pr-2">
              Renovación:
            </Col>
            <Col span={4}>
              <Radio.Group
                value={renewal}
                disabled={isModification && blockBonusModification}
                onChange={(e) =>
                  onChange(e.target.value, "renewal", [
                    "communication",
                    "bonus",
                  ])
                }
              >
                <Radio value={true}>Si</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </Col>
          </Row>
          <Row className="mb-3" gutter={16}>
            <Col span={4} className="text-right pt-1 pr-2">
              Renta contractual:
            </Col>
            <Col span={4}>
              <Input readOnly disabled value={contractalIncome} />
            </Col>
            <Col span={4} className="text-right pt-1 pr-2">
              Euros/m<sup>2</sup>:
            </Col>
            <Col span={4}>
              <Input readOnly disabled value={contractalIncomeEurosm2} />
            </Col>
          </Row>
          <Row className="mb-3" gutter={16}>
            <Col span={4} className="text-right pt-1 pr-2">
              Renta facturada:
            </Col>
            <Col span={4}>
              <Input readOnly disabled value={billedIncome} />
            </Col>
            <Col span={4} className="text-right pt-1 pr-2">
              Euros/m<sup>2</sup>:
            </Col>
            <Col span={4}>
              <Input readOnly disabled value={billedIncomeEurosm2} />
            </Col>
          </Row>
          <Row className="mb-3" gutter={16}>
            <Col span={4} className="text-right pt-1 pr-2">
              Renta bonificada:
            </Col>
            <Col span={4}>
              <Input readOnly disabled value={bonusIncome} />
            </Col>
            <Col span={4} className="text-right pt-1 pr-2">
              Euros/m<sup>2</sup>:
            </Col>
            <Col span={4}>
              <Input readOnly disabled value={bonusIncomeEurosm2} />
            </Col>
          </Row>
          <Row className="mb-3" gutter={16}>
            <Col span={4} className="text-right pt-1 pr-2">
              <Text className="text-red-700">*</Text>&nbsp;Motivo:
            </Col>
            <Col span={20}>
              <Input
                status={validating && (!reason || reason === "") && "error"}
                maxLength={40}
                value={reason}
                onChange={(e) =>
                  onChange(e.target.value, "reason", ["communication", "bonus"])
                }
              />
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default Bonus;
