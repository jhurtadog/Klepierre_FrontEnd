import React from "react";
import { Row, Col, Divider, Typography, Input } from "antd";
import useComunicados from "../../../../../hooks/useComunicados";
import { CommunicationType } from "../../../../../helpers/types";
import { validateEmail } from "../../../../../helpers/formatUtils";

const MailNotificacion = ({ blockLesseeModification = false }) => {
  const { Text, Title } = Typography;
  const { state, onChange } = useComunicados();
  const { validating, isModification, communication } = state;
  const { communicationType, lessee } = communication;
  const { notification } = lessee;

  if (communicationType === CommunicationType.Subrogacion) return null;

  return (
    <>
      <Title level={4}>MAIL NOTIFICACIÓN</Title>
      <Row className="mb-3" gutter={16}>
        <Col span={4} className="text-right pt-1 pb-2">
          <Text className="text-red-700">*</Text>&nbsp;Email:
        </Col>
        <Col span={12}>
          <Input
            status={
              ((validating && !notification.email) ||
                (notification.email && !validateEmail(notification.email))) &&
              "error"
            }
            name="notification.email"
            value={notification.email}
            disabled={isModification && blockLesseeModification}
            onChange={(e) =>
              onChange(e.target.value, "email", [
                "communication",
                "lessee",
                "notification",
              ])
            }
          />
          {notification.email && !validateEmail(notification.email) && (
            <Text className="text-xs w-full text-red-700">Email inválido</Text>
          )}
        </Col>
      </Row>
      <Divider />
    </>
  );
};

export default MailNotificacion;
