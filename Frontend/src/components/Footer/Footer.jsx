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

          
        </div>
        <div className="footer-content-right">
          <h6>Quick Links</h6>
          <ul >
            <li className="section"><Link to="C_home">Home</Link></li>
            <li className="section"><Link to="C_about">About us</Link></li>
            <li className="section"><Link to="C_delivery">Delivery</Link></li>
            <li className="section"><Link to="C_privacy">Privacy Policy</Link></li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h6>Payment Methods</h6>
          <ul>
            <li className="section"><Link to="C_esewa">eSewa</Link></li>
            <li className="section"> <Link to="C_cod">Cash on Delivery</Link></li>
          </ul>
        </div>

        <div className="footer-content-center">
          <h6>GET IN TOUCH</h6>
          <ul>
            <li>
              <IoMdCall  style={{marginLeft:"0px"}}/> 02100000
            </li>
            <li>
              <a href="https://www.gmail.com/" target="_blank">
                <MdEmail  style={{marginLeft:"px"}}/> khajavayo@gmail.com
              </a>
            </li>
          </ul>
          <div className="footer-social-icons">
            <a href="https://www.facebook.com/"  className="facebook" target="_blank">
              <FaFacebook
                style={{ height: "25px", width: "25px", marginRight: "20px", marginLeft:"1rem", marginTop:"0.5rem", color:"#3b5998"}}
              />
            </a>
            <a href="https://www.instagram.com/" target="_blank">
              <FaInstagramSquare
               style={{ height: "25px", width: "25px", marginRight: "20px", marginTop:"0.5rem", color:"#e1306c"}}
              />
            </a>
            <a href="https://www.twitter.com/" target="_blank"> 
              <FaTwitter style={{ height: "25px", width: "25px", marginTop:"0.5rem",color:"#1da1f2"}} />
            </a>
          </div>
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