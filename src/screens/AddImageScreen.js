import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button, Dimensions, Platform, Image } from 'react-native'
import { Camera } from 'expo-camera'
import * as ImagePicker from 'expo-image-picker'

const AddImageScreen = ({ navigation }) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null)
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null)
  const [camera, setCamera] = useState(null)
  const [image, setImage] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back)

  const [ratio, setRatio] = useState('4:3')
  const { height, width } = Dimensions.get('window')
  const screenRatio = height / width

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync()
      setHasCameraPermission(cameraStatus.status === 'granted')

      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync()
      setHasGalleryPermission(galleryStatus.status === 'granted')
    })()
    handlePrepareRatio()
  }, [])

  const handlePrepareRatio = async () => {
    let desiredRatio = '4:3'
    if (Platform.OS === 'android' && camera) {
      const ratios = await camera.getSupportedRatiosAsync()

      let distances = {}
      let realRatios = {}
      let minDistance = null
      for (const ratio of ratios) {
        const parts = ratio.split(':')
        const realRatio = parseInt(parts[0]) / parseInt(parts[1])
        realRatios[ratio] = realRatio

        const distance = screenRatio - realRatio
        distances[ratio] = realRatio
        if (minDistance == null) {
          minDistance = ratio
        } else {
          if (distance >= 0 && distance < distances[minDistance]) {
            minDistance = ratio
          }
        }
      }
      desiredRatio = minDistance
      setRatio(desiredRatio)
    }
  }

  const handleTakePicture = async () => {
    if (camera) {
      const { uri } = await camera.takePictureAsync(null)
      setImage(uri)
    }
  }

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })


    if (!result.cancelled) {
      setImage(result.uri)
    }
  }

  const handleFlipCamera = () => {
    return setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    )
  }

  if (hasCameraPermission === null || hasGalleryPermission === null) {
    return <View />
  }
  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <Text>No access to camera</Text>
  }
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.cameraContainer}>
        <Camera
          ref={ref => setCamera(ref)}
          style={styles.fixedRatio}
          type={type}
          ratio={ratio}
        />
      </View>
      <Button
        style={{ flex: 0.1, alignSelf: 'flex-end', alignItems: 'center' }}
        title="Flip"
        onPress={() => handleFlipCamera()} />
      <Button
        title="Take a Picture"
        onPress={() => handleTakePicture()}
      />
      <Button
        title="Pick Image from the Gallery"
        onPress={() => handlePickImage()}
      />
      <Button
        title="Save Image"
        onPress={() => navigation.navigate('SaveImage', { image })}
      />
      {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
    </View>
  )
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1
  }
})

export default AddImageScreen