import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import CommunicationTree from "./communicationMainList/CommunicationTree";
import CommunicationMenu from "./communicationMainList/CommunicationMenu";
import CommunicationList from "./communicationMainList/CommunicationList";
import useComunicados from "../hooks/useComunicados";

const CommunicationFormMainList = () => {
  const { Header, Sider, Content } = Layout;
  const initialState = {
    filterBy: [],
    communicationsList: [],
    centersList: [],
    searchText: "",
  };
  const [state, setState] = useState(initialState);
  const { getAllCommunications, showLoader, savePathName } = useComunicados();

  useEffect(() => {
    const loadData = async () => {
      showLoader(true);
      const data = await getAllCommunications();
      const centersNotGrouped = [];

      data.forEach((comm) => {
        centersNotGrouped.push({
          type: comm.communicationType,
          center: comm.center,
          centerName: comm.centerName,
        });
      });
      const centers = centersNotGrouped.filter(
        (thing, index, self) =>
          index ===
          self.findIndex(
            (t) => t.center === thing.center && t.type === thing.type
          )
      );
      setState((prevState) => ({
        ...prevState,
        communicationsList: data,
        centers: centers,
      }));
      showLoader(false);
    };
    loadData();
  }, []);

  const filterData = (filterBy) => {
    let filter = state.communicationsList;
    if (filterBy.length === 2) {
      filter = state.communicationsList.filter(
        (item) => item.communicationType === parseInt(filterBy[0])
      );
    } else if (filterBy.length === 3) {
      filter = state.communicationsList.filter(
        (item) =>
          item.center === filterBy[0].split("-#-")[0] &&
          item.communicationType === parseInt(filterBy[2].split("-#-")[0])
      );
    } else if (state.searchText !== "") {
      filter = state.communicationsList.filter((item) =>
        item.reference.includes(state.searchText)
      );
    }
    return filter;
  };

  return (
    <Layout>
      <Sider className="bg-slate-100" width={300}>
        <CommunicationTree setState={setState} state={state} />
      </Sider>
      <Layout>
        <Header className="h-12 p-0 bg-slate-100">
          <CommunicationMenu
            setSearchText={setState}
            savePathName={savePathName}
          />
        </Header>
        <Content
          className="bg-slate-100 overflow-x-scroll"
          style={{ marginTop: "-1px", border: "1px solid lightgray" }}
        >
          <CommunicationList communications={filterData(state.filterBy)} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default CommunicationFormMainList;
