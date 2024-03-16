import React from "react";
import dayjs from "dayjs";
import { DeleteOutlined } from "@ant-design/icons";
import {
  Button,
  Select,
  Row,
  Col,
  Divider,
  Typography,
  Radio,
  DatePicker,
  Input,
  Tooltip,
  InputNumber,
} from "antd";
import useComunicados from "../../../../../hooks/useComunicados";
import { DateFormat, RentBonusType } from "../../../../../helpers/types";
import {
  toNumber,
  formatNumber,
  formatterNumber,
  parserNumber,
} from "../../../../../helpers/formatUtils";

const BonusItem = ({ bonus, index }) => {
  const { Text } = Typography;
  const { state, deleteBonus, onChangeBonus } = useComunicados();
  const {
    isModification,
    blockBonificationModification,
    lists,
    communication,
  } = state;
  const { bonification, contract } = communication;
  const { bonificationTypeId } = bonification;
  const {
    economicData: { guaranteedMinimumIncome: proposal = 0 },
  } = contract;
  const rows = [];
  for (let i = 1; i < 11; i++) {
    rows.push({ value: i, label: i });
  }
  function onSelectDate(dateString) {
    onChangeBonus(dateString, index, "startDate");
  }
  function onSelectDateEndDate(dateString) {
    onChangeBonus(dateString, index, "endDate");
  }
  const getBonusEurM2 = (amount, m2, bonusType, proposalRent) => {
    if (bonusType != RentBonusType.Percentage) {
      let proposalRentNumber = toNumber(proposalRent);
      let calculatedRent = (amount * proposalRentNumber) / 100;
      return m2 ? formatNumber(calculatedRent / m2) : 0;
    } else {
      return m2 ? formatNumber(amount / m2) : 0;
    }
  };
  return (
    <>
      <Divider />
      <Row className="mb-3" gutter={16}>
        <Col span={4} className="text-right pt-1 pr-2">
          Tipo:
        </Col>
        <Col span={4}>
          <Select
            className="w-full"
            value={bonus.rentTypeId}
            placeholder="Tipo..."
            disabled={isModification && blockBonificationModification}
            options={[
              {
                value: 2,
                label: "Importe",
              },
            ]}
            onChange={(e) => onChangeBonus(e, index, "rentTypeId")}
          />
        </Col>
        <Col span={4} className="text-right pt-1 pr-2">
          <Text className="text-red-700">*</Text>&nbsp;sobre renta mes:
        </Col>
        <Col span={4}>
          <InputNumber
            className="w-full"
            name={"bonusList.amountOverMonth"}
            value={bonus.amountOverMonth}
            disabled={isModification && blockBonificationModification}
            onChange={(e) => onChangeBonus(e || 0, index, "amountOverMonth")}
            formatter={(e) => formatterNumber(e)}
            parser={(e) => parserNumber(e)}
          />
        </Col>
        <Col span={4} className="text-right pt-1 pr-2">
          Euros/m<sup>2</sup>:
        </Col>
        <Col span={4}>
          <Input
            name={"bonusList eurosm2"}
            readOnly
            value={getBonusEurM2(
              bonus.amountOverMonth,
              lists.local[0] ? lists.local[0].SUPERFICIE : "",
              bonus.rentTypeId,
              proposal
            )}
            disabled
          />
        </Col>
      </Row>
      <Row className="mb-3" gutter={16}>
        {bonificationTypeId === 1 && (
          <>
            <Col span={4} className="text-right pt-1 pr-2">
              <Text className="text-red-700">*</Text>&nbsp;Fecha de inicio:
            </Col>
            <Col span={4}>
              <DatePicker
                className="w-full"
                disabled={isModification && blockBonificationModification}
                onChange={onSelectDate}
                value={bonus.startDate && dayjs(bonus.startDate)}
                format={DateFormat}
                placeholder="Selec. fecha"
              />
            </Col>
            <Col span={4} className="text-right pt-1 pr-2">
              <Text className="text-red-700">*</Text>&nbsp;Fecha de fin:
            </Col>
            <Col span={4}>
              <DatePicker
                className="w-full"
                disabled={isModification && blockBonificationModification}
                onChange={onSelectDateEndDate}
                value={bonus.endDate && dayjs(bonus.endDate)}
                format={DateFormat}
                placeholder="Selec. fecha"
              />
            </Col>
          </>
        )}
        {bonificationTypeId === 2 && (
          <>
            <Col span={4} className="text-right pt-1 pr-2">
              Bonificación durante
            </Col>
            <Col span={3}>
              <Select
                className="w-full"
                placeholder="Año"
                value={bonus.year}
                disabled={isModification && blockBonificationModification}
                onChange={(e) => onChangeBonus(e, index, "year")}
                options={rows}
              />
            </Col>
            <Col span={7} className="pt-1">
              años desde la fecha de devengo.
            </Col>
          </>
        )}
        <Col span={4} className="text-right pt-1 pr-2">
          <Text className="text-red-700">*</Text>&nbsp;Presupuesto:
        </Col>
        <Col span={4} className="pt-1">
          <Radio.Group
            name={"bonusList budget"}
            value={bonus.budget}
            disabled={isModification && blockBonificationModification}
            onChange={(e) => onChangeBonus(e.target.value, index, "budget")}
          >
            <Radio value={true}>Si</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </Col>
      </Row>
      <Row className="mb-3" gutter={16}>
        <Col span={4} className="text-right pt-1 pr-2">
          <Text className="text-red-700">*</Text>&nbsp;Motivo:
        </Col>
        <Col span={18}>
          <Input
            name={"bonusList reason"}
            maxLength={40}
            value={bonus.reason}
            disabled={isModification && blockBonificationModification}
            onChange={(e) => onChangeBonus(e.target.value, index, "reason")}
          />
        </Col>
        <Col span={2}>
          <Tooltip title="Eliminar">
            <Button
              type="dashed"
              icon={<DeleteOutlined />}
              disabled={isModification && blockBonificationModification}
              onClick={() => deleteBonus(index)}
            ></Button>
          </Tooltip>
        </Col>
      </Row>
    </>
  );
};

export default BonusItem;
