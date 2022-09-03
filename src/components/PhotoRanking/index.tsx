import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import imageCompression from "browser-image-compression";
import PhotosUpload from "./PhotosUpload";

import styles from "./style.module.scss";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { TextField, Button, Grid } from "@mui/material";

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
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [compPhotos, setCompPhotos] = useState<File[]>([]);

  console.log(compPhotos);

  const onSubmit = async (data: Inputs): Promise<void> => {
    const { email, phone } = data;
    if (email === "" && phone === "" && photos.length === 0) {
      // アンケートフォームが空の場合はPOSTしない
      return;
    }

    // 画像を送信できるようにFormDataに変換する
    const formData = new FormData();
    formData.append("email", email);
    formData.append("phone", phone);

    const compressOptions = {
      maxSizeMB: 0.8, //最大ファイルサイズ
      maxWidthOrHeight: 600, //最大縦横値
    };
    const compressedPhotoData = await Promise.all(
      photos.map(async (photo) => {
        return {
          blob: await imageCompression(photo, compressOptions),
          name: photo.name,
        };
      })
    );
    const array:File[] = [];
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
            <Stack spacing={1}>
              {/* <input id="email" {...register("email", { required: "*" })} />
            <input id="phone" {...register("phone")} /> */}
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
    </>
  );
};

export default index;
