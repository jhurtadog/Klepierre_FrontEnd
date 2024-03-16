import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import {
  Modal,
  Row,
  Divider,
  Input,
  AutoComplete,
  Typography,
  Button,
} from "antd";
import useComunicados from "../../../../../../hooks/useComunicados";

const ModalDestinyLabel = ({ isModalOpen, handleOk, handleCancel }) => {
  const [searchText, setSearchText] = useState("");
  const [dataBaseLabels, setDataBaseLabels] = useState([]);
  const { Text } = Typography;
  const { state, onChange } = useComunicados();
  const { communication, lists } = state;
  const { contract } = communication;
  const { destiny } = contract;

  const onSearchLabel = (searchText) => {
    let options = [];
    if (searchText.length >= 3) {
      const findLabels = lists.labels.filter((label) =>
        label.DENOMINACION.toLowerCase().includes(searchText.toLowerCase())
      );
      options =
        findLabels &&
        findLabels.length >= 1 &&
        findLabels.map((opt) => ({
          value: opt.CODIGO_ROTULO,
          label: opt.DENOMINACION,
        }));
      setSearchText(searchText);
      setDataBaseLabels(options);
    } else {
      setSearchText(searchText);
      setDataBaseLabels(options);
    }
  };

  return (
    <Modal
      title="Selección de Rótulo"
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancelar
        </Button>,
        <Button key="submit" onClick={handleOk}>
          Aceptar
        </Button>,
      ]}
      open={isModalOpen}
      onCancel={handleCancel}
    >
      <Text>
        Seleccione el rótulo comercial bajo el que se desarrollará la actividad
        por el arrendatario en el local
      </Text>
      <Divider />
      <Row style={{ marginTop: "10px" }}>
        <AutoComplete
          value={destiny.label}
          autoFocus={true}
          options={dataBaseLabels}
          placeholder="Buscar rótulo"
          onSearch={onSearchLabel}
          onChange={(e) => {
            onChange(e, "label", ["communication", "contract", "destiny"]);
            if (e.length === 0) {
              onChange("", "labelId", ["communication", "contract", "destiny"]);
            }
          }}
          onSelect={(val, option) => {
            onChange(option.value, "labelId", [
              "communication",
              "contract",
              "destiny",
            ]);
            onChange(option.label, "label", [
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
      {searchText !== "" && searchText.length < 3 && (
        <Text className="text-xs w-full text-red-700">
          (mínimo 3 caracteres para buscar)
        </Text>
      )}
      <Divider />
    </Modal>
  );
};

export default ModalDestinyLabel;
