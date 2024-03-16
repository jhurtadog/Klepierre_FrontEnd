import React from "react";
import { Input, Row, Col } from "antd";
import useComunicados from "../../../hooks/useComunicados";

const Observations = () => {
  const { TextArea } = Input;
  const { state, onChange } = useComunicados();
  const { readOnly, communication } = state;
  return (
    <div className={readOnly ? "pointer-events-none cursor-none" : ""}>
      <Row className="mb-3">
        <Col span={24}>
          <TextArea
            name="remarks"
            value={communication.remarks}
            rows={4}
            onChange={(e) =>
              onChange(e.target.value, "remarks", ["communication"])
            }
            disabled={readOnly}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Observations;
