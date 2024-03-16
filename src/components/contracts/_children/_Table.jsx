import React from "react";
import dayjs from "dayjs";
import Bottons from "./_Bottons";
import { Table } from "antd";

const _Table = ({ data = [] }) => {
  const columns = [
    {
      Id: 1,
      title: "Nombre del Archivo",
      dataIndex: "fileName",
      key: "fileName",
      width: "50%",
    },
    {
      Id: 2,
      title: "Modelo",
      dataIndex: "model",
      key: "model",
    },
    {
      Id: 3,
      title: "Version",
      dataIndex: "version",
      key: "version",
    },
    {
      Id: 4,
      title: "Fecha",
      dataIndex: "date",
      key: "date",
      render: (text) => <span>{dayjs(text).format("DD/MM/YYYY")}</span>,
    },
    {
      Id: 5,
      title: "Usuario",
      dataIndex: ["user", "nombre"],
      key: "user",
      render: (text) => <span>{text?.toUpperCase()}</span>,
    },
    {
      Id: 5,
      title: "Acciones",
      key: "actions",
      render: (_, record) => (
        <Bottons url={record.url} fileName={record.fileName} />
      ),
    },
  ];

  return <Table columns={columns} dataSource={data} rowKey="fileName" />;
};

export default _Table;
