import React, { lazy } from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitterSquare } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import * as yup from "yup";
import { message } from "antd";
const Contact = lazy(() => import("../modals/Contact"));

function Footer() {
  const initialValues = {
    email: "",
  };
  const validationSchema = yup.object({
    email: yup.string().email().required(),
  });
  const handleOnSumbit = async (values, onSubmitProps) => {
    const response = await axios({
      method: "post",
      url: "http://localhost:3001/auth/subscribe",
      data: values,
    });
    if (response.status === 200) {
      message.success("Thank you for subscribtion");
      onSubmitProps.resetForm();
    }
  };
  return (
    <>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-5">
              <div className="footer-top-data d-flex gap-30 align-items-center">
                <h2 className="mb-0 text-white">Sign Up for newletter</h2>
              </div>
            </div>

            <div className="col-7">
              <Formik
                onSubmit={handleOnSumbit}
                initialValues={initialValues}
                validationSchema={validationSchema}
              >
                {(formik) => {
                  return (
                    <>
                      <div className="input-group">
                        <Form className="d-flex w-100">
                          <Field
                            type="text"
                            name="email"
                            className="form-control py-1"
                            placeholder="Your Email Addesss"
                            aria-label="Your Email Address"
                            aria-describedby="basic -addon2"
                          />
                          <button
                            className="input-group-text p-2"
                            id="basic-addon2"
                          >
                            Subscribe
                          </button>
                        </Form>
                      </div>
                    </>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4">
        <div className="container-xxl">
          <h1 className="text-white">
            Buy The Best Eyewear From Pankaj Opticals
          </h1>
          <p className=" company-details text-white">
            Pankaj Opticals Caters To Every Customer With Several Deals And
            Offers. A One-Stop Online Solution For Purchasing Eyewear And Its
            Accessories, Pankaj Opticals Delivers Them Right At Your Doorstep
            With Convenient Methods Of Payment.
            <Link to="/products/Sunglasses"> Sunglasses </Link> as well as
            <Link to="/products/Eyeglasses"> Eyeglasses </Link> Are Available
            For Men And Women In A Diverse Array Of Styles And Trendy Colours.
            If You Want To Try Out{" "}
            <Link to="/products/contactlens">Contact Lenses</Link>, Pick The
            Ones Of Your Choice From The Extensive Variety Of Coloured Contact
            Lenses From Our Online Store.
          </p>
        </div>
      </footer>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-4">
              <h4 className="text-white mb-4">Contact Us</h4>
              <div>
                <address className="text-white">
                  Near GGIC ,<br />
                  charkhari,Uttar Pradesh
                  <br />
                  Pincode: 210421
                </address>
                <a
                  href="tel:+91 7393078873"
                  className=" text-white mt-4 d-block mb-3"
                >
                  +91 7393078873
                </a>

                <a
                  href="mailto: ashishchandra094@gmail.com"
                  className=" text-white mt-4 d-block mb-3"
                >
                  ashishchandra094@gmail.com
                </a>
              </div>
              <div className="social-icons ">
                <a href="https://www.facebook.com/profile.php?id=100010171928484">
                  <FaFacebook className="social-icons" />
                </a>
                <a href="">
                  <FaTwitterSquare className="social-icons" />
                </a>
                <a href="https://www.instagram.com/i_m_ashish777_/">
                  <FaSquareInstagram className="social-icons" />
                </a>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-4">Informtion</h4>
              <div className="footer-links d-flex flex-column">
                <Link className="text-white py-2 mb-1">private Policy</Link>
                <Link className="text-white py-2 mb-1">Refund Policy</Link>
                <Link className="text-white py-2 mb-1">Shipping Policy</Link>
                <Link className="text-white py-2 mb-1">Terms & Conditions</Link>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-4">Account</h4>
              <div className="footer-links d-flex flex-column">
                <Link className="text-white py-2 mb-1">About</Link>
                <Link className="text-white py-2 mb-1">FaQ</Link>
                <Link
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  className=" bg-transparent m-0 p-0 text-white"
                >
                  Contact Us
                </Link>
                <Contact />
              </div>
            </div>
            <div className="col-2">
              <h4 className="text-white mb-4">Quick Links</h4>

              <div className="footer-links d-flex flex-column">
                <Link
                  to="/products/Eyeglasses"
                  className="text-white py-2 mb-1"
                >
                  EyeGlasses
                </Link>
                <Link
                  to="/products/Sunglasses"
                  className="text-white py-2 mb-1"
                >
                  SunGlasses
                </Link>
                <Link
                  to="/products/Contactlens"
                  className="text-white py-2 mb-1"
                >
                  Contact Lens
                </Link>
                <Link
                  to="/products/Menssunglasses"
                  className="text-white py-2 mb-1"
                >
                  Mens SunGlasses
                </Link>
                <Link
                  to="/products/Womenssunglasses"
                  className="text-white py-2 mb-1"
                >
                  Womens SunGlasses
                </Link>
                <Link className="text-white py-2 mb-1">
                  Eyewear Accessories
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p className="text-center mb-0 text-white">
                Copyright © {new Date().getFullYear()} All Rights Reserved.
              </p>
              <p className="text-center mb-0 text-white">
                Created by Ashish Chandra
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
