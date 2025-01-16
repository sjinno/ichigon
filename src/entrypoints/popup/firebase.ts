// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import {
  getFirestore,
  connectFirestoreEmulator,
  arrayUnion,
  doc,
  updateDoc,
  getDoc,
} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// TODO: manually set up this config so that the use uses their own firestore
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore setup
const db = getFirestore(app);

// Authentication setup
const auth = getAuth(app);

// Initialize Firebase emulator
{
  const isDev = import.meta.env.VITE_IS_DEV === 'true';
  if (isDev) {
    connectFirestoreEmulator(db, 'localhost', 8080);
    connectAuthEmulator(auth, `http://localhost:9099`);
    console.log('Using Firebase emulator');
  } else {
    console.warn('CAUTION: Using production database');
  }
}

export { db, auth };

interface Entry {
  proverb: string;
  createdAt: string;
}

const COLLECTION = import.meta.env.VITE_FIREBASE_COLLECTION;
const DOCUMENT = import.meta.env.VITE_FIREBASE_DOCUMENT;

// Add a document
export async function addData(proverb: string) {
  const proverbsRef = doc(db, COLLECTION, DOCUMENT);
  try {
    await updateDoc(proverbsRef, {
      entries: arrayUnion({ proverb, createdAt: new Date().toLocaleString() }),
    });
    console.log('Document updated successfully!');
  } catch (error) {
    console.error('Error updating document:', error);
  }
}

// Fetch documents
export async function fetchData(): Promise<string[]> {
  const proverbsRef = doc(db, COLLECTION, DOCUMENT);
  const proverbsSnap = await getDoc(proverbsRef);

  const proverbsData = proverbsSnap.data();

  if (!proverbsData) {
    throw new Error('Data does not exist.');
  }

  const data = proverbsData.entries.map((entry: Entry) => entry.proverb);

  return data;
}
