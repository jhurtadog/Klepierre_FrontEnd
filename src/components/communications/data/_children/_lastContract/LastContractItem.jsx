import React from "react";
import dayjs from "dayjs";
import { Input, Row, Col } from "antd";
import useComunicados from "../../../../../hooks/useComunicados";
import { DateFormat, CommunicationType } from "../../../../../helpers/types";
import { formatNumber } from "../../../../../helpers/formatUtils";

const LastContractItem = ({ lastContracto }) => {
  const { state } = useComunicados();
  const { communication } = state;
  const { communicationType } = communication;
  const {
    ID_ARRENDATARIO: nif,
    NOMBRE_ARRENDATARIO: name,
    ROTULO: label,
    ACTIVIDAD: activity,
    DENOMINACION_ACTIVIDAD: activity_1,
    GRUPO_ARRENDATARIO: group,
    DENOMINACION_GRUPO: grupo_1,
    CONTRATO: contractId,
    FECHA_FIRMA: signatureDate,
    FECHA_FIN: endDate,
    extension,
    lastSettlement,
    OBSERVACION_GENERAL: endDateRemarks,
    IMPORTE_RENTA: guaranteedMinimumIncome,
    PORC_RENTA_VARIABLE: percentageOfEquity,
    IMPORTE_COMUNIDAD: communityFees,
    PORCENTAJE_GASTOS: communityFeesRatio,
    IMPORTE_FIANZA: bond,
    IMPORTE_FIANZA_ADICIONAL: additionalGuarantee,
    IMPORTE_AVAL: endorsementAmount,
    endorsementDueDate,
    IMPORTE_GEO: geoAmount,
  } = lastContracto || {};

  let showExtraLabels = false;
  let showRescissionLabels = false;
  if (
    communicationType === CommunicationType.AcuerdoComplementario ||
    communicationType === CommunicationType.Recision ||
    communicationType === CommunicationType.Bonificacion ||
    communicationType === CommunicationType.Subrogacion
  ) {
    showExtraLabels = true;
  }

  if (communicationType === CommunicationType.Recision) {
    showRescissionLabels = true;
  }

  return (
    <>
      <Row className="mb-3" gutter={16}>
        <Col className="text-right pt-1 pr-2 text-blue-600" span={4}>
          NIF/CIF:
        </Col>
        <Col span={4}>
          <Input value={nif} readOnly disabled />
        </Col>
        <Col className="text-right pt-1 pr-2 text-blue-600" span={4}>
          Nombre:
        </Col>
        <Col span={12}>
          <Input value={name} readOnly disabled />
        </Col>
      </Row>
      <Row className="mb-3" gutter={16}>
        <Col className="text-right pt-1 pr-2 text-blue-600" span={4}>
          Rótulo:
        </Col>
        <Col span={showExtraLabels ? 4 : 12}>
          <Input value={label} readOnly disabled />
        </Col>
        {showExtraLabels && (
          <>
            <Col className="text-right pt-1 pr-2 text-blue-600" span={4}>
              Actividad:
            </Col>
            <Col span={4}>
              <Input value={`${activity} ${activity_1}`} readOnly disabled />
            </Col>
            <Col className="text-right pt-1 pr-2 text-blue-600" span={4}>
              Grupo Arrendatario:
            </Col>
            <Col span={4}>
              <Input value={`${group} ${grupo_1}`} readOnly disabled />
            </Col>
          </>
        )}
      </Row>
      <Row className="mb-3" gutter={16}>
        {showExtraLabels && (
          <>
            <Col className="text-right pt-1 pr-2 text-blue-600" span={4}>
              Fecha Firma:
            </Col>
            <Col span={4}>
              <Input
                value={
                  signatureDate ? dayjs(signatureDate).format(DateFormat) : ""
                }
                readOnly
                disabled
              />
            </Col>
          </>
        )}
        <Col className="text-right pt-1 pr-2 text-blue-600" span={4}>
          Fecha Fin:
        </Col>
        <Col span={showExtraLabels ? 4 : 12}>
          <Input
            value={endDate ? dayjs(endDate).format(DateFormat) : ""}
            readOnly
            disabled
          />
        </Col>
      </Row>
      <Row className="mb-3" gutter={16}>
        <Col className="text-right pt-1 pr-2 text-blue-600" span={4}>
          Prórroga:
        </Col>
        <Col span={4}>
          <Input value={extension} readOnly disabled />
        </Col>
        {/* <Col span={4} >Cancelación:</Col>
          <Col span={4} >
            <Input value={(cancellation) ? dayjs(cancellation).format(DateFormat) : ''} readOnly disabled/>
          </Col> */}
      </Row>
      <Row className="mb-3" gutter={16}>
        <Col className="text-right pt-1 pr-2 text-blue-600" span={4}>
          Últ. liquidación:
        </Col>
        <Col span={4}>
          <Input
            value={
              lastSettlement ? dayjs(lastSettlement).format(DateFormat) : ""
            }
            readOnly
            disabled
          />
        </Col>
        <Col className="text-right pt-1 pr-2 text-blue-600" span={4}>
          Obs. fecha fin:
        </Col>
        <Col span={12}>
          <Input value={endDateRemarks} readOnly disabled />
        </Col>
      </Row>
      <Row className="mb-3" gutter={16}>
        <Col className="text-right pt-1 pr-2 text-blue-600" span={4}>
          Contrato:
        </Col>
        <Col span={4}>
          <Input value={contractId} readOnly disabled />
        </Col>
        <Col className="text-right pt-1 pr-2 text-blue-600" span={4}>
          Renta mín. garant.:
        </Col>
        <Col span={4}>
          <Input
            value={formatNumber(guaranteedMinimumIncome)}
            readOnly
            disabled
          />
        </Col>
      </Row>
      <Row className="mb-3" gutter={16}>
        <Col className="text-right pt-1 pr-2 text-blue-600" span={4}>
          Gastos comunidad:
        </Col>
        <Col span={4}>
          <Input value={formatNumber(communityFees)} readOnly disabled />
        </Col>
        <Col className="text-right pt-1 pr-2 text-blue-600" span={4}>
          Coef. gastos com.:
        </Col>
        <Col span={4}>
          <Input value={formatNumber(communityFeesRatio)} readOnly disabled />
        </Col>
        <Col className="text-right pt-1 pr-2 text-blue-600" span={4}>
          % renta variable:
        </Col>
        <Col span={4}>
          <Input value={formatNumber(percentageOfEquity)} readOnly disabled />
        </Col>
      </Row>
      {showRescissionLabels && (
        <>
          <Row className="mb-3" gutter={16}>
            <Col className="text-right pt-1 pr-2 text-blue-600" span={4}>
              Fianza:
            </Col>
            <Col span={4}>
              <Input value={bond} readOnly disabled />
            </Col>
            <Col className="text-right pt-1 pr-2 text-blue-600" span={4}>
              Garantia adicional:
            </Col>
            <Col span={4}>
              <Input value={additionalGuarantee} readOnly disabled />
            </Col>
            <Col className="text-right pt-1 pr-2 text-blue-600" span={4}>
              Importe Aval:
            </Col>
            <Col span={4}>
              <Input value={endorsementAmount} readOnly disabled />
            </Col>
          </Row>
          <Row className="mb-3" gutter={16}>
            <Col className="text-right pt-1 pr-2 text-blue-600" span={4}>
              Fecha Vencimiento Aval:
            </Col>
            <Col span={4}>
              <Input
                value={
                  endorsementDueDate
                    ? dayjs(endorsementDueDate).format(DateFormat)
                    : ""
                }
                readOnly
                disabled
              />
            </Col>
            <Col className="text-right pt-1 pr-2 text-blue-600" span={4}>
              GEO:
            </Col>
            <Col span={4}>
              <Input value={geoAmount} readOnly disabled />
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default LastContractItem;
