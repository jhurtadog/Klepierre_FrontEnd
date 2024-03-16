import React from "react";
import dayjs from "dayjs";
import { Row, Col, Input, Divider } from "antd";
import useComunicados from "../../hooks/useComunicados";
import useAuth from "../../hooks/useAuth";
import { DateFormat } from "../../helpers/types";

const Header = () => {
  const { state } = useComunicados();
  const { readOnly, communication } = state;
  const {
    societyName,
    createdAt,
    creatorBy,
    centerName,
    buildingName,
    floor,
    area,
    local,
    localsAssociated,
  } = communication;
  const { auth } = useAuth();

  return (
    <>
      <div className={readOnly ? "pointer-events-none cursor-none" : ""}>
        <Row style={{ marginBottom: "10px" }} gutter={32}>
          <Col span={12}>
            <Input addonBefore="Sociedad" value={societyName} readOnly />
          </Col>
          <Col span={12}>
            <Input
              addonBefore="Autor"
              value={
                creatorBy
                  ? (creatorBy?.nombre).toUpperCase()
                  : auth.nombre.toUpperCase()
              }
              readOnly
            />
          </Col>
        </Row>
        <Row style={{ marginBottom: "10px" }} gutter={32}>
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
        </Row>
      </div>
      <Divider />
      <div className={readOnly ? "pointer-events-none cursor-none" : ""}>
        <Row style={{ marginBottom: "10px" }} gutter={32}>
          <Col span={12}>
            <Input addonBefore="Centro" value={centerName} readOnly />
          </Col>
          <Col span={12}>
            <Input addonBefore="Edificio" value={buildingName} readOnly />
          </Col>
        </Row>
        <Row style={{ marginBottom: "10px" }} gutter={32}>
          <Col span={12}>
            <Input
              addonBefore="Local/es"
              value={local.toUpperCase() || localsAssociated.toUpperCase()}
              readOnly
            />
          </Col>
          <Col span={6}>
            <Input addonBefore="Planta" value={floor.toUpperCase()} readOnly />
          </Col>
          <Col span={6}>
            <Input
              addonBefore="Superficie"
              value={area}
              readOnly
              addonAfter="m2"
            />
          </Col>
        </Row>
      </div>
      <Divider />
    </>
  );
};

export default Header;
