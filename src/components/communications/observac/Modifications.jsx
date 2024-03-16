import React from "react";
import dayjs from "dayjs";
import { Table, Typography } from "antd";
import useComunicados from "../../../hooks/useComunicados";

const Modifications = () => {
  const { Paragraph } = Typography;
  const { state } = useComunicados();
  const { communication } = state;
  const { changes } = communication;
  const columns = [
    {
      Id: 1,
      title: "Fecha del cambio",
      dataIndex: "changeDate",
      key: "changeDate",
      render: (text) => <span>{dayjs(text).format("DD/MM/YYYY HH:mm")}</span>,
    },
    {
      Id: 2,
      title: "Cambiado por",
      dataIndex: "changeUser",
      key: "changeUser",
    },
    {
      Id: 3,
      title: "Campo",
      dataIndex: "field",
      key: "field",
      render: (text) => (
        <Paragraph ellipsis={{ rows: 3, expandable: true }}>{text}</Paragraph>
      ),
    },
    {
      Id: 4,
      title: "Valor anterior",
      dataIndex: "oldValue",
      key: "oldValue",
      render: (text) => (
        <Paragraph ellipsis={{ rows: 3, expandable: true }}>{text}</Paragraph>
      ),
    },
    {
      Id: 5,
      title: "Nuevo valor",
      dataIndex: "newValue",
      key: "newValue",
      render: (text) => (
        <Paragraph ellipsis={{ rows: 3, expandable: true }}>{text}</Paragraph>
      ),
    },
  ];

  return <Table dataSource={changes} columns={columns} rowKey="Id" />;
};

export default Modifications;
