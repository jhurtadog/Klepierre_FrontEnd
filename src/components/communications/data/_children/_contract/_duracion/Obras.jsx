import React from "react";
import dayjs from "dayjs";
import { Row, Col, Divider, Typography, Radio, DatePicker } from "antd";
import useComunicados from "../../../../../../hooks/useComunicados";
import { DateFormat } from "../../../../../../helpers/types";

const Obras = () => {
  const { Text } = Typography;
  const { state, onChange } = useComunicados();
  const { isModification, communication } = state;
  const { contract } = communication;
  const { duration } = contract;
  function onSelectDate(dateString) {
    onChange(dateString, "workDate", ["communication", "contract", "duration"]);
  }
  return (
    <>
      <Row className="mb-3" gutter={16}>
        <Col span={4}>
          <Text>Obras</Text>
        </Col>
        <Col span={19}>
          <Radio.Group
            name="duration.workType"
            value={duration.workTypeId}
            disabled={isModification}
            onChange={(e) => {
              onChange(e.target.value, "workTypeId", [
                "communication",
                "contract",
                "duration",
              ]);
              if (e.target.value === 3) {
                onSelectDate(null);
              }
            }}
          >
            <Radio value={1}>Dura</Radio>
            <Radio value={2}>Blanda</Radio>
            <Radio value={3}>No</Radio>
          </Radio.Group>
        </Col>
      </Row>
      {duration.workTypeId !== 3 && (
        <Row className="mb-3" gutter={16}>
          <Col span={4} className="text-right pt-1 pb-2">
            <Text>Vencimiento Obra:</Text>
          </Col>
          <Col span={4}>
            <DatePicker
              className="w-full"
              value={duration.workDate && dayjs(duration.workDate)}
              disabled={isModification}
              onChange={onSelectDate}
              format={DateFormat}
            />
          </Col>
        </Row>
      )}
      <Divider />
    </>
  );
};

export default Obras;
