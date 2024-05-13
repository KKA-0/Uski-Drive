import svg from "../../../assets/signup.svg";
import { AiFillGithub, AiFillGoogleCircle } from "react-icons/ai";
import { useRef } from "react";
import "../Auth.style.scss"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { userData } from "./../../../features/userSlice"
const Signup = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const name_Signup = useRef("")
  const email_Signup = useRef("")
  const password_Signup = useRef("")

  useEffect(() => {
    let x = document.cookie; 
    const token = x.split("=")
    if(token[1]){
      navigate("/dashboard");
    }
  }, [])
  

  const handleSignupSubmit = () => {
    if(name_Signup.current.value !== "" || email_Signup.current.value !== "" || password_Signup.current.value !== ""){
      axios.post(`${import.meta.env.VITE_APP_DOMAIN}/user`, {
        name: name_Signup.current.value,
        email: email_Signup.current.value,
        password: password_Signup.current.value
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
        console.log(error);
      });
    }else{
      console.log("chal be chutiye")
    }
  }

  return (
    <section>
      <div className="signup">
        <div className="">
          <div className="signup-form">
            <div className="form">
              <h3>Haven't Registered?</h3>
              <p className="signup-para">
                Signup to join the community of Bolocoder developers and show
                off your abilities and work.
              </p>
              <input
                type="text"
                className="top-border"
                placeholder="Enter Your Name"
                required
                ref={name_Signup}
              />
              <input
                type="email"
                placeholder="Enter your Email"
                required
                ref={email_Signup}
              />
              <input
                type="password"
                className="down-border"
                placeholder="Enter Your Password"
                required
                ref={password_Signup}
              />
              <button onClick={handleSignupSubmit}>Sign Up</button>
              <hr />
              <p className="signup-para">Or signup With</p>
              <div className="signup-link-icon">
                <ul>
                  <li>
                    <a href="javascript:void(0)" >
                      <AiFillGithub />{" "}
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">
                      {" "}
                      <AiFillGoogleCircle />{" "}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="svg-signup">
          <img src={svg} alt="Svg Logo" />
        </div>
      </div>
    </section>
  );
};

export default Signup;
