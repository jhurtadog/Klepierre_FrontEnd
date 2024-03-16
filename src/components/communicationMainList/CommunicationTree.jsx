import React, { useState } from "react";
import { FilterOutlined, FolderOpenOutlined } from "@ant-design/icons";
import { Menu, Tooltip } from "antd";
import { getItem } from "../../helpers/stringUtils";
import useComunicados from "../../hooks/useComunicados";

const CommunicationTree = ({ setState, state }) => {
  const { state: stateComucation } = useComunicados();
  const { lists } = stateComucation;
  const splitSubmenuKey = "-#-";
  const filterByGallery = splitSubmenuKey + "02";
  const [openKeys, setOpenKeys] = useState(["sub1"]);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const items = lists.types.map((t, i) =>
    getItem(
      t.title,
      `${t.id + splitSubmenuKey + filterByGallery}`,
      <FilterOutlined />,
      [
        getItem("Todos", t.id),
        getItem(
          "Por Galería",
          `PorGaleria-${i}`,
          null,
          state.centers &&
            state.centers
              .filter((f) => parseInt(f.type) === t.id)
              .map((center) =>
                getItem(
                  <Tooltip title={center.centerName}>
                    &nbsp;&nbsp;-&nbsp;{center.centerName}
                  </Tooltip>,
                  center.center + splitSubmenuKey + filterByGallery + t.id
                )
              )
        ),
      ]
    )
  );

  items.unshift(getItem("TODOS", "TODOS", <FolderOpenOutlined />));

  const rootSubmenuKeys = ["sub1", "sub2", "sub4"];

  const onClick = (e) => {
    setState((prevState) => ({
      ...prevState,
      searchText: "",
      filterBy: e.keyPath,
    }));
  };

  return (
    <Menu
      className="h-full border-r-0"
      defaultSelectedKeys={["TODOS"]}
      onClick={onClick}
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      items={items}
    />
  );
};

export default CommunicationTree;
