import { Select } from "antd";
import { useDispatch } from "react-redux";
import { setJobData } from "../store/reducers/globalReducer";
import { DownOutlined } from "@ant-design/icons";

const options = [
  {
    value: "resume_required",
    label: "Resume is required",
  },
  {
    value: "allow_email_contact",
    label:
      "Let potential candidates contact you about this job by email to the address provided",
  },
  {
    value: "encourage_criminal_record",
    label: "People with a criminal records are encouraged to apply",
  },
  {
    value: "require_background_check",
    label: "This job requires a background check",
  },
];

function Step2JobCreate() {
  const dispatch = useDispatch();

  function handleChange(key) {
    console.log({ key });
    dispatch(setJobData({ key: key[0], value: true }));
  }
  return (
    <div>
      <Select
        mode="tags"
        style={{ width: "100%" }}
        placeholder="Choose preferences"
        options={options}
        onChange={handleChange}
      />
    </div>
  );
}

export default Step2JobCreate;
