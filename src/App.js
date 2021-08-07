import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { TextField } from "./components";
import { makeStyles } from "@material-ui/core/styles";
import { Button, CircularProgress } from "@material-ui/core/";
import axios from "axios";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "30ch",
    },
    background: "rgba(255,255,255,0.8)",
    borderRadius: 10,
    padding: 50,
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    minWidth: 500,
  },
  header: {
    fontSize: 32,
    fontWeight: "700",
  },
  subHeader: {
    fontSize: 24,
  },
}));

function App() {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [responseJson, setResponseJson] = useState();
  const [loading, setLoading] = useState();

  const classes = useStyles();

  useEffect(() => {
    axios
      .get("https://vb-react-exam.netlify.app/api/form")
      .then((res) => setData(res.data.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let err = [];
    let postData = {};
    data.map((e) => {
      if (e.value === "") {
        err.push("error");
      }
      postData = { ...postData, [e.fieldName]: e.value };
      return "";
    });

    if (err.length === 0 && !error) {
      axios
        .post("https://vb-react-exam.netlify.app/api/form", postData)
        .then((res) => {
          setResponseJson(JSON.stringify(res.data));
          setLoading(false);
        });
      setLoading(true);
    } else {
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className={classes.header}>AB Labs Solution</div>
        <div className={classes.subHeader}>React Exam - by: Rogel Velasco</div>
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          {data ? (
            data.map((field, index) => {
              let val = field.value;
              return (
                <TextField
                  key={field.fieldName}
                  value={val}
                  label={field.fieldName}
                  options={field.options}
                  inputType={field.type}
                  onChangeFunc={(e) => {
                    val = e;
                    data[index].value = val;
                  }}
                  errorVal={(e) => setError(e)}
                />
              );
            })
          ) : (
            <div>
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </div>
          )}
          <Button
            variant="contained"
            type="submit"
            style={{
              marginInline: 8,
              background: "#039be5",
              color: "#fff",
              marginTop: 10,
            }}
          >
            SUBMIT
          </Button>
          {loading && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 20,
              }}
            >
              <CircularProgress color="#039be5" />
            </div>
          )}
          {responseJson && (
            <div
              style={{
                fontSize: 14,
                maxWidth: 500,
                wordWrap: "break-word",
                marginTop: 20,
              }}
            >
              {responseJson}
            </div>
          )}
        </form>
      </header>
    </div>
  );
}

export default App;
