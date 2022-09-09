/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
//import axios from "axios";
import imageCompression from "browser-image-compression";
import PhotosUpload from "./PhotosUpload";

import styles from "./style.module.scss";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { TextField, Button, Grid } from "@mui/material";

import Draw from "../Canvas/draw";
import { resolve } from "path";
import { InputGroup } from "react-bootstrap";

type Inputs = {
  email: string;
  phone: string;
};

const index = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { register, handleSubmit } = useForm<Inputs>({
    mode: "onBlur",
  });
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [photos, setPhotos] = useState<File[]>([]);
  const [compPhotos, setCompPhotos] = useState<File[]>([]);
  const [centerShift_x, setCenterShift_x] = useState(0);
  const [centerShift_y, setCenterShift_y] = useState(0);

  const onSubmit = async (data: Inputs): Promise<void> => {
    const { email, phone } = data;
    if (email === "" && phone === "" && photos.length === 0) {
      // フォームが空の場合はPOSTしない
      return;
    }

    // 画像を送信できるようにFormDataに変換する
    const formData = new FormData();
    formData.append("email", email);
    formData.append("phone", phone);

    // const compressOptions = {
    //   maxSizeMB: 0.8, //最大ファイルサイズ
    //   maxWidthOrHeight: maxSize, //最大縦横値
    // };

    const imageSize = async (file) => {
      return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = () => {
          const size = {
            width: img.naturalWidth,
            height: img.naturalHeight,
          };

          URL.revokeObjectURL(img.src);
          resolve(size);
        };

        img.onerror = (error) => {
          reject(error);
        };

        img.src = URL.createObjectURL(file);
      });
    };

    const compressedPhotoData = await Promise.all(
      photos.map(async (photo) => {
        const size = await imageSize(photo);
        //console.log("w:%f h:%f", size["width"], size["height"]);

        const ratio = size["width"] / size["height"];
        //let maxSize = ratio < 1 ? 330 / ratio : 330 * ratio;
        let maxSize = 330;

        if (ratio < 1) {
          maxSize = 330 / ratio;
          //setCenterShift_y((size["height"] - size["width"]) / 2);
        } else {
          maxSize = 330 * ratio;
          //setCenterShift_x((size["width"] - size["height"]) / 2);
        }

        const compressOptions = {
          maxSizeMB: 0.8, //最大ファイルサイズ
          maxWidthOrHeight: maxSize, //最大縦横値
        };

        return {
          blob: await imageCompression(photo, compressOptions),
          name: photo.name,
        };
      })
    );

    const array: File[] = [];

    compressedPhotoData.forEach((photoData) => {
      array.push(new File([photoData.blob], photoData.name));
    });
    setCompPhotos(array);

    /*
    axios({
      url: "/api/register",
      method: "post",
      data: formData,
      headers: {
        "content-type": "multipart/form-data",
      },
    })
      //.then(() =>  navigate("/complete"))
      .then(() => {
        //
        console.log(form)
      })
      .catch((error) => {
        alert("エラーが発生しました。");
      });
      */
  };

  return (
    <>
      <Container maxWidth="sm">
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={1} display="none">
              <TextField label="email" type="email" {...register("email")} />
              <TextField label="Phone" type="tel" {...register("phone")} />
            </Stack>

            <Stack sx={{ pt: 5 }}>
              <PhotosUpload
                name="photos"
                photos={photos}
                setPhotos={setPhotos}
              />
            </Stack>

            <Grid container sx={{ pt: 2 }}>
              <Grid item xs={4}>
                <Button variant="contained" fullWidth={true} type="submit">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>

      <Draw
        photos={compPhotos}
      />
    </>
  );
};

export default index;
