import React, { useState } from "react";
import dayjs from "dayjs";
import { Typography, Select, Card, Row, Col, Button } from "antd";
import useComunicados from "../../../hooks/useComunicados";
import useAuth from "../../../hooks/useAuth";
import { isObjectEmpty } from "../../../helpers/stringUtils";

const Generation = ({ caption, options, dataTable, type }) => {
  const { saveGenerationFile, state: stateComunicados } = useComunicados();
  const { communication } = stateComunicados;
  const { reference, generationFiles } = communication;
  const { auth } = useAuth();
  const { Text } = Typography;
  const initialState = {
    fileName: "",
    model: "",
    version: 0,
    date: dayjs(),
    type: type,
    user: auth._id,
    url: "",
    deleted: false,
    lastContract: "",
    lastDateContract: undefined,
    lastAnnex: "",
    lastDateAnnex: undefined,
  };
  const [state, setState] = useState(initialState);
  const [selectedItem, setSelectedItem] = useState({});
  const [disableButton, setDisableButton] = useState(false);
  const [error, setError] = useState(false);

  const handleClick = () => {
    try {
      if (!isObjectEmpty(selectedItem)) {
        setError(false);
        setDisableButton(true);
        saveGenerationFile(state);
        setTimeout(() => {
          setState(initialState);
          setSelectedItem({});
          setDisableButton(false);
        }, 3000);
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    }
  };

  return (
    <Card title={caption} bordered={false}>
      <Row className="mb-3" gutter={16}>
        <Col span={4} className="text-right pt-1 pb-2">
          <Text className="text-red-700">*</Text>&nbsp;Seleccione Modelo:
        </Col>
        <Col span={8}>
          <Select
            labelInValue={true}
            status={error && "error"}
            value={
              selectedItem
                ? { key: selectedItem.key, label: selectedItem.label }
                : undefined
            }
            onChange={(value) => {
              const lastVersion = dataTable
                .filter((item) => item.model === value.value)
                .sort((a, b) => a.version - b.version)
                .map((a) => ({ version: a.version }))
                .pop();
              const version =
                lastVersion?.version !== undefined
                  ? lastVersion.version + 1
                  : 1;
              const fileName = `${value.label}_${reference}_${dayjs().format(
                "DD-MM-YYYY"
              )}_v${version}.docx`;
              const lastContract =
                type === 1
                  ? `${value.value} - v.${version}`
                  : generationFiles.lastContract;
              const lastAnnex =
                type === 2
                  ? `${value.value} - v.${version}`
                  : generationFiles.lastAnnex;
              const lastDateAnnex =
                type === 2 ? dayjs() : generationFiles.lastDateAnnex;
              const lastDateContract =
                type === 1 ? dayjs() : generationFiles.lastDateAnnex;
              setState((prevState) => ({
                ...prevState,
                model: value.value,
                fileName,
                version,
                lastContract,
                lastDateContract,
                lastAnnex,
                lastDateAnnex,
              }));
              setSelectedItem(value);
            }}
            className="w-full"
            options={options}
          />
        </Col>
        <Col span={4}>
          <Button disabled={disableButton} onClick={() => handleClick()}>
            Generar
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default Generation;
