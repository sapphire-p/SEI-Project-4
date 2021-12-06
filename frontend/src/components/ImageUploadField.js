import React from 'react'
import axios from 'axios'

const uploadUrl = process.env.REACT_APP_CLOUDINARY_URL
const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET


export const ImageUploadField = ({ handleImageUrl, value }) => {

  const handleUpload = async event => {
    const data = new FormData()
    data.append('file', event.target.files[0])
    data.append('upload_preset', uploadPreset)
    const response = await axios.post(uploadUrl, data)
    handleImageUrl(response.data.url)
  }

  return (

    <>
      {value ?
        <div>
          <img src={value} alt='profile image' />
        </div>
        :
        <>
          <input
            type='file'
            onChange={handleUpload}
            className='form-control-file'
          />
        </>
      }

    </>
  )


}
