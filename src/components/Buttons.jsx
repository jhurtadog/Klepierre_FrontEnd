import React from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import useComunicados from "../hooks/useComunicados";
import ButtonsComunication from "./_children/ButtonsComunication";

const Buttons = () => {
  const { confirm } = Modal;
  const navigate = useNavigate();
  const { state, pathLocation, savePathName, resetAll } = useComunicados();
  const { readOnly, communication } = state;
  const { reference } = communication;
  const currentLocation = pathLocation.split("/")[1];

  const handleClickExit = () => {
    resetAll();
    savePathName(`/${pathLocation.split("/")[1]}`);
    navigate(`/${pathLocation.split("/")[1]}`);
  };

  const confirmExit = () => {
    confirm({
      title: "¿Seguro/a que desea salir?",
      content:
        "Estás a punto de abandonar el formulario, todos los cambios que no hayas guardado se perderán.",
      okText: "Entiendo, quiero salir",
      cancelText: "Quedarme",
      onOk: () => {
        handleClickExit();
      },
      onCancel() {},
    });
  };

  return (
    <div className="flex gap-12">
      {currentLocation === "comunicados" && <ButtonsComunication />}
      <div className="flex items-center gap-2 text-gray-400 hover:text-black">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
        <button
          className="font-bold"
          onClick={
            readOnly || !reference || currentLocation !== "comunicados"
              ? () => handleClickExit()
              : () => confirmExit()
          }
        >
          Volver al listado
        </button>
      </div>
    </div>
  );
};

export default Buttons;
