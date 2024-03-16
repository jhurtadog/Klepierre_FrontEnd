import React from "react";
import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import clienteAxios from "../config/clienteAxios";
import { calculateBaseRef, generateNewRef } from "../helpers/baseRef";
import { calculateIBANSpain, getDCFromCCC } from "../helpers/bankUtils";
import { toNumber } from "../helpers/formatUtils";
import {
  PeopleType,
  PeopleTypeDbId,
  DocumentType,
  CommunicationType,
} from "../helpers/types";
import { DeepValueAssign } from "../helpers/objectUtils";
import { itemBonus, itemLastContract } from "../adapters/Workout";
import {
  itemBonusItem,
  itemSocietyLesseeDebt,
  itemExtra,
  itemExtension,
  itemRupture,
  itemEquity,
  societyTypeLessee,
} from "../adapters/Items";

const CommunicationsContext = createContext();

const CommunicationsProvider = ({ children }) => {
  const initialState = {
    communicationReference: "ES000000000-YYYY-00000",
    disabled: false,
    loaded: false,
    deleted: false,
    readOnly: false,
    loaderVisible: false,
    saved: false,
    saveTitle: "",
    saveSubTitle: "",
    validating: false,
    communicationModification: false,
    isModification: false,
    isDuplicated: false,
    isCompAgreement: false,
    blockBonificationModification: false,
    blockBonusModification: false,
    blockRescissionModification: false,
    blockContractModification: false,
    blockLesseeModification: false,
    communication: {
      _id: 0,
      reference: undefined,
      communicationType: undefined,
      communicationStatus: undefined,
      center: "",
      centerName: "",
      buildingName: "",
      floor: "",
      area: "",
      societyId: "",
      societyName: "",
      local: "",
      selectedLocal: [],
      localsAssociated: "",
      remarks: "",
      history: "",
      original: true,
      modificationNumber: 0,
      parentCommunicationId: 0,
      originalCommunicationId: 0,
      generationFiles: {
        lastContract: "",
        lastDateContract: undefined,
        lastAnnex: "",
        lastDateAnnex: undefined,
        items: [],
      },
      changes: [
        {
          Id: 1,
          key: "1",
          changeDate: Date.now(),
          changeUser: "Jose Hurtado",
          field: "field",
          oldValue: 1,
          newValue: 2,
        },
        {
          Id: 2,
          key: "2",
          changeDate: Date.now(),
          changeUser: "Jose Hurtado",
          field: "field",
          oldValue: 1,
          newValue: 2,
        },
      ],
      contact: {
        name: "",
        address: "",
        phone: "",
        zipcode: "",
        town: "",
        state: "",
      },
      lastContract: {
        id: "",
        societyNumber: "",
        societyName: "",
        signDate: null,
        endDate: null,
        rentVar: 0,
        label: "",
        activity: "",
        group: "",
        bond: "",
        additionalGuarantee: "",
        endorsementAmount: "",
        endorsementDueDate: null,
        geoAmount: "",
        guaranteedMinimumIncome: "",
        extension: "",
        communityFees: "",
        communityFeesRatio: "",
        settlementDate: null,
        endDateRemarks: "",
        percentageOfEquity: "",
        cancellationDate: null,
      },
      bonification: {
        bonificationTypeId: 1,
        items: [],
      },
      lessee: {
        suspensiveCondition: false,
        peopleType: "Jurídica",
        societyType: "Física",
        communicationId: undefined,
        documentNumber: "",
        subrogationDate: null,
        modifyLesseeChanges: false,
        lesseeChangesText: "",
        society: {
          businessName: "",
          documentNumber: "",
          phone: "",
          registryData: {
            site: "",
            volume: "",
            section: "",
            book: "",
            folio: "",
            sheet: "",
            inscription: "",
          },
          domicile: {
            address: "",
            zipCode: "",
            town: "",
            state: "",
          },
        },
        signerGESAL: {
          documentNumber: "",
          documentType: DocumentType.NIF,
          name: "",
          phone: "",
          domicile: {
            address: "",
            zipCode: "",
            town: "",
            state: "",
          },
        },
        signerExtra: [],
        signatoryPower: {
          date: null,
          protocol: "",
          notary: "",
          site: "",
        },
        notification: {
          email: "",
          domicile: {
            address: "",
            zipCode: "",
            town: "",
            state: "",
          },
        },
        bankAddress: {
          iban: "",
          swiftBic: "",
        },
        cession: {
          clause: undefined,
          cessionType: "No",
          businessName: "",
        },
      },
      contract: {
        communicationId: undefined,
        complementary_agreement_start_date: null,
        modifyContractChanges: false,
        contractLabel: "",
        contractChangesText: "",
        contractCAgreementChangesText: "",
        duration: {
          localDeliveryDate: null,
          localOpeningDate: null,
          compLocalOpeningDate: {
            nDays: 0,
            nMonths: 0,
            nYears: 0,
          },
          signatureDate: null,
          endDate: null,
          compEndDate: {
            nDays: 0,
            nMonths: 0,
            nYears: 0,
          },
          extension: [],
          extensionNotice: {
            forewarningTypeId: 0,
            date: {
              nYears: 0,
              nMonths: 0,
              nDays: 0,
            },
          },
          ruptureEnabled: false,
          rupture: [],
          ruptureNotice: {
            forewarningTypeId: 2,
            date: {
              nYears: 0,
              nMonths: 0,
              nDays: 0,
            },
          },
          workTypeId: 3,
          workDate: null,
        },
        destiny: {
          label: "",
          labelId: "",
          group: "",
          groupId: "",
          activity: "",
          activityId: "",
          destiny: "",
          destinationBusinessTypeId: undefined,
        },
        economicData: {
          communityExpensesId: 0,
          communityExpenses: false,
          coefficient: 0,
          amount: 0,
          previous: 0,
          guaranteedMinimumIncome: {
            proposal: "",
            previousNetIncome: 0,
            increasedBudget: 0,
            increase: 0,
            budgeted: 0,
            proposedEurom2: 0,
            previousEurom2: 0,
            terraceSurface: 0,
            terraceAmount: 0,
            terraceEurom2: 0,
          },
          IpcByIndex: {
            firstChecking: "",
            date: null,
          },
        },
        guarantee: {
          bondMonths: 2,
          bondAmount: "",
          oldBondAmount: 0,
          bondDifference: 0,
          bondPaymentType: 1,
          additionalGuaranteeMonths: 0,
          additionalGuaranteeAmount: 0,
          oldAdditionalGuaranteeAmount: 0,
          additionalGuaranteeDifference: 0,
          additionalGuaranteePaymentType: 1,
          geoMonths: 0,
          geoAmount: 0,
          ecopMonths: 0,
          ecopIVANotIncluded: 0,
          ecopIVAIncluded: 0,
          totalOutlay: 0,
          reserveDeposit: 0,
          totalPaymentOnFirm: 0,
          endorsementMonths: 0,
          endorsementAmount: 0,
        },
        otherData: {
          minorWorks: false,
          months: 0,
          days: 0,
          entranceFee: 0.0,
        },
        rentIncrease: {
          date: null,
          percentage: 0,
          occupationalCompensation: 0,
          invoiceIbi: false,
          amountIbi: "",
          amountExpensesFees: 0,
          equitiesType: undefined,
          equities: [],
          equitiesObservations: "",
          accrualRent: {
            accrualTypeId: 0,
            months: 0,
            date: null,
          },
          accrualCommunity: {
            accrualTypeId: 0,
            months: 0,
            date: null,
          },
        },
      },
      bonus: {
        items: [],
        rentTypeId: undefined,
        bonificationAmount: 0,
        amountOverMonth: 0,
        amountOverMonthEurosm2: 0,
        startDate: null,
        endDate: null,
        budget: true,
        budgetAmount: 0,
        renewal: "",
        contractalIncome: 0,
        contractalIncomeEurosm2: 0,
        billedIncome: 0,
        billedIncomeEurosm2: 0,
        bonusIncome: 0,
        bonusIncomeEurosm2: 0,
        reason: "",
      },
      debt: {
        nif: "",
        currentContractDebt: 0,
        totalDebtMinusGuarantees: 0,
        societyLesseeDebt: [],
        totalSocietyLesseeDebt: 0,
        rescission: {
          rescissionDate: null,
          compensatedId: undefined,
          handoverOf: "",
          reason: "",
        },
      },
    },
    lists: {
      types: [
        {
          id: 1,
          title: "NUEVO CONTRATO",
          enabled: true,
        },
        {
          id: 2,
          title: "RENOVACION",
          enabled: true,
        },
        {
          id: 3,
          title: "NUEVA UNIDAD COMERCIAL",
          enabled: true,
        },
        {
          id: 4,
          title: "ACUERDO COMPLEMENTARIO",
          enabled: true,
        },
        {
          id: 5,
          title: "RESCISIÓN",
          enabled: true,
        },
        {
          id: 6,
          title: "BONIFICACIÓN",
          enabled: true,
        },
        {
          id: 7,
          title: "SUBROGACIÓN",
          enabled: true,
        },
      ],
      lastContracts: [],
      local: [],
      labels: [],
      groups: [],
      activities: [],
      signatures: [],
      center: {
        items: [],
      },
      locals: {
        items: [],
      },
    },
  };
  const token = localStorage.getItem("token");
  const pathLocation = localStorage.getItem("pathname") || "/comunicados";
  const [state, setState] = useState(initialState);
  const navigate = useNavigate();

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  console.log("state", state);

  const getInitialData = async () => {
    try {
      if (!token) return;
      const { data: dataCentersContract } = await clienteAxios(
        "/v1/or/centerscontract",
        config
      );
      const { data: dataLabel } = await clienteAxios("/v1/or/labels", config);
      const { data: dataGroup } = await clienteAxios(
        "/v1/or/lesseegroups",
        config
      );
      const { data: dataActivity } = await clienteAxios(
        "/v1/or/activities",
        config
      );
      const { data: dataSignatures } = await clienteAxios(
        "/v1/signatures",
        config
      );
      onChange(dataLabel.data, "labels", ["lists"]);
      onChange(dataGroup.data, "groups", ["lists"]);
      onChange(dataActivity.data, "activities", ["lists"]);
      onChange(dataCentersContract.data, "items", ["lists", "center"]);
      onChange(dataSignatures, "signatures", ["lists"]);
    } catch (error) {
      console.log(error);
    }
  };

  const getSignerId = async (id) => {
    try {
      if (!token) return;
      const { data } = await clienteAxios(`/v1/or/signers/${id}`, config);
      onChange(data.data.TELEFONO, "phone", [
        "communication",
        "lessee",
        "signerGESAL",
      ]);
      onChange(data.data.NOMBRE, "name", [
        "communication",
        "lessee",
        "signerGESAL",
      ]);
      onChange(data.data.ID_REPRESENTANTE, "documentNumber", [
        "communication",
        "lessee",
        "signerGESAL",
      ]);
      onChange(data.data.DIRECCION, "address", [
        "communication",
        "lessee",
        "signerGESAL",
        "domicile",
      ]);
      onChange(data.data.COD_POSTAL, "zipCode", [
        "communication",
        "lessee",
        "signerGESAL",
        "domicile",
      ]);
      onChange(data.data.LOCALIDAD, "town", [
        "communication",
        "lessee",
        "signerGESAL",
        "domicile",
      ]);
      onChange(data.data.PROVINCIAS_DENOMINACION, "state", [
        "communication",
        "lessee",
        "signerGESAL",
        "domicile",
      ]);
    } catch (error) {
    } finally {
    }
  };

  const getLesseeDebt = async (id) => {
    try {
      if (!token) return;
      const { data } = await clienteAxios(`/v1/or/lesseesdebts/${id}`, config);
      let saldoTotal = 0;
      if (data && data.data.length > 0) {
        data.data.forEach((society) => {
          let saldoString = society.SALDO.toString();
          let saldo =
            saldoString === null ||
            saldoString === undefined ||
            saldoString === ""
              ? 0
              : parseFloat(saldoString.replace(/,/, "."));
          saldoTotal += saldo;
          itemSocietyLesseeDebt.societyName =
            society.SOCIEDAD_SOCIEDAD_RAZON_SOCIAL;
          itemSocietyLesseeDebt.societyDebt = saldoString;
          let aItems = state.debt.societyLesseeDebt.concat([
            itemSocietyLesseeDebt,
          ]);
          setState((prevState) => ({
            ...prevState,
            debt: { ...prevState.debt, societyLesseeDebt: aItems },
          }));
        });
      }
      setState((prevState) => ({
        ...prevState,
        debt: { ...prevState.debt, totalSocietyLesseeDebt: saldoTotal },
      }));
    } catch (error) {
    } finally {
    }
  };

  const getAllCommunications = async () => {
    try {
      if (!token) return;
      const { data: dataMainList } = await clienteAxios(
        "/v1/communications/list",
        config
      );
      return dataMainList;
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCommunicationsContract = async () => {
    try {
      if (!token) return;
      const { data: dataContractMainList } = await clienteAxios(
        "/v1/communications/contract",
        config
      );
      return dataContractMainList;
    } catch (error) {
      console.log(error);
    }
  };

  const getLesseeId = async (id) => {
    try {
      if (!token) return;
      const { data } = await clienteAxios(`/v1/or/lessees/${id}`, config);
      onChange(data.data.ID_ARRENDATARIO, "documentNumber", [
        "communication",
        "lessee",
      ]);
      onChange(
        data.data.TIPO_ARRENDATARIO === PeopleTypeDbId.PersonaJuridica
          ? PeopleType.Juridica
          : PeopleType.Fisica,
        "peopleType",
        ["communication", "lessee"]
      );
      onChange(societyTypeLessee(data.data.TIPO_ARRENDATARIO), "societyType", [
        "communication",
        "lessee",
      ]);
      onChange(data.data.NOMBRE || "", "businessName", [
        "communication",
        "lessee",
        "society",
      ]);
      onChange(data.data.ID_ARRENDATARIO || "", "documentNumber", [
        "communication",
        "lessee",
        "society",
      ]);
      onChange(data.data.TELEFONO || "", "phone", [
        "communication",
        "lessee",
        "society",
      ]);
      onChange(data.data.NOMBRE_VIA || "", "address", [
        "communication",
        "lessee",
        "society",
        "domicile",
      ]);
      onChange(data.data.COD_POSTAL || "", "zipCode", [
        "communication",
        "lessee",
        "society",
        "domicile",
      ]);
      onChange(data.data.LOCALIDAD || "", "town", [
        "communication",
        "lessee",
        "society",
        "domicile",
      ]);
      onChange(data.data.DENOMINACION || "", "state", [
        "communication",
        "lessee",
        "society",
        "domicile",
      ]);
      onChange(data.data.NOMBRE_VIA_REPRES || "", "address", [
        "communication",
        "lessee",
        "signerGESAL",
        "domicile",
      ]);
      onChange(data.data.COD_POSTAL_REPRES || "", "zipCode", [
        "communication",
        "lessee",
        "signerGESAL",
        "domicile",
      ]);
      onChange(data.data.LOCALIDAD_REPRES || "", "town", [
        "communication",
        "lessee",
        "signerGESAL",
        "domicile",
      ]);
      onChange(data.data.PROVINCIAS_DENOMINACION || "", "state", [
        "communication",
        "lessee",
        "signerGESAL",
        "domicile",
      ]);
      onChange(data.data.TELEFONO_REPRES || "", "phone", [
        "communication",
        "lessee",
        "signerGESAL",
      ]);
      return false;
    } catch (error) {
      return true;
    } finally {
    }
  };

  const getBuildingName = async () => {
    const { lists } = state;
    try {
      if (!token) return;
      const idGallery = lists.local[0].GALERIA;
      const idSociety = lists.local[0].SOCIEDAD;
      const idBuilding = lists.local[0].EDIFICIO;
      const { data } = await clienteAxios(
        `/v1/or/buildings/${idGallery}/${idSociety}/${idBuilding}`,
        config
      );
      setState((prevState) => ({
        ...prevState,
        communication: {
          ...prevState.communication,
          buildingName: data.data.NOMBRE_EDIFICIO,
        },
      }));
    } catch (error) {}
  };

  const getStateById = async (id) => {
    try {
      if (!token) return;
      const { data } = await clienteAxios(`/v1/or/states/${id}`, config);
      return data;
    } catch (error) {}
  };

  const getLesseeFromLastContract = async (lastContractLoad) => {
    const data = itemLastContract(lastContractLoad.data[0]);
    const entidad = data.bankAddress.bank || "";
    const oficina = data.bankAddress.branch || "";
    const cuentaBancaria = data.bankAddress.account || "";
    const dC =
      entidad && oficina && cuentaBancaria
        ? getDCFromCCC(entidad, oficina, cuentaBancaria)
        : "";
    const iban = calculateIBANSpain(entidad + oficina + dC + cuentaBancaria);
    const address = data.lesseAddress.address;
    const addressGESAL = data.signerGESAL.domicile.address;
    const lesseeState = await getStateById(data.lesseAddress.state);
    const represState = await getStateById(data.signerGESAL.domicile.state);

    setState((prevState) => ({
      ...prevState,
      communication: {
        ...prevState.communication,
        lessee: {
          ...prevState.communication.lessee,
          documentNumber: data.nif,
          society: {
            ...prevState.communication.lessee.society,
            businessName: data.name,
            documentNumber: data.nif,
            phone: data.lesseePhone,
            domicile: {
              ...prevState.communication.lessee.society.domicile,
              zipCode: data.lesseAddress.zipCode,
              address,
              town: data.lesseAddress.town || "",
              state: lesseeState.data.DENOMINACION,
            },
          },
          signerGESAL: {
            ...prevState.communication.lessee.signerGESAL,
            documentNumber: data.signerGESAL.documentNumber,
            name: data.signerGESAL.name,
            phone: data.signerGESAL.phone,
            domicile: {
              ...prevState.communication.lessee.signerGESAL.domicile,
              address: addressGESAL,
              zipCode: data.signerGESAL.domicile.zipCode || "",
              town: data.signerGESAL.domicile.town || "",
              state: represState?.data?.DENOMINACION,
            },
          },
          bankAddress: { ...prevState.communication.lessee.bankAddress, iban },
        },
      },
    }));
  };

  const getCommunicationLocalAssociated = async () => {
    const { lists } = state;
    try {
      if (!token) return;
      const idGallery = lists.local[0].GALERIA;
      const idSociety = lists.local[0].SOCIEDAD;
      const idContract = lists.local[0].CONTRATO;
      const firstLocal = lists.local[0].PRIMER_MODULO;
      const { data: dataLocalAssociated } = await clienteAxios(
        `/v1/or/localsassociated/${idGallery}/${idSociety}/${idContract}`,
        config
      );
      let localsAssociated = "";
      dataLocalAssociated.data.map((localAssoc) => {
        if (localAssoc.UMOD !== firstLocal) {
          localsAssociated = localsAssociated + localAssoc.UMOD + " | ";
        }
      });
      localsAssociated = localsAssociated.substr(
        0,
        localsAssociated.length - 3
      );
      setState((prevState) => ({
        ...prevState,
        communication: { ...prevState.communication, localsAssociated },
      }));
    } catch (error) {}
  };

  const getBonus = async (centerId, societyId, lastContractId) => {
    try {
      if (!token) return;
      let items = [];
      const { data: dataBonifications } = await clienteAxios(
        `/v1/or/bonifications/${centerId}/${societyId}/${lastContractId}`,
        config
      );
      if (dataBonifications && dataBonifications.data.length > 0) {
        for (let itemSP of dataBonifications.data) {
          items.push(itemBonus(itemSP));
        }
      }
      onChange(items, "items", ["communication", "bonus"]);
    } catch (error) {}
  };

  const getRegisterData = async (id) => {
    try {
      if (!token) return;
      const { data } = await clienteAxios(
        `/v1/communications/registredata/${id}`,
        config
      );
      console.log("data", data);
      return data;
    } catch (error) {
    } finally {
    }
  };

  const getCommunication = async (id) => {
    try {
      if (!token) return;
      const { data } = await clienteAxios(`/v1/communications/${id}`, config);
      return data;
    } catch (error) {
    } finally {
    }
  };

  function getRandomString(value1, value2, value3, value4) {
    return `${value1}_${value2}_${value3}_${value4}`;
  }

  function quitarAcentos(cadena) {
    const acentos = {
      á: "a",
      é: "e",
      í: "i",
      ó: "o",
      ú: "u",
      Á: "A",
      É: "E",
      Í: "I",
      Ó: "O",
      Ú: "U",
    };
    return cadena
      .split("")
      .map((letra) => acentos[letra] || letra)
      .join("")
      .toString();
  }

  const getLocalsByGaleriaId = async (id) => {
    try {
      if (!token) return;
      const { data } = await clienteAxios(`/v1/or/locals/${id}`, config);
      const newData = data.data.map((item) => ({
        ...item,
        _id: getRandomString(
          item.PRIMER_MODULO.split(" ").join("-").toUpperCase(),
          item.SOCIEDAD,
          quitarAcentos(item.PLANTA.toUpperCase()),
          item.GALERIA
        ),
      }));
      const dataSort = newData.sort((a, b) => {
        if (a.PRIMER_MODULO < b.PRIMER_MODULO) {
          return -1;
        }
        if (a.PRIMER_MODULO > b.PRIMER_MODULO) {
          return 1;
        }
        return 0;
      });
      onChange(dataSort, "items", ["lists", "locals"]);
    } catch (error) {
    } finally {
    }
  };

  const getLastcontracts = async (selectedLocal, center, communicationType) => {
    try {
      if (!token) return;
      let lastContracts = [];
      const { data: dataLocals } = await clienteAxios(
        `/v1/or/locals/${center}`,
        config
      );
      const newData = dataLocals.data.map((item) => ({
        ...item,
        _id: getRandomString(
          item.PRIMER_MODULO.split(" ").join("-").toUpperCase(),
          item.SOCIEDAD,
          quitarAcentos(item.PLANTA.toUpperCase()),
          item.GALERIA
        ),
      }));
      const dataSort = newData.sort((a, b) => {
        if (a.PRIMER_MODULO < b.PRIMER_MODULO) {
          return -1;
        }
        if (a.PRIMER_MODULO > b.PRIMER_MODULO) {
          return 1;
        }
        return 0;
      });
      if (selectedLocal.length > 0) {
        const local = [];
        selectedLocal.forEach((i) => {
          local.push(dataSort.find((e) => e._id === i));
        });
        if (
          communicationType === CommunicationType.UnidadComercial &&
          local.length > 1
        ) {
          lastContracts = await Promise.all(
            local.map(async (localN) => {
              return (
                await clienteAxios(
                  `/v1/or/lastcontracts/${localN.PRIMER_MODULO}/${center}`,
                  config
                )
              ).data.data;
            })
          );
        } else {
          const { data } = await clienteAxios(
            `/v1/or/lastcontracts/${center}/${local[0].PRIMER_MODULO}/${local[0].CONTRATO}`,
            config
          );
          let key = 0;
          if (data) {
            let max = -Infinity;
            data.data.map((v, k) => {
              if (max < +v.CONTRATO) {
                max = +v.CONTRATO;
                key = k;
              }
            });
          }
          lastContracts.push(data.data[key]);
        }
      }
      return lastContracts;
    } catch (error) {
      console.log(error);
    }
  };

  const getCommunicationReference = async (gallery, building, local, type) => {
    try {
      if (!token) return;
      const baseRef = calculateBaseRef(building, gallery);
      const { data } = await clienteAxios(
        `/v1/communications/reference/${baseRef}`,
        config
      );
      const communicationsBriefModel = data || [];
      const ref = generateNewRef(baseRef, communicationsBriefModel);
      const warn = communicationsBriefModel.some(
        (c) =>
          c.type === type &&
          c.local === local.map((l) => l.PRIMER_MODULO).join(" | ")
      );
      setState((prevState) => ({
        ...prevState,
        isDuplicated: warn,
        communicationReference: ref,
        communication: {
          ...prevState.communication,
          reference: ref,
          communicationStatus: 1,
        },
      }));
    } catch (error) {}
  };

  const getContractDebt = async (
    idSociety,
    idGallery,
    idContract,
    lastContractLoad
  ) => {
    try {
      if (!token) return;
      const { data } = await clienteAxios(
        `/v1/or/contractdebts/${idSociety}/${idGallery}/${idContract}`,
        config
      );
      const totalDebtNumber = toNumber(data.data[0].SALDO);
      const debtMinusGuarantees =
        totalDebtNumber -
        (lastContractLoad.data[0].IMPORTE_FIANZA +
          lastContractLoad.data[0].IMPORTE_FIANZA_ADICIONAL +
          lastContractLoad.data[0].IMPORTE_GEO);
      onChange(totalDebtNumber, "currentContractDebt", [
        "communication",
        "debt",
      ]);
      onChange(debtMinusGuarantees, "totalDebtMinusGuarantees", [
        "communication",
        "debt",
      ]);
    } catch (error) {
    } finally {
    }
  };

  const getLastContracts = async (localsId, centerId) => {
    try {
      let lastContracts = [];
      localsId.map(async (localN) => {
        const lastContract = await clienteAxios(
          `/v1/or/lastcontracts/${localN.PRIMER_MODULO}/${centerId}`,
          config
        );
        lastContracts.push(lastContract.data.data);
      });
      setState((prevState) => ({
        ...prevState,
        lists: { ...prevState.lists, lastContracts },
      }));
    } catch (error) {}
  };

  const getLastContract = async (
    lastContractId,
    localId,
    centerId,
    lastSettlementDate,
    cancellationDate,
    contractExtension,
    contractNumber
  ) => {
    try {
      if (lastContractId !== 0) {
      } else {
        const { data } = await clienteAxios(
          `/v1/or/lastcontracts/${centerId}/${localId}/${contractNumber}`,
          config
        );
        let key = 0;
        if (data) {
          let max = -Infinity;
          data.data.map((v, k) => {
            if (max < +v.CONTRATO) {
              max = +v.CONTRATO;
              key = k;
            }
          });
        }
        setState((prevState) => ({
          ...prevState,
          lists: { ...prevState.lists, lastContracts: data.data },
        }));
        setState((prevState) => ({
          ...prevState,
          communication: {
            ...prevState.communication,
            lastContract: itemLastContract(
              data.data[key],
              contractExtension,
              cancellationDate,
              lastSettlementDate
            ),
          },
        }));
        return data;
      }
    } catch (error) {
      return initialState.lastContract;
    }
  };

  const onChange = (value, prop, tree = []) => {
    if (tree.length === 1) {
      setState((prevState) => ({
        ...prevState,
        [tree]: { ...prevState[tree], [prop]: value },
      }));
    } else if (tree.length === 2) {
      setState((prevState) => ({
        ...prevState,
        [tree[0]]: {
          ...prevState[tree[0]],
          [tree[1]]: { ...prevState[tree[0]][tree[1]], [prop]: value },
        },
      }));
    } else if (tree.length === 3) {
      setState((prevState) => ({
        ...prevState,
        [tree[0]]: {
          ...prevState[tree[0]],
          [tree[1]]: {
            ...prevState[tree[0]][tree[1]],
            [tree[2]]: {
              ...prevState[tree[0]][tree[1]][tree[2]],
              [prop]: value,
            },
          },
        },
      }));
    } else if (tree.length === 4) {
      setState((prevState) => ({
        ...prevState,
        [tree[0]]: {
          ...prevState[tree[0]],
          [tree[1]]: {
            ...prevState[tree[0]][tree[1]],
            [tree[2]]: {
              ...prevState[tree[0]][tree[1]][tree[2]],
              [tree[3]]: {
                ...prevState[tree[0]][tree[1]][tree[2]][tree[3]],
                [prop]: value,
              },
            },
          },
        },
      }));
    } else if (tree.length === 5) {
      setState((prevState) => ({
        ...prevState,
        [tree[0]]: {
          ...prevState[tree[0]],
          [tree[1]]: {
            ...prevState[tree[0]][tree[1]],
            [tree[2]]: {
              ...prevState[tree[0]][tree[1]][tree[2]],
              [tree[3]]: {
                ...prevState[tree[0]][tree[1]][tree[2]][tree[3]],
                [tree[4]]: {
                  ...prevState[tree[0]][tree[1]][tree[2]][tree[3]][tree[4]],
                  [prop]: value,
                },
              },
            },
          },
        },
      }));
    } else if (tree.length === 0) {
      setState((prevState) => ({ ...prevState, [prop]: value }));
    }
  };

  const onChangeExtension = (value, index, prop, parents) => {
    const extension = state.communication.contract.duration.extension.map(
      (b, i) => {
        if (i === index) {
          if (parents) {
            return DeepValueAssign({ ...b }, prop, value, parents);
          } else {
            return {
              ...b,
              [prop]: value,
            };
          }
        }
        return b;
      }
    );
    setState((prevState) => ({
      ...prevState,
      communication: {
        ...prevState.communication,
        contract: {
          ...prevState.communication.contract,
          duration: { ...prevState.communication.contract.duration, extension },
        },
      },
    }));
  };

  const onChangeRupture = (value, index, prop, parents) => {
    const rupture = state.communication.contract.duration.rupture.map(
      (b, i) => {
        if (i === index) {
          if (parents) {
            return DeepValueAssign({ ...b }, prop, value, parents);
          } else {
            return {
              ...b,
              [prop]: value,
            };
          }
        }
        return b;
      }
    );
    setState((prevState) => ({
      ...prevState,
      communication: {
        ...prevState.communication,
        contract: {
          ...prevState.communication.contract,
          duration: { ...prevState.communication.contract.duration, rupture },
        },
      },
    }));
  };

  const onChangeEquity = (value, index, prop, parents) => {
    const equities = state.communication.contract.rentIncrease.equities.map(
      (b, i) => {
        if (i === index) {
          if (parents) {
            return DeepValueAssign({ ...b }, prop, value, parents);
          } else {
            return {
              ...b,
              [prop]: value,
            };
          }
        }
        return b;
      }
    );
    setState((prevState) => ({
      ...prevState,
      communication: {
        ...prevState.communication,
        contract: {
          ...prevState.communication.contract,
          rentIncrease: {
            ...prevState.communication.contract.rentIncrease,
            equities,
          },
        },
      },
    }));
  };

  const onChangeFirmas = (value, index, prop) => {
    const signaturesUpd = state.signatures.map((b, i) => {
      if (i === index) {
        return {
          ...b,
          [prop]: value,
        };
      }
      return b;
    });
    setState((prevState) => ({ ...prevState, signatures: signaturesUpd }));
  };

  const onChangeCenter = (value) => {
    const center = state.lists.center.items.find(
      (item) => item.GALERIA === value
    );
    setState((prevState) => ({
      ...prevState,
      communication: {
        ...prevState.communication,
        centerName: center.NOMBRE_GALERIA,
        center: value,
      },
    }));
  };

  const onChangeBonus = (value, index, prop, parents) => {
    const items = state.communication.bonification.items.map((b, i) => {
      if (i === index) {
        if (parents) {
          return DeepValueAssign({ ...b }, prop, value, parents);
        } else {
          return {
            ...b,
            [prop]: value,
          };
        }
      }
      return b;
    });
    setState((prevState) => ({
      ...prevState,
      communication: {
        ...prevState.communication,
        bonification: { ...prevState.communication.bonification, items },
      },
    }));
  };

  const onChangeExtraSigner = (value, index, prop, parents) => {
    const signerExtra = state.communication.lessee.signerExtra.map((b, i) => {
      if (i === index) {
        if (parents) {
          return DeepValueAssign({ ...b }, prop, value, parents);
        } else {
          return {
            ...b,
            [prop]: value,
          };
        }
      }
      return b;
    });
    setState((prevState) => ({
      ...prevState,
      communication: {
        ...prevState.communication,
        lessee: { ...prevState.communication.lessee, signerExtra },
      },
    }));
  };

  const addExtension = () => {
    const aItems = state.communication.contract.duration.extension.concat([
      itemExtension,
    ]);
    setState((prevState) => ({
      ...prevState,
      communication: {
        ...prevState.communication,
        contract: {
          ...prevState.communication.contract,
          duration: {
            ...prevState.communication.contract.duration,
            extension: aItems,
          },
        },
      },
    }));
  };

  const addRupture = () => {
    const aItems = state.communication.contract.duration.rupture.concat([
      itemRupture,
    ]);
    setState((prevState) => ({
      ...prevState,
      communication: {
        ...prevState.communication,
        contract: {
          ...prevState.communication.contract,
          duration: {
            ...prevState.communication.contract.duration,
            rupture: aItems,
          },
        },
      },
    }));
  };

  const addEquity = () => {
    const aItems = state.communication.contract.rentIncrease.equities.concat([
      itemEquity,
    ]);
    setState((prevState) => ({
      ...prevState,
      communication: {
        ...prevState.communication,
        contract: {
          ...prevState.communication.contract,
          rentIncrease: {
            ...prevState.communication.contract.rentIncrease,
            equities: aItems,
          },
        },
      },
    }));
  };

  const addExtraSigner = () => {
    const aItems = state.communication.lessee.signerExtra.concat([itemExtra]);
    setState((prevState) => ({
      ...prevState,
      communication: {
        ...prevState.communication,
        lessee: { ...prevState.communication.lessee, signerExtra: aItems },
      },
    }));
  };

  const addBonus = () => {
    const aItems = state.communication.bonification.items.concat([
      itemBonusItem,
    ]);
    setState((prevState) => ({
      ...prevState,
      communication: {
        ...prevState.communication,
        bonification: {
          ...prevState.communication.bonification,
          items: aItems,
        },
      },
    }));
  };

  const deleteBonus = (index) => {
    let items = Array.from(state.communication.bonification.items);
    items.splice(index, 1);
    setState((prevState) => ({
      ...prevState,
      communication: {
        ...prevState.communication,
        bonification: { ...prevState.communication.bonification, items },
      },
    }));
  };

  const deleteExtraSigner = (index) => {
    let signerExtra = Array.from(state.communication.lessee.signerExtra);
    signerExtra.splice(index, 1);
    setState((prevState) => ({
      ...prevState,
      communication: {
        ...prevState.communication,
        lessee: { ...prevState.communication.lessee, signerExtra },
      },
    }));
  };

  const deleteExtension = (index) => {
    let extension = Array.from(state.communication.contract.duration.extension);
    extension.splice(index, 1);
    setState((prevState) => ({
      ...prevState,
      communication: {
        ...prevState.communication,
        contract: {
          ...prevState.communication.contract,
          duration: { ...prevState.communication.contract.duration, extension },
        },
      },
    }));
    if (extension.length === 0) {
      setState((prevState) => ({
        ...prevState,
        communication: {
          ...prevState.communication,
          contract: {
            ...prevState.communication.contract,
            duration: {
              ...prevState.communication.contract.duration,
              extensionNotice:
                initialState.communication.contract.duration.extensionNotice,
            },
          },
        },
      }));
    }
  };

  const deleteRupture = (index) => {
    let rupture = Array.from(state.communication.contract.duration.rupture);
    rupture.splice(index, 1);
    setState((prevState) => ({
      ...prevState,
      communication: {
        ...prevState.communication,
        contract: {
          ...prevState.communication.contract,
          duration: { ...prevState.communication.contract.duration, rupture },
        },
      },
    }));
    if (rupture.length === 0) {
      setState((prevState) => ({
        ...prevState,
        communication: {
          ...prevState.communication,
          contract: {
            ...prevState.communication.contract,
            duration: {
              ...prevState.communication.contract.duration,
              ruptureNotice:
                initialState.communication.contract.duration.ruptureNotice,
            },
          },
        },
      }));
    }
  };

  const deleteEquity = (index) => {
    let equities = Array.from(
      state.communication.contract.rentIncrease.equities
    );
    equities.splice(index, 1);
    setState((prevState) => ({
      ...prevState,
      communication: {
        ...prevState.communication,
        contract: {
          ...prevState.communication.contract,
          rentIncrease: {
            ...prevState.communication.contract.rentIncrease,
            equities,
          },
        },
      },
    }));
  };

  const generateEndDate = (
    deliveryDate,
    signatureDate,
    duration,
    suspensiveCondition
  ) => {
    let newEndDate = null;
    let daysEnd = 0;
    let monthsEnd = 0;
    let yearsEnd = 0;
    if (signatureDate)
      signatureDate = dayjs(signatureDate)
        .set("hour", 0)
        .set("minute", 0)
        .set("second", 0);
    if (deliveryDate)
      deliveryDate = dayjs(deliveryDate)
        .set("hour", 0)
        .set("minute", 0)
        .set("second", 0);
    if (suspensiveCondition) {
      if (deliveryDate) newEndDate = deliveryDate;
    } else {
      if (signatureDate) newEndDate = signatureDate;
    }
    if (duration.compEndDate.nDays)
      daysEnd = parseInt(duration.compEndDate.nDays);
    if (duration.compEndDate.nMonths)
      monthsEnd = parseInt(duration.compEndDate.nMonths);
    if (duration.compEndDate.nYears)
      yearsEnd = parseInt(duration.compEndDate.nYears);
    if (newEndDate) {
      newEndDate = dayjs(newEndDate)
        .add(daysEnd, "d")
        .add(monthsEnd, "M")
        .add(yearsEnd, "y");
    }
    duration.signatureDate = signatureDate;
    duration.localDeliveryDate = deliveryDate;
    duration.endDate = newEndDate ? dayjs(newEndDate).add(-1, "d") : null;
    setState((prevState) => ({
      ...prevState,
      communication: {
        ...prevState.communication,
        contract: { ...prevState.communication.contract, duration },
      },
    }));
  };

  const generateOpeningDate = (deliveryDate, duration) => {
    let newDate = null;
    let days = 0;
    let months = 0;
    let years = 0;
    if (deliveryDate) {
      let newDeliveryDate = dayjs(deliveryDate)
        .set("hour", 0)
        .set("minute", 0)
        .set("second", 0);
      let newDeliveryDateMoment = dayjs(newDeliveryDate);

      deliveryDate = dayjs(deliveryDate)
        .set("hour", 0)
        .set("minute", 0)
        .set("second", 0);
      newDate = deliveryDate;
    }
    if (newDate) {
      if (duration.compLocalOpeningDate.nDays)
        days = parseInt(duration.compLocalOpeningDate.nDays);
      if (duration.compLocalOpeningDate.nMonths)
        months = parseInt(duration.compLocalOpeningDate.nMonths);
      if (duration.compLocalOpeningDate.nYears)
        years = parseInt(duration.compLocalOpeningDate.nYears);
      newDate = dayjs(newDate).add(days, "d").add(months, "M").add(years, "y");
    }
    duration.localDeliveryDate = deliveryDate;
    duration.localOpeningDate = newDate ? newDate : null;
    setState((prevState) => ({
      ...prevState,
      communication: {
        ...prevState.communication,
        contract: { ...prevState.communication.contract, duration },
      },
    }));
  };

  const calculateMinimumRentData = (local, value, prop, tree) => {
    let surface = 0;
    for (let _local of local) {
      surface += _local.SUPERFICIE;
    }

    let proposalRent =
      prop === "proposal"
        ? value
        : state.communication.contract.economicData.guaranteedMinimumIncome
            .proposal;
    let terraceSurface =
      prop === "terraceSurface"
        ? value
        : state.communication.contract.economicData.guaranteedMinimumIncome
            .terraceSurface;
    let terraceAmount =
      prop === "terraceAmount"
        ? value
        : state.communication.contract.economicData.guaranteedMinimumIncome
            .terraceAmount;
    let previousNIncome =
      prop === "previousNetIncome"
        ? value
        : state.communication.contract.economicData.guaranteedMinimumIncome
            .previousNetIncome;
    let previousNIncomePerc = previousNIncome === 0 ? 0 : 100 / previousNIncome;
    let budgetedRent =
      state.communication.contract.economicData.guaranteedMinimumIncome
        .budgeted;
    let _increase =
      proposalRent !== 0
        ? (proposalRent - previousNIncome) * previousNIncomePerc
        : 0;
    let _increasedBudget =
      budgetedRent !== 0
        ? (budgetedRent - previousNIncome) * previousNIncomePerc
        : 0;
    let _proposedEurom2 = surface !== 0 ? proposalRent / surface : 0;
    let _previousEurom2 = surface !== 0 ? previousNIncome / surface : 0;
    let _terraceEurom2 =
      terraceSurface !== 0 ? terraceAmount / terraceSurface : 0;

    if (value && prop) {
      onChange(value, prop, tree);
    }

    if (prop === "proposal") {
      calculateGuarantee(
        value,
        "proposal",
        state.communication.contract.guarantee
      );
    }

    setState((prevState) => ({
      ...prevState,
      communication: {
        ...prevState.communication,
        contract: {
          ...prevState.communication.contract,
          economicData: {
            ...prevState.communication.contract.economicData,
            guaranteedMinimumIncome: {
              ...prevState.communication.contract.economicData
                .guaranteedMinimumIncome,
              increase: _increase,
              increasedBudget: _increasedBudget,
              proposedEurom2: _proposedEurom2,
              previousEurom2: _previousEurom2,
              terraceEurom2: _terraceEurom2,
            },
          },
        },
      },
    }));
  };

  const calculateGuarantee = (value, prop, guarantee) => {
    let rental =
      state.communication.contract.economicData.guaranteedMinimumIncome
        .proposal;
    let bondMonths = prop === "bondMonths" ? value : guarantee.bondMonths;
    let bondAmount = prop === "bondAmount" ? value : guarantee.bondAmount;
    let oldBondAmount =
      prop === "oldBondAmount" ? value : guarantee.oldBondAmount;
    let bondDifference =
      prop === "bondDifference" ? value : guarantee.bondDifference;
    let additionalGuaranteeMonths =
      prop === "additionalGuaranteeMonths"
        ? value
        : guarantee.additionalGuaranteeMonths;
    let additionalGuaranteeAmount =
      prop === "additionalGuaranteeAmount"
        ? value
        : guarantee.additionalGuaranteeAmount;
    let oldAdditionalGuaranteeAmount =
      prop === "oldAdditionalGuaranteeAmount"
        ? value
        : guarantee.oldAdditionalGuaranteeAmount;
    let additionalGuaranteeDifference =
      prop === "additionalGuaranteeDifference"
        ? value
        : guarantee.additionalGuaranteeDifference;
    let geoMonths = prop === "geoMonths" ? value : guarantee.geoMonths;
    let geoAmount = prop === "geoAmount" ? value : guarantee.geoAmount;
    let ecopMonths = prop === "ecopMonths" ? value : guarantee.ecopMonths;
    let ecopIVANotIncluded =
      prop === "ecopIVANotIncluded" ? value : guarantee.ecopIVANotIncluded;
    let ecopIVAIncluded =
      prop === "ecopIVAIncluded" ? value : guarantee.ecopIVAIncluded;
    let endorsementMonths =
      prop === "endorsementMonths" ? value : guarantee.endorsementMonths;
    let endorsementAmount =
      prop === "endorsementAmount" ? value : guarantee.endorsementAmount;
    let reserveDeposit =
      prop === "reserveDeposit" ? value : guarantee.reserveDeposit;
    switch (prop) {
      case "proposal":
        bondAmount = bondMonths * rental;
        bondDifference = bondAmount - oldBondAmount;
        additionalGuaranteeAmount = additionalGuaranteeMonths * rental;
        additionalGuaranteeDifference =
          additionalGuaranteeAmount - oldAdditionalGuaranteeAmount;
        geoAmount = geoMonths * rental;
        ecopIVANotIncluded = ecopMonths * rental;
        ecopIVAIncluded = ecopIVANotIncluded * 1.21;
        endorsementAmount = endorsementMonths * rental;
        guarantee.bondAmount = bondAmount;
        guarantee.bondDifference = bondDifference;
        guarantee.additionalGuaranteeAmount = additionalGuaranteeAmount;
        guarantee.additionalGuaranteeDifference = additionalGuaranteeDifference;
        guarantee.geoAmount = geoAmount;
        guarantee.ecopIVANotIncluded = ecopIVANotIncluded;
        guarantee.ecopIVAIncluded = ecopIVAIncluded;
        guarantee.endorsementAmount = endorsementAmount;
        break;
      case "bondMonths":
        bondAmount = bondMonths * rental;
        bondDifference = bondAmount - oldBondAmount;
        guarantee.bondMonths = bondMonths;
        guarantee.bondAmount = bondAmount;
        guarantee.bondDifference = bondDifference;
        break;
      case "bondAmount":
        bondMonths = rental !== 0 ? bondAmount / rental : 0;
        bondDifference = bondAmount - oldBondAmount;
        guarantee.bondAmount = bondAmount;
        guarantee.bondMonths = bondMonths;
        guarantee.bondDifference = bondDifference;
        break;
      case "oldBondAmount":
        bondDifference = bondAmount - oldBondAmount;
        guarantee.oldBondAmount = oldBondAmount;
        guarantee.bondDifference = bondDifference;
        break;
      case "additionalGuaranteeMonths":
        additionalGuaranteeAmount = additionalGuaranteeMonths * rental;
        additionalGuaranteeDifference =
          additionalGuaranteeAmount - oldAdditionalGuaranteeAmount;
        guarantee.additionalGuaranteeMonths = additionalGuaranteeMonths;
        guarantee.additionalGuaranteeAmount = additionalGuaranteeAmount;
        guarantee.additionalGuaranteeDifference = additionalGuaranteeDifference;
        break;
      case "additionalGuaranteeAmount":
        additionalGuaranteeMonths =
          rental !== 0 ? additionalGuaranteeAmount / rental : 0;
        additionalGuaranteeDifference =
          additionalGuaranteeAmount - oldAdditionalGuaranteeAmount;
        guarantee.additionalGuaranteeAmount = additionalGuaranteeAmount;
        guarantee.additionalGuaranteeMonths = additionalGuaranteeMonths;
        guarantee.additionalGuaranteeDifference = additionalGuaranteeDifference;
        break;
      case "oldAdditionalGuaranteeAmount":
        additionalGuaranteeDifference =
          additionalGuaranteeAmount - oldAdditionalGuaranteeAmount;
        guarantee.oldAdditionalGuaranteeAmount = oldAdditionalGuaranteeAmount;
        guarantee.additionalGuaranteeDifference = additionalGuaranteeDifference;
        break;
      case "geoMonths":
        geoAmount = geoMonths * rental;
        guarantee.geoMonths = geoMonths;
        guarantee.geoAmount = geoAmount;
        break;
      case "geoAmount":
        geoMonths = rental !== 0 ? geoAmount / rental : 0;
        guarantee.geoAmount = geoAmount;
        guarantee.geoMonths = geoMonths;
        break;
      case "ecopMonths":
        ecopIVANotIncluded = ecopMonths * rental;
        ecopIVAIncluded = ecopIVANotIncluded * 1.21;
        guarantee.ecopMonths = ecopMonths;
        guarantee.ecopIVANotIncluded = ecopIVANotIncluded;
        guarantee.ecopIVAIncluded = ecopIVAIncluded;
        break;
      case "ecopIVANotIncluded":
        ecopMonths = rental !== 0 ? ecopIVANotIncluded / rental : 0;
        ecopIVAIncluded = ecopIVANotIncluded * 1.21;
        guarantee.ecopIVANotIncluded = ecopIVANotIncluded;
        guarantee.ecopMonths = ecopMonths;
        guarantee.ecopIVAIncluded = ecopIVAIncluded;
        break;
      case "ecopIVAIncluded":
        ecopIVANotIncluded = ecopIVAIncluded / 1.21;
        ecopMonths = rental !== 0 ? ecopIVANotIncluded / rental : 0;
        guarantee.ecopIVANotIncluded = ecopIVANotIncluded;
        guarantee.ecopMonths = ecopMonths;
        guarantee.ecopIVANotIncluded = ecopIVANotIncluded;
        break;
      case "endorsementMonths":
        endorsementAmount = endorsementMonths * rental;
        guarantee.endorsementMonths = endorsementMonths;
        guarantee.endorsementAmount = endorsementAmount;
        break;
      case "endorsementAmount":
        endorsementMonths = rental !== 0 ? endorsementAmount / rental : 0;
        guarantee.endorsementAmount = endorsementAmount;
        guarantee.endorsementMonths = endorsementMonths;
        break;
      case "reserveDeposit":
        guarantee.reserveDeposit = reserveDeposit;
        break;
    }
    const totalOutlay =
      bondAmount + additionalGuaranteeAmount + geoAmount + ecopIVAIncluded;
    const totalPaymentOnFirm = totalOutlay + reserveDeposit;
    guarantee.totalOutlay = totalOutlay;
    guarantee.totalPaymentOnFirm = totalPaymentOnFirm;
    setState((prevState) => ({
      ...prevState,
      communication: {
        ...prevState.communication,
        contract: {
          ...prevState.communication.contract,
          guarantee,
        },
      },
    }));
  };

  const calculateBonusData = (value, local) => {
    let surface = 0;
    let _amountOverMonth =
      state.communication.bonus.rentTypeId === 2 ? value : 0;
    let _bonificationAmount =
      state.communication.bonus.rentTypeId === 1 ? value : 0;
    for (let _local of local) {
      surface += _local.SUPERFICIE;
    }
    let _contractalIncomeEurosm2 =
      surface !== 0 ? state.communication.bonus.contractalIncome / surface : 0;
    let _billedIncomeEurosm2 =
      surface !== 0 ? state.communication.bonus.billedIncome / surface : 0;
    if (state.rentTypeId === 1) {
      _amountOverMonth =
        (state.communication.bonus.bonificationAmount /
          state.communication.bonus.contractalIncome) *
        100;
    }
    if (state.rentTypeId === 2) {
      _bonificationAmount =
        (state.communication.bonus.contractalIncome *
          state.communication.bonus.amountOverMonth) /
        100;
    }

    const _bonusIncome =
      state.communication.bonus.contractalIncome -
      state.communication.bonus.bonificationAmount;
    const _bonusIncomeEurosm2 =
      surface !== 0 ? state.communication.bonus.bonusIncome / surface : 0;
    const _amountOverMonthEurosm2 =
      surface !== 0
        ? state.communication.bonus.bonificationAmount / surface
        : 0;
    const _budgetAmountEurosm2 =
      state.communication.bonus.budgetAmount / surface;
    const _budgetAmountRentPerc =
      (state.communication.bonus.budgetAmount * 100) /
      state.communication.bonus.contractalIncome;

    setState((prevState) => ({
      ...prevState,
      communication: {
        ...prevState.communication,
        bonus: {
          ...prevState.communication.bonus,
          contractalIncomeEurosm2: _contractalIncomeEurosm2,
          billedIncomeEurosm2: _billedIncomeEurosm2,
          bonusIncomeEurosm2: _bonusIncomeEurosm2,
          bonificationAmount: _bonificationAmount,
          amountOverMonthEurosm2: _amountOverMonthEurosm2,
          bonusIncome: _bonusIncome,
          amountOverMonth: _amountOverMonth,
          budgetAmountEurosm2: _budgetAmountEurosm2,
          budgetAmountRentPerc: _budgetAmountRentPerc,
        },
      },
    }));
  };

  const resetBonusDataPercentage = () => {
    setState((prevState) => ({
      ...prevState,
      communication: {
        ...prevState.communication,
        bonus: {
          ...prevState.communication.bonus,
          amountOverMonth: 0,
          amountOverMonthEurosm2: 0,
          bonusIncome: 0,
          bonusIncomeEurosm2: 0,
          budgetAmountRentPerc: 0,
        },
      },
    }));
  };

  const resetBonusDataAmount = () => {
    setState((prevState) => ({
      ...prevState,
      communication: {
        ...prevState.communication,
        bonus: {
          ...prevState.communication.bonus,
          bonificationAmount: 0,
          amountOverMonthEurosm2: 0,
          bonusIncome: 0,
          bonusIncomeEurosm2: 0,
          budgetAmountRentPerc: 0,
        },
      },
    }));
  };

  const resetAll = () => {
    setState(initialState);
  };

  const showLoader = (value) => {
    setState((prevState) => ({ ...prevState, loaderVisible: value }));
  };

  const saveCommunication = async () => {
    try {
      if (!token) return;
      showLoader(true);
      const saveCommunication = state.communication;
      delete saveCommunication._id;
      const { data } = await clienteAxios.post(
        "/v1/communications",
        saveCommunication,
        config
      );
      showLoader(false);
      setTimeout(() => {
        navigate(`/comunicados/editar/${data._id}`);
      }, 200);
      return data;
    } catch (error) {
      console.log(error);
      showLoader(false);
    }
  };

  const updateCommunication = async (id, statusComunication) => {
    try {
      if (!token) return;
      showLoader(true);
      const updateCommunication = state.communication;
      updateCommunication.communicationStatus = statusComunication;
      const { data } = await clienteAxios.put(
        `/v1/communications/${id}`,
        updateCommunication,
        config
      );
      showLoader(false);
      return data;
    } catch (error) {
      console.log(error);
      showLoader(false);
    }
  };

  const deleteCommunication = async (id) => {
    try {
      if (!token) return;
      showLoader(true);
      const { data } = await clienteAxios.delete(
        `/v1/communications/${id}`,
        config
      );
      showLoader(false);
      setState((prevState) => ({
        ...prevState,
        saved: true,
        saveTitle: "Comunicado Eliminado!",
        saveSubTitle: "El comunicado ha sido eliminado satisfactoriamente.",
        communicationReference: "ES000000000-YYYY-00000",
        communication: initialState.communication,
      }));
    } catch (error) {
      console.log(error);
      showLoader(false);
    }
  };

  const saveSignature = async () => {
    try {
      if (!token) return;
      showLoader(true);
      const data = await Promise.all(
        state.signatures.map(async (signature) => {
          return (
            await clienteAxios.put(
              `/v1/signatures/${signature._id}`,
              signature,
              config
            )
          ).data;
        })
      );
      showLoader(false);
    } catch (error) {
      console.log(error);
      showLoader(false);
    }
  };

  const saveSucceededForm = (saved, saveTitle, saveSubTitle) => {
    setState((prevState) => ({ ...prevState, saved, saveTitle, saveSubTitle }));
  };

  const savePathName = (pathname) => {
    if (pathname !== "logout") {
      localStorage.setItem("pathname", pathname);
    }
  };

  const saveGenerationFile = async (item) => {
    try {
      if (!token) return;
      showLoader(true);
      const dataSend = {
        fullName: "Jose Hurtado",
        email: "jose_hurtado@outlook.com",
      };
      const { data } = await clienteAxios.post(
        `https://prod-74.westus.logic.azure.com:443/workflows/8a334e1987dd4b259e38beab27358474/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ScLEr4fd3FWhm6WmY7_ZTwXAcdtvD2wz1i6B5Ec82Uk`,
        dataSend
      );
      const itemData = item;
      itemData.url = data;
      const aItems = state.communication.generationFiles.items.concat([
        itemData,
      ]);
      const id = state.communication._id;
      const updateCommunication = state.communication;
      updateCommunication.generationFiles.lastContract = item.lastContract;
      updateCommunication.generationFiles.lastDateContract =
        item.lastDateContract;
      updateCommunication.generationFiles.lastAnnex = item.lastAnnex;
      updateCommunication.generationFiles.lastDateAnnex = item.lastDateAnnex;
      updateCommunication.generationFiles.items = aItems;
      const { data: dataComunications } = await clienteAxios.put(
        `/v1/communications/${id}`,
        updateCommunication,
        config
      );
      showLoader(false);
    } catch (error) {}
  };

  const deleteGenerationFile = async (value, index, prop, parents) => {
    try {
      if (!token) return;
      showLoader(true);
      const aItems = state.communication.generationFiles.items.map((b, i) => {
        if (b.fileName === index) {
          if (parents) {
            return DeepValueAssign({ ...b }, prop, value, parents);
          } else {
            return {
              ...b,
              [prop]: value,
            };
          }
        }
        return b;
      });
      const updateCommunication = state.communication;
      const id = state.communication._id;
      updateCommunication.generationFiles.items = aItems;
      const { data: dataComunications } = await clienteAxios.put(
        `/v1/communications/${id}`,
        updateCommunication,
        config
      );
      showLoader(false);
    } catch (error) {}
  };

  return (
    <CommunicationsContext.Provider
      value={{
        state,
        pathLocation,
        getInitialData,
        getBonus,
        getBuildingName,
        getLesseeFromLastContract,
        getAllCommunications,
        getAllCommunicationsContract,
        getCommunication,
        getCommunicationLocalAssociated,
        getCommunicationReference,
        getLastContracts,
        getLastContract,
        getSignerId,
        getLesseeDebt,
        getLesseeId,
        getRegisterData,
        generateEndDate,
        generateOpeningDate,
        getContractDebt,
        getLastcontracts,
        getLocalsByGaleriaId,
        onChange,
        onChangeFirmas,
        onChangeCenter,
        onChangeBonus,
        onChangeExtraSigner,
        onChangeExtension,
        onChangeEquity,
        onChangeRupture,
        addBonus,
        addExtraSigner,
        addEquity,
        addRupture,
        addExtension,
        deleteBonus,
        deleteExtraSigner,
        deleteExtension,
        deleteEquity,
        deleteRupture,
        deleteCommunication,
        deleteGenerationFile,
        calculateBonusData,
        calculateMinimumRentData,
        calculateGuarantee,
        resetAll,
        resetBonusDataPercentage,
        resetBonusDataAmount,
        showLoader,
        saveCommunication,
        saveSignature,
        saveSucceededForm,
        savePathName,
        saveGenerationFile,
        updateCommunication,
      }}
    >
      {children}
    </CommunicationsContext.Provider>
  );
};

CommunicationsProvider.propTypes = {
  children: PropTypes.object,
};

export { CommunicationsProvider };

export default CommunicationsContext;
