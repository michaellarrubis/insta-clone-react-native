import React, { useState, useEffect } from 'react'
import { View, TextInput, Image, Button } from 'react-native'

import { uploadImage, savePostData } from '../firebase/actions'

const SaveImage = ({ route, navigation }) => {
  const [imageProp, setImageProp] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)
  const [caption, setCaption] = useState('')

  useEffect(() => {
    if (route.params?.image) {
      setImageProp(route.params.image)
    }
  }, [])

  const handleSavePost = async () => {
    const response = await fetch(imageProp)
    const imageBlob = await response.blob()
    let taskUpload = uploadImage(imageBlob)

    const taskProgress = (snapshot) => {
      console.log(`transferred: ${snapshot.bytesTransferred}`)
    }

    const taskCompleted = () => {
      taskUpload.snapshot.ref.getDownloadURL()
        .then(async (snapshot) => {
          console.log(`completed: ${snapshot}`)
          await savePostData(snapshot, caption)
            .then(() => {
              navigation.popToTop()
            })
        })
    }

    const taskError = (snapshot) => {
      console.log(`Error: ${snapshot}`)
    }

    taskUpload.on("status: ", taskProgress, taskError, taskCompleted)
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