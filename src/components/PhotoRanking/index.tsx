import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import imageCompression from "browser-image-compression";
import PhotosUpload from "./PhotosUpload";

import styles from './style.module.scss'

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
      // 3MB以下に圧縮する
      maxSizeMB: 3,
    };
    const compressedPhotoData = await Promise.all(
      photos.map(async (photo) => {
        return {
          blob: await imageCompression(photo, compressOptions),
          name: photo.name,
        };
      })
    );
    compressedPhotoData.forEach((photoData) => {
      formData.append("photo", photoData.blob, photoData.name);
    });

    axios({
      url: "/api/register",
      method: "post",
      data: formData,
      headers: {
        "content-type": "multipart/form-data",
      },
    })
      //.then(() =>  navigate("/complete"))
      .catch((error) => {
        alert("エラーが発生しました。");
      });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input id="email" {...register("email", { required: "*" })} />
            <input id="phone" {...register("phone")} />
          </div>
          <div>
            <PhotosUpload name="photos" photos={photos} setPhotos={setPhotos} />
          </div>
          <div>
            <button />
          </div>
        </form>
      </div>
    </div>
  );
};

export default index;
