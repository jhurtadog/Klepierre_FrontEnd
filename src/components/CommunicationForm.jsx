import React from "react";
import { Card } from "antd";
import Footer from "./communications/Footer";
import TypeForm from "./communications/_children/TypeForm";
import Body from "./communications/Body";
import useComunicados from "../hooks/useComunicados";

const CommunicationForm = () => {
  const { state } = useComunicados();
  const { communication } = state;
  const { communicationType } = communication;

  return (
    <div className="p-7 w-full">
      <TypeForm />
      <Card
        className="w-full"
        loading={communicationType ? false : true}
        bordered={false}
        title={
          !communicationType &&
          "Para continuar seleccione un tipo de comunicado..."
        }
      >
        <Body />
        <Footer />
      </Card>
    </div>
  );
};

export default CommunicationForm;
