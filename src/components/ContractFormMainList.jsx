import React, { useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Layout, Row, Col, Input } from "antd";
import ContractList from "./contractMainList/ContractList";
import useComunicados from "../hooks/useComunicados";

const ContractFormMainList = () => {
  const { Content } = Layout;
  const [communicationsList, setCommunicationsList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { getAllCommunicationsContract, showLoader } = useComunicados();

  useEffect(() => {
    const loadData = async () => {
      showLoader(true);
      const data = await getAllCommunicationsContract();
      let tmp = data;
      if (searchTerm !== "") {
        tmp = tmp.filter(
          (item) =>
            item?.societyName
              ?.toLowerCase()
              .includes(searchTerm?.toLowerCase()) ||
            item?.centerName
              ?.toLowerCase()
              .includes(searchTerm?.toLowerCase()) ||
            item?.local?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
            item?.reference?.toLowerCase().includes(searchTerm?.toLowerCase())
        );
      }
      setCommunicationsList(tmp);
      showLoader(false);
    };
    loadData();
  }, [searchTerm]);

  return (
    <Layout>
      <Row className="p-4" gutter={16}>
        <Col span={4} className="text-right">
          Buscar:
        </Col>
        <Col span={6}>
          <Input
            name="searchTerm"
            placeholder="Término de búsqueda"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            addonAfter={<SearchOutlined />}
          />
        </Col>
      </Row>
      <Content
        className="bg-slate-100 overflow-x-scroll"
        style={{ marginTop: "-1px", border: "1px solid lightgray" }}
      >
        <ContractList communications={communicationsList} />
      </Content>
    </Layout>
  );
};

export default ContractFormMainList;
