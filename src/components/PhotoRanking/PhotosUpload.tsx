import React, { useRef, useState } from "react";
import PhotoSample from "./PhotoSample";
import styles from "./style.module.scss";

type PhotosUploadProps = {
  name: string;
  componentRef?: (instance: HTMLInputElement | null) => void;
  photos: File[];
  setPhotos: (files: File[]) => void;
};

const PhotosUpload = ({
  name,
  componentRef,
  photos,
  setPhotos,
}: PhotosUploadProps) => {
  const [isSameError, setIsSameError] = useState(false);
  const [isNumberError, setIsNumberError] = useState(false);
  const [isFileTypeError, setIsFileTypeError] = useState(false);

  const resetErrors = () => {
    setIsSameError(false);
    setIsNumberError(false);
    setIsFileTypeError(false);
  };

  const fileUpload = () => {};

  const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null || event.target.files.length === 0) {
      return;
    }
    const files = Object.values(event.target.files).concat();
    // 初期化することで同じファイルを連続で選択してもonChagngeが発動するように設定し、画像をキャンセルしてすぐに同じ画像を選ぶ動作に対応
    event.target.value = "";
    resetErrors();

    const pickedPhotos = files.filter((file) => {
      if (
        ![
          "image/gif",
          "image/jpeg",
          "image/png",
          "image/bmp",
          "image/svg+xml",
        ].includes(file.type)
      ) {
        setIsFileTypeError(true);
        return false;
      }

      const existsSameSize = photos.some((photo) => photo.size === file.size);
      if (existsSameSize) {
        setIsSameError(true);
        return false;
      }

      return true;
    });

    if (pickedPhotos.length === 0) {
      return;
    }
    const concatPhotos = photos.concat(pickedPhotos);
    if (concatPhotos.length >= 4) {
      setIsNumberError(true);
    }
    setPhotos(concatPhotos.slice(0, 3));
  };

  const handleCancel = (photoIndex: number) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("選択した画像を消してよろしいですか？")) {
      resetErrors();
      const modifyPhotos = photos.concat();
      modifyPhotos.splice(photoIndex, 1);
      setPhotos(modifyPhotos);
    }
  };

  return (
    <>
      <div className={styles.topContainer}>
        {[...Array(3)].map((_: number, index: number) =>
          index < photos.length ? (
            <>
              <label htmlFor="">
                <img
                  src={URL.createObjectURL(photos[index])}
                  alt={`あなたの写真 ${index + 1}`}
                />
                <button
                  type="button"
                  key={index}
                  onClick={() => handleCancel(index)}
                >
                  X
                </button>
              </label>
            </>
          ) : (
            <label htmlFor={name} key={index}>
              <div>
                <PhotoSample number={index + 1} />
              </div>
            </label>
          )
        )}
      </div>
      {isSameError && <p>*すでに選択された画像ぞ同じものは表示されません。</p>}
      {isNumberError && <p>*３枚を超えて選択された画像は表示されません。</p>}
      {isFileTypeError && (
        <p>*jpeg,png,bmp,gif,svg以外のファイル形式は表示されません。</p>
      )}

      <div>
        <div>
          <p>※最大3枚まで</p>
        </div>
        <label htmlFor={name}>
          <div></div>
          <input
            type="file"
            name={name}
            id={name}
            ref={componentRef}
            accept="image/*"
            onChange={handleFile}
            multiple
          />
        </label>
      </div>
    </>
  );
};

export default PhotosUpload;
