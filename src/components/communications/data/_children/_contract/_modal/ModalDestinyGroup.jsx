import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Modal, Row, AutoComplete, Input, Button, Divider } from "antd";
import useComunicados from "../../../../../../hooks/useComunicados";

const ModalDestinyGroup = ({ isModalOpen, handleOk, handleCancel }) => {
  const [searchText, setSearchText] = useState("");
  const [dataBaseLabels, setDataBaseLabels] = useState([]);
  const { state, onChange } = useComunicados();
  const { communication, lists } = state;
  const { contract } = communication;
  const { destiny } = contract;

  const renderOptionGroup = (item) => {
    return {
      value: `${item.GRUPO_ARRENDATARIO}`,
      label: item.DENOMINACION.toUpperCase(),
    };
  };

  const onSearchGroup = (searchText) => {
    let options = [];
    setSearchText(searchText);
    if (searchText.length >= 1) {
      const findGroups = lists.groups.filter((group) =>
        group.DENOMINACION.includes(searchText)
      );
      options =
        findGroups &&
        findGroups.length >= 1 &&
        findGroups.map((opt) => ({
          value: `${opt.GRUPO_ARRENDATARIO}`,
          label: opt.DENOMINACION.toUpperCase(),
        }));
      setDataBaseLabels(options);
    }
  };

  return (
    <Modal
      title="Selección de grupo"
      open={isModalOpen}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancelar
        </Button>,
        <Button key="submit" onClick={handleOk}>
          Aceptar
        </Button>,
      ]}
      onCancel={handleCancel}
    >
      <Divider />
      <Row>
        <AutoComplete
          value={destiny.group}
          options={
            searchText.length >= 1
              ? dataBaseLabels
              : lists.groups.map(renderOptionGroup)
          }
          placeholder="Buscar grupo"
          onSearch={onSearchGroup}
          onChange={(e) => {
            onChange(e, "group", ["communication", "contract", "destiny"]);
            if (e.length === 0) {
              onChange("", "groupId", ["communication", "contract", "destiny"]);
            }
          }}
          onSelect={(val, option) => {
            onChange(option.value, "groupId", [
              "communication",
              "contract",
              "destiny",
            ]);
            onChange(option.label, "group", [
              "communication",
              "contract",
              "destiny",
            ]);
          }}
          className="w-full"
        >
          <Input
            suffix={<SearchOutlined />}
            className="certain-category-icon"
          />
        </AutoComplete>
      </Row>
      <Divider />
    </Modal>
  );
};

export default ModalDestinyGroup;
