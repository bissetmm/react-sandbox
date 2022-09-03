import { ResetTvOutlined } from '@mui/icons-material'
import { useEffect, useState } from 'react'

export type PhotoInfer = {
  mean:number;
  std:number;
}

function buildFetchUrl(code:string){
  let url = "https://func-photo-score-dev.azurewebsites.net/api/infer?code=";
  
}


export const usePhotoInfer = (file:File) => {

  const [result,setResult] = useState(null as PhotoInfer)

  useEffect(()=>{
    if(file){

    }
  })



  return result;
}