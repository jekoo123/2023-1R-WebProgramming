import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [row, setRow] = useState([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount((a) => a + 1);
  }, [row]);
  const load = () => {
    if (row.length === 0) {
      fetch(
        "http://openapi.seoul.go.kr:8088/4a50707a6d726b6439344c6e4d5552/json/RealtimeCityAir/1/25/"
      ).then(function (res2) {
        res2.json().then(function (res3) {
          setRow(res3.RealtimeCityAir.row);
        });
      });
    } else {
      setRow([]);
    }
  };

  return (
    <>
      <div className="count_load">Count load : {count}</div>
      <button className="load_button" onClick={load}>
        load
      </button>
      <table>
        <thead>
          <th>이름</th>
          <th>PM10</th>
          <th>O3</th>
          <th>상태</th>
        </thead>
        <tbody>
          {row.map(function (obj) {
            return (
              <tr>
                <td>{obj.MSRSTE_NM}</td>
                <td>{obj.PM10}</td>
                <td>{obj.O3}</td>
                <td>{obj.IDEX_NM}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
export default App;
