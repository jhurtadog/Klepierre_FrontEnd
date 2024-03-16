import React from "react";
import { Row, Col, Divider, Typography, Button, Select, Input } from "antd";
import { EquitiesType } from "../../../../../../helpers/types";
import useComunicados from "../../../../../../hooks/useComunicados";
import EquityItem from "./_equity/EquityItem";

const RentaVariable = ({ blockContractModification = false }) => {
  const { Text } = Typography;
  const { state, onChange, addEquity } = useComunicados();
  const { readOnly, isModification, communication } = state;
  const { contract } = communication;
  const { rentIncrease } = contract;
  return (
    <>
      <Row className="mb-3" gutter={16}>
        <Col span={24}>
          <Text>Renta Variable</Text>
        </Col>
      </Row>
      <Row className="mb-3" gutter={16}>
        <Col span={4} className="text-right pt-1 pr-2">
          <Text>Tipo:</Text>
        </Col>
        <Col span={8}>
          <Select
            placeholder="Seleccione tipo de renta variable..."
            className="w-full"
            value={rentIncrease.equitiesType}
            disabled={isModification && blockContractModification}
            onChange={(e) =>
              onChange(e, "equitiesType", [
                "communication",
                "contract",
                "rentIncrease",
              ])
            }
            options={[
              {
                value: EquitiesType.Percentage,
                label: "Porcentaje",
              },
              {
                value: EquitiesType.Sections,
                label: "% o importe sobre tramos de ventas",
              },
              {
                value: EquitiesType.Activity,
                label: "% o importe sobre actividad",
              },
            ]}
          />
        </Col>
        <Col span={4} className="text-right pt-1 pr-2">
          <Text>Observaciones:</Text>
        </Col>
        <Col span={8}>
          <Input
            name="rentIncrease.equitiesObservations"
            value={rentIncrease.equitiesObservations}
            disabled={isModification && blockContractModification}
            onChange={(e) =>
              onChange(e.target.value, "equitiesObservations", [
                "communication",
                "contract",
                "rentIncrease",
              ])
            }
          />
        </Col>
      </Row>
      <Divider />
      {rentIncrease.equitiesType && (
        <>
          <Row className="mb-3" gutter={16}>
            <Col span={4}>
              <Text>Desglose</Text>
            </Col>
            <Col span={15}>
              {!readOnly && (
                <Button
                  //type="primary"
                  //icon="euro"
                  onClick={() => addEquity()}
                  disabled={
                    (rentIncrease.equitiesType === EquitiesType.Percentage &&
                      rentIncrease.equities.length >= 1) ||
                    (isModification && blockContractModification)
                  }
                >
                  Añadir renta variable
                </Button>
              )}
            </Col>
          </Row>
          {rentIncrease.equities.map((e, i) => {
            if (
              rentIncrease.equitiesType !== EquitiesType.Percentage ||
              i === 0
            )
              return <EquityItem key={i} index={i} item={e} />;
          })}
          <Divider />
        </>
      )}
    </>
  );
};

export default RentaVariable;
