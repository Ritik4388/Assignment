import "./App.css";
import { useEffect, useState } from "react";
import ListItem from "./components/listItem/listItem";

function App() {
  const [listItems, setListItems] = useState();
  const [loading, setLoading] = useState(false);
  const [employee, setEmployee] = useState("");
  const [searched, setSearched] = useState();

  function fetchData() {
    setLoading(true);
    fetch("https://reqres.in/api/users")
      .then((response) => response.json())
      .then(({ data }) => {
        setListItems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  const srch = () => {
    const filteredData = listItems.filter((item) => {
      return item.first_name.toLowerCase().startsWith(employee);
    });
    setSearched((prev) => filteredData);
  };

  const handleChange = (e) => {
    setEmployee((prev) => e.target.value.toLowerCase());
    srch();
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 250);
    srch();
  };

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 250);
    setEmployee("");
    document.getElementById("inp").value = "";
    setSearched();
  };

  useEffect(() => {}, [employee]);

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="App">
      <div className="optns">
        <div className="inputContainer">
          <input
            onKeyUp={(e) => handleChange(e)}
            className="input-box"
            placeholder="Search Employee"
            id="inp"
          />
          <div className="searchBtn" onClick={handleSubmit}>
            Search
          </div>
        </div>

        <div className="allBtn" onClick={handleClick}>
          All
        </div>
      </div>
      {loading ? (
        <>Loading...</>
      ) : (
        <>
          {searched ? (
            <>
              {searched?.map((item) => (
                <ListItem key={item.id} employee={item} />
              ))}
              {searched.length === 0 && <h3>Not Found</h3>}
            </>
          ) : (
            <>
              {listItems?.map((item) => (
                <ListItem key={item.id} employee={item} />
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
