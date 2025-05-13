import { Button, Input } from "antd";
import Template from "./Template";
import {useState} from "react";
import { useDispatch } from "react-redux";

function Step0JobCreate() {
    const [alertMessage, setAlertMessage] = useState("");

    const dispatch = useDispatch();

    const handleChange = (key) => (value) => {
        console.log({key: value});
    }

    return (
        <Template
        title="Enter a new account id"
        onSubmit={() => {}}
        footer={
          <Button htmlType="submit" size="large">
            Continue
          </Button>
        }
      >
        {alertMessage && (
          <div className="text-red-500 text-sm">{alertMessage}</div>
        )}
        <Input
          placeholder="Account Id"
          type="text"
          name="accountId"
          value={accountId || ""}
          onChange={handleChange("accountId")}
        />
      </Template>
    )
}

export default Step0JobCreate;