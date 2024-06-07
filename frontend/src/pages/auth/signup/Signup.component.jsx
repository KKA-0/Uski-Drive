import svg from "../../../assets/signup.svg";
import { AiFillGithub, AiFillGoogleCircle } from "react-icons/ai";
import { useRef } from "react";
import "../Auth.style.scss"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { userData } from "./../../../features/userSlice"
import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

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
    if(name_Signup.current.value !== "" && email_Signup.current.value !== "" && password_Signup.current.value !== ""){
      axios.post(`${import.meta.env.VITE_APP_DOMAIN}/user`, {
        name: name_Signup.current.value,
        email: email_Signup.current.value,
        password: password_Signup.current.value
      })
      .then(function (response) {
        console.log(response);
        document.cookie = `token=${response.data.token}`; 
        const user_id = response.data.user.id;
        console.log(user_id);
        dispatch(userData({"user_id": user_id}));
        navigate("/dashboard");
      })
      .catch(function (error) {
        console.log(error);
      });
    } else {
      const notify = () => {
        toast.error("No Feilds Should be empty!", {
          position: "top-right"
        });
      }
      notify()
      console.log("One or more fields are empty");
    }
}

  return (
    <section>
      <ToastContainer />
      <div className="signup">
        <div className="">
          <div className="signup-form">
            <div className="form">
              <h3>Haven't Registered?</h3>
              <p className="signup-para">
                Signup to join the Secure Cloud Storage Service
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
              <Link to={'/login'}> <p style={{fontSize: "20px"}} className="signup-para">Already Registered? Login Now</p></Link>
              
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
