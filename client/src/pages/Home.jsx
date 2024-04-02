import { useState } from "react";
import "./Home.css";
import pic from "../assets/files.svg";
import video from "../assets/video2.mp4";
import Svg from "../design/Svg";

const Home = () => {
  const [search, setSearch] = useState("");

  return (
    <>
      <div className="home" id="home">
        <div className="left">
          <img src={pic} alt="" />
        </div>
        <div className="right">
          <h1 className="question">Ready to save data?</h1>
          <div className="heading">
            <video autoPlay loop muted>
              <source src={video} type="video/ogg" />
            </video>

            <h2 className="title unselectable">USKI DRIVE!</h2>
          </div>
          <p>Unlimited space for all your Study Material</p>
          <div className="search-box">
            <form action="">
              <input
                type="search"
                value={search}
                required
                onChange={(e) => setSearch(e.target.value)}
              />
              <i className="fa fa-search"></i>
              <a
                href="javascript:void(0)"
                id="clear-btn"
                onClick={() => {
                  setSearch("");
                }}
              >
                Clear
              </a>
            </form>
          </div>
        </div>
      </div>

      <Svg />
    </>
  );
};

export default Home;
