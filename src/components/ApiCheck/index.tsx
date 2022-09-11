/* eslint-disable react-hooks/rules-of-hooks */
import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const index = () => {
  const baseURL =
    "https://func-photo-score-dev.azurewebsites.net/api/infer?code=KvUiSVXyXGPaiY27O__pannPHBbDsTR__Ph4NWySze--AzFu-YwtGA==";

  const [posts, setPosts] = useState([]);
  const [imgFile, setImgFile] = useState<File>();

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "image/jpeg");

  // useEffect(() => {
  //   fetch(inferURL, {
  //     method: "POST",
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setPosts(data);
  //     });
  // }, []);

  const handleSetImage = (e) => {
    if (!e.target.files) return;
    const iconFile: File = e.target.files[0];
    console.log(iconFile);
    setImgFile(iconFile);
  };

  // const submitPost = () => {
  //   fetch(baseURL, {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: imgFile,
  //     redirect: "follow",
  //   })
  //     .then((response) => response.text())
  //     .then((result) => console.log(result))
  //     .catch((error) => console.log("error", error));
  // };

  const submitPost = () => {
    axios({
      url:baseURL,
      method:"POST",
      data:imgFile,
      headers:{"Content-Type": "image/jpeg"}
    }).then((response) => {
      console.log(response.data);
    }).catch(error => {
      console.log(error)
    });
  }

  return (
    <div>
      <input
        type="file"
        accept="image/*,.png,.jpg,.jpeg,.gif"
        onChange={(e) => handleSetImage(e)}
      />

      <Button variant="contained" onClick={submitPost} fullWidth={true}>
        Create Post
      </Button>
    </div>
  );
};

export default index;
