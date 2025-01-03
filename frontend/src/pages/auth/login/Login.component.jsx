import "../Auth.style.scss"
import svg from "../../../assets/login.svg";
import { AiFillGithub, AiFillGoogleCircle } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { useRef } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { userData } from "./../../../features/userSlice"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const email = useRef("")
  const password = useRef("")

  useEffect(() => {
    const cookies = document.cookie
    .split("; ")
    .reduce((acc, cookie) => {
      const [key, value] = cookie.split("=");
      acc[key] = value;
      return acc;
    }, {});
    const token = cookies.token; // Find the token cookie
    if (token) {
      navigate("/dashboard");
    }
  }, [])

  const handleLoginSubmit = () => {
    
    if(email.current.value != "" && password.current.value != ""){
      axios.post(`${import.meta.env.VITE_APP_DOMAIN}/user`, {
        email: email.current.value,
        password: password.current.value
      })
      .then(function (response) {
        console.log(response);
        document.cookie = `token=${response.data.token}`; 
        const user_id = response.data.user.id
        console.log(user_id)
        dispatch(userData({"user_id": user_id}))
        navigate("/dashboard");
      })
      .catch(function (error) {
        if(error.message){
          const notify = () => {
            toast.error("Password Incorrect", {
              position: "top-right"
            });
          }
          notify()
        }
      });
    }else{
      
      const notify = () => {
        toast.error("Login credentials required", {
          position: "top-right"
        });
      }
      notify()
      console.log("Values empty")
    }

  }

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
                ref={email}
                placeholder="Enter your Email"
                required
              />
              <input
                type="password"
                ref={password}
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
              <button onClick={handleLoginSubmit}>Log In</button>
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