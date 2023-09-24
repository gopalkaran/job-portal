import { Outlet, useOutletContext } from "react-router-dom";
import { useState } from "react";

export default function Dashboard() {
  const [searchText, setSearchText] = useState("");
  const onChangeHandler = (e) => {
    setSearchText(e.target.value);
  };

  const { list = [] } = useOutletContext();

  const filterList = list?.filter((candidate) => {
    if (searchText.toLowerCase() === "") return candidate;
    else {
      return candidate.name?.toLowerCase().includes(searchText.toLowerCase());
    }
  });

  return (
    <div>
      <input type="search" onChange={onChangeHandler} className={"searchbar"} />
      <Outlet context={{ filterList: filterList }} />
    </div>
  );
}
