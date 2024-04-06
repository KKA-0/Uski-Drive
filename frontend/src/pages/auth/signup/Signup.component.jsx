import svg from "../../../assets/signup.svg";
import { AiFillGithub, AiFillGoogleCircle } from "react-icons/ai";
import "../Auth.style.scss"

const Signup = () => {

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
              />
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
              <button >Sign Up</button>
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
