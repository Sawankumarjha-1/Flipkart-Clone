import React, { useState, useRef, useEffect } from "react";
import { RxAvatar } from "react-icons/rx";
import { Link } from "react-router-dom";
import formBg from "../assets/formBg.png";
import emailjs from "@emailjs/browser";
import loadImg from "../assets/loading.gif";
import { ReactSession } from "react-client-session";
ReactSession.setStoreType("localStorage");

const Signup = () => {
  const form = useRef();
  let otp = useRef();
  useEffect(() => {
    otp.current = Math.floor(1000 + Math.random() * 9000);
  }, []);

  const [loading, setLoading] = useState(false);
  const [otpStyle, setOtpStyle] = useState(false);
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [otpField, setOtpField] = useState({
    first: "",
    second: "",
    third: "",
    fourth: "",
  });

  // ************************************Onchage signup form field
  function onValueChange(event) {
    let { name, value } = event.target;

    setFormFields((prev) => {
      return { ...prev, [name]: value };
    });
  }
  // ************************************Onchage otp
  function onOtpChange(event) {
    let { name, value } = event.target;

    if (event.target.id === "otp_field1" && value.length === 1) {
      document.getElementById("otp_field2").focus();
    }
    if (event.target.id === "otp_field2" && value.length === 1) {
      document.getElementById("otp_field3").focus();
    }
    if (event.target.id === "otp_field3" && value.length === 1) {
      document.getElementById("otp_field4").focus();
    }

    setOtpField((prev) => {
      return { ...prev, [name]: value };
    });
  }

  // Handle Form Data
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, name, password, phone } = formFields;
    if (email === "" || name === "" || password === "" || phone === "") {
      alert("Please fill all the details...");
    } else {
      if (phone.length >= 10 && phone.length <= 12) {
        fetch(`http://localhost:5000/userInfo/${email}`, {
          method: "GET",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
        })
          .then((res) => res.json())
          .then(
            (result) => {
              setLoading(true);
              if (result.length === 0) {
                emailjs
                  .sendForm(
                    process.env.REACT_APP_YOUR_SERVICE_ID,
                    process.env.REACT_APP_YOUR_TEMPLATE_ID,
                    form.current,
                    process.env.REACT_APP_YOUR_EMAILJS_API
                  )
                  .then(
                    (result) => {
                      alert("We send an otp to your email id .....");
                      setOtpStyle(true);
                      setLoading(false);
                    },
                    (error) => {
                      console.log(error.text);
                    }
                  );
              } else {
                alert("User is already exist");
                setLoading(false);
                setFormFields({
                  name: "",
                  email: "",
                  phone: "",

                  password: "",
                });
              }
            },

            (error) => {}
          );
      } else {
        alert("Invalid Phone no");
      }
    }
  };
  // After Submitting the otp
  const submitData = async (e) => {
    e.preventDefault();
    const { name, email, phone, password } = formFields;

    let otpStr =
      otpField.first + otpField.second + otpField.third + otpField.fourth;

    if (otpStr === String(otp.current)) {
      fetch("http://localhost:5000/newuser", {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password }),
      }).then((res) => {
        alert("successfully login");
        setOtpStyle(false);

        ReactSession.set("username", email);
        ReactSession.set("name", name);
        ReactSession.set("phone", phone);

        setFormFields({
          name: "",
          email: "",
          phone: "",
          message: "",
          password: "",
        });
        window.location = "/";
      });
    } else {
      alert("Invalid OTP");
    }
  };

  // Resend OTP
  function resendOtp(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.REACT_APP_YOUR_SERVICE_ID,
        process.env.REACT_APP_YOUR_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_YOUR_EMAILJS_API
      )
      .then(
        (result) => {
          alert("We send an otp to your email id .....");
          setOtpStyle(true);
        },
        (error) => {
          console.log(error.text);
        }
      );
  }

  return ReactSession.get("username") === "" ? (
    <div className="main-div">
      <div className="registred-form">
        <div className="registred-form-left">
          <div>
            <h1>Looks like you're new here!</h1>
            <p>Sign up with your mobile number to get started</p>
            <b>
              Already Registred ?<Link to="/login">Login</Link>
            </b>
          </div>
          <div>
            <img src={formBg} alt="form" />
          </div>
        </div>
        <form className="registred-form-right" method="post" ref={form}>
          <input value={otp.current} name="otp" style={{ display: "none" }} />
          <div>
            <RxAvatar size={100} className="avatar" />
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={formFields.name}
              onChange={onValueChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formFields.email}
              onChange={onValueChange}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Enter Phone No."
              value={formFields.phone}
              onChange={onValueChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formFields.password}
              onChange={onValueChange}
              required
            />

            <button type="submit" onClick={handleSubmit}>
              <img
                src={loadImg}
                alt="loading"
                className="loading"
                style={{
                  display: loading ? "inline-block" : "none",
                  width: "30px",
                }}
              />
              SIGNUP
            </button>
          </div>
        </form>
      </div>

      <form
        className="otp-input"
        method="post"
        style={{ display: otpStyle ? "inline-block" : "none" }}
      >
        <h3>Please Enter your OTP Here.</h3>
        <div className="otp-input-field">
          <input
            type="text"
            name="first"
            maxLength={1}
            value={otpField.first}
            onChange={onOtpChange}
            id="otp_field1"
            onFocus={true}
          />
          <input
            type="text"
            name="second"
            maxLength={1}
            value={otpField.second}
            id="otp_field2"
            onChange={onOtpChange}
          />
          <input
            type="text"
            name="third"
            maxLength={1}
            id="otp_field3"
            value={otpField.third}
            onChange={onOtpChange}
          />
          <input
            type="text"
            name="fourth"
            id="otp_field4"
            maxLength={1}
            value={otpField.fourth}
            onChange={onOtpChange}
          />
        </div>
        <div className="otp-btn">
          <button onClick={submitData}>Submit</button>
          <button type="button" onClick={resendOtp}>
            Resend
          </button>
        </div>
      </form>
    </div>
  ) : (
    (window.location = "/")
  );
};

export default Signup;
