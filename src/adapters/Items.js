import { SocietyType, PeopleTypeDbId, DocumentType } from "../helpers/types";

export const itemBonusItem = {
  idBonus: 0,
  rentTypeId: 2,
  amountOverMonth: 0,
  eurosm2: 0,
  budget: undefined,
  reason: "",
  year: undefined,
  startDate: undefined,
  endDate: undefined,
};

export const itemSocietyLesseeDebt = {
  societyName: "",
  societyDebt: "",
};

export const itemExtra = {
  name: "",
  documentType: DocumentType.NIF,
  documentNumber: "",
  domicile: {
    address: "",
    zipCode: "",
    town: "",
    state: "",
  },
  phone: "",
};

export const itemExtension = {
  idDuration: 1,
  nPeriods: 1,
  date: {
    nDays: 0,
    nMonths: 0,
    nYears: 0,
  },
};

export const itemRupture = {
  idDuration: 1,
  date: {
    nDays: 0,
    nMonths: 0,
    nYears: 0,
  },
};

export const itemEquity = {
  idRentIncrease: 0,
  percentageOrAmount: 0.0,
  section: "",
  activity: "",
};

export const societyTypeLessee = (TIPO_ARRENDATARIO) => {
  switch (TIPO_ARRENDATARIO) {
    case PeopleTypeDbId.PersonaFisica:
      return SocietyType.Fisica;

    case PeopleTypeDbId.SociedadCivil:
      return SocietyType.Sociedad;

    case PeopleTypeDbId.ComunidadBienes:
      return SocietyType.Comunidad;

    default:
      return SocietyType.Sociedad;
  }
};
