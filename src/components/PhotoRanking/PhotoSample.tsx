import React from 'react'
import styles from './style.module.scss'

type PhotoSampleProps = {
  number:number
}
const PhotoSample = (props:PhotoSampleProps) => {
  const number = props.number
  return (
    <>
      <div>PhotoSample</div>
      <div>{number}</div>
    </>
    
  )
}

export default PhotoSample