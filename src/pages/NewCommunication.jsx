import React, { useEffect } from "react";
import { Spin, Form, Divider } from "antd";
import CommunicationForm from "../components/CommunicationForm";
import Buttons from "../components/Buttons";
import useComunicados from "../hooks/useComunicados";

const NewCommunication = () => {
  const { state, resetAll, getInitialData } = useComunicados();
  const { loaderVisible } = state;

  useEffect(() => {
    resetAll();
    getInitialData();
  }, []);

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black">Nuevo Comunicado</h2>
        <Buttons />
      </div>
      <Divider />
      <Spin size="large" spinning={loaderVisible}>
        <Form layout="inline" id="communicationForm">
          <CommunicationForm />
        </Form>
      </Spin>
    </>
  );
};

export default NewCommunication;
