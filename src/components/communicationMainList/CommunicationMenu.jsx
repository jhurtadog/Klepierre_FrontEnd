import React, { useState } from "react";
import { SearchOutlined, FormOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import ModalSearch from "./_children/ModalSearch";

const CommunicationMenu = ({ setSearchText, savePathName }) => {
  const initialState = {
    isModalOpen: false,
    current: "form",
  };
  const [state, setState] = useState(initialState);

  const handleOk = (searchText) => {
    setState((prevState) => ({ ...prevState, isModalOpen: false }));
    setSearchText((prevState) => ({ ...prevState, searchText }));
  };

  const handleCancel = () => {
    setState((prevState) => ({ ...prevState, isModalOpen: false }));
  };

  const onClick = (e) => {
    if (e.key === "search") {
      setState((prevState) => ({
        ...prevState,
        isModalOpen: true,
        current: e.key,
      }));
    } else if (e.key === "form") {
      setState((prevState) => ({ ...prevState, current: e.key }));
      savePathName("/comunicados/crear-comunicado");
    }
  };

  const items = [
    {
      label: <Link to="crear-comunicado">Nuevo Comunicado</Link>,
      key: "form",
      icon: <FormOutlined />,
    },
    {
      label: "Buscar por Nº de Referencia",
      key: "search",
      icon: <SearchOutlined />,
    },
  ];

  return (
    <div>
      <Menu
        onClick={onClick}
        selectedKeys={[state.current]}
        mode="horizontal"
        items={items}
      />
      <ModalSearch
        isModalOpen={state.isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default CommunicationMenu;
