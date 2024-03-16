import dayjs from "dayjs";
import { DocumentType } from "../helpers/types";

export const itemBonus = (data) => {
  const item = {
    id: data?.CONTRATO,
    amount: data?.BONIFICACION,
    type: data?.TIPO_BONIFICACION,
    percentage: data?.PORCENTAJE_BONIFICACION,
    startDate: data?.FECHA_INICIO_BONIFICACION
      ? dayjs(data.FECHA_INICIO_BONIFICACION)
      : null,
    endDate: data?.FECHA_FIN_BONIFICACION
      ? dayjs(data.FECHA_FIN_BONIFICACION)
      : null,
  };
  return item;
};

export const itemLastContract = (
  data,
  contractExtension,
  cancellationDate,
  lastSettlementDate
) => {
  const item = {
    id: data?.CONTRATO || "",
    nif: data?.ID_ARRENDATARIO || "",
    name: data?.NOMBRE_ARRENDATARIO || "",
    label: data?.ROTULO || "",
    activity: `${data?.ACTIVIDAD} ${data?.DENOMINACION_ACTIVIDAD}`,
    group: `${data?.GRUPO_ARRENDATARIO} ${data?.DENOMINACION_GRUPO}`,
    contractId: data?.CONTRATO || "",
    signatureDate: data?.FECHA_FIRMA,
    endDate: data?.FECHA_FIN,
    rentVar: data?.PORC_RENTA_VARIABLE,
    extension: contractExtension,
    cancellation: cancellationDate,
    lastSettlement: lastSettlementDate,
    endDateRemarks: data?.OBSERVACION_GENERAL,
    guaranteedMinimumIncome: data?.IMPORTE_RENTA,
    percentageOfEquity: data?.PORC_RENTA_VARIABLE,
    communityFees: data?.IMPORTE_COMUNIDAD,
    communityFeesRatio: data?.PORCENTAJE_GASTOS,
    localId: data?.PRIMER_MODULO,
    centerId: data?.GALERIA,
    societyNumber: data?.SAP_ARRENDATARIO,
    leseeGroup: data?.DENOMINACION_GRUPO,
    lastContracts: [],
    bond: data?.IMPORTE_FIANZA,
    additionalGuarantee: data?.IMPORTE_FIANZA_ADICIONAL,
    endorsementAmount: data?.IMPORTE_AVAL,
    endorsementDueDate: null,
    geoAmount: data?.IMPORTE_GEO,
    lesseAddress: {
      address:
        (data?.TIPO_VIA_ARRENDATARIO || "") +
        " " +
        (data?.NOMBRE_VIA_ARRENDATARIO || "") +
        " " +
        (data?.NUMERO_VIA_ARRENDATARIO || "") +
        " " +
        (data?.ESCALERA_ARRENDATARIO || "") +
        " " +
        (data?.PISO_ARRENDATARIO || "") +
        " " +
        (data?.PUERTA_ARRENDATARIO || "") +
        " " +
        (data?.COMP_DIRECCION_ARRENDATARIO || ""),
      zipCode: data?.COD_POSTAL_ARRENDATARIO || "",
      town: data?.LOCALIDAD_ARRENDATARIO || "",
      state: data?.PROVINCIA_ARRENDATARIO,
    },
    lesseePhone: data?.TELEFONO_ARRENDATARIO,
    signerGESAL: {
      id: 0,
      name: data?.NOMBRE_REPRES,
      documentType: DocumentType.NIF,
      documentNumber: data?.ID_REPRES,
      domicile: {
        address:
          (data?.TIPO_VIA_REPRES || "") +
          " " +
          (data?.NOMBRE_VIA_REPRES || "") +
          " " +
          (data?.NUMERO_VIA_REPRES || "") +
          " " +
          (data?.ESCALERA_REPRES || "") +
          " " +
          (data?.PISO_REPRES || "") +
          " " +
          (data?.PUERTA_REPRES || "") +
          " " +
          (data?.COMP_DIRECCION_REPRES || ""),
        zipCode: data?.COD_POSTAL_REPRES || "",
        town: data?.LOCALIDAD_REPRES || "",
        state: data?.PROVINCIA_REPRES,
      },
      phone: data?.TELEFONO_REPRES,
    },
    bankAddress: {
      bank: data?.ENTIDAD || "",
      branch: data?.OFICINA || "",
      account: data?.CUENTA || "",
    },
    ECOPAmount: data?.IMPORTE_ECOP,
    descActivity: data?.DESC_ACTIVIDAD,
    ibi: data?.IBI === "S" ? true : false,
    ipc: data?.PORCENTAJE_IPC,
    ipcType: data?.TIPO_IPC,
    ruptureEnabled: data?.RUPTURA === "S" ? true : false,
    accrualRentDate: data?.FECHA_DEVENGO,
    communityExpenses: data?.IND_GASTOS_COMUNIDAD,
  };
  return item;
};
