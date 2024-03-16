import React from "react";
import { Input, Row, Col, Typography, Divider } from "antd";
import useComunicados from "../../../hooks/useComunicados";
import { CommunicationType } from "../../../helpers/types";

const Debt = () => {
  const { Title } = Typography;
  const { state } = useComunicados();
  const { communication } = state;
  const { communicationType, debt } = communication;
  const {
    societyLesseeDebt,
    totalSocietyLesseeDebt,
    currentContractDebt,
    totalDebtMinusGuarantees,
  } = debt;
  let debtByContract = false;
  let debtBySociety = false;
  if (
    communicationType === CommunicationType.Bonificacion ||
    communicationType === CommunicationType.Recision ||
    communicationType === CommunicationType.Subrogacion
  ) {
    debtByContract = true;
  }

  if (
    communicationType === CommunicationType.Contrato ||
    communicationType === CommunicationType.UnidadComercial
  ) {
    debtBySociety = true;
  }

  if (communicationType === CommunicationType.Renovacion) {
    debtByContract = true;
    debtBySociety = true;
  }

  return (
    <>
      {debtBySociety === true && (
        <>
          <Title level={4}>DEUDA DEL ARRENDATARIO POR SOCIEDAD</Title>
          {societyLesseeDebt.map((socLesseeDebt, index) => (
            <Row key={index} className="mb-3" gutter={16}>
              <Col span={4} className="text-right pt-1 pr-2 text-blue-600">
                Sociedad:
              </Col>
              <Col span={12}>
                <Input value={socLesseeDebt.societyName} readOnly disabled />
              </Col>
              <Col span={4} className="text-right pt-1 pr-2 text-blue-600">
                Total deuda:
              </Col>
              <Col span={4}>
                <Input
                  className="text-right"
                  value={socLesseeDebt.societyDebt}
                  readOnly
                  disabled
                />
              </Col>
            </Row>
          ))}
          <Row className="mb-3" gutter={16}>
            <Col span={4}></Col>
            <Col span={12}></Col>
            <Col span={4} className="text-right pt-1 pr-2 text-blue-600">
              TOTAL:
            </Col>
            <Col span={4}>
              <Input
                className="text-right"
                value={totalSocietyLesseeDebt}
                readOnly
                disabled
              />
            </Col>
          </Row>
          <Divider />
        </>
      )}
      {debtByContract === true && (
        <>
          <Title level={4}>DATOS DE LA DEUDA DEL CONTRATO</Title>
          <Row className="mb-3" gutter={16}>
            <Col span={6} className="text-right pt-1 pr-2 text-blue-600">
              Deuda contrato actual:
            </Col>
            <Col span={4}>
              <Input
                className="text-right"
                value={currentContractDebt}
                readOnly
                disabled
              />
            </Col>
            <Col span={10} className="text-right pt-1 pr-2 text-blue-600">
              Total deuda - Garantías:
            </Col>
            <Col span={4}>
              <Input
                className="text-right"
                value={totalDebtMinusGuarantees}
                readOnly
                disabled
              />
            </Col>
          </Row>
          <Divider />
        </>
      )}
    </>
  );
};

export default Debt;
