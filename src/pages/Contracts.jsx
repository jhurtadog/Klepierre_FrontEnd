import React from "react";
import ContractFormMainList from "../components/ContractFormMainList";

const Contracts = () => {
  return (
    <>
      <h2 className="text-4xl font-black">Lista de Documentos</h2>
      <div className="bg-white shadow mt-10 rounded-lg ">
        <ContractFormMainList />
      </div>
    </>
  );
};

export default Contracts;
