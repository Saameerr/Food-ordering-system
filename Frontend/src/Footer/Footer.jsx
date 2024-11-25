import React from "react";
import "./Footer.css";
// import {assets} from '../assets/assets'
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { MdCopyright } from "react-icons/md";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img
            src="logo.png"
            alt=""
          />

          <div className="footer-social-icons">
            <a href="https://www.facebook.com/"  className="facebook" target="_blank">
              <FaFacebook
                style={{ height: "30px", width: "30px", marginRight: "20px" }}
              />
            </a>
            <a href="https://www.instagram.com/" target="_blank">
              <FaInstagramSquare
                style={{ height: "30px", width: "30px", marginRight: "20px" }}
              />
            </a>
            <a href="https://www.twitter.com/" target="_blank"> 
              <FaTwitter style={{ height: "30px", width: "30px" }} />
            </a>
          </div>
        </div>
        <div className="footer-content-right">
          <h3>COMPANY</h3>
          <ul >
            <li className="section"><Link to="C_home">Home</Link></li>
            <li className="section"><Link to="C_about">About us</Link></li>
            <li className="section"><Link to="C_delivery">Delivery</Link></li>
            <li className="section"><Link to="C_privacy">Privacy Policy</Link></li>
          </ul>
        </div>
        <div className="footer-content-center">
          <h3>GET IN TOUCH</h3>
          <ul>
            <li>
              <IoMdCall  style={{marginLeft:"-5px"}} /> 98000000000
            </li>
            <li>
              <IoMdCall  style={{marginLeft:"-5px"}}/> 02100000
            </li>
            <li>
              <a href="https://www.gmail.com/" target="_blank">
                <MdEmail  style={{marginLeft:"-5px"}}/> KhajaBhayo@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        copyright 2024 <MdCopyright /> KhajaBhayo.com | All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
