import React from "react";
import dayjs from "dayjs";
import { Row, Col, Checkbox, DatePicker, Typography } from "antd";
import useComunicados from "../../../hooks/useComunicados";
import Duracion from "./_children/_contract/Duracion";
import Destino from "./_children/_contract/Destino";
import DatosEconomicos from "./_children/_contract/DatosEconomicos";
import Garantias from "./_children/_contract/Garantias";
import OtrosDatos from "./_children/_contract/OtrosDatos";
import { DateFormat, CommunicationType } from "../../../helpers/types";

const Contract = () => {
  const { Title, Text } = Typography;
  const { state, onChange } = useComunicados();
  const { readOnly, isModification, blockContractModification, communication } =
    state;
  const { communicationType, contract } = communication;
  const { modifyContractChanges, complementary_agreement_start_date } =
    contract;
  function onSelectDate(dateString) {
    onChange(dateString, "complementary_agreement_start_date", [
      "communication",
      "contract",
    ]);
  }
  const readOnlyStyle = 2430 + "px";
  return (
    <div className={readOnly ? "pointer-events-none cursor-none" : ""}>
      {readOnly && (
        <div
          style={{
            background: "black",
            opacity: 0.1,
            width: "100%",
            height: isModification ? "100%" : readOnlyStyle,
            position: "absolute",
            zIndex: 1,
          }}
        ></div>
      )}
      {communicationType === CommunicationType.AcuerdoComplementario &&
        !readOnly && (
          <>
            <Row
              style={{ marginBottom: "10px", marginTop: "50px" }}
              gutter={16}
            >
              <Col span={7} className="text-right pt-1 pb-2">
                <Text className="text-red-600"></Text>&nbsp;Fecha de inicio
                acuerdo complementario:
              </Col>
              <Col span={4}>
                <DatePicker
                  className="w-full"
                  value={
                    complementary_agreement_start_date &&
                    dayjs(complementary_agreement_start_date)
                  }
                  onChange={onSelectDate}
                  disabled={isModification && blockContractModification}
                  format={DateFormat}
                  placeholder="Selec. fecha"
                />
              </Col>
            </Row>
            <Row style={{ marginBottom: "50px" }} gutter={16}>
              <Col span={7} className="text-right pt-1 pb-2">
                <Text className="text-red-600"></Text>&nbsp;Rellenar
                modificaciones sobre el contrato:
              </Col>
              <Col span={4}>
                <Checkbox
                  name="modifyContractChanges"
                  className="pt-1"
                  checked={modifyContractChanges}
                  disabled={isModification && blockContractModification}
                  onChange={(e) =>
                    onChange(e.target.checked, "modifyContractChanges", [
                      "communication",
                      "contract",
                    ])
                  }
                ></Checkbox>
              </Col>
            </Row>
          </>
        )}
      {communicationType === CommunicationType.AcuerdoComplementario ? (
        modifyContractChanges && (
          <>
            <Title level={3} className="underline">
              CAMBIOS EN CONTRATO
            </Title>
            <Duracion />
            <Destino />
            <DatosEconomicos />
            <Garantias />
            <OtrosDatos />
          </>
        )
      ) : (
        <>
          <Duracion />
          <Destino />
          <DatosEconomicos />
          <Garantias />
          <OtrosDatos />
        </>
      )}
    </div>
  );
};

export default Contract;
