import firebase from './index'

// auth
export const login = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
}
export const register = (name, email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      addUser(name, email)
    })
}
export const logout = () => {
  return firebase.auth().signOut()
}

//firestore
const addUser = (name, email) => {
  return firebase.firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .set({
      name,
      email
    })
}

export const getUser = () => {
  return firebase.firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .get((result) => result)
}

export const uploadImage = (imageBlob) => {
  return firebase.storage()
    .ref()
    .child(`post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`)
    .put(imageBlob)
}

export const savePostData = (imageUri, caption) => {
  return firebase.firestore()
    .collection("posts")
    .doc(firebase.auth().currentUser.uid)
    .collection("userPosts")
    .add({
      imageUri,
      caption,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
}

export const getPosts = () => {
  return firebase.firestore()
    .collection("posts")
    .doc(firebase.auth().currentUser.uid)
    .collection("userPosts")
    .orderBy("createdAt", "asc")
    .get((result) => result)
}
