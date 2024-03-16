import {
  CommunicationType,
  PeopleType,
  SocietyType,
  CessionType,
  EquitiesType,
} from "./types";
import { isValidIBANNumber } from "./bankUtils";
import { validateEmail } from "./formatUtils";

export const regDataCount = (registryData) => {
  let count = 0;
  if (registryData.site) count++;
  if (registryData.volume) count++;
  if (registryData.section) count++;
  if (registryData.book) count++;
  if (registryData.folio) count++;
  if (registryData.sheet) count++;
  if (registryData.inscription) count++;
  return count;
};

export const validateLessee = (communication, lessee) => {
  if (
    communication.communicationType ==
      CommunicationType.AcuerdoComplementario &&
    !lessee.modifyLesseeChanges
  ) {
    return true;
  }

  if (
    lessee.peopleType === PeopleType.Juridica ||
    (lessee.peopleType === PeopleType.Fisica &&
      lessee.societyType !== SocietyType.Fisica)
  ) {
    if (!lessee.society.businessName) return false;
    if (!lessee.society.documentNumber) return false;

    if (regDataCount(lessee.society.registryData) < 3) return false;

    if (!lessee.society.domicile.address) return false;
    if (!lessee.society.domicile.zipCode) return false;
    if (!lessee.society.domicile.town) return false;
    if (!lessee.society.domicile.state) return false;
  }

  if (lessee.peopleType === PeopleType.Juridica) {
    if (!lessee.signatoryPower.date) return false;
    if (!lessee.signatoryPower.protocol) return false;
    if (!lessee.signatoryPower.notary) return false;
    if (!lessee.signatoryPower.site) return false;
  }

  if (!lessee.signerGESAL.name) return false;
  if (!lessee.signerGESAL.documentNumber) return false;
  if (!lessee.signerGESAL.domicile.address) return false;
  if (!lessee.signerGESAL.domicile.zipCode) return false;
  if (!lessee.signerGESAL.domicile.town) return false;
  if (!lessee.signerGESAL.domicile.state) return false;

  for (let signer of lessee.signerExtra) {
    if (!signer.name) return false;
    if (!signer.documentNumber) return false;
    if (!signer.domicile.address) return false;
    if (!signer.domicile.zipCode) return false;
    if (!signer.domicile.town) return false;
    if (!signer.domicile.state) return false;
  }

  if (!lessee.notification.email) return false;

  if (!validateEmail(lessee.notification.email)) return false;

  if (
    lessee.cession.cessionType === CessionType.Terceros &&
    !lessee.cession.businessName
  )
    return false;

  if (!lessee.bankAddress.iban) return false;

  if (!isValidIBANNumber(lessee.bankAddress.iban)) return false;

  return true;
};

export const validateContract = (communication, contract) => {
  if (
    communication.communicationType == CommunicationType.Subrogacion ||
    communication.communicationType == CommunicationType.Bonificacion ||
    communication.communicationType == CommunicationType.Recision
  )
    return true;

  if (
    communication.communicationType ==
      CommunicationType.AcuerdoComplementario &&
    !contract.modifyContractChanges
  ) {
    return true;
  }

  if (!contract.duration.signatureDate) return false;

  if (
    communication.communicationType != CommunicationType.AcuerdoComplementario
  ) {
    if (!contract.duration.localDeliveryDate) return false;

    if (
      contract.duration.localDeliveryDate &&
      contract.duration.localDeliveryDate.toDate() <
        contract.duration.signatureDate.toDate()
    )
      return false;

    if (!contract.duration.localOpeningDate) return false;

    if (
      contract.duration.localDeliveryDate &&
      contract.duration.localDeliveryDate.toDate() >
        contract.duration.localOpeningDate.toDate()
    )
      return false;
  }

  if (!contract.destiny.label) return false;
  if (!contract.destiny.group) return false;
  if (!contract.destiny.destiny) return false;
  if (!contract.destiny.activity) return false;
  if (!contract.destiny.destinationBusinessTypeId) return false;
  if (!contract.economicData.guaranteedMinimumIncome.proposal) return false;
  if (!contract.economicData.IpcByIndex.firstChecking) return false;
  if (!contract.economicData.IpcByIndex.date) return false;
  if (contract.rentIncrease.invoiceIbi && !contract.rentIncrease.amountIbi)
    return false;
  if (contract.rentIncrease.equitiesType === EquitiesType.Percentage) {
    let equity = contract.rentIncrease.equities[0];
    if (!equity.percentageOrAmount) return false;
  } else {
    for (let equity of contract.rentIncrease.equities) {
      if (!equity.percentageOrAmount) return false;
      if (
        contract.rentIncrease.equitiesType === EquitiesType.Sections &&
        !equity.section
      )
        return false;
      if (
        contract.rentIncrease.equitiesType === EquitiesType.Activity &&
        !equity.activity
      )
        return false;
    }
  }
  if (!contract.guarantee.bondMonths) return false;
  if (!contract.guarantee.bondAmount) return false;

  return true;
};
