const cloudinary = require("cloudinary");
const dotenv = require("dotenv");
const expressFormidable = require("express-formidable");
const validateAuthentication = require("./authentication-middleware");
dotenv.config();

const cloudinary_name = process.env.cloudinary_cloud_name;
const cloudinary_api_key = process.env.cloudinary_api_key;
const cloudinary_secret_key = process.env.cloudinary_secret_key;

cloudinary.config({
  cloud_name: cloudinary_name,
  api_key: cloudinary_api_key,
  api_secret: cloudinary_secret_key,
});

const handleImageUpload = async (req, res) => {
  try {
    const result = cloudinary.uploader.upload(req.files.image.path);
    return res.json(
      {
        url: result.secure_url,
        public_id: result.public_id,
      },
      { success: true },
      { status: 201 }
    );
  } catch (error) {
    res.json(
      { message: `Unable to upload image due to error ${error}` },
      { status: 500 }
    );
  }
};

const express = require("express");
const uploadingRouter = express.Router();
uploadingRouter.post(
  "/upload-image",
  validateAuthentication,
  expressFormidable(),
  handleImageUpload
);

module.exports = uploadingRouter;
