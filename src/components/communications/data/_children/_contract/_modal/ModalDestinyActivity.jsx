import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Modal, Row, Divider, Input, AutoComplete, Button } from "antd";
import useComunicados from "../../../../../../hooks/useComunicados";

const ModalDestinyActivity = ({ isModalOpen, handleOk, handleCancel }) => {
  const [searchText, setSearchText] = useState("");
  const [dataBaseLabels, setDataBaseLabels] = useState([]);
  const { state, onChange } = useComunicados();
  const { communication, lists } = state;
  const { contract, societyId } = communication;
  const { destiny } = contract;

  const renderOptionGroup = (item, i) => {
    return {
      value: `${item.ID_ACTIVITY}`,
      label: item.NAME,
    };
  };

  const onSearchGroup = (searchText) => {
    let options = [];
    setSearchText(searchText);
    if (searchText.length >= 3) {
      const findData = lists.activities.filter(
        (item) => item.NAME.includes(searchText) && item.SOCIEDAD === societyId
      );
      options =
        findData &&
        findData.length >= 1 &&
        findData.map((opt, i) => ({
          value: `${opt.ID_ACTIVITY}`,
          label: opt.NAME,
        }));
      setDataBaseLabels(options);
    }
  };

  return (
    <Modal
      title="Selección de actividad"
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
      <Divider />
      <Row>
        <AutoComplete
          value={destiny.activity}
          options={
            searchText.length >= 3
              ? dataBaseLabels
              : lists.activities
                  .filter((item) => item.SOCIEDAD === societyId)
                  .map(renderOptionGroup)
          }
          placeholder="Buscar actividad"
          onSearch={onSearchGroup}
          onChange={(e) => {
            onChange(e, "activity", ["communication", "contract", "destiny"]);
            if (e.length === 0) {
              onChange("", "activityId", [
                "communication",
                "contract",
                "destiny",
              ]);
            }
          }}
          onSelect={(val, option) => {
            onChange(option.value, "activityId", [
              "communication",
              "contract",
              "destiny",
            ]);
            onChange(option.label, "activity", [
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

export default ModalDestinyActivity;
