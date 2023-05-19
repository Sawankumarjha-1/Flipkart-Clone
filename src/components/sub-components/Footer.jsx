import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
const Footer = () => {
  return (
    <footer>
      <div className="footer-top">
        <div className="left">
          <img src={logo} alt="Logo" />
          <p>
            World Largest E-com SiteWhat is eCommerce site? An e-commerce
            website is one that allows people to buy and sell physical goods,
            services, and digital products over the internet rather than at a
            brick-and-mortar location
          </p>
          <p>Social Links :</p>
          <ul>
            <Link to="/">
              <BsFacebook size={20} />
            </Link>
            <Link to="/">
              <BsInstagram size={20} />
            </Link>
            <Link to="/">
              <BsTwitter size={20} />
            </Link>
            <Link to="/">
              <BsLinkedin size={20} />
            </Link>
          </ul>
        </div>
        <div className="right">
          <b>Address : </b>
          <p>Shoping Kart Private Limited,</p>
          <p>Gejha Village,</p>

          <p>Uttarprades, 201304</p>

          <p>Noida, India</p>

          <p>Telephone: 021212-45614700</p>
        </div>
      </div>

      <div className="footer-last">
        <p>
          © {new Date().getFullYear()} All right Reserved. Design by Sawan Kumar
          Jha
        </p>
      </div>
    </footer>
  );
};

export default Footer;
