import React from "react";
import {
  Row,
  Col,
  Divider,
  Typography,
  Input,
  Select,
  InputNumber,
} from "antd";
import useComunicados from "../../../../../hooks/useComunicados";
import {
  formatterNumber,
  parserNumber,
} from "../../../../../helpers/formatUtils";

const Garantias = () => {
  const { Title, Text } = Typography;
  const { state, onChange, calculateGuarantee } = useComunicados();
  const { isModification, validating, communication } = state;
  const { communicationType, contract } = communication;
  const { guarantee } = contract;

  return (
    <>
      <Title level={4}>GARANTÍAS</Title>
      <Row className="mb-3" gutter={16}>
        <Col span={4}>
          <Text>Fianza</Text>
        </Col>
        <Col span={2} className="text-right pt-1 pb-2">
          <Text className="text-red-700">*</Text>&nbsp;Meses:
        </Col>
        <Col span={4}>
          <InputNumber
            status={validating && !guarantee.bondMonths && "error"}
            name="guarantee.bondMonths"
            className="text-right w-full"
            value={guarantee.bondMonths}
            disabled={isModification}
            onChange={(e) => calculateGuarantee(e, "bondMonths", guarantee)}
            formatter={(e) => formatterNumber(e)}
            parser={(e) => parserNumber(e)}
            placeholder="Meses"
          />
        </Col>
        <Col span={3} className="text-right pt-1 pb-2">
          <Text className="text-red-700">*</Text>&nbsp;
          {communicationType !== 2 ? "Importe:" : "Total"}
        </Col>
        <Col span={4}>
          <InputNumber
            status={validating && !guarantee.bondAmount && "error"}
            name="guarantee.bondAmount"
            className="text-right w-full"
            value={guarantee.bondAmount}
            disabled={isModification}
            onChange={(e) => calculateGuarantee(e, "bondAmount", guarantee)}
            formatter={(e) => formatterNumber(e)}
            parser={(e) => parserNumber(e)}
            placeholder="Importe"
          />
        </Col>
        {communicationType === 2 && (
          <>
            <Col span={3} className="text-right pt-1 pb-2">
              <Text>Anterior:</Text>
            </Col>
            <Col span={4}>
              <InputNumber
                name="guarantee.oldBondAmount"
                className="text-right w-full"
                value={guarantee.oldBondAmount}
                disabled={isModification}
                onChange={(e) =>
                  calculateGuarantee(e, "oldBondAmount", guarantee)
                }
                formatter={(e) => formatterNumber(e)}
                parser={(e) => parserNumber(e)}
                placeholder="Anterior"
              />
            </Col>
          </>
        )}
      </Row>
      {communicationType === 2 && (
        <Row className="mb-3" gutter={16}>
          <Col span={3} offset={10} className="text-right pt-1 pb-2">
            <Text>Diferencia:</Text>
          </Col>
          <Col span={4}>
            <Input
              readOnly
              disabled
              className="text-right w-full"
              value={guarantee.bondDifference}
            />
          </Col>
          <Col span={3} className="text-right pt-1 pb-2">
            <Text>F. de pago:</Text>
          </Col>
          <Col span={4}>
            <Select
              placeholder="Forma de pago"
              className="w-full"
              value={guarantee.bondPaymentType}
              disabled={isModification}
              onChange={(e) =>
                onChange(e, "bondPaymentType", [
                  "communication",
                  "contract",
                  "guarantee",
                ])
              }
              options={[
                {
                  value: 1,
                  label: "Recibo",
                },
                {
                  value: 2,
                  label: "Talón",
                },
              ]}
            />
          </Col>
        </Row>
      )}
      <Row className="mb-3" gutter={16}>
        <Col span={4}>
          <Text>Garantía Adicional</Text>
        </Col>
        <Col span={2} className="text-right pt-1 pb-2">
          <Text>Meses:</Text>
        </Col>
        <Col span={4}>
          <InputNumber
            name="guarantee.additionalGuaranteeMonths"
            className="text-right w-full"
            value={guarantee.additionalGuaranteeMonths}
            disabled={isModification}
            onChange={(e) =>
              calculateGuarantee(e, "additionalGuaranteeMonths", guarantee)
            }
            formatter={(e) => formatterNumber(e)}
            parser={(e) => parserNumber(e)}
            placeholder="Meses"
          />
        </Col>
        <Col span={3} className="text-right pt-1 pb-2">
          <Text className="text-red-700">*</Text>&nbsp;
          {communicationType !== 2 ? "Importe:" : "Total"}
        </Col>
        <Col span={4}>
          <InputNumber
            name="guarantee.additionalGuaranteeAmount"
            className="text-right w-full"
            value={guarantee.additionalGuaranteeAmount}
            disabled={isModification}
            onChange={(e) =>
              calculateGuarantee(e, "additionalGuaranteeAmount", guarantee)
            }
            formatter={(e) => formatterNumber(e)}
            parser={(e) => parserNumber(e)}
            placeholder="Importe"
          />
        </Col>
        {communicationType === 2 && (
          <>
            <Col span={3} className="text-right pt-1 pb-2">
              <Text>Anterior:</Text>
            </Col>
            <Col span={4}>
              <InputNumber
                name="guarantee.oldAdditionalGuaranteeAmount"
                className="text-right w-full"
                value={guarantee.oldAdditionalGuaranteeAmount}
                disabled={isModification}
                onChange={(e) =>
                  calculateGuarantee(
                    e,
                    "oldAdditionalGuaranteeAmount",
                    guarantee
                  )
                }
                formatter={(e) => formatterNumber(e)}
                parser={(e) => parserNumber(e)}
                placeholder="Anterior"
              />
            </Col>
          </>
        )}
      </Row>
      {communicationType === 2 && (
        <Row className="mb-3" gutter={16}>
          <Col span={3} offset={10} className="text-right pt-1 pb-2">
            <Text>Diferencia:</Text>
          </Col>
          <Col span={4}>
            <Input
              readOnly
              disabled
              className="text-right w-full"
              value={guarantee.additionalGuaranteeDifference}
            />
          </Col>
          <Col span={3} className="text-right pt-1 pb-2">
            <Text>F. de pago:</Text>
          </Col>
          <Col span={4}>
            <Select
              placeholder="Forma de pago"
              className="w-full"
              value={guarantee.additionalGuaranteePaymentType}
              disabled={isModification}
              onChange={(e) =>
                onChange(e, "additionalGuaranteePaymentType", [
                  "communication",
                  "contract",
                  "guarantee",
                ])
              }
              options={[
                {
                  value: 1,
                  label: "Recibo",
                },
                {
                  value: 2,
                  label: "Talón",
                },
              ]}
            />
          </Col>
        </Row>
      )}
      <Row className="mb-3" gutter={16}>
        <Col span={4}>
          <Text>GEO</Text>
        </Col>
        <Col span={2} className="text-right pt-1 pb-2">
          <Text>Meses:</Text>
        </Col>
        <Col span={4}>
          <InputNumber
            name="guarantee.geoMonths"
            className="text-right w-full"
            value={guarantee.geoMonths}
            disabled={isModification}
            onChange={(e) => calculateGuarantee(e, "geoMonths", guarantee)}
            formatter={(e) => formatterNumber(e)}
            parser={(e) => parserNumber(e)}
            placeholder="Meses"
          />
        </Col>
        <Col span={3} className="text-right pt-1 pb-2">
          <Text>Importe:</Text>
        </Col>
        <Col span={4}>
          <InputNumber
            name="guarantee.geoAmount"
            className="text-right w-full"
            value={guarantee.geoAmount}
            disabled={isModification}
            onChange={(e) => calculateGuarantee(e, "geoAmount", guarantee)}
            formatter={(e) => formatterNumber(e)}
            parser={(e) => parserNumber(e)}
            placeholder="Importe"
          />
        </Col>
      </Row>
      <Row className="mb-3" gutter={16}>
        <Col span={4}>
          <Text>ECOP</Text>
        </Col>
        <Col span={2} className="text-right pt-1 pb-2">
          <Text>Meses:</Text>
        </Col>
        <Col span={4}>
          <InputNumber
            name="guarantee.ecopMonths"
            className="text-right w-full"
            value={guarantee.ecopMonths}
            disabled={isModification}
            onChange={(e) => calculateGuarantee(e, "ecopMonths", guarantee)}
            formatter={(e) => formatterNumber(e)}
            parser={(e) => parserNumber(e)}
            placeholder="Meses"
          />
        </Col>
        <Col span={3} className="text-right pt-1 pb-2">
          <Text>Imp. sin IVA:</Text>
        </Col>
        <Col span={4}>
          <InputNumber
            name="guarantee.ecopIVANotIncluded"
            className="text-right w-full"
            value={guarantee.ecopIVANotIncluded}
            disabled={isModification}
            onChange={(e) =>
              calculateGuarantee(e, "ecopIVANotIncluded", guarantee)
            }
            formatter={(e) => formatterNumber(e)}
            parser={(e) => parserNumber(e)}
            placeholder="Sin IVA"
          />
        </Col>
        <Col span={3} className="text-right pt-1 pb-2">
          <Text>Con IVA (21%):</Text>
        </Col>
        <Col span={4}>
          <InputNumber
            name="guarantee.ecopIVAIncluded"
            className="text-right w-full"
            value={guarantee.ecopIVAIncluded}
            disabled={isModification}
            onChange={(e) =>
              calculateGuarantee(e, "ecopIVAIncluded", guarantee)
            }
            formatter={(e) => formatterNumber(e)}
            parser={(e) => parserNumber(e)}
            placeholder="Con IVA"
          />
        </Col>
      </Row>
      <Divider />
      <Row className="mb-3" gutter={16}>
        <Col span={4} className="text-right pt-1 pb-2">
          <Text>Total desembolso:</Text>
        </Col>
        <Col span={4}>
          <Input
            readOnly
            className="text-right w-full"
            value={guarantee.totalOutlay}
            disabled
          />
        </Col>
        <Col span={4} className="text-right pt-1 pb-2">
          <Text>Depósito de reserva:</Text>
        </Col>
        <Col span={4}>
          <InputNumber
            name="guarantee.reserveDeposit"
            className="text-right w-full"
            value={guarantee.reserveDeposit}
            disabled={isModification}
            onChange={(e) => calculateGuarantee(e, "reserveDeposit", guarantee)}
            formatter={(e) => formatterNumber(e)}
            parser={(e) => parserNumber(e)}
            placeholder="Depósito"
          />
        </Col>
        <Col span={4} className="text-right pt-1 pb-2">
          <Text>A pagar en la Firma:</Text>
        </Col>
        <Col span={4}>
          <Input
            name="guarantee.totalPaymentOnFirm"
            readOnly
            className="text-right w-full"
            value={guarantee.totalPaymentOnFirm}
            disabled
          />
        </Col>
      </Row>
      <Divider />
      <Row className="mb-3" gutter={16}>
        <Col span={4}>
          <Text>AVAL</Text>
        </Col>
        <Col span={4} className="text-right pt-1 pb-2">
          <Text>Meses Renta:</Text>
        </Col>
        <Col span={4}>
          <InputNumber
            name="guarantee.endorsementMonths"
            className="text-right w-full"
            value={guarantee.endorsementMonths}
            disabled={isModification}
            onChange={(e) =>
              calculateGuarantee(e, "endorsementMonths", guarantee)
            }
            formatter={(e) => formatterNumber(e)}
            parser={(e) => parserNumber(e)}
            placeholder="Meses"
          />
        </Col>
        <Col span={3} className="text-right pt-1 pb-2">
          <Text>Importe:</Text>
        </Col>
        <Col span={4}>
          <InputNumber
            name="guarantee.endorsementAmount"
            className="text-right w-full"
            value={guarantee.endorsementAmount}
            disabled={isModification}
            onChange={(e) =>
              calculateGuarantee(e, "endorsementAmount", guarantee)
            }
            formatter={(e) => formatterNumber(e)}
            parser={(e) => parserNumber(e)}
            placeholder="Importe"
          />
        </Col>
      </Row>
      <Divider />
    </>
  );
};

export default Garantias;
