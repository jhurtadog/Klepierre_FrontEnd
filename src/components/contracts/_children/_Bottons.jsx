import React from "react";
import { Modal } from "antd";
import {
  InfoCircleOutlined,
  DeleteOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import useComunicados from "../../../hooks/useComunicados";

const Bottons = ({ url, fileName }) => {
  const { confirm } = Modal;
  const { deleteGenerationFile } = useComunicados();

  const confirmDelete = () => {
    confirm({
      title: "ELIMINAR",
      content: `Estas seguro de eliminar este archivo "${fileName}"`,
      okText: "Eliminar",
      cancelText: "Cancelar",
      onOk: () => {
        deleteGenerationFile(true, fileName, "deleted");
      },
      onCancel() {},
    });
  };

  return (
    <div className="flex justify-between">
      <DeleteOutlined
        style={{ fontSize: "20px", color: "#08c" }}
        onClick={confirmDelete}
      />
      <InfoCircleOutlined style={{ fontSize: "20px", color: "#08c" }} />
      <a href={url} rel="noreferrer" target="_blank">
        <DownloadOutlined style={{ fontSize: "20px", color: "#08c" }} />
      </a>
    </div>
  );
};

export default Bottons;
