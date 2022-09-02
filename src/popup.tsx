import React, { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios, { AxiosResponse } from "axios";
import {
  goBack,
  goTo,
  popToTop,
  Link,
  Router,
  getCurrent,
  getComponentStack,
} from "react-chrome-extension-router";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { connect, io } from "socket.io-client";

const Five = () => {
  const [users, setUsers] = useState([{ name: "" }]);
  const id = localStorage.getItem("idToJoin");
  function getUsers() {
    axios
      .get(`https://thawing-escarpment-05034.herokuapp.com/waikastar/${id}`)
      .then((response) => {
        console.log(response.data[0]);
        setUsers(response.data[0].users);
      });
  }
  useEffect(() => getUsers(), []);
  return (
    <div style={{ height: "400px", width: "300px" }}>
      {users.map((user) => (
        <div>{user.name}</div>
      ))}
    </div>
  );
};

const Four = () => {
  const message = localStorage.getItem("admin");
  var show = message === "true";
  const [users, setUsers] = useState([]);
  const [problem, setProblem] = useState({ name: "" });
  const userName = localStorage.getItem("userName");
  const id = JSON.parse(localStorage.getItem("idToJoin") || "{}");
  const [state, setState] = useState({ value: id, copied: false });
  const [startrted, setStarted] = useState(false);
  const ref = useRef(null);


  const socket = io("https://thawing-escarpment-05034.herokuapp.com", {
    query: {
      name: userName,
      admin: show,
    },
  });
  socket.on("connect", () => {
    console.log("kosyldy socketka");
  });
  socket.on("startGame", (message) => {
    console.log(message);
    
    if (message === "basyldy") {
      localStorage.setItem("start", "true");
      setStarted(true);
    } 
  });
  function startGame() {
    socket.emit("startGame", {
      message: "basyldy",
    });
    localStorage.setItem("start", "true");
  }
  function leaveGame() {
    setStarted(false);
    localStorage.setItem("start", "false");

    if (show) {
      axios
        .delete(
          `https://thawing-escarpment-05034.herokuapp.com/waikastar/delete/${id}`
        )
        .then((response) => {
          // console.log(response);
        });
    } else {
      axios
        .put(
          `https://thawing-escarpment-05034.herokuapp.com/waikastar/${id}/${userName}`,
          {
            userName,
          }
        )
        .then((response) => {
          // console.log(response);
        });
    }
    // axios.post()
    localStorage.setItem("window", "One");
    goTo(One);
  }
  useEffect(() => {
    const el1 = ref.current;
    el1.style
  })
  useEffect(() => {
    axios
      .get(`https://thawing-escarpment-05034.herokuapp.com/waikastar/${id}`)
      .then((response) => {
        console.log(response.data[0]);
        setProblem(response.data[0].problem);
      });
  }, []);
  const started = localStorage.getItem("start") === "true" ? true : false;

  return (
    <div style={{ height: "200px", width: "300px" }}>
      <div>
        <h1
          style={{
            alignItems: "center",
            justifyContent: "center",
            margin: "auto",
            marginTop: "20px",
            display: "flex",
          }}
        >
          CodeWaikas
        </h1>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            id="StartButton"
            style={{ display: !started && show ? "block" : "none" }}
            onClick={() => startGame()}
            ref={ref}
          >
            Start Game
          </button>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            height: "50%",
          }}
        >
          <button onClick={() => goTo(Five)}>Users</button>

          <CopyToClipboard
            text={state.value}
            onCopy={() => setState({ value: id, copied: true })}
          >
            <button style={{ display: started ? "none" : "block" }}>
              Copy Id
            </button>
          </CopyToClipboard>
          {state.copied ? (
            <span style={{ display: started ? "none" : "block", color: "red" }}>
              Copied.
            </span>
          ) : null}
        </div>
        <div>
          <h5
            id="problemName"
            style={{
              justifyContent: "center",
              display: started ? "block" : "none",
            }}
          >
            {problem.name}
          </h5>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "end",
            height: "100%",
          }}
        >
          <button
            onClick={() => {
              leaveGame();
            }}
          >
            Leave
          </button>
        </div>
      </div>
    </div>
    /*
     */
  );
};

const Three = () => {
  localStorage.setItem("window", "Three");
  const [userName, setUserName] = useState("");
  const [id, setId] = useState("");
  async function onJoinClick() {
    localStorage.setItem("window", "Four");
    localStorage.setItem("userName", userName);
    localStorage.setItem("idToJoin", JSON.stringify(id));
    localStorage.setItem("admin", "false");
    await axios
      .put(
        `https://thawing-escarpment-05034.herokuapp.com/waikastar/join/${id}`,
        {
          userName,
        }
      )
      .then((response) => {
        console.log(response);
      });
    // localStorage.setItem('userName', JSON.stringify(userName));
    // localStorage.setItem('idToJoin', JSON.stringify(id));
  }

  return (
    <div
      style={{
        width: "300px",
        height: "200px",
        alignItems: "center",
      }}
    >
      {/* <button onClick={() => {goBack();localStorage.setItem('window', 'One')}}>Back</button> */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h2>nickname:</h2>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <input
          value={userName}
          onChange={(event) => {
            setUserName(event.target.value);
          }}
          type="text"
          id="joinNick"
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h2>id:</h2>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <input
          value={id}
          onChange={(event) => {
            setId(event.target.value);
          }}
          type="text"
          name=""
          id="joinIdGame"
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <button
          style={{ width: "100px" }}
          onClick={() => {
            goTo(Four);
            onJoinClick();
          }}
        >
          Join
        </button>
      </div>
    </div>
  );
};

const Two = ({ message }: any) => {
  const users: object[] = [];
  const [admin, setAdmin] = useState({
    name: "",
    admin: true,
    time: -1,
    space: -1,
    tc: -1,
  });
  const [problemName, setProblemName] = useState("");
  localStorage.setItem("window", "Two");
  localStorage.setItem("admin", "true");
  const handleChange = (e: { target: { value: any } }) => {
    let updatedValue = {};
    updatedValue = { name: e.target.value };
    setAdmin((admin) => ({
      ...admin,
      ...updatedValue,
    }));
  };
  async function onCreateClick() {
    localStorage.setItem("window", "Four");

    users.push(admin);
    console.log(users);
    await axios
      .post("https://thawing-escarpment-05034.herokuapp.com/waikastar", {
        users,
        problemName,
      })
      .then((response) => {
        console.log("kosyldy");
        console.log(response.data);
        localStorage.setItem("userName", JSON.stringify(admin.name));
        localStorage.setItem("idToJoin", JSON.stringify(response.data));
      });
  }

  return (
    <div
      style={{
        width: "300px",
        height: "200px",
        alignItems: "center",
      }}
    >
      {/* <div className="backButton" style={{
          'display': 'flex',
          'justifyContent': "center"
        }}>
          <button onClick={() => {goBack(); localStorage.setItem('window', 'One'); localStorage.setItem('admin', "false")}}>Back</button>
        </div> */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h2>NickName:</h2>
      </div>
      <div
        className="NickName"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <input
          value={admin.name}
          onChange={(event) => {
            handleChange(event);
          }}
          type="text"
          name=""
          id="nickInput"
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h2>problem name:</h2>
      </div>
      <div
        className="problemName"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <input
          value={problemName}
          onChange={(event) => {
            setProblemName(event.target.value);
          }}
          type="text"
          id="problem"
        />
      </div>
      <div
        className="createButton"
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <button
          style={{ width: "100px" }}
          onClick={() => {
            onCreateClick();
            goTo(Four);
          }}
        >
          Create
        </button>
      </div>
    </div>
  );
};

const One = () => {
  localStorage.setItem("window", "One");
  return (
    <div
      style={{
        width: "300px",
        height: "200px",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          alignItems: "center",
          justifyContent: "center",
          margin: "auto",
          marginTop: "20px",
          display: "flex",
        }}
      >
        CodeWaikas
      </h1>
      <button
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "40px 100px",
          width: "100px",
        }}
        onClick={() => goTo(Two)}
      >
        Create Lobby
      </button>
      <button
        style={{
          marginLeft: "100px",
          width: "100px",
        }}
        onClick={() => goTo(Three)}
      >
        Join Lobby
      </button>
    </div>
  );
};
const Popup = () => {
  // console.log(localStorage.getItem("window"));
  // const [currentWindow, setCurrentWindow] = useState("One");
  // if (localStorage.getItem('window') === 'Four') {
  //     setCurrentWindow("Four")
  //     // console.log(localStorage.getItem("window"));
  // }
  const currentWindow = localStorage.getItem("window");

  // const [problemName, setProblemName] = useState([]);
  //  async function  getData() {
  //    await axios.get('https://thawing-escarpment-05034.herokuapp.com/waikastar').then((response) => {
  //     setProblemName(response.data);
  //     console.log(response.data[0].users[0])
  //   })
  // }

  return (
    <>
      <Router>
        {/* <One /> */}
        {currentWindow == "Four" ? console.log("Four") : console.log("One")}

        {currentWindow == "Four" ? <Four /> : <One />}
      </Router>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);
function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
  throw new Error("Function not implemented.");
}
