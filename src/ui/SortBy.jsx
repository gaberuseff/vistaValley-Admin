import Select from "./Select";
import {useSearchParams} from "react-router-dom";

function SortBy({options}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || options[0].value;

  function handelChange(e) {
    const {value} = e.target;
    searchParams.set("sortBy", value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      type="white"
      onChange={handelChange}
      value={sortBy}
    />
  );
}

export default SortBy;
