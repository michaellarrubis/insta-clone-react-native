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
export const getCurrentUserId = () => {
  return firebase.auth().currentUser.uid
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

export const getUserById = (uid) => {
  return firebase.firestore()
    .collection("users")
    .doc(uid)
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

export const getPostsByUserId = () => {
  return firebase.firestore()
    .collection("posts")
    .doc(firebase.auth().currentUser.uid)
    .collection("userPosts")
    .orderBy("createdAt", "asc")
    .get((result) => result)
}

export const getUsersByName = (name) => {
  return firebase.firestore()
    .collection("users")
    .where("name", ">=", name)
    .get((result) => result)
}
