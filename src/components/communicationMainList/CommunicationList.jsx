import React from "react";
import { Link } from "react-router-dom";
import {
  EyeOutlined,
  SnippetsOutlined,
  DiffOutlined,
  BookOutlined,
  FileOutlined,
  ProfileOutlined,
  ContainerOutlined,
  ReconciliationOutlined,
  FileTextOutlined,
  CheckCircleTwoTone,
  FormOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { Table, Tooltip } from "antd";
import {
  DateFormat,
  CommunicationType,
  CommunicationStatus,
  CommunicationTypeTitle,
} from "../../helpers/types";

const CommunicationList = ({ communications }) => {
  const columns = [
    {
      title: "Acciones",
      dataIndex: "_id",
      render: (id) => {
        let result = (
          <Link
            to={`editar/${id}`}
            className="flex items-center gap-1 text-blue-600"
          >
            <EyeOutlined /> Ver
          </Link>
        );
        return result;
      },
    },
    {
      title: "Local/es",
      dataIndex: "local",
      sorter: (a, b) => {
        if (a.local < b.local) {
          return -1;
        }
        if (a.local > b.local) {
          return 1;
        }
        return 0;
      },
    },
    {
      title: "F.Firma",
      dataIndex: ["contract", "duration", "signatureDate"],
      sorter: (a, b) => {
        if (
          a.contract.duration.signatureDate < b.contract.duration.signatureDate
        ) {
          return -1;
        }
        if (
          a.contract.duration.signatureDate > b.contract.duration.signatureDate
        ) {
          return 1;
        }
        return 0;
      },
      render: (text) => {
        const date = text ? dayjs(text).format(DateFormat) : "";
        return date;
      },
    },
    {
      title: "Rotulo",
      dataIndex: ["contract", "destiny", "label"],
      sorter: (a, b) => {
        if (a.contract.destiny.label < b.contract.destiny.label) {
          return -1;
        }
        if (a.contract.destiny.label > b.contract.destiny.label) {
          return 1;
        }
        return 0;
      },
    },
    {
      title: "Emisor",
      dataIndex: ["creatorBy", "nombre"],
      sorter: (a, b) => {
        if (a.creatorBy.nombre < b.creatorBy.nombre) {
          return -1;
        }
        if (a.creatorBy.nombre > b.creatorBy.nombre) {
          return 1;
        }
        return 0;
      },
    },
    {
      title: "F.Alta",
      dataIndex: "createdAt",
      sorter: (a, b) => {
        if (a.createdAt < b.createdAt) {
          return -1;
        }
        if (a.createdAt > b.createdAt) {
          return 1;
        }
        return 0;
      },
      render: (text) => {
        let date = dayjs(new Date(text)).format(DateFormat);
        return date;
      },
    },
    {
      title: "Ult.Mod",
      dataIndex: "updatedAt",
      sorter: (a, b) => {
        if (a.updatedAt < b.updatedAt) {
          return -1;
        }
        if (a.updatedAt > b.updatedAt) {
          return 1;
        }
        return 0;
      },
      render: (text) => {
        let date = dayjs(new Date(text)).format(DateFormat);
        return date;
      },
    },
    {
      title: "Tipo",
      dataIndex: "communicationType",
      sorter: (a, b) => {
        if (a.communicationType < b.communicationType) {
          return -1;
        }
        if (a.communicationType > b.communicationType) {
          return 1;
        }
        return 0;
      },
      render: (status) => {
        switch (parseInt(status)) {
          case CommunicationType.Contrato:
            return (
              <Tooltip title={CommunicationTypeTitle[1]}>
                <span>
                  <SnippetsOutlined className="text-xl" />
                </span>
              </Tooltip>
            );

          case CommunicationType.Renovacion:
            return (
              <Tooltip title={CommunicationTypeTitle[2]}>
                <span>
                  <DiffOutlined className="text-xl" />
                </span>
              </Tooltip>
            );

          case CommunicationType.UnidadComercial:
            return (
              <Tooltip title={CommunicationTypeTitle[3]}>
                <span>
                  <BookOutlined className="text-xl" />
                </span>
              </Tooltip>
            );

          case CommunicationType.AcuerdoComplementario:
            return (
              <Tooltip title={CommunicationTypeTitle[4]}>
                <span>
                  <FileOutlined className="text-xl" />
                </span>
              </Tooltip>
            );

          case CommunicationType.Recision:
            return (
              <Tooltip title={CommunicationTypeTitle[5]}>
                <span>
                  <ProfileOutlined className="text-xl" />
                </span>
              </Tooltip>
            );

          case CommunicationType.Bonificacion:
            return (
              <Tooltip title={CommunicationTypeTitle[6]}>
                <span>
                  <ContainerOutlined className="text-xl" />
                </span>
              </Tooltip>
            );

          case CommunicationType.Subrogacion:
            return (
              <Tooltip title={CommunicationTypeTitle[7]}>
                <span>
                  <ReconciliationOutlined className="text-xl" />
                </span>
              </Tooltip>
            );

          default:
            return <FileTextOutlined className="text-xl" />;
        }
      },
    },
    {
      title: "Estado",
      dataIndex: "communicationStatus",
      sorter: (a, b) => {
        if (a.communicationStatus < b.communicationStatus) {
          return -1;
        }
        if (a.communicationStatus > b.communicationStatus) {
          return 1;
        }
        return 0;
      },
      render: (communicationStatus) => {
        let result;
        if (communicationStatus === CommunicationStatus.Aprobado) {
          result = (
            <CheckCircleTwoTone twoToneColor="#52c41a" className="text-lg" />
          );
        } else {
          result = <FormOutlined className="text-lg" />;
        }
        return result;
      },
    },
  ];

  return (
    <Table
      columns={columns}
      expandedRowRender={(row) => (
        <p style={{ margin: 0 }}>{`${row.reference.split("-")[0]} - ${
          row.centerName
        } (${row.buildingName})`}</p>
      )}
      dataSource={communications}
      rowKey={(communications) => communications._id}
      size="small"
    />
  );
};

export default CommunicationList;
