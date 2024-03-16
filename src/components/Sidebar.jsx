/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  FormOutlined,
  LogoutOutlined,
  FileProtectOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import useComunicados from "../hooks/useComunicados";
import useAuth from "../hooks/useAuth";
import { getItem } from "../helpers/stringUtils";
const { Sider } = Layout;

const Sidebar = ({ collapsed }) => {
  const { resetAll, pathLocation, savePathName } = useComunicados();
  const { cerrarSesionAuth } = useAuth();

  const handleCerrarSesion = () => {
    cerrarSesionAuth();
    resetAll();
    localStorage.removeItem("token");
    localStorage.removeItem("pathname");
  };

  const items = [
    getItem("Comunicados", "comunicados", <FormOutlined />, [
      getItem(<Link to="/comunicados">Listado</Link>, "/comunicados"),
      getItem(
        <Link to="/comunicados/crear-comunicado">Nuevo Comunicado</Link>,
        "/comunicados/crear-comunicado"
      ),
    ]),
    /*getItem("Contratos", "contratos", <FileProtectOutlined />, [
      getItem(<Link to="/contratos">Listado</Link>, "/contratos"),
    ]),
    getItem("Usuarios", "usuarios", <UsergroupAddOutlined />, [
      getItem(<Link to="/usuarios">Listado</Link>, "/usuarios"),
      getItem(
        <Link to="/usuarios/crear-usuario">Nuevo Usuario</Link>,
        "/usuarios/crear-usuario"
      ),
    ]),*/
    getItem("Cerrar Sesión", "logout", <LogoutOutlined />),
  ];

  const rootSubmenuKeys = ["comunicados", "contratos", "usuarios"];

  const [openKeys, setOpenKeys] = useState([pathLocation.split("/")[1]]);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const onClick = (e) => {
    switch (e.key) {
      case "logout":
        handleCerrarSesion();
        break;
      default:
      // code block
    }
    savePathName(e.key);
  };

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="h-8 w-9 m-4"></div>
      <Menu
        theme="dark"
        mode="inline"
        onClick={onClick}
        defaultSelectedKeys={[pathLocation.split("/")[1]]}
        defaultOpenKeys={[pathLocation.split("/")[1]]}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        selectedKeys={[pathLocation]}
        items={items}
      />
    </Sider>
  );
};

export default Sidebar;
