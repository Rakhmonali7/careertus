import { Input } from "antd";
import { useDispatch } from "react-redux";
import { setJobData } from "../store/reducers/globalReducer";
import { useDebouncedCallback } from "use-debounce";

function Step0JobCreate() {
  const dispatch = useDispatch();

  const debounced = useDebouncedCallback((e) => {
    const { value } = e.target;
    dispatch(setJobData({ title: value }));
  }, 500);

  return (
    <Input
      placeholder="Job title"
      type="text"
      name="title"
      onChange={debounced}
    />
  );
}

export default Step0JobCreate;
