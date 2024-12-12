import Webcam from "react-webcam";
import Tesseract from "tesseract.js";
import { isBrowser } from "react-device-detect";
import { React, useRef, useState } from "react";
let videoConstraints;
if (isBrowser) {
  videoConstraints = {
    facingMode: { exact: "user" },
  };
} else {
  videoConstraints = {
    facingMode: { exact: "environment" },
  };
}
const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [text, settext] = useState(" ");

  const screenshot = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      console.log(imageSrc);
      const imgtotext = async () => {
        const {
          data: { text },
        } = await Tesseract.recognize(imageSrc, "eng", {
          tessedit_pageseg_mode: Tesseract.PSM.SINGLE_BLOCK,
          oem: Tesseract.OEM.LSTM_ONLY,
        });
        console.log(text);
        settext(text);
      };

      imgtotext();
    }
  };
  return (
    <div>
      <Webcam
        ref={webcamRef}
        audio={false}
        disablePictureInPicture={false}
        screenshotFormat="image/jpeg"
        screenshotQuality="1"
        videoConstraints={videoConstraints}
      />
      <button onClick={screenshot}>Capture</button>
      <div>
        <h3>Extracted Text:</h3>
        <p>{text}</p>
      </div>
    </div>
  );
};
export default WebcamCapture;
