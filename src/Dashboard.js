import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function App() {
  let history = useHistory();
  const [loginState, setLoginState] = useState({
    email: "",
    password: "",
    time: 0,
    wrong_times: 0,
    timer: 0,
    isVerified: false,
  });

  useEffect(() => {
    clickPage()
    }, [])

  function clickPage(){
    setLoginState({...loginState, time: 30});
    loginState.time = 30;

    if(loginState.timer === 0 && loginState.time > 0){
      loginState.timer = setInterval(() => {
        countDown()
      }, 1000);
    }
  }

  function countDown() {
    console.log(loginState.time);
    let second = loginState.time - 1;
    loginState.time = second;
    setLoginState({...loginState, time: second})
    
    if (second === 0) { 
      clearInterval(loginState.timer);
      loginState.timer = 0;
      alert("Anda tidak melakukan apa - apa. Anda akan ke kembali ke halaman login.");
      history.push("/");
    }
  }

  return (
    <div className="container" onLoadStart={ clickPage }>
      <h1>Countdown Waktu : { JSON.stringify(loginState.time) }</h1>
      <div className="col-md-12 mt-4">
        <label className="form-label">Selamat Datang</label>
        <br />
        <button className="btn btn-success" onClick = { clickPage }>Reset Waktu</button>
      </div>
    </div>
  );
}

export default App;
