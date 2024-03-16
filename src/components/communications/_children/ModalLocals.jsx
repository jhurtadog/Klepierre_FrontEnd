import React, { useState, useEffect } from "react";
import { Modal, Button, Radio, Select, Divider, Badge, Col, Row } from "antd";
import {
  CommunicationStatusType,
  CommunicationType,
} from "../../../helpers/types";
import useComunicados from "../../../hooks/useComunicados";

const ModalLocals = ({
  isModalOpenLocals,
  handleOkLocals,
  handleCancelLocals,
}) => {
  const {
    state,
    onChange,
    getBuildingName,
    getCommunicationLocalAssociated,
    getCommunicationReference,
    getLastContract,
    getLastContracts,
    getLesseeFromLastContract,
    getContractDebt,
    getBonus,
    calculateMinimumRentData,
  } = useComunicados();
  const { lists, communication } = state;
  const { communicationType, center, selectedLocal } = communication;
  const { items } = lists.locals;
  const modalWidth = 1000;
  const [filterLocalsBy, setFilterLocalsBy] = useState(0);
  const [local, setLocal] = useState([]);

  const mapLocalEmptyState = (idStatus) => {
    if (idStatus === 0 || idStatus === 2 || idStatus === 3 || idStatus === 5) {
      return CommunicationStatusType.Vacio;
    } else {
      return CommunicationStatusType.Ocupado;
    }
  };

  useEffect(() => {
    if (selectedLocal.length > 0) {
      const local = [];
      selectedLocal.forEach((i) => {
        local.push(lists.locals.items.find((e) => e._id === i));
      });
      onChange(local, "local", ["lists"]);
    }
  }, []);

  const handleOnChange = (e) => {
    const _selectedLocal = Array.isArray(e) ? e : [e];
    const _local = [];
    _selectedLocal.forEach((i) => {
      _local.push(lists.locals.items.find((e) => e._id === i));
    });
    setLocal(_local);
    onChange(_selectedLocal, "selectedLocal", ["communication"]);
    onChange(_local[0].DENOMINACION_SOCIEDAD, "societyName", ["communication"]);
    onChange(_local[0].SOCIEDAD, "societyId", ["communication"]);
    onChange(_local.map((l) => l.SUPERFICIE || "").join(" | "), "area", [
      "communication",
    ]);
    onChange(_local.map((l) => l.PLANTA).join(" | "), "floor", [
      "communication",
    ]);
    onChange(_local, "local", ["lists"]);
  };

  const getPoolSpace = (moduleCod) => {
    if (moduleCod && moduleCod.length > 0) {
      return moduleCod.substr(moduleCod.indexOf("(") + 1, 5);
    } else return "";
  };

  const loadAfterSelectLocal = async () => {
    try {
      onChange(
        local && local.length > 0
          ? local.length >= 1
            ? local.map((l) => l.PRIMER_MODULO).join(" | ")
            : ""
          : "",
        "local",
        ["communication"]
      );
      onChange(
        local && local.length > 0
          ? local.length >= 1
            ? local.map((l) => l.building).join(" | ")
            : ""
          : "",
        "buildingName",
        ["communication"]
      );
      getBuildingName();
      getCommunicationLocalAssociated();
      getCommunicationReference(
        center,
        lists.local[0].EDIFICIO,
        lists.local,
        communicationType
      );
      if (
        communicationType === CommunicationType.UnidadComercial &&
        lists.local.length > 1
      ) {
        getLastContracts(lists.local, center);
      } else {
        const lastContractLoad = await getLastContract(
          0,
          lists.local[0].PRIMER_MODULO,
          center,
          lists.local[0].FECHA_ULTIMA_FACTURACION,
          lists.local[0].FECHA_OCUPACION,
          lists.local[0].TIPO_PRORROGA,
          lists.local[0].CONTRATO
        );

        if (
          Object.keys(lastContractLoad).length === 0 &&
          lastContractLoad.constructor === Object
        ) {
          //console.log('lastContract-1', lastContractLoad);
        } else {
          //console.log('lastContract-2', lastContractLoad);
          if (lastContractLoad.label !== undefined) {
            //console.log('label-1', lastContractLoad.label);
          } else {
            //console.log('label-2', lastContractLoad.label);
          }
        }

        if (
          communicationType === CommunicationType.Bonificacion ||
          communicationType === CommunicationType.AcuerdoComplementario ||
          communicationType === CommunicationType.Renovacion
        ) {
          getBonus(center, lists.local[0].SOCIEDAD, lists.local[0].CONTRATO);
        }

        // Load "Arrendatario" from LastContract data in this communication types
        if (
          (lastContractLoad &&
            communication.communicationType === CommunicationType.Recision) ||
          communication.communicationType ===
            CommunicationType.AcuerdoComplementario ||
          communication.communicationType === CommunicationType.Renovacion
        ) {
          getLesseeFromLastContract(lastContractLoad);
          /*this.loadLesseeFromLastContractPromise(lastContractLoaded).then( (lesseeLastContractLoaded: any) => {
            // Auto-load Register data
            //getRegisterData(lesseeLastContractLoaded.society);
          });*/
        }

        // Load "Deuda del contrato actual" in this communication types
        if (
          communicationType === CommunicationType.Renovacion ||
          communicationType === CommunicationType.Recision ||
          communicationType === CommunicationType.Bonificacion ||
          communicationType === CommunicationType.Subrogacion
        ) {
          getContractDebt(
            lists.local[0].SOCIEDAD,
            center,
            lists.local[0].CONTRATO,
            lastContractLoad
          );
        }

        if (
          lastContractLoad &&
          lastContractLoad?.data[0]?.IMPORTE_RENTA !== undefined
        ) {
          calculateMinimumRentData(
            lists.local,
            lastContractLoad.data[0].IMPORTE_RENTA,
            "previousNetIncome",
            [
              "communication",
              "contract",
              "economicData",
              "guaranteedMinimumIncome",
            ]
          );
        } else {
          onChange(0, "previousNetIncome", [
            "communication",
            "contract",
            "economicData",
            "guaranteedMinimumIncome",
          ]);
          onChange(0, "previousEurom2", [
            "communication",
            "contract",
            "economicData",
            "guaranteedMinimumIncome",
          ]);
        }
      }

      if (communicationType === CommunicationType.Subrogacion) {
        //getLastLessee(0, local[0].PRIMER_MODULO, center.GALERIA, false);
      }
    } catch (error) {}
  };

  const result = items.filter(
    (item) =>
      filterLocalsBy === CommunicationStatusType.Todos ||
      mapLocalEmptyState(item.CODIGO_OCUPACION) === filterLocalsBy
  );

  const renderTitle = () => (
    <Row style={{ fontFamily: "consolas" }} className="font-extrabold text-xl">
      <Col span={12}>Primer Módulo</Col>
      <Col span={3}>PoolSpace</Col>
      <Col span={3}>Sociedad</Col>
      <Col span={6}>Rótulo o Arrendatario</Col>
    </Row>
  );

  const renderItem = (local) => ({
    value: local._id,
    label: (
      <Row
        style={{ fontFamily: "consolas", marginTop: 0, marginBottom: "3px" }}
      >
        <Col span={12}>
          <Badge
            status={
              mapLocalEmptyState(local.CODIGO_OCUPACION) ===
              CommunicationStatusType.Ocupado
                ? "error"
                : "success"
            }
            text={local.PRIMER_MODULO.toUpperCase()}
          />
        </Col>
        <Col span={3}>{getPoolSpace(local.PRIMER_MODULO, 11)}</Col>
        <Col span={3}>{local.SOCIEDAD}</Col>
        <Col span={6}>
          {local.DENOMINACION_ROTULO
            ? local.DENOMINACION_ROTULO.substring(0, 28).toUpperCase()
            : local.NOMBRE_ARRENDATARIO
            ? local.NOMBRE_ARRENDATARIO.substring(0, 28).toUpperCase()
            : ""}
        </Col>
      </Row>
    ),
  });

  const options = [
    {
      label: renderTitle(),
      options: result.map((local) => {
        return renderItem(local);
      }),
    },
  ];

  return (
    <Modal
      title="Buscador de Locales"
      width={modalWidth}
      footer={
        <div>
          <Badge status="success" text="LOCAL VACÍO" />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Badge status="error" text="LOCAL OCUPADO" />
          <div className="mt-2">
            <Button
              key="submit"
              onClick={() => {
                if (selectedLocal.length > 0) {
                  loadAfterSelectLocal();
                  handleOkLocals();
                }
              }}
            >
              OK
            </Button>
          </div>
        </div>
      }
      open={isModalOpenLocals}
      onCancel={handleCancelLocals}
    >
      <Divider />
      <Radio.Group
        defaultValue={CommunicationStatusType.Todos}
        onChange={(e) => setFilterLocalsBy(e.target.value)}
      >
        <Radio value={CommunicationStatusType.Todos}>Todos</Radio>
        <Radio value={CommunicationStatusType.Vacio}>Vacíos</Radio>
        <Radio value={CommunicationStatusType.Ocupado}>Ocupados</Radio>
      </Radio.Group>
      <Divider />
      <Select
        className="w-full"
        placeholder="Seleccione local..."
        mode={communicationType === 3 ? "multiple" : "default"}
        value={selectedLocal}
        onChange={(e) => handleOnChange(e)}
        options={options}
      />
    </Modal>
  );
};

export default ModalLocals;
