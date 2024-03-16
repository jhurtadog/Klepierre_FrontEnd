import React from "react";
import { Row, Col, Divider, Typography, Input } from "antd";
import useComunicados from "../../../../../hooks/useComunicados";
import { CommunicationType } from "../../../../../helpers/types";

const DomicilioNotificacion = ({ blockLesseeModification = false }) => {
  const { Title } = Typography;
  const { state, onChange } = useComunicados();
  const { isModification, communication } = state;
  const { communicationType, lessee } = communication;
  const { notification } = lessee;

  if (communicationType === CommunicationType.Subrogacion) return null;

  return (
    <>
      <Title level={4}>
        DOMICILIO DE NOTIFICACIÓN (si es distinto del local)
      </Title>
      <Row className="mb-3" gutter={16}>
        <Col span={4} className="text-right pt-1 pb-2">
          Dirección:
        </Col>
        <Col span={14}>
          <Input
            name="notification.domicile.address"
            value={notification.domicile.address}
            onChange={(e) =>
              onChange(e.target.value, "address", [
                "communication",
                "lessee",
                "notification",
                "domicile",
              ])
            }
            disabled={isModification && blockLesseeModification}
            placeholder="(Siglas, Calle, Número, Escalera, Piso, Puerta)"
          />
        </Col>
        <Col span={2} className="text-right pt-1 pb-2">
          C.P.:
        </Col>
        <Col span={4}>
          <Input
            name="domicile.zipCode"
            value={notification.domicile.zipCode}
            disabled={isModification && blockLesseeModification}
            onChange={(e) =>
              onChange(e.target.value, "zipCode", [
                "communication",
                "lessee",
                "notification",
                "domicile",
              ])
            }
          />
        </Col>
      </Row>
      <Row className="mb-3" gutter={16}>
        <Col span={4} className="text-right pt-1 pb-2">
          Municipio:
        </Col>
        <Col span={8}>
          <Input
            name="domicile.town"
            value={notification.domicile.town}
            disabled={isModification && blockLesseeModification}
            onChange={(e) =>
              onChange(e.target.value, "town", [
                "communication",
                "lessee",
                "notification",
                "domicile",
              ])
            }
          />
        </Col>
        <Col span={4} className="text-right pt-1 pb-2">
          Provincia:
        </Col>
        <Col span={8}>
          <Input
            name="domicile.state"
            value={notification.domicile.state}
            disabled={isModification && blockLesseeModification}
            onChange={(e) =>
              onChange(e.target.value, "state", [
                "communication",
                "lessee",
                "notification",
                "domicile",
              ])
            }
          />
        </Col>
      </Row>
      <Divider />
    </>
  );
};

export default DomicilioNotificacion;
