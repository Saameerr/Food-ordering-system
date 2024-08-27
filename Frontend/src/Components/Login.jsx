import React, {useState} from "react";

const Login = () => {
  return (
    <div className='container text-center'>
      <div className="row">

           {/*Images side*/}
        <div className="col-8">
          <img src="img2.png" alt="" className="img" />
        </div>
        
        {/*login form side*/}
        <div className="col-4">
          <img src="logo1.png" alt="" className="login_logo" />

          <form >
            <h1 className="h4 mb-3 fw-normal" style={{marginLeft:"-6.8rem",marginTop:"4rem"}}> Login</h1>

            {/*Email Field*/}
            <div
              className="form-floating input"
              style={{ marginLeft: "7.5rem", width:"20rem" }}
            >
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                data-last-active-input=""
                required
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>

            {/*Password Field*/}
            <div
              className="form-floating input"
              style={{ marginLeft: "7.5rem", marginTop: "1rem", width:"20rem" }}
            >
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                required
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>

            {/*Forget password */}
            <div style={{marginLeft:"7.5rem", marginTop:"0.5rem"}}>
              <p>Forgot <a href="#" style={{ textDecoration: "none"}}>Password</a> ?</p>
            </div>

            {/*login button*/}
            <button
              className="btn btn-primary py-2"
              type="submit"
              style={{ marginLeft: "7.5rem",  width:"20rem" }}
            >
              Login
            </button>

            {/*Register */}
            <div style={{marginLeft:"8rem", marginTop:"1rem"}}>
              <p>Not Registerd yet?
              <a href="/Register" style={{ textDecoration: "none"}}> Register</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;