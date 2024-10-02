import firebaseApp from "./config.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

// Initialize Firestore with the firebaseApp instance
const db = getFirestore(firebaseApp);

// Function to add a document to a collection
const addDocument = async (collectionName, data = {}) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with Id:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document:", error);
  }
};

// Function to add a document to a subcollection
const addSubDocument = async (
  parentCollectionName,
  parentId,
  subCollectionName,
  data = {}
) => {
  try {
    const subCollectionRef = collection(
      db,
      parentCollectionName,
      parentId,
      subCollectionName
    );
    const docRef = await addDoc(subCollectionRef, data);
    console.log("Sub-document written with Id:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding sub-document:", error);
  }
};

// Function to get all documents from a collection
const getDocuments = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({ ref: doc.id, ...doc.data() });
    });
    return documents;
  } catch (error) {
    console.error("Error getting documents:", error);
  }
};

// Function to get all documents from a subcollection
const getSubDocuments = async (
  parentCollectionName,
  parentId,
  subCollectionName
) => {
  try {
    const subCollectionRef = collection(
      db,
      parentCollectionName,
      parentId,
      subCollectionName
    );
    const querySnapshot = await getDocs(subCollectionRef);
    const documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({ ref: doc.id, ...doc.data() });
    });
    return documents;
  } catch (error) {
    console.error("Error getting sub-documents:", error);
  }
};

// Function to update a document in a collection
const updateDocument = async (collectionName, docId, data) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, data);
    console.log("Document updated with ID: ", docId);
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

// Function to update a sub-document in a subcollection
const updateSubDocument = async (
  parentCollectionName,
  parentId,
  subCollectionName,
  docId,
  data
) => {
  try {
    const subDocRef = doc(
      db,
      parentCollectionName,
      parentId,
      subCollectionName,
      docId
    );
    await updateDoc(subDocRef, data);
    console.log("Sub-document updated with ID: ", docId);
  } catch (error) {
    console.error("Error updating sub-document: ", error);
  }
};

// Function to delete a document from a collection
const deleteDocument = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    console.log("Document deleted with ID: ", docId);
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};

// Function to delete a sub-document from a subcollection
const deleteSubDocument = async (
  parentCollectionName,
  parentId,
  subCollectionName,
  docId
) => {
  try {
    const subDocRef = doc(
      db,
      parentCollectionName,
      parentId,
      subCollectionName,
      docId
    );
    await deleteDoc(subDocRef);
    console.log("Sub-document deleted with ID: ", docId);
  } catch (error) {
    console.error("Error deleting sub-document: ", error);
  }
};

export {
  addDocument,
  addSubDocument,
  getDocuments,
  getSubDocuments,
  updateDocument,
  updateSubDocument,
  deleteDocument,
  deleteSubDocument,
};
