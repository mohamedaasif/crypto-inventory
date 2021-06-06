import axios from "axios";
import { useEffect, useState, Fragment } from "react";
import { useHistory } from "react-router";

const ViewStocks = ({ savedStocks, setSavedStocks }) => {
  const history = useHistory();
  const [stock, setStock] = useState();

  useEffect(() => {
    getStocks();
  }, []);

  function getStocks() {
    axios
      .get("http://localhost:3001/api/getStocks")
      .then((res) => {
        setStock(res.data);
      })
      .catch((err) => console.log(err));
  }

  const handleBackBtn = () => {
    history.push("/");
  };

  const handleDeleteBtn = (data, index) => {
    const id = stock[index].id;
    axios
      .delete(`http://localhost:3001/api/${id}`)
      .then((res) => {
        if (res) {
          console.log(res);
          if (savedStocks.includes(data.name)) {
            const tempStocks = Array.from(savedStocks);
            const findIndex = tempStocks.indexOf(data.name);
            tempStocks.splice(findIndex, 1);
            setSavedStocks(tempStocks);
          }
          getStocks();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="view-container">
      <div className="view-header">SAVED DATA TABLE</div>
      <hr />

      {stock
        ? stock.map((data, index) => {
            return (
              <Fragment key={index}>
                <div className="saved-stocks">
                  <p>{data.name}</p>
                  <p className="view-stock-symbol">
                    <i className="fas fa-circle"></i>
                    {data.symbol}
                  </p>
                  <p>${data.marketPrice}</p>
                  <button
                    className="view-btn"
                    onClick={() => handleDeleteBtn(data, index)}
                  >
                    DELETE
                  </button>
                  <p>{data.currentPrice} USD</p>
                </div>
                <hr />
              </Fragment>
            );
          })
        : null}
      <div className="back-btn">
        <button className="view-btn" onClick={handleBackBtn}>
          BACK
        </button>
      </div>
    </div>
  );
};

export default ViewStocks;
