import React from "react";
import "./AppDownload.css";
import { assets } from "../../assets/assets";

const AppDownload = () => {
  return (
    <div className="app-download" id="app-download">
      <p>
        For Better Experience Download <br />
        KhajaBhayo App
      </p>
      <div className="app-download-platforms">
        <a href="https://www.googleplay.com/">
          {" "}
          <img src={assets.play_store} alt="" />
        </a>
        <a href="https://www.appstore.com/">
          <img src={assets.app_store} alt="" />
        </a>
      </div>
      <hr />
    </div>
  );
};

export default AppDownload;
