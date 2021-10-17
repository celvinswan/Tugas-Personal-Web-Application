import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

function App() {
  let history = useHistory();

  const [loginState, setLoginState] = useState({
    email: "",
    password: "",
    time: 0,
    wrong_times: 0,
    timer: 0,
    isVerified: false,
    value_submit: "Submit",
  });

  const recaptchaRef = React.createRef();

  function handleSubmit(e) {
    e.preventDefault();
    if(loginState.email === ""){
      alert("Email wajib diisi.");
    }else if(loginState.password === ""){
      alert("Password wajib diisi.");
    }else if(!loginState.isVerified){
      alert("Check Chaptcha.");
    }else{
      if(loginState.email === "admin@email.com" && loginState.password === "admin"){
        history.push("/dashboard");
      }else{
        loginState.wrong_times += 1;
        setLoginState({...loginState, wrong_times: loginState.wrong_times})
        if(loginState.wrong_times === 3){
          setLoginState({...loginState, time: 30});
          loginState.time = 30;
        }

        if(loginState.timer === 0 && loginState.time > 0){
          loginState.timer = setInterval(() => {
            countDown()
          }, 1000);
        }
        alert("Email / Password Salah.");
      }
    }
  }

  function countDown() {
    console.log(loginState.time);
    let second = loginState.time - 1;
    loginState.time = second;
    setLoginState({...loginState, time: second});
    setLoginState({...loginState, value_submit: second + " to Active"});

    if (second === 0) { 
      clearInterval(loginState.timer);
      loginState.wrong_times = 0;
      setLoginState({...loginState, value_submit: "Submit"});
    }
  }

  function onChange(value) {
    loginState.isVerified = true;
    console.log("Captcha value:", value);
  }

  return (
    <div className="container">
      <h1>Wrong : { JSON.stringify(loginState.wrong_times) } times</h1>
      <div className="col-md-12 mt-4">
        <form onSubmit={ handleSubmit }>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input type="email" className="form-control" aria-describedby="emailHelp" 
            onChange={(event) => {
              const value = event.target.value;
              setLoginState({...loginState, email: value})
            }} />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control"
            onChange={(event) => {
              const value = event.target.value;
              setLoginState({...loginState, password: value})
            }} />
          </div>
          <div className="mb-3">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey="6LdOqNYcAAAAAA44oQSMgr3d5OtJmVDpHlVLO0LL"  
              onChange={ onChange }
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={ loginState.time > 0 }>{ loginState.value_submit }</button>
        </form>
      </div>
    </div>
  );
}

export default App;
