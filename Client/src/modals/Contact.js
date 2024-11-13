import React from "react";
import "../CSS/contact.css";
import { Field, Form, Formik, ErrorMessage } from "formik";
import axios from "axios";
import { message } from "antd";
import { RxCross1 } from "react-icons/rx";

import * as yup from "yup";
function Contact({ showContactus }) {

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    query: "",
  };
  const validationSchema = yup.object({
    name: yup.string().required("name is required"),
    email: yup.string().email("invalid Email").required(),
    phone: yup.number().required("phone is required"),
  });

  const HandleOnSubmit = async (values, onSubmitProps) => {
    const response = await axios({
      method: "post",
      url: `http://localhost:3001/auth/askQurey`,
      data: values,
    });
    if (response.status === 200) {
      message.success("We got your question");
      onSubmitProps.resetForm();
      onSubmitProps.setSubmitting(false);
    } else {
      message.error("something went wrong, couldn't send massage");
    }
  };

  return (
    <>
      <div>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden={showContactus}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <RxCross1 className="hoverIcon" data-bs-dismiss="Modal" />

              <div className="modal-body">
                <Formik
                  onSubmit={HandleOnSubmit}
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                >
                  {(formik) => {
                    return (
                      <>
                        <Form className="contact">
                          <div className="login-fillups m-5">
                            <p className=" contact-text fs-4">Contact Us</p>
                            <div className="form-outline mb-1">
                              <Field
                                placeholder="Name"
                                type="text"
                                id="form2Example1"
                                className="form-control"
                                name="name"
                              />
                              <div className="error">
                                <ErrorMessage name="name" />
                              </div>
                            </div>
                            <div className="form-outline mb-1">
                              <Field
                                placeholder="Email"
                                type="email"
                                id="form2Example2"
                                className="form-control"
                                name="email"
                              />
                              <div className="error">
                                <ErrorMessage name="email" />
                              </div>
                            </div>
                            <div className="form-outline mb-1">
                              <Field
                                placeholder="Phone"
                                type="number"
                                id="form2Example1"
                                className="form-control"
                                name="phone"
                              />
                              <div className="error">
                                <ErrorMessage name="phone" />
                              </div>
                            </div>
                            <Field
                              as="textarea"
                              className="form-control mb-1"
                              placeholder="Write your question"
                              name="query"
                              type="text"
                            />
                            <div className="error">
                              <ErrorMessage name="query" />
                            </div>

                            <div className="d-grid">
                              <button
                                type="submit"
                                disabled={!(formik.dirty && formik.errors)}
                                className=" contact-button btn  mb-3"
                              >
                                Send Us
                              </button>
                            </div>
                          </div>
                        </Form>
                      </>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
