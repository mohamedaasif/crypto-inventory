import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";

const useStyles = makeStyles({
  table: {
    width: "70%",
    margin: "50px auto",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
    borderRadius: "10px",
  },
});

const rowsPerPage = 5;

const StocksTable = ({ savedStocks, setSavedStocks }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);

  const [stockDetails, setStockDetails] = useState();
  const [fetchError, setFetchError] = useState();
  const [searchFilter, setSearchFilter] = useState("");

  const history = useHistory();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    axios
      .get(
        "https://api.nomics.com/v1/currencies/ticker?key=d32d23ac1a98ee58f200641cced6e3560b8f44fa"
      )
      .then((res) => {
        setStockDetails(res.data);
      })
      .catch((err) => setFetchError(err.message));
  }, []);

  const handleSaveBtn = (data) => {
    const tempStocks = data;
    const postStocks = {
      name: tempStocks.name,
      symbol: tempStocks.symbol,
      marketPrice: tempStocks.market_cap,
      currentPrice: tempStocks.price,
    };

    axios
      .post("http://localhost:3001/api", postStocks)
      .then((res) => {
        if (res) {
          setSavedStocks((prevState) => {
            return [...prevState, data.name];
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const handleViewBtn = () => {
    history.push("/view");
  };

  return (
    <TableContainer className={classes.table} component={Paper}>
      <div className="stock-header">
        <p>Stock Details Table</p>
        <div className="search-field">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search by Company Name"
            onChange={(event) => {
              setSearchFilter(event.target.value);
            }}
          />
        </div>
      </div>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">COMPANY NAME</TableCell>
            <TableCell align="center">SYMBOL</TableCell>
            <TableCell align="center">MARKET CAP</TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center">CURRENT PRICE</TableCell>
          </TableRow>
        </TableHead>
        {stockDetails ? (
          <TableBody>
            {stockDetails
              .filter((val) => {
                if (searchFilter === "") {
                  return val;
                } else if (
                  val.name.toLowerCase().includes(searchFilter.toLowerCase())
                ) {
                  return val;
                }
              })
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((data, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{data.name}</TableCell>
                  <TableCell align="center">
                    <p className="stock-symbol">
                      <i className="fas fa-circle"></i>
                      {data.symbol}
                    </p>
                  </TableCell>
                  <TableCell align="center">
                    ${data.market_cap ? data.market_cap : 0}
                  </TableCell>
                  <TableCell align="center">
                    {!savedStocks.includes(data.name) ? (
                      <button
                        className="save-btn"
                        onClick={() => handleSaveBtn(data)}
                      >
                        Save Data
                      </button>
                    ) : (
                      <button className="view-btn" onClick={handleViewBtn}>
                        View
                      </button>
                    )}
                  </TableCell>
                  <TableCell align="center">{data.price} USD</TableCell>
                </TableRow>
              ))}
          </TableBody>
        ) : fetchError ? (
          <p className="fetch-error">{fetchError}</p>
        ) : (
          <h1 className="loading">Loading Data...</h1>
        )}
      </Table>
      {stockDetails ? (
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={stockDetails.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
        />
      ) : null}
    </TableContainer>
  );
};

export default StocksTable;
