require('dotenv').config();

const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;
const uuid = require('uuid');

const imageUploadPath = process.env.UPLOADS_DIR;

// Save a photo and get filename
async function processAndSaveImage(uploadedImage) {
  // Random File name to be saved
  const savedFileName = `${uuid.v1()}.jpg`;

  // Create the upload path
  await fs.mkdir(imageUploadPath, { recursive: true });

  // Process image
  const finalImage = sharp(uploadedImage.data);

  // Check image size
  const imageInfo = await finalImage.metadata();

  // If image is wider than 500px resize it
  if (imageInfo.width > 800) {
    finalImage.resize(800);
  }

  // Save image
  await finalImage.toFile(path.join(imageUploadPath, savedFileName));

  console.log('path',imageUploadPath);

  return savedFileName;
}

module.exports = {
  processAndSaveImage
}

