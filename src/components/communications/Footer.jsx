import React from "react";
import { Input, Row, Col, Divider } from "antd";
import dayjs from "dayjs";
import useComunicados from "../../hooks/useComunicados";
import { DateFormat } from "../../helpers/types";

const Footer = () => {
  const { state } = useComunicados();
  const { communication } = state;
  const { createdAt, updatedAt, creatorBy, updatedBy } = communication;

  if (communication._id === 0) return null;

  return (
    <div className="px-6 pr-6">
      <Row className="mb-3" gutter={32}>
        <Col span={12}>
          <Input
            addonBefore="Creado por"
            defaultValue={creatorBy?.nombre}
            readOnly
          />
        </Col>
        <Col span={12}>
          <Input
            addonBefore="Fecha Creación"
            defaultValue={dayjs(createdAt).format(DateFormat)}
            readOnly
          />
        </Col>
      </Row>
      <Row className="mb-3" gutter={32}>
        <Col span={12}>
          <Input
            addonBefore="Última modificación realizada por"
            defaultValue={updatedBy?.nombre}
            readOnly
          />
        </Col>
        <Col span={12}>
          <Input
            addonBefore="Fecha de última modificación"
            defaultValue={dayjs(updatedAt).format(DateFormat)}
            readOnly
          />
        </Col>
      </Row>
      <Divider />
    </div>
  );
};

export default Footer;
