import React from "react";
import { notification, Modal, message } from "antd";
import useComunicados from "../../hooks/useComunicados";
import { CommunicationStatus } from "../../helpers/types";
import { validateLessee, validateContract } from "../../helpers/validators";

const ButtonsComunication = () => {
  const { confirm } = Modal;
  const {
    state,
    onChange,
    showLoader,
    saveCommunication,
    deleteCommunication,
    updateCommunication,
    saveSucceededForm,
  } = useComunicados();
  const { readOnly, communication, isDuplicated, loaded, saved } = state;
  const { _id, communicationStatus, reference, lessee, contract } =
    communication;

  const showSaveButton = () => {
    return (
      (!saved &&
        communicationStatus === CommunicationStatus.Borrador &&
        !readOnly) ||
      (!saved &&
        communicationStatus === CommunicationStatus.Aprobado &&
        !readOnly &&
        reference)
    );
  };

  const showApproveButton = () => {
    return (
      !saved &&
      loaded &&
      communicationStatus === CommunicationStatus.Borrador &&
      !readOnly &&
      reference &&
      _id !== 0
    );
  };

  const showDeleteButton = () => {
    return (
      (!saved &&
        loaded &&
        communicationStatus === CommunicationStatus.Borrador &&
        !readOnly &&
        _id !== 0) ||
      (!saved &&
        communicationStatus === CommunicationStatus.Aprobado &&
        !readOnly &&
        reference)
    );
  };

  const validateForm = () => {
    onChange(true, "validating");
    if (!validateLessee(communication, lessee)) return false;
    if (!validateContract(communication, contract)) return false;
    return true;
  };

  const showNotification = (title, text, duracion = 6) => {
    notification.open({
      message: title,
      description: text,
      duration: duracion,
      onClick: () => {},
    });
  };

  const saveForm = (saveAndExit, sendPdfByMail) => {
    if (communicationStatus === CommunicationStatus.Aprobado) {
      if (validateForm()) {
        save(saveAndExit, CommunicationStatus.Aprobado, sendPdfByMail);
      } else {
        showNotification(
          "No validado",
          "Hay datos incorrectos en el formulario. Por favor, revise todos los apartados."
        );
      }
    } else {
      save(saveAndExit, communicationStatus, sendPdfByMail);
    }
  };

  const confirmDelete = () => {
    confirm({
      title: "¿Estás seguro/a que deseas ELIMINAR el comunicado?",
      content:
        "Si eliminas este comunicado se perderán todos los datos asociados.",
      okText: "Eliminar",
      cancelText: "Cancelar",
      onOk: () => {
        deleteCommunication(_id);
      },
      onCancel() {},
    });
  };

  const save = async (saveAndExit, communicationStatus, sendPdfByMail) => {
    if (isRequestValid()) {
      const data =
        _id === 0
          ? await saveCommunication()
          : await updateCommunication(_id, communicationStatus);
      if (data) {
        showNotification(
          "Listo!",
          "Información guardada, puedes seguir trabajando.",
          2
        );
      } else {
        showNotification(
          "No validado",
          "Hay datos incorrectos en el formulario. Por favor, revise todos los apartados."
        );
      }
    } else {
      showLoader(false);
      message.error("Hay errores en la comunicación.");
    }
  };

  const isRequestValid = () => {
    return !readOnly;
  };

  const saveApproved = async () => {
    const data = await updateCommunication(_id, CommunicationStatus.Aprobado);
    saveSucceededForm(
      true,
      "Comunicado Aprobado!",
      "El comunicado ha sido aprobado satisfactoriamente."
    );
  };

  const confirmApproval = () => {
    if (validateForm()) {
      confirm({
        title: "¿Estás seguro/a que deseas APROBAR el comunicado?",
        content:
          "Si apruebas este comunicado ya no podrás editar la información contenida. Solo podrás anexar documentos de MODIFICACIÓN al comunicado original.",
        okText: "Aprobar",
        cancelText: "Mantener como Borrador",
        onOk: () => {
          saveApproved();
        },
        onCancel() {},
      });
    } else {
      showNotification(
        "No validado",
        "Hay datos incorrectos en el formulario. Por favor, revise todos los apartados."
      );
    }
  };

  if (isDuplicated) {
    showNotification(
      "Advertencia!",
      "Ya existe un comunicado con el mismo tipo, centro y local."
    );
    onChange(false, "isDuplicated");
  }

  return (
    <>
      {showApproveButton() && (
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
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
          <button className="font-bold" onClick={confirmApproval}>
            Aprobar
          </button>
        </div>
      )}
      {showSaveButton() && _id !== 0 && loaded && (
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
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>
          <button
            className="font-bold"
            onClick={() => {
              saveForm(false, 1);
            }}
          >
            Guardar y enviar PDF
          </button>
        </div>
      )}
      {showSaveButton() && (
        <div className="flex items-center gap-2 text-gray-400 hover:text-black">
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {" "}
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />{" "}
            <polyline points="17 21 17 13 7 13 7 21" />{" "}
            <polyline points="7 3 7 8 15 8" />
          </svg>
          <button className="font-bold" onClick={saveForm}>
            Guardar
          </button>
        </div>
      )}
      {showDeleteButton() && (
        <div className="flex items-center gap-2 text-gray-400 hover:text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
          <button className="font-bold" onClick={confirmDelete}>
            Eliminar
          </button>
        </div>
      )}
    </>
  );
};

export default ButtonsComunication;
