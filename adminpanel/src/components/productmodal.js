import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import {
  UPDATE_PRODUCT,
  REMOVE_IMAGE_FROM_PRODUCT,
  REMOVE_THUMNAIL_FROM_PRODUCT,
} from "../redux/features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import "react-widgets/styles.css";
import { useState } from "react";
import Dropzone from "react-dropzone";
import Multiselect from "react-widgets/Multiselect";
import DropdownList from "react-widgets/DropdownList";
import {
  UPLOAD_IMAGE,
  THUMNAIL_IMAGES,
} from "../redux/features/product/productSlice";

import { Modal, Button } from "antd";

function EmptyProduct({
  _id,
  Brand,
  mPrice,
  size,
  color,
  frameType,
  category,
  quantity,
  shape,
  productId,
  gender,
  thumnailimages,
  images,

  brands,
  colors,
  frameTypes,
  sizes,
  shapes,
  categories,
  genders,
}) {
  const [open, setOpen] = useState(false);
  const upload = useSelector((state) => state.upload);
  const [isModalOpen, setIsModalOpen] = useState([false, false]);
  const toggleModal = (idx, target) => {
    setIsModalOpen((p) => {
      p[idx] = target;
      return [...p];
    });
  };

  const dispatch = useDispatch();
  const initialValuesProduct = {
    _id: _id,
    productId: productId,
    Brand: Brand,
    mPrice: mPrice,
    size: size,
    color: color,
    frameType: frameType,
    shape: shape,
    gender: gender,
    quantity: quantity,
    category: category,
    thumnailimages: thumnailimages,
    images: images,
  };

  const validationSchemaProduct = yup.object().shape({
    productId: yup.number().required(),
    Brand: yup.string().lowercase().required(),
    mPrice: yup.number().required(),
    size: yup.string().required(),
    color: yup.array().min(1, "pick atlease one color").required(),
    frameType: yup.string().required(),
    shape: yup.string().required(),
    gender: yup.string().required(),
    quantity: yup.number().required(),
    category: yup.string().required(),
    thumnailimages: yup.array().required(),
    images: yup.array().required(),
  });

  const handleSubmit = (values) => {
    dispatch(UPDATE_PRODUCT(values));
    setOpen(false);
  };

  const handleimageupload = (acceptedFiles) => {
    dispatch(UPLOAD_IMAGE(acceptedFiles));
  };
  const handlethumnailimage = (acceptedFiles) => {
    dispatch(THUMNAIL_IMAGES(acceptedFiles));
  };
  return (
    <>
      <Button
        type="primary"
        // className=" btn btn-sm"
        onClick={() => setOpen(true)}
      >
        Edit
      </Button>
      <Modal
        title="ADD PRODUCT"
        centered
        open={open}
        onCancel={() => setOpen(false)}
        width={800}
      >
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
              <div className="col-12 ">
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
                          <div className="error">
                            <ErrorMessage name="productId" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="Brand"> Brand</label>

                          <DropdownList
                            data={brands}
                            placeholder="Brand"
                            id="Brand"
                            defaultValue={Brand}
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
                            defaultValue={mPrice}
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
                            defaultValue={quantity}
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
                            defaultValue={size}
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
                            defaultValue={[color]}
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
                            defaultValue={frameType}
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
                            defaultValue={shape}
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
                            defaultValue={category}
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
                            defaultValue={gender}
                            onChange={(e) => (formik.values.gender = e)}
                          />
                        </div>
                        <hr></hr>
                        <div className="fs-5">Images</div>
                        <div className="col-12">
                          <h4>Thumnail Image</h4>
                          <div className="text-center">
                            <Dropzone
                              onDrop={(acceptedFiles) =>
                                handlethumnailimage({
                                  acceptedFiles: acceptedFiles,
                                  _id: _id,
                                })
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

                            {thumnailimages.map((i, index) => {
                              return (
                                <>
                                  {" "}
                                  <Modal
                                    open={isModalOpen[index]}
                                    footer={null}
                                    onCancel={() => toggleModal(index, false)}
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
                                      onClick={() => toggleModal(index, true)}
                                    />
                                    <Button
                                      style={{ width: "20%" }}
                                      danger
                                      onClick={() =>
                                        dispatch(
                                          REMOVE_THUMNAIL_FROM_PRODUCT({
                                            _id: _id,
                                            id: i.public_id,
                                          })
                                        )
                                      }
                                    >
                                      delete
                                    </Button>
                                  </div>
                                </>
                              );
                            })}
                          </div>
                        </div>
                        <div className="col-12">
                          <h4> Images</h4>

                          <div className=" text-center">
                            <Dropzone
                              onDrop={(acceptedFiles) =>
                                handleimageupload({
                                  _id: _id,
                                  acceptedFiles: acceptedFiles,
                                })
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
                            <div style={{ display: "flex" }}>
                              {images.map((i, index) => {
                                return (
                                  <>
                                    {" "}
                                    <Modal
                                      open={isModalOpen[index]}
                                      footer={null}
                                      onCancel={() => toggleModal(index, false)}
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
                                        onClick={() => toggleModal(index, true)}
                                      />
                                      <Button
                                        style={{ width: "100%" }}
                                        danger
                                        onClick={() =>
                                          dispatch(
                                            REMOVE_IMAGE_FROM_PRODUCT({
                                              _id: _id,
                                              id: i.public_id,
                                            })
                                          )
                                        }
                                      >
                                        delete
                                      </Button>
                                    </div>
                                  </>
                                );
                              })}
                            </div>

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
                            onClick={() => handleSubmit(formik.values)}
                          >
                            Save & Proceed
                          </button>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default EmptyProduct;
