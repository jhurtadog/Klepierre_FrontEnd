import React from "react";
import useComunicados from "../../../hooks/useComunicados";
import CondicionSuspensiva from "./_children/_lessee/CondicionSuspensiva";
import DatosArrendatario from "./_children/_lessee/DatosArrendatario";
import DatosFirmantes from "./_children/_lessee/DatosFirmantes";
import PoderesFirmantes from "./_children/_lessee/PoderesFirmantes";
import DomiciliacionBancaria from "./_children/_lessee/DomiciliacionBancaria";
import MailNotificacion from "./_children/_lessee/MailNotificacion";
import Cesion from "./_children/_lessee/Cesion";
import Sociedad from "./_children/_lessee/Sociedad";
import DomicilioNotificacion from "./_children/_lessee/DomicilioNotificacion";
import { CommunicationType } from "../../../helpers/types";

const Lessee = () => {
  const { state } = useComunicados();
  const { readOnly, isModification, isCompAgreement, communication } = state;
  const { communicationType, lessee } = communication;
  const { modifyLesseeChanges } = lessee;
  let partialReadonly = false;
  if (
    communicationType === CommunicationType.Renovacion ||
    communicationType === CommunicationType.AcuerdoComplementario ||
    communicationType === CommunicationType.Recision ||
    communicationType === CommunicationType.Bonificacion
  ) {
    partialReadonly = true;
  }
  return (
    <div className={readOnly ? "pointer-events-none cursor-none" : ""}>
      {readOnly && !isCompAgreement && (
        <div
          style={{
            background: "black",
            opacity: 0.1,
            width: "100%",
            height: isModification ? "100%" : "42%",
            position: "absolute",
            zIndex: 1,
          }}
        ></div>
      )}
      {communicationType !== CommunicationType.Bonificacion &&
        communicationType !== CommunicationType.Recision &&
        !readOnly && <CondicionSuspensiva />}
      {(communicationType !== CommunicationType.AcuerdoComplementario ||
        (communicationType === CommunicationType.AcuerdoComplementario &&
          readOnly) ||
        (communicationType === CommunicationType.AcuerdoComplementario &&
          !readOnly &&
          modifyLesseeChanges)) && (
        <>
          <DatosArrendatario partialReadonly={partialReadonly} />
          <Sociedad partialReadonly={partialReadonly} />
          <DatosFirmantes partialReadonly={partialReadonly} />
          <PoderesFirmantes />
          <DomicilioNotificacion />
          <MailNotificacion />
          <Cesion />
          <DomiciliacionBancaria />
        </>
      )}
    </div>
  );
};

export default Lessee;
