const { getFirestore } = require('./firestore.service')
const { doc, setDoc } = require("firebase/firestore")
const _db = getFirestore()
module.exports = {
  addDocument,
  deleteDocument,
  updateDocument,
  getDocument,
  updateFiled
}

async function updateFiled() {
  try {
    return await setDoc(doc("cities", "LA"), {
      name: "Los Angeles",
      state: "CA",
      country: "USA"
    })
  } catch (err) {
    console.log(err)
  }
}

async function getDocument(docName, collectionName) {
  try {
    return await _db.collection(collectionName).doc(docName).get()
  } catch (e) {
    throw new Error(
      `Error was on getting document in collection:${collectionName}, desc:${e}`
    )
  }
}

async function addDocument(entity, collectionName) {
  try {
    return await _db.collection(collectionName).add(entity)
  } catch (e) {
    throw new Error(
      `Error was on adding document in collection:${collectionName}, desc:${e}`
    )
  }
}

async function deleteDocument(docName, collectionName) {
  try {
    return await _db.collection(collectionName).doc(docName).delete()
  } catch (e) {
    throw new Error(
      `Error was on deleting document in collection:${collectionName}, desc:${e}`
    )
  }
}

async function updateDocument(
  docName,
  collectionName,
  fields
) {
  try {
    return await _db.collection(collectionName).doc(docName).update(fields)
  } catch (e) {
    throw new Error(
      `Error was on updating document in collection:${collectionName}, desc:${e}`
    )
  }
}
