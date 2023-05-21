const admin = require('firebase-admin')
const { getFirestore } = require('firebase-admin/firestore')

const serviceAccount = require('../.firebase/serviceAccount.json')

if (!admin.apps.length)
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })

module.exports = {
  getFirestore
} 
