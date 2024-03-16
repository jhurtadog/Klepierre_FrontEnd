import React from "react";
import dayjs from "dayjs";
import { Row, Col, Input } from "antd";
import { DateFormat } from "../../helpers/types";
import useComunicados from "../../hooks/useComunicados";
import useAuth from "../../hooks/useAuth";

const Header = () => {
  const { state } = useComunicados();
  const { readOnly, communication } = state;
  const { societyName, createdAt, creatorBy } = communication;
  const { auth } = useAuth();
  return (
    <>
      <Row className="mb-3">
        <Col span={12}>
          <Input
            addonBefore="Sociedad"
            value={societyName}
            disabled={readOnly}
          />
        </Col>
        <Col span={10} offset={2}>
          <Input
            addonBefore="Autor"
            value={
              creatorBy
                ? (creatorBy?.nombre).toUpperCase()
                : auth.nombre.toUpperCase()
            }
            disabled={readOnly}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col span={12}>
          <Input
            addonBefore="Fecha"
            defaultValue={
              createdAt
                ? dayjs(createdAt).format(DateFormat)
                : dayjs().format(DateFormat)
            }
            readOnly
          />
        </Col>
        <Col span={10} offset={2}></Col>
      </Row>
    </>
  );
};

export default Header;
