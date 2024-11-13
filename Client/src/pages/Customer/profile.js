import { Field, Formik, Form } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import axios from "axios";

function Profile() {
  const initialValuesProfile = {
    lastname: window.localStorage.getItem("userlast"),
    gender: "Male",
  };
  const validationSchemaProfile = yup.object({
    lastname: yup.string(),
    gender: yup.string(),
  });

  const handleSubmit = (values) => {
    axios({
      method: "put",
      url: `http://localhost:3001/auth/update`,
      data: values,

      headers: {
        "x-auth-token": window.localStorage.getItem("token"),
      },
    });
  };

  return (
    <>
      <div className="container-fluid ">
        <div className="row">
          <div className="col-8 ">
            <h3>Edit Account information</h3>

            <Formik
              initialValues={initialValuesProfile}
              validationSchema={validationSchemaProfile}
            >
              {(formik) => {
                return (
                  <Form className="row g-3 py-2">
                    <div className="col-md-6">
                      <label htmlFor="firstnameProfile">First name</label>
                      <Field
                        type="text"
                        className="form-control"
                        id="firstnameProfile"
                        placeholder={window.localStorage.getItem("username")}
                        disabled
                        name="firstname"
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="lastnameProfile">Last name</label>

                      <Field
                        type="text"
                        name="lastname"
                        className="form-control"
                        id="lastnameProfile"
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="emailProfile">Email</label>

                      <Field
                        type="email"
                        className="form-control"
                        id="emailProfile"
                        placeholder={window.localStorage.getItem("userEmail")}
                        disabled
                        name="email"
                      />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="gender">Gender</label>

                      <Field
                        id="gender"
                        as="select"
                        className="form-select"
                        name="gender"
                      >
                        <option defaultValue="Male">Male</option>
                        <option value="Female">Female</option>
                      </Field>
                    </div>

                    <div className="col-12">
                      <button
                        type="submit"
                        className="btn"
                        onClick={() => handleSubmit(formik.values)}
                        style={{ backgroundColor: "#f18132", color: "white" }}
                      >
                        Save & Continue
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
