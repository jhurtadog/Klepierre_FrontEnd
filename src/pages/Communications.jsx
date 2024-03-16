import React from "react";
import CommunicationFormMainList from "../components/CommunicationFormMainList";

const Communications = () => {
  return (
    <>
      <h2 className="text-4xl font-black">Comunicados Internos</h2>
      <div className="bg-white shadow mt-10 rounded-lg ">
        <CommunicationFormMainList />
      </div>
    </>
  );
};

export default Communications;
