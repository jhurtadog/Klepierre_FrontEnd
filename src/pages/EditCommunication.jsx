import React, { useEffect } from "react";
import { Spin, Form, Divider, Result } from "antd";
import CommunicationForm from "../components/CommunicationForm";
import Buttons from "../components/Buttons";
import useComunicados from "../hooks/useComunicados";
import useAuth from "../hooks/useAuth";
import { useParams } from "react-router-dom";

const EditCommunication = () => {
  const { auth } = useAuth();
  const {
    state,
    getCommunication,
    getInitialData,
    onChange,
    getLastcontracts,
    showLoader,
  } = useComunicados();
  const { loaderVisible, saved, saveTitle, saveSubTitle } = state;
  const params = useParams();

  useEffect(() => {
    showLoader(true);
    getInitialData();
    const loadData = async () => {
      let readOnly = true;
      const communicationData = await getCommunication(params.id);
      const lastContractsData = await getLastcontracts(
        communicationData.selectedLocal,
        communicationData.center,
        communicationData.communicationType
      );
      onChange(lastContractsData, "lastContracts", ["lists"]);
      onChange(communicationData, "communication");
      onChange(true, "loaded");
      if (communicationData.creatorBy._id === auth._id) readOnly = false;
      onChange(readOnly, "readOnly");
      showLoader(false);
    };
    loadData();
  }, []);

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black">
          {saved ? "Comunicado" : "Editar Comunicado"}
        </h2>
        <Buttons />
      </div>
      <Divider />
      <Spin size="large" spinning={loaderVisible}>
        <Form
          layout="inline"
          id="communicationForm"
          className={saved && "justify-center"}
        >
          {!saved ? (
            <CommunicationForm />
          ) : (
            <Result
              status="success"
              title={saveTitle}
              subTitle={saveSubTitle}
            />
          )}
        </Form>
      </Spin>
    </>
  );
};

export default EditCommunication;
