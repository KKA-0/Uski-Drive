import "../Auth.style.scss"
import svg from "../../../assets/login.svg";
import { AiFillGithub, AiFillGoogleCircle } from "react-icons/ai";
import { NavLink } from "react-router-dom";

const Login = () => {

  return (
    <section>
      <div className="login">
        <div className="svg-login">
          <img src={svg} alt="Svg Logo" />
        </div>
        <div className="">
          <div className="login-form">
            <div className="form">
              <h3>Sign In</h3>
              <p className="login-para">
                Lorem ipsum dolor sit amet elit. Sapiente sit aut eos
                consectetur adipisicing.
              </p>
              <input
                type="email"
                placeholder="Enter your Email"
                required
              />
              <input
                type="password"
                className="down-border"
                placeholder="Enter Your Password"
                required
              />
              <div className="signup-forget">
                <div className="signup-redirect">
                  <NavLink to="/signup">Haven't Registered?</NavLink>
                </div>
                <div className="forget-password">
                  <a href="/">Forget Password?</a>
                </div>
              </div>
              <button>Log In</button>
              <hr />
              <p className="login-para">Or Login With</p>
              <div className="login-link-icon">
                <ul>
                  <li>
                    <a href="javascript:void(0)" >
                      <AiFillGithub />{" "}
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)" >
                      {" "}
                      <AiFillGoogleCircle />{" "}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login