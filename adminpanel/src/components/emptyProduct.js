import React from "react";
import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import * as yup from "yup";
import { ADD_PRODUCT } from "../redux/features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import "react-widgets/styles.css";
import Multiselect from "react-widgets/Multiselect";

import Dropzone from "react-dropzone";
import DropdownList from "react-widgets/DropdownList";
import { useState } from "react";
import {
  AVAILABLE_PRODUCT_ID,
  RESET_STATE,
} from "../redux/features/product/productSlice";
import {
  UPLOAD_IMAGE,
  RESET_IMAGES,
  THUMNAIL_IMAGES,
  DELETE_IMAGE,
  DELETE_THUMNAIL_IMAGE,
} from "../redux/features/upload/uploadSlice";
import { Modal, Button } from "antd";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import Loader from "./loader";
import { Page500, PageSubmissonFailed } from "./ResultPage";

function EmptyProduct({
  edit,
  setEdit,

  genders,


  brands,
  colors,
  frameTypes,
  sizes,
  shapes,
  categories,
}) {
  const isSuccess = useSelector((state) => state.product.addProductIssucess);
  //dispatch//select//
  const dispatch = useDispatch();
  const upload = useSelector((state) => state.upload);
  const isIdavilable = useSelector((state) => state.product.isIdavilable);

  //model//
  const [isModalOpen, setIsModalOpen] = useState([false, false]);

  const toggleModal = (idx, target) => {
    setIsModalOpen((p) => {
      p[idx] = target;
      return [...p];
    });
  };

  const initialValuesProduct = {
    productId: "",
    Brand: "",
    mPrice: "",
    size: "",
    color: "",
    frameType: "",
    shape: "",
    gender: "male",
    quantity: "",
    category: "",
    thumnailimages: "",
    images: "",
  };

  const validationSchemaProduct = yup.object().shape({
    productId: yup.number().required(),
    Brand: yup.string().required(),
    mPrice: yup.number().required(),
    size: yup.string().required(),
    color: yup.array().required(),
    frameType: yup.string().required(),
    shape: yup.string().required(),
    gender: yup.string().required(),
    quantity: yup.number().required(),
    category: yup.string().required(),
    thumnailimages: yup.array(),
    images: yup.array(),
  });

  const handleSubmit = (values) => {
    values.thumnailimages = upload?.thumnailimages;
    values.images = upload?.images;
    dispatch(ADD_PRODUCT(values));
  };
  if (isSuccess===true) {
    setEdit(false);
    dispatch(RESET_IMAGES());
    dispatch(RESET_STATE());
  }

  const handleCloseButton = () => {
    setEdit(false);
  };

  const handleimageupload = (acceptedFiles) => {
    dispatch(UPLOAD_IMAGE(acceptedFiles));
  };
  const handlethumnailimage = (acceptedFiles) => {
    dispatch(THUMNAIL_IMAGES(acceptedFiles));
  };
  const handleDelete = (id) => {
    // alert(asset_id);
    dispatch(DELETE_IMAGE(id));
  };

  const handleThumnailDetete = (id) => {
    dispatch(DELETE_THUMNAIL_IMAGE(id));
  };

  const genderArray = ["male", "female"];

  // preview of images///
  const handleAvailablityCheck = (id) => {
    dispatch(AVAILABLE_PRODUCT_ID({ productId: id }));
  };

  return (
    <>
      {edit ? (
        <>
          <div
            style={{
              borderRadius: "20px",
              backgroundColor: "white",
              boxShadow: "0px 0px 2px 2px rgba(176, 175, 175, 0.1)",
              border: "0",
            }}
          >
            <div className="container-fluid ">
              <div className="row px-3 py-5 ">
                <h4>ADD PRODUCT</h4>

                <div className="col-11  ">
                  <Formik
                    validationSchema={validationSchemaProduct}
                    initialValues={initialValuesProduct}
                    onSubmit={handleSubmit}
                  >
                    {(formik) => {
                      return (
                        <Form className="row g-2">
                          <div className="col-md-6">
                            <label htmlFor="ProducId">Product Id</label>
                            <Field
                              type="text"
                              className="form-control"
                              id="ProductId"
                              placeholder="Product Id "
                              name="productId"
                            />
                            <Button
                              onClick={() =>
                                handleAvailablityCheck(formik.values.productId)
                              }
                            >
                              check availablity
                            </Button>
                            <div className="error">
                              <ErrorMessage name="productId" />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="Brand"> Company Name</label>

                            <DropdownList
                              data={brands}
                              placeholder="Brand"
                              id="Brand"
                              onChange={(e) => (formik.values.Brand = e)}
                            />
                            <div className="error">
                              {formik.touched.Brand && formik.errors.Brand}
                            </div>
                          </div>
                          <div className="col-md-4">
                            <label htmlFor="mPrice">Price</label>

                            <Field
                              type="text"
                              className="form-control"
                              id="mPrice"
                              placeholder="Price*"
                              name="mPrice"
                            />
                            <div className="error">
                              <ErrorMessage name="mPrice" />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <label htmlFor="quntity"> Quantity</label>

                            <Field
                              type="text"
                              className="form-control"
                              id="quantity"
                              placeholder="Quantity*"
                              name="quantity"
                            />
                            <div className="error">
                              <ErrorMessage name="quantity" />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <label htmlFor="size"> Size</label>

                            <DropdownList
                              data={sizes}
                              placeholder="size"
                              onChange={(e) => (formik.values.size = e)}
                            />

                            <div className="error">
                              <ErrorMessage name="size" />
                            </div>
                          </div>
                          <div className="col-4">
                            <label htmlFor="colors">Colors</label>

                            <Multiselect
                              placeholder="colors"
                              id="colors"
                              data={colors}
                              onChange={(e) => {
                                formik.values.color = e;
                              }}
                            />
                            <div className="error">
                              <ErrorMessage name="color" />
                            </div>
                          </div>
                          <div className="col-4">
                            <label htmlFor="frameType"> Frame Type</label>

                            <DropdownList
                              placeholder="Frame Tyoe"
                              id="frameType"
                              data={frameTypes}
                              onChange={(e) => (formik.values.frameType = e)}
                            />
                            <div className="error">
                              <ErrorMessage name="frameType" />
                            </div>
                          </div>
                          <div className="col-4">
                            <label htmlFor="shape"> Shape</label>

                            <DropdownList
                              placeholder="shape"
                              data={shapes}
                              onChange={(e) => (formik.values.shape = e)}
                            />
                            <div className="error">
                              <ErrorMessage name="shape" />
                            </div>
                          </div>
                          <div className="col-6">
                            <label htmlFor="category"> Category</label>

                            <DropdownList
                              placeholder="category"
                              id="category"
                              data={categories}
                              onChange={(e) => (formik.values.category = e)}
                            />
                            <div className="error">
                              <ErrorMessage name="category" />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <label htmlFor="gender"> Gender</label>

                            <DropdownList
                              placeholder="gender"
                              id="gender"
                              data={genders}
                              onChange={(e) => (formik.values.gender = e)}
                            />
                          </div>
                          <hr></hr>
                          <div className="col-12">
                            <h4>Thumnail Image</h4>
                            <div className="text-center">
                              {isIdavilable === true ? (
                                <>
                                  <Dropzone
                                    onDrop={(acceptedFiles) =>
                                      handlethumnailimage(acceptedFiles)
                                    }
                                  >
                                    {({ getRootProps, getInputProps }) => (
                                      <section>
                                        <div
                                          {...getRootProps()}
                                          className="border"
                                          style={{
                                            height: "100px",
                                            borderRadius: "5px",
                                          }}
                                        >
                                          <input {...getInputProps()} />
                                          <p style={{ paddingTop: "5%" }}>
                                            click to select file
                                          </p>
                                        </div>
                                      </section>
                                    )}
                                  </Dropzone>
                                </>
                              ) : (
                                <>please provide valid product Id</>
                              )}

                              {upload?.thumisLoadiing ? (
                                <>
                                  <h5>
                                    Image is uploading..don't refresh tha page
                                  </h5>
                                  <Loader />
                                </>
                              ) : upload?.thumisSuccess ? (
                                upload?.thumnailimages.map((i, index) => {
                                  return (
                                    <>
                                      {" "}
                                      <Modal
                                        open={isModalOpen[index]}
                                        footer={null}
                                        onCancel={() =>
                                          toggleModal(index, false)
                                        }
                                      >
                                        <img
                                          alt="example"
                                          style={{
                                            width: "100%",
                                          }}
                                          src={i.url}
                                        />
                                      </Modal>
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          margin: "15px",
                                        }}
                                      >
                                        <img
                                          alt="example"
                                          style={{
                                            width: "20%",
                                            borderRadius: "10%",
                                          }}
                                          src={i.url}
                                          onClick={() =>
                                            toggleModal(index, true)
                                          }
                                        />
                                        <Button
                                          style={{ width: "20%" }}
                                          danger
                                          onClick={() =>
                                            handleThumnailDetete({
                                              id: i.public_id,
                                            })
                                          }
                                        >
                                          delete
                                        </Button>
                                      </div>
                                    </>
                                  );
                                })
                              ) : upload?.thumisError ? (
                                <>
                                  <PageSubmissonFailed />
                                </>
                              ) : (
                                <></>
                              )}
                            </div>
                          </div>
                          <div className="col-12">
                            <h4> Images</h4>

                            <div className=" text-center">
                              {isIdavilable === true ? (
                                <>
                                  <Dropzone
                                    onDrop={(acceptedFiles) =>
                                      handleimageupload(acceptedFiles)
                                    }
                                  >
                                    {({ getRootProps, getInputProps }) => (
                                      <section>
                                        <div
                                          {...getRootProps()}
                                          className="border"
                                          style={{
                                            height: "100px",
                                            borderRadius: "5px",
                                          }}
                                        >
                                          <input {...getInputProps()} />
                                          <p style={{ paddingTop: "5%" }}>
                                            click to select file
                                          </p>
                                        </div>
                                      </section>
                                    )}
                                  </Dropzone>
                                </>
                              ) : (
                                <>Please provide valid product Id</>
                              )}

                              {upload?.isLoading ? (
                                <>
                                  <h5>
                                    Images are uploading..don't refresh tha page
                                  </h5>
                                  <Loader />
                                </>
                              ) : upload?.isSuccess ? (
                                <>
                                  <div style={{ display: "flex" }}>
                                    {upload?.images.map((i, index) => {
                                      return (
                                        <>
                                          {" "}
                                          <Modal
                                            open={isModalOpen[index]}
                                            footer={null}
                                            onCancel={() =>
                                              toggleModal(index, false)
                                            }
                                          >
                                            <img
                                              alt="example"
                                              style={{
                                                width: "100%",
                                              }}
                                              src={i.url}
                                            />
                                          </Modal>
                                          <div
                                            style={{
                                              display: "flex",
                                              flexDirection: "column",
                                              margin: "15px",
                                              width: "20%",
                                            }}
                                          >
                                            <img
                                              alt="example"
                                              style={{
                                                width: "100%",
                                                borderRadius: "10%",
                                              }}
                                              src={i.url}
                                              onClick={() =>
                                                toggleModal(index, true)
                                              }
                                            />

                                            <Button
                                              style={{ width: "100%" }}
                                              danger
                                              onClick={() =>
                                                handleDelete({
                                                  id: i.public_id,
                                                })
                                              }
                                            >
                                              delete
                                            </Button>
                                          </div>
                                        </>
                                      );
                                    })}
                                  </div>
                                </>
                              ) : upload?.isError ? (
                                <>
                                  <PageSubmissonFailed />
                                </>
                              ) : (
                                <></>
                              )}

                              {/* antd */}
                            </div>
                          </div>

                          <div className="col-12">
                            <button
                              type="submit"
                              style={{
                                backgroundColor: "#f18132",
                                color: "white",
                              }}
                              className="btn"
                              disabled={
                                isIdavilable === false ||
                                !(formik.dirty && formik.errors)
                              }
                            >
                              Save & Proceed
                            </button>
                          </div>
                        </Form>
                      );
                    }}
                  </Formik>
                </div>
                <div className="col-1">
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => handleCloseButton()}
                  ></button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              borderRadius: "20px",
              backgroundColor: "white",
              boxShadow: "0px 0px 2px  2px rgba(176, 175, 175, 0.1)",
              border: "0",
              height: "35px",
              paddingInline: "40%",
              paddingTop: "1%",
            }}
            onClick={() => setEdit(true)}
          >
            <p className="text-muted">Add New Product</p>
          </div>
        </>
      )}
    </>
  );
}

export default EmptyProduct;
