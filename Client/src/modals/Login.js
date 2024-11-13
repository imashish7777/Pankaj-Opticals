import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { BsPerson } from "react-icons/bs";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import "../CSS/login.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Loader from "../component/loader";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, message } from "antd";
///antd//


function Login() {
  const navigate = useNavigate();
  const [showmodel, setShowmodel] = useState(true);

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("userlast");
    window.localStorage.removeItem("userEmail");
    window.localStorage.removeItem("loggedin");

    navigate("/");
    setShowmodel(true);
  };

  const [showpassword, setShowpassword] = useState(false);
  const initialValuesLogin = {
    email: "",
    password: "",
  };

  const validationSchemaLogin = yup.object({
    email: yup.string().email("invalid Email").required(),
    password: yup.string().required(),
  });

  const onSubmitLogin = async (values, onSubmitProps) => {
    const response = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (data === "SIGNIN_DENIED") {
      message.error("ACCESS_DENIED");
    } else if (data.user) {
      onSubmitProps.resetForm();
      onSubmitProps.setSubmitting(false);
      window.localStorage.setItem("token", data.user.token);
      window.localStorage.setItem("username", data.user.firstname);
      window.localStorage.setItem("userEmail", data.user.email);
      window.localStorage.setItem("userlast", data.user.lastname);
      window.localStorage.setItem("loggedin", data.user.firstname);

      setShowmodel(false);
    } else {
      message.error("please check email and password");
    }
  };

  //signup user/////////////////////////////////////////////////////////////////////
  const initialValuesSignup = {
    firstname: "",
    lastname: "",
    mobileNumber: "",
    email: "",
    password: "",
  };

  const onSubmitSignup = async (values, onSubmitProps) => {
    const response = await fetch("http://localhost:3001/auth/signup", {
      method: "POST",

      body: JSON.stringify(values),

      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.user) {
      message.success("succefully Created account");
      onSubmitProps.setSubmitting(false);
      onSubmitProps.resetForm();
    } else if (data.user === false) {
      message.info("user already exits");
    }
  };
  const validationSchemaSignup = yup.object({
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    mobileNumber: yup.number().required(),
    email: yup.string().email("invalid Email").required(),
    password: yup.string().required(),
  });

  //antd//

  const items = [
    {
      key: "1",
      label: (
        <a
          onClick={() => {
            navigate("/customer");
          }}
        >
          Account Information
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          onClick={() => {
            handleLogout();
          }}
        >
          Sign Out
        </a>
      ),
    },
  ];

  return (
    <>
      {/* login modal*********************************************** */}
      {showmodel && (
        <>
          <div className="modal fade" id="exampleModalToggle" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <RxCross1 className="hoverIcon" data-bs-dismiss="modal" />

                <Formik
                  initialValues={initialValuesLogin}
                  validationSchema={validationSchemaLogin}
                  onSubmit={onSubmitLogin}
                >
                  {(formik) => {
                    return (
                      <Form className="login">
                        <div className="login-fillups m-5">
                          <p className="signin-text fs-4">Sign In</p>
                          {/* Email input */}

                          <div className="form-outline mb-2">
                            <div className="input-group">
                              <Field
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                name="email"
                                id="emailLogin"
                              />
                            </div>
                            <div className="error">
                              <ErrorMessage name="email" />
                            </div>
                          </div>

                          {/* Password input */}

                          <div className="form-outline mb-2">
                            <div className="input-group ">
                              <Field
                                type={showpassword ? "text" : "password"}
                                className="form-control"
                                placeholder="password"
                                name="password"
                                id="passwordLogin"
                                aria-describedby="basic-addon2"
                              />
                              <span
                                className="input-group-text"
                                onClick={() => setShowpassword(!showpassword)}
                              >
                                {showpassword ? (
                                  <IoEyeOutline />
                                ) : (
                                  <IoEyeOffOutline />
                                )}
                              </span>
                            </div>
                            <div className="error">
                              <ErrorMessage name="password" />
                            </div>
                          </div>
                          {/* 2 column grid layout for inline styling */}
                          <div className="row mb-4">
                            <div className="col d-flex justify-content-center">
                              {/* Checkbox */}
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  defaultValue
                                  id="form2Example3100"
                                  defaultChecked
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="form2Example3100"
                                >
                                  {" "}
                                  Remember me{" "}
                                </label>
                              </div>
                            </div>
                            <div className="col">
                              {/* Simple link */}
                              <a href="#!">Forgot password?</a>
                            </div>
                          </div>
                          <div className="d-grid">
                            {/* login Submit button */}

                            <button
                              type="submit"
                              className=" login-button btn  mb-3"
                              disabled={
                                formik.isSubmitting ||
                                !(formik.dirty && formik.errors)
                              }
                            >
                              {formik.isSubmitting ? <Loader /> : <>Sign In</>}
                            </button>
                            {/* not a member */}
                            <div className="d-flex align-items-center">
                              <p className="text-dark"> Not a member?</p>
                              <div
                                className="btn border-0 bg-transparent"
                                data-bs-target="#exampleModalToggle2"
                                data-bs-toggle="modal"
                              >
                                <p
                                  data-bs-target="#exampleModalToggle2"
                                  data-bs-toggle="modal"
                                  className="text-primary"
                                >
                                  Register
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </div>

          {/* signup modal *********************************************************/}
          {/* signup modal *********************************************************/}
          <div
            className="modal fade sigup-modal"
            id="exampleModalToggle2"
            aria-hidden="true"
            tabIndex={-1}
          >
            <div className="modal-content modal-dialog modal-dialog-centered">
              <div className="modal-body">
                <RxCross1 className="hoverIcon" data-bs-dismiss="modal" />
                <Formik
                  initialValues={initialValuesSignup}
                  validationSchema={validationSchemaSignup}
                  onSubmit={onSubmitSignup}
                >
                  {(formik) => {
                    return (
                      <Form className="login signup">
                        <div className="login-fillups m-4">
                          <p className=" signin-text fs-4">Create a Account</p>
                          {/* Firts Name input */}
                          <div className="form-outline mb-2">
                            <Field
                              placeholder="First Name"
                              type="text"
                              id="form2Example10"
                              className="form-control"
                              name="firstname"
                            />
                            <div className="error">
                              <ErrorMessage name="firstname" />
                            </div>
                          </div>

                          {/* last Name input */}

                          <div className="form-outline mb-2">
                            <Field
                              placeholder="Last name"
                              type="text"
                              id="form2Example11"
                              className="form-control"
                              name="lastname"
                            />
                            <div className="error ">
                              <ErrorMessage name="lastname" />
                            </div>
                          </div>
                          <div className="form-outline mb-2 ">
                            <div className="input-group d-flex ">
                              <span className="input-group-text">+91</span>
                              <Field
                                type="number"
                                name="mobileNumber"
                                className="form-control"
                                placeholder="mobileNumber"
                              />
                            </div>
                            <div className="error ">
                              <ErrorMessage name="mobileNumber" />
                            </div>
                          </div>
                          <div className="form-outline mb-2 ">
                            <Field
                              placeholder="Email"
                              type="email"
                              id="form2Example13F"
                              className="form-control"
                              name="email"
                            />
                            <div className="error ">
                              <ErrorMessage name="email" />
                            </div>
                          </div>
                          <div className="form-outline mb-2 ">
                            <div className="input-group  d-flex">
                              <Field
                                type={showpassword ? "text" : "password"}
                                className="form-control"
                                placeholder="password..."
                                aria-label="password..."
                                name="password"
                                aria-describedby="basic-addon2"
                              />

                              <span
                                className="input-group-text"
                                onClick={() => setShowpassword(!showpassword)}
                              >
                                {showpassword ? (
                                  <IoEyeOutline />
                                ) : (
                                  <IoEyeOffOutline />
                                )}
                              </span>
                            </div>
                            <div className="error ">
                              <ErrorMessage name="password" />
                            </div>
                          </div>
                          {/* 2 column grid layout for inline styling */}

                          {/* signup Submit button */}
                          <div className="d-grid">
                            <button
                              type="submit"
                              className=" login-button btn  mb-3"
                              data-bs-dismiss={
                                !formik.isSubmitting ? "" : "modal"
                              }
                              disabled={
                                formik.isSubmitting ||
                                !(formik.dirty && formik.errors)
                              }
                            >
                              {formik.isSubmitting ? (
                                <Loader/>
                              ) : (
                                <>Create Account</>
                              )}
                            </button>
                          </div>

                          {/* Already Register buttons */}
                          <div className=" signinTogglePart d-flex align-items-center ">
                            <p className="text-dark ms-5">Already a member?</p>
                            <p
                              className="btn border-0 bg-transparent text-primary"
                              data-bs-target="#exampleModalToggle"
                              data-bs-toggle="modal"
                            >
                              <small> Sign In</small>
                            </p>
                          </div>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="login-menu d-flex align-items-center">
        {window.localStorage.getItem("loggedin") ? (
          <Dropdown
            menu={{
              items,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <p>
                  &#128994; {window.localStorage.getItem("username")}{" "}
                  <DownOutlined />
                </p>
              </Space>
            </a>
          </Dropdown>
        ) : (
          <>
            <div
              className="text-dark"
              data-bs-toggle="modal"
              href="#exampleModalToggle"
              role="button"
            >
              <p>
                <BsPerson className=" fs-6 " />
                Sign In
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Login;
