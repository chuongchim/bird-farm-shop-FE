// import React from "react";
// // import { , useEffect, useRef } from 'react'
// export default function UploadImgWidget() {
//   const cloudinaryRef = useRef();
//   useEffect(() => {
//     cloudinaryRef.current = window.cloudinary;
//   }, []);
//   return <div>UploadImgWidget</div>;
// }

import React, { useEffect, useRef } from "react";
import { Button } from "react-bootstrap";

function UploadImgWidget() {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
      cloudName: "dby2saqmn",
      uploadPreset: "chuongchim",
    }, (error, result) => {
      if (!error && result && result.event === "success") {
        console.log("Done! Here is the image info: ", result.info);
      }
    });
  }, []);
  return (
    <div>
      <Button
        onClick={() => {
          widgetRef.current.open();
        }}
      >
        Upload Image
      </Button>
    </div>
  );
}
export default UploadImgWidget;