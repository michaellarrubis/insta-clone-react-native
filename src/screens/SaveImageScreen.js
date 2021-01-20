import React, { useState, useEffect } from 'react'
import { View, TextInput, Image, Button } from 'react-native'

import { uploadImage } from '../firebase/actions'

const SaveImage = (props) => {
  const [imageProp, setImageProp] = useState(null)
  const [image, setImage] = useState(null)
  const [caption, setCaption] = useState('')

  useEffect(() => {
    if (props.route.params?.image) {
      setImageProp(props.route.params.image)
    }
  }, [])

  const handleUploadImage = async () => {
    const response = await fetch(imageProp)
    const imageBlob = await response.blob()
    let taskUpload = uploadImage(imageBlob)

    const taskProgress = (snapshot) => {
      console.log(`transferred: ${snapshot.bytesTransferred}`)
    }

    const taskCompleted = () => {
      taskUpload.snapshot.ref.getDownloadURL()
        .then((snapshot) => {
          console.log(`completed: ${snapshot}`)
        })
    }

    const taskError = (snapshot) => {
      console.log(`Error: ${snapshot}`)
    }

    taskUpload.on("status: ", taskProgress, taskError, taskCompleted)
  }

  const handleSavePost = () => {
    handleUploadImage()
  }

  return (
    <View style={{ flex: 1 }}>
      <Image source={{ uri: imageProp }} style={{ height: 300 }} />
      <TextInput
        placeholder="Write a Caption..."
        onChangeText={(caption) => setCaption(caption)}
      />
      <Button title="Save" onPress={() => handleSavePost()} />
    </View >
  )
}

export default SaveImage