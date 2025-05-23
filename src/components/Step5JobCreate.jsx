import { Input } from "antd";
import { useDispatch } from "react-redux";
import { setJobData } from "../store/reducers/globalReducer";
import { useDebouncedCallback } from "use-debounce";

function Step5JobCreate() {
  const dispatch = useDispatch();

  const debounced = useDebouncedCallback((e) => {
    const { value } = e.target;
    dispatch(setJobData({ key: "location", value: value }));
  }, 300);

  return (
    <Input
      placeholder="Job location"
      type="text"
      name="location"
      onChange={debounced}
    />
  );
}

export default Step5JobCreate;
