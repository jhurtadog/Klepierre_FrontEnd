import React from "react";
import { Row, Col, Typography, Input } from "antd";
import useComunicados from "../../../../../hooks/useComunicados";
import { isValidIBANNumber } from "../../../../../helpers/bankUtils";
import { CommunicationType } from "../../../../../helpers/types";

const DomiciliacionBancaria = ({ blockLesseeModification = false }) => {
  const { Text, Title } = Typography;
  const { state, onChange } = useComunicados();
  const { isModification, validating, communication } = state;
  const { communicationType, lessee } = communication;
  const { bankAddress } = lessee;

  if (
    communicationType === CommunicationType.Recision ||
    communicationType === CommunicationType.Bonificacion
  )
    return null;

  return (
    <>
      <Title level={4}>DOMICILIACIÓN BANCARIA</Title>
      <Row className="mb-3" gutter={16}>
        <Col span={4} className="text-right pt-1 pb-2">
          <Text className="text-red-700">*</Text>&nbsp;IBAN:
        </Col>
        <Col span={12}>
          <Input
            status={validating && !bankAddress.iban && "error"}
            name="bankAddress.iban"
            value={bankAddress.iban || ""}
            disabled={isModification && blockLesseeModification}
            onChange={(e) =>
              onChange(e.target.value, "iban", [
                "communication",
                "lessee",
                "bankAddress",
              ])
            }
          />
          {bankAddress.iban && !isValidIBANNumber(bankAddress.iban) && (
            <Text className="text-xs w-full text-red-700">IBAN inválido</Text>
          )}
        </Col>
        <Col span={4} className="text-right pt-1 pb-2">
          SWIFT/BIC:
        </Col>
        <Col span={4}>
          <Input
            name="bankAddress.swiftBic"
            value={bankAddress.swiftBic}
            disabled={isModification && blockLesseeModification}
            onChange={(e) =>
              onChange(e.target.value, "swiftBic", [
                "communication",
                "lessee",
                "bankAddress",
              ])
            }
          />
        </Col>
      </Row>
    </>
  );
};

export default DomiciliacionBancaria;
