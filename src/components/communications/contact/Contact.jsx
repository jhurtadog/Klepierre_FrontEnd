import React from "react";
import { Input, Row, Col, Typography } from "antd";
import useComunicados from "../../../hooks/useComunicados";
import { CommunicationType } from "../../../helpers/types";

const Contact = () => {
  const { Title, Text } = Typography;
  const { state, onChange } = useComunicados();
  const { isModification, readOnly, communication } = state;
  const { communicationType, contact } = communication;
  const { name, address, phone, zipcode, town, state: contactState } = contact;

  const blockField = () => {
    if (!isModification) return false;
    else if (
      isModification &&
      (communicationType === CommunicationType.AcuerdoComplementario ||
        communicationType === CommunicationType.Recision ||
        communicationType === CommunicationType.Bonificacion ||
        communicationType === CommunicationType.Subrogacion)
    )
      return true;
    else if (
      isModification &&
      (communicationType === CommunicationType.Contrato ||
        communicationType === CommunicationType.Renovacion ||
        communicationType === CommunicationType.UnidadComercial)
    )
      return false;
    else return true;
  };

  return (
    <div className={readOnly ? "pointer-events-none cursor-none" : ""}>
      <Title level={4}>PERSONA DE CONTACTO</Title>
      <Row className="mb-3" gutter={32}>
        <Col span={12}>
          <Input
            addonBefore="Nombre"
            name="name"
            value={name}
            disabled={blockField()}
            onChange={(e) =>
              onChange(e.target.value, "name", ["communication", "contact"])
            }
          />
        </Col>
        <Col span={12}>
          <Input
            addonBefore="Teléfono"
            name="phone"
            value={phone}
            disabled={blockField()}
            onChange={(e) =>
              onChange(e.target.value, "phone", ["communication", "contact"])
            }
          />
        </Col>
      </Row>
      <Row className="mb-3" gutter={32}>
        <Col span={3}>
          <Text strong>Domicilio</Text>
        </Col>
        <Col span={21}>
          <Input
            addonBefore="Dirección"
            name="address"
            value={address}
            placeholder="(Siglas, Calle, Número, Escalera, Piso, Puerta)"
            disabled={blockField()}
            onChange={(e) =>
              onChange(e.target.value, "address", ["communication", "contact"])
            }
          />
        </Col>
      </Row>
      <Row className="mb-3" gutter={32}>
        <Col span={8}>
          <Input
            addonBefore="C.P."
            name="zipcode"
            value={zipcode}
            disabled={blockField()}
            onChange={(e) =>
              onChange(e.target.value, "zipcode", ["communication", "contact"])
            }
          />
        </Col>
        <Col span={8}>
          <Input
            addonBefore="Municipio"
            name="town"
            value={town}
            disabled={blockField()}
            onChange={(e) =>
              onChange(e.target.value, "town", ["communication", "contact"])
            }
          />
        </Col>
        <Col span={8}>
          <Input
            addonBefore="Provincia"
            name="state"
            value={contactState}
            disabled={blockField()}
            onChange={(e) =>
              onChange(e.target.value, "state", ["communication", "contact"])
            }
          />
        </Col>
      </Row>
    </div>
  );
};

export default Contact;
