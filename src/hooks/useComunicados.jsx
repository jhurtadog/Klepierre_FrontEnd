import { useContext } from "react";
import CommunicationsContext from "../context/CommunicationsProvider";

const Communications = () => {
  return useContext(CommunicationsContext);
};

export default Communications;
