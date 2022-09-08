/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Container, Grid, Stack } from "@mui/material";
import { URLSearchParams } from "url";


const baseURL = "https://jsonplaceholder.typicode.com/posts";

const inferenceURL =
  "https://func-photo-score-dev.azurewebsites.net/api/infer?code=KvUiSVXyXGPaiY27O__pannPHBbDsTR__Ph4NWySze--AzFu-YwtGA==";

const index = () => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response.data);
    });
  }, []);

  function createPost() {
    axios
      .post(baseURL, {
        title: "Hello World!",
        body: "This is a new post.",
      })
      .then((response) => {
        setPost(response.data);
      });
  }

  const [userIconFormData, setUserIconFormData] = useState<File>();

  const handleSetImage = (e) => {
    if (!e.target.files) return;
    const iconFile: File = e.target.files[0];
    console.log(iconFile);
    setUserIconFormData(iconFile);
  };

  const file = document.getElementById("file-input");
  console.log(file);
  const form = new FormData();
  //form.append("mode", "file");
  form.append('file', userIconFormData);

  function inferencePost() {
    axios({
      url: inferenceURL,
      method: "POST",
      data:form,
      headers: {
        "Content-Type": "image/jpeg"
      },
    }).then((response) => {
      console.log(response.data);
      setPost(response.data);
    }).catch(error => {
      console.log(error)
    });
  }

  if (!post) return null;

  return (
    <>
      <Container maxWidth="sm">
        <form>
          <Stack>
            <h1>{post.title}</h1>
          </Stack>
          <Stack sx={{ pt: 2 }}>
            <p>{post.body}</p>
          </Stack>
          <Stack>
            <input
              type="file"
              accept="image/*,.png,.jpg,.jpeg,.gif"
              onChange={(e) => handleSetImage(e)}
            />
          </Stack>
          <Button variant="contained" onClick={inferencePost}>
            Create Post
          </Button>
        </form>
      </Container>
    </>
  );
};

export default index;
