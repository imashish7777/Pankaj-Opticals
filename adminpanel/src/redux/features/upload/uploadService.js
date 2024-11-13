import axios from "axios";

const uploadImg = async (data) => {
  const response = await axios.post(
    `http://localhost:3001/admin/addimage`,
    data
  );
  return response.data;
};
const uploadImgtoproduct = async (data) => {
  const response = await axios.post(
    `http://localhost:3001/admin/addimagetoproduct`,
    data
  );
  return response.data;
};
const uploadthumtoproduct = async (data) => {
  const response = await axios({
    method: "post",

    url: `http://localhost:3001/admin/addthumnailtoproduct`,
    data: data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const deleteImg = async (data) => {
  const response = await axios({
    method: "delete",
    url: "http://localhost:3001/admin/deleteimage",
    data: data,
  });
  return response.data;
};

const removeimagefromproduct = async (data) => {
  const response = await axios({
    method: "put",
    url: "http://localhost:3001/admin/removeimagefromproduct",
    data: data,
  });
  return response.data;
};
const removethumnailfromproduct = async (data) => {
  const response = await axios({
    method: "put",
    url: "http://localhost:3001/admin/removethumnailfromproduct",
    data: data,
  });
  return response.data;
};

const uploadService = {
  uploadImg,
  deleteImg,
  removeimagefromproduct,
  removethumnailfromproduct,
  uploadImgtoproduct,
  uploadthumtoproduct,
};

export default uploadService;
