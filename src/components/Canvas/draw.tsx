/* eslint-disable react-hooks/rules-of-hooks */
import { FiberNew } from "@mui/icons-material";
import { height } from "@mui/system";
import { read } from "fs";
import React, { useEffect, useRef } from "react";
import "./Canvas.css";

type drawProps = {
  photos: File[];
};

const draw = (props: drawProps) => {
  const canvasRef = useRef(null);

  const getContext = () => {
    const canvas: any = canvasRef.current;
    return canvas.getContext("2d");
  };

  useEffect(() => {
    const ctx = getContext();

    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, 1080, 1080);

    ctx.fillStyle = "rgba(217, 217, 217, 0.5)";

    //ctx.beginPath();
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 3; j++) {
        let idx = i * 2 + i + j;
        if (props.photos.length > 0) {
          const reader = new FileReader();
          reader.readAsDataURL(props.photos[idx]);

          reader.onload = () => {
            ctx.beginPath();
            const img = new Image();
            img.src = reader.result.toString();
            img.decode().then(() => {
              let imgWidth = img.width,
                imgHeight = img.height,
                imgRate = imgWidth / imgHeight;
              const shift_x = (imgWidth - 330) / 2;
              const shift_y = (imgHeight - 330) / 2;

              console.log(
                "width:%n height:%n ratio:%n",
                imgWidth,
                imgHeight,
                imgRate
              );

              // let hRatio = 330 / img.width,
              //   vRatio = 330 / img.height,
              //   ratio = Math.min(hRatio, vRatio),
              //   centerShift_x = (330 - img.width * ratio) / 2,
              //   centerShift_y = (330 - img.height * ratio) / 2;
              //ctx.clearRect(0, 0, 330, 330);
              //ctx.rect(23 + j * 352, 35 + i * 680, 330, 330);
              //ctx.arc( 100, 100, 80, 0 * Math.PI / 180, 360 * Math.PI / 180 ) ;
              //ctx.fillRect(23 + j * 352, 35 + i * 680, 330, 330);
              //ctx.clip();

              // ctx.drawImage(
              //   img,
              //   0,
              //   0,
              //   img.width,
              //   img.height,
              //   23 + 351 * j,//centerShift_x,
              //   35 + 680 * i,//centerShift_y,
              //   img.width * Math.max(hRatio, vRatio),
              //   img.height * Math.max(hRatio, vRatio)
              // );

              ctx.drawImage(
                img,
                shift_x,
                shift_y,
                330,
                330,
                23 + 351 * j,
                35 + 680 * i,
                330,
                330
              );
              // if (imgRate >= 1) {
              //   ctx.drawImage(
              //     img,
              //     0,
              //     0,
              //     imgWidth * imgRate,
              //     imgHeight,
              //     23 + 351 * j,
              //     35 + 680 * i,
              //     330,
              //     330
              //   );
              // } else {
              //   ctx.drawImage(
              //     img,
              //     0,
              //     0,
              //     330,
              //     330 / imgRate,
              //     13 + 351 * j,
              //     56 + 680 * i,
              //     330,
              //     330 / imgRate
              //   );
              // }
            });
          };

          //img.src = fr.readAsDataURL(props.photos[idx]);
          // ctx.drawImage(
          //   img,
          //   0,
          //   0,
          //   100,
          //   100,
          //   351 * j,
          //   680 * i,
          //   100,
          //   100
          // );
        }
        //img.src = fr.readAsBinaryString(props.photos[idx]);
        //ctx.fillRect(23 + j * 352, 35 + i * 680, 330, 330);
      }
    }

    ctx.beginPath();
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 3; j++) {
        let idx = i * 2 + i + (j + 1);
        const label = new Image();
        label.src = `${process.env.PUBLIC_URL}/img/img_rank_${idx}.png`;
        ctx.drawImage(
          label,
          0,
          0,
          200,
          158,
          13 + 351 * j,
          56 + 680 * i,
          100,
          78
        );
      }
    }

    ctx.beginPath();
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";

    const title = "Yamanashi Trip";
    const fontSize = 64;
    ctx.font = "bold " + fontSize + "px Zen Kaku Gothic New, sans-serif";
    let textWidth = ctx.measureText(title).width;
    ctx.fillText(title, (1080 - textWidth) / 2, fontSize + 454);

    ctx.beginPath();
    const subtitle = "2022/7/26~28";
    const subfontSize = 44;
    ctx.font = subfontSize + "px Zen Kaku Gothic New, sans-serif";
    let subtextWidth = ctx.measureText(subtitle).width;
    ctx.fillText(subtitle, (1080 - subtextWidth) / 2, subfontSize + 590);

    ctx.beginPath();
    ctx.moveTo(23, 556);
    ctx.lineTo(1057, 556);
    ctx.lineWidth = 5;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(23, 567);
    ctx.lineTo(1057, 567);
    ctx.lineWidth = 2;
    ctx.stroke();
  }, [props.photos]);

  return (
    <>
      <div>
        <canvas width={1080} height={1080} className="canvas" ref={canvasRef} />
      </div>
    </>
  );
};

export default draw;
