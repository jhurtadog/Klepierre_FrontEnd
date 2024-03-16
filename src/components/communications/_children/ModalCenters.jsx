import React from "react";
import { Modal, Button, Select, Divider } from "antd";
import useComunicados from "../../../hooks/useComunicados";

const ModalCenters = ({ isModalOpen, handleOk, handleCancel }) => {
  const { state, onChangeCenter } = useComunicados();
  const { lists, communication } = state;
  const { items } = lists.center;
  return (
    <Modal
      title="Buscador de Centros"
      footer={[
        <Button key="submit" onClick={handleOk}>
          OK
        </Button>,
      ]}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Divider />
      <Select
        placeholder="Seleccione centro..."
        className="w-full"
        value={communication.center}
        onChange={(e) => onChangeCenter(e)}
        options={items.map((t) => ({
          value: t.GALERIA,
          label: t.NOMBRE_GALERIA,
        }))}
      />
      <Divider />
    </Modal>
  );
};

export default ModalCenters;
