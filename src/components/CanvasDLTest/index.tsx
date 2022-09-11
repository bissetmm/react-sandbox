/* eslint-disable react-hooks/rules-of-hooks */
import { SaveAs } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import {saveAs} from "file-saver";

const width = 255;
const height = 255;

const index = () => {
  const [png, setPng] = useState<string | null>(null);
  useEffect(() => {
    const canvasElem = document.createElement("canvas");
    canvasElem.width = width;
    canvasElem.height = height;
    const ctx = canvasElem.getContext("2d");

    // draw

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#888888";
    ctx.fillRect(0, 0, width, height);

    setPng(canvasElem.toDataURL());
  }, []);
  //console.log(png);

  const saveImage = () => {
    //console.log(png);
    const blob = new Blob([JSON.stringify(png, null, 2)], { type: 'image/png' });
    saveAs(blob,'canvas.png')

  }

  return (
    <div>
      <h3>画像生成</h3>
      <h4>生成</h4>
      {png && (
        <div className="comp" style={{ display: "flex" }}>
          <img alt="icon" src={png} />
          {/* <img alt="round icon" src={png} style={{ borderRadius: "100%" }} /> */}
        </div>
      )}

      <div>
        <button type="button" onClick={saveImage}>SAVE</button>
      </div>
    </div>
  );
};

export default index;
