import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spin, Form, Divider } from "antd";
import Buttons from "../components/Buttons";
import ContractForm from "../components/ContractForm";
import useComunicados from "../hooks/useComunicados";
import { CommunicationTypeTitle } from "../helpers/types";
import { titleCase } from "../helpers/stringUtils";

const EditContract = () => {
  const { state, getCommunication, onChange, showLoader } = useComunicados();
  const { loaderVisible, saved, communication } = state;
  const { communicationType } = communication;
  const params = useParams();

  useEffect(() => {
    showLoader(true);
    const loadData = async () => {
      const communicationData = await getCommunication(params.id);
      onChange(communicationData, "communication");
      onChange(true, "loaded");
      showLoader(false);
    };
    loadData();
  }, []);

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black">{`Comunicado de ${titleCase(
          CommunicationTypeTitle[communicationType || 8]
        )}`}</h2>
        <Buttons />
      </div>
      <Divider />
      <Spin size="large" spinning={loaderVisible}>
        <Form
          layout="inline"
          id="communicationForm"
          className={saved && "justify-center"}
        >
          <ContractForm />
        </Form>
      </Spin>
    </>
  );
};

export default EditContract;
