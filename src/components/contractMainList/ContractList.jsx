import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  EyeOutlined,
  SearchOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import dayjs from "dayjs";
import { Table, Button, Input, Space } from "antd";
import {
  DateFormat,
  CommunicationType,
  CommunicationTypeTitle,
} from "../../helpers/types";
import { findUnique } from "../../helpers/stringUtils";

const ContractList = ({ communications }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

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
      title: "Sociedad",
      dataIndex: "societyName",
      sorter: (a, b) => a.societyName.length - b.societyName.length,
      filters: findUnique(communications, (d) => d.societyName).map((t) => ({
        text: t.societyName,
        value: t.societyName,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.societyName.startsWith(value),
    },
    {
      title: "Galeria",
      dataIndex: "centerName",
      sorter: (a, b) => a.centerName.length - b.centerName.length,
      filters: findUnique(communications, (d) => d.centerName).map((t) => ({
        text: t.centerName,
        value: t.centerName,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.centerName.startsWith(value),
    },
    {
      title: "Local",
      dataIndex: "local",
      sorter: (a, b) => a.local.length - b.local.length,
      ...getColumnSearchProps("local"),
    },
    {
      title: "Tipo Documento",
      dataIndex: "communicationType",
      sorter: (a, b) => a.communicationType.length - b.communicationType.length,
      filters: findUnique(communications, (d) => d.communicationType).map(
        (t) => ({
          text: CommunicationTypeTitle[t.communicationType],
          value: t.communicationType,
        })
      ),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.communicationType === value,
      render: (status) => {
        switch (parseInt(status)) {
          case CommunicationType.Contrato:
            return <span>{CommunicationTypeTitle[1]}</span>;

          case CommunicationType.Renovacion:
            return <span>{CommunicationTypeTitle[2]}</span>;

          case CommunicationType.UnidadComercial:
            return <span>{CommunicationTypeTitle[3]}</span>;

          default:
            return <FileTextOutlined className="text-xl" />;
        }
      },
    },
    {
      title: "Referencia",
      dataIndex: "reference",
      sorter: (a, b) => a.reference.length - b.reference.length,
      ...getColumnSearchProps("reference"),
    },
    {
      title: "Contrato",
      dataIndex: ["generationFiles", "lastContract"],
      sorter: (a, b) =>
        a.generationFiles?.lastContract?.length -
        b.generationFiles?.lastContract?.length,
    },
    {
      title: "F. Contrato",
      dataIndex: ["generationFiles", "lastDateContract"],
      render: (text) => (text ? dayjs(text).format(DateFormat) : ""),
    },
    {
      title: "Anexo",
      dataIndex: ["generationFiles", "lastAnnex"],
      sorter: (a, b) =>
        a.generationFiles?.lastAnnex?.length -
        b.generationFiles?.lastAnnex?.length,
    },
    {
      title: "F. Anexo",
      dataIndex: ["generationFiles", "lastDateAnnex"],
      render: (text) => (text ? dayjs(text).format(DateFormat) : ""),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={communications}
      rowKey={(communications) => communications._id}
      size="small"
    />
  );
};

export default ContractList;
