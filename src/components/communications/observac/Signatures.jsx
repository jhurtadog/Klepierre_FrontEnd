import React from "react";
import { Row, Col, Input, Typography } from "antd";
import useComunicados from "../../../hooks/useComunicados";

const Signatures = () => {
  const { Title, Text } = Typography;
  const { state, onChangeFirmas } = useComunicados();
  const { lists } = state;

  return (
    <>
      <Title level={4} className="mb-5">
        PARAMETRIZACIÓN DE FIRMAS
      </Title>
      {lists.types.map((type, index) => (
        <div key={index}>
          <Row key={index} gutter={16} className="mb-2 mt-7">
            <Col span={24}>
              <Text strong>COMUNICADO DE {type.title}</Text>
            </Col>
          </Row>
          <Row gutter={16}>
            {lists.signatures.map(
              (signature, index1) =>
                type.id === signature.communicationTypeId && (
                  <Col key={index1} span={6} className="text-right pt-1 pb-2">
                    <Row className="text-left">{signature.signerTitle}</Row>
                    <Row>
                      <Input
                        name="signerText"
                        value={signature.signerText}
                        onChange={(e) =>
                          onChangeFirmas(e.target.value, index1, "signerText")
                        }
                      />
                    </Row>
                  </Col>
                )
            )}
          </Row>
        </div>
      ))}
    </>
  );
};

export default Signatures;
