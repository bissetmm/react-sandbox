/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef } from "react";
import "./Canvas.css";

type drawProps = {
  photos: File[];
  setCanvasUrl: any;
};

const draw = (props: drawProps) => {
  const canvasRef = useRef(null);

  //  const [isFlag, setIsFlag] = useState<boolean>(false);

  const getContext = () => {
    const canvas: any = canvasRef.current;
    return canvas.getContext("2d");
  };

  //const [png, setPng] = useState<string | null>(null);

  const width = 1080;
  const height = 1080;


  

  useEffect(() => {
    const ctx = getContext();
    // const canvasElem = document.createElement("canvas");
    // canvasElem.width = width;
    // canvasElem.height = height;
    // const ctx = canvasElem.getContext("2d");

    //ctx.beginPath();
    ctx.fillStyle = "rgb(255,255,255)";
    //ctx.globalCompositeOperation="source-over";
    ctx.fillRect(0, 0, 1080, 1080);
    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, width, height);

    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    const title = "Yamanashi Trip";
    const fontSize = 64;
    ctx.font = "bold " + fontSize + "px Zen Kaku Gothic New, sans-serif";
    let textWidth = ctx.measureText(title).width;
    ctx.fillText(title, (1080 - textWidth) / 2, fontSize + 454);

    //ctx.beginPath();
    const subtitle = "2022/7/26~28";
    const subfontSize = 44;
    ctx.font = subfontSize + "px Zen Kaku Gothic New, sans-serif";
    let subtextWidth = ctx.measureText(subtitle).width;
    ctx.fillText(subtitle, (1080 - subtextWidth) / 2, subfontSize + 590);

    //ctx.beginPath();
    ctx.moveTo(23, 556);
    ctx.lineTo(1057, 556);
    ctx.lineWidth = 5;
    ctx.stroke();

    //ctx.beginPath();
    ctx.moveTo(23, 567);
    ctx.lineTo(1057, 567);
    ctx.lineWidth = 2;
    ctx.stroke();

    //ctx.beginPath();

    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 3; j++) {
        let idx = i * 2 + i + j;
        if (props.photos[idx]) {
          const img = new Image();
          img.src = URL.createObjectURL(props.photos[idx]);
          img.onload = () => {
            const size = {
              width: img.naturalWidth,
              height: img.naturalHeight,
            };
            const shift_x = (size["width"] - 330) / 2;
            const shift_y = (size["height"] - 330) / 2;

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
          };
        }

        // let idx2 = i * 2 + i + (j + 1);
        // const label = new Image();
        // label.src = `${process.env.PUBLIC_URL}/img/img_rank_${idx2}.svg`;
        // ctx.drawImage(
        //   label,
        //   0,
        //   0,
        //   330,
        //   330,
        //   13 + 351 * j,
        //   56 + 680 * i,
        //   45,
        //   25
        // );
        // ctx.globalCompositeOperation = "destination-over";
      }
    }

    ctx.beginPath();
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 3; j++) {
        let idx = i * 2 + i + (j + 1);
        const label = new Image();
        label.src = `${process.env.PUBLIC_URL}/img/img_rank_box_${idx}.svg`;
        ctx.drawImage(
          label,
          0,
          0,
          340,
          330,
          13 + 351 * j,
          56 + 680 * i,
          100,
          78
        );
        //ctx.globalCompositeOperation = "destination-over";
      }
    }

    ctx.restore();
    //console.log(canvasElem.toDataURL());

    //setPng(canvasElem.toDataURL());
    //setPng(ctx.canvas.toDataURL());
    //setIsFlag(false);
    //console.log(ctx.canvas.toDataURL());
    // if (props.photos.length > 0) {
    //   props.setCanvasUrl(ctx.canvas.toDataURL("image/jpeg"));
    //   //saveAs(ctx.canvas?.toDataURL("image/jpeg"), "canvas.jpg");
    // }
  }, [props.photos]);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {/* {png && (
          <div
            className="comp"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <img alt="png" src={png} />
          </div>
        )} */}
        <canvas width={1080} height={1080} className="canvas" ref={canvasRef} />
      </div>
    </>
  );
};

export default draw;
