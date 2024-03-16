import React from "react";
import { Tabs, Divider } from "antd";
import useComunicados from "../../hooks/useComunicados";
import Header from "./Header";
import BusinessUnit from "./_children/BusinessUnit";
import LastContract from "../communications/data/LastContract";
import Lessee from "../communications/data/Lessee";
import Debt from "../communications/data/Debt";
import Bonification from "../communications/data/Bonification";
import Bonus from "../communications/data/Bonus";
import Rescission from "../communications/data/Rescission";
import Contract from "../communications/data/Contract";
import Contact from "./contact/Contact";
import Signatures from "./observac/Signatures";
import Modifications from "./observac/Modifications";
import Observations from "./observac/Observations";

const Body = () => {
  const { state } = useComunicados();
  const {
    communication: { communicationType },
  } = state;
  const itemsHorizontal = [
    {
      key: "1",
      label: `Último Contrato`,
      children: <LastContract />,
    },
    {
      key: "2",
      label: `Arrendatario`,
      children: <Lessee />,
    },
    {
      key: "3",
      label: `Contrato`,
      children: <Contract />,
    },
    {
      key: "4",
      label: `Bonificación`,
      children: <Bonification />,
    },
    {
      key: "5",
      label: `Deuda`,
      children: <Debt />,
    },
  ];
  const itemsHorizontalAcuerdoComplementario = [
    {
      key: "1",
      label: `Último Contrato`,
      children: <LastContract />,
    },
    {
      key: "2",
      label: `Arrendatario y cambios Arrendatario`,
      children: <Lessee />,
    },
    {
      key: "3",
      label: `Contrato y cambios Contrato`,
      children: <Contract />,
    },
    {
      key: "4",
      label: `Bonificación`,
      children: <Bonification />,
    },
  ];
  const itemsHorizontalRecision = [
    {
      key: "1",
      label: `Contrato`,
      children: <LastContract />,
    },
    {
      key: "2",
      label: `Arrendatario`,
      children: <Lessee />,
    },
    {
      key: "3",
      label: `Rescisión`,
      children: <Rescission />,
    },
  ];
  const itemsHorizontalBonificacion = [
    {
      key: "1",
      label: `Contrato`,
      children: <LastContract />,
    },
    {
      key: "2",
      label: `Arrendatario`,
      children: <Lessee />,
    },
    {
      key: "3",
      label: `Bonificación`,
      children: <Bonus />,
    },
    {
      key: "4",
      label: `Deuda`,
      children: <Debt />,
    },
  ];
  const itemsHorizontalSubrogacion = [
    {
      key: "1",
      label: `Contrato`,
      children: <LastContract />,
    },
    {
      key: "2",
      label: `Anterior Arrendatario/Subrogacion y Nuevo Arrendatario`,
      children: <Lessee />,
    },
    {
      key: "3",
      label: `Deuda`,
      children: <Debt />,
    },
  ];
  const itemsVertical = [
    {
      key: "1",
      label: `Observaciones`,
      children: <Observations />,
    },
    {
      key: "2",
      label: `Firmas`,
      children: <Signatures />,
    },
    {
      key: "3",
      label: `Modificaciones`,
      children: <Modifications />,
    },
  ];

  const renderTabsHorizontal = () => {
    switch (communicationType) {
      case 4:
        return itemsHorizontalAcuerdoComplementario;
      case 5:
        return itemsHorizontalRecision;
      case 6:
        return itemsHorizontalBonificacion;
      case 7:
        return itemsHorizontalSubrogacion;
      default:
        return itemsHorizontal;
    }
  };

  const renderTabs = (type) => {
    switch (type) {
      case 5:
      case 6:
        return [
          {
            key: "1",
            label: `Datos`,
            children: (
              <Tabs defaultActiveKey="1" items={renderTabsHorizontal()} />
            ),
          },
          {
            key: "2",
            label: `Observac.`,
            children: <Tabs defaultActiveKey="1" items={itemsVertical} />,
          },
        ];
      default:
        return [
          {
            key: "1",
            label: `Datos`,
            children: (
              <Tabs defaultActiveKey="1" items={renderTabsHorizontal()} />
            ),
          },
          {
            key: "2",
            label: `Contacto`,
            children: <Contact />,
          },
          {
            key: "3",
            label: `Observac.`,
            children: <Tabs defaultActiveKey="1" items={itemsVertical} />,
          },
        ];
    }
  };

  return (
    <>
      <Header />
      <Divider />
      <BusinessUnit />
      <Divider />
      <Tabs
        defaultActiveKey="1"
        tabPosition="left"
        items={renderTabs(communicationType)}
      />
      <Divider />
    </>
  );
};

export default Body;
