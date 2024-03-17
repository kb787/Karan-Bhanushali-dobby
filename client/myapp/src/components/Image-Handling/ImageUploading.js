import { useState } from "react";
import axios from "axios";
import { message } from "antd";
import imag1Dobby from "./../../images/imag1Dobby.png";
import imag2Dobby from "./../../images/imag2Dobby.png";
import imag3Dobby from "./../../images/imag3Dobby.png";
import imag4Dobby from "./../../images/imag4Dobby.png";
import image5Dobby from "./../../images/image5Dobby.png";
import image6Dobby from "./../../images/image6Dobby.png";

const ImageUploading = () => {
  const [image, setImage] = useState("");

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    setImage(file);
  };

  const handleImageUploading = async (e) => {
    const file = e.target.files;
    console.log(file);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        "http://localhost:3500/v1/api/upload-image",
        formData
      );

      if (response.data.success) {
        console.log("Successfully uploaded your image");
      } else {
        console.error("Error uploading image:", response.data.message);
      }
    } catch (error) {
      console.error(`Unable to upload file due to error: ${error}`);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-slate-300 mt-0">
      <p className="flex justify-start text-3xl text-center mt-10 mb-5">
        Create your own image gallery !!!
      </p>
      <div className="flex gap-3 mt-3 mb-3">
        <img
          src={imag1Dobby}
          className="border-2 border-black  w-80 h-80 rounded-xl"
        />
        <img
          src={imag2Dobby}
          className="border-2 border-black  w-80 h-80 rounded-xl"
        />
        <img
          src={imag3Dobby}
          className="border-2 border-black  w-80 h-80 rounded-xl"
        />
      </div>
      <div className="flex gap-3 mt-3 mb-3">
        <img
          src={imag4Dobby}
          className="border-2 border-black  w-80 h-80 rounded-xl"
        />
        <img
          src={image5Dobby}
          className="border-2 border-black  w-80 h-80 rounded-xl"
        />
        <img
          src={image6Dobby}
          className="border-2 border-black  w-80 h-80 rounded-xl"
        />
      </div>
      <br />
      <br />
      <div className="flex gap-1 mt-2">
        <input
          type="file"
          accept="images/*"
          onChange={handleImageChange}
          className="border-2 border-black rounded-xl mb-4 p-2 text-xl w-35 h-13 bg-slate-50"
        />
        <button
          className="bg-blue-500 rounded-md w-28 h-12 text-xl text-white flex justify-center items-center mx-auto mt-1"
          onClick={handleImageUploading}
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default ImageUploading;
