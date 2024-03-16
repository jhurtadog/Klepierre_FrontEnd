import React, { useState } from "react";
import { Modal, Input, Button, Divider } from "antd";

const ModalSearch = ({ isModalOpen, handleOk, handleCancel }) => {
  const [searchText, setSearchText] = useState("");
  return (
    <Modal
      title="Buscar por Nº de Referencia"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={[
        <Button key="submit" onClick={handleCancel}>
          Cancelar
        </Button>,
        <Button key="cancel" onClick={() => handleOk(searchText)}>
          Aceptar
        </Button>,
      ]}
    >
      <Divider />
      <Input
        type="text"
        name="nref"
        id="nref"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Nº Referencia"
      />
      <Divider />
    </Modal>
  );
};

export default ModalSearch;
