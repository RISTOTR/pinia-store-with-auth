import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { auth } from '@/js/firebase'
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from "firebase/auth"
import { useCartStore } from './CartStore';


export const useAuthUserStore = defineStore('AuthUserStore', () => {


  const user = reactive({})

  function init() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user.id = user.uid
        this.user.email = user.email
        this.user.displayName = user.displayName
        this.user.photoURL = user.photoURL
        this.router.push('/')    
      } else {
        this.user = {}
      }
    });
  }

  function registerUser(credentials) {
    createUserWithEmailAndPassword(auth, credentials.email, credentials.password, credentials.name)
    .then((userCredential) => {
      const user = userCredential.user
    }).catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log(error.message)
    });
  }


  function logOutUser() {
    const CartStore = useCartStore();
    signOut(auth).then(() => {
      CartStore.reset()
      this.router('/')
    }).catch((error) => {
      console.log(error.message)
    });
  }

  function loginUser(credentials) {
    signInWithEmailAndPassword(auth, credentials.email, credentials.password).then((userCredential) => {
      this.user = userCredential.user
      console.log(user)
    }).catch((error) => {
      console.log(error.message)
    });
  }

 async function editUser(name, img) {
  try {
    if(img) {
    const storage = getStorage();
    const storageRef = ref(storage, `perfiles/${this.user.id}`)
        await uploadBytes(storageRef, img)
        const photoURL = await getDownloadURL(storageRef)
        await updateProfile(auth.currentUser, {
          photoURL
        })
    }
    updateProfile(auth.currentUser, {
      displayName: name,
  
    })
   } catch (error)  {
      console.log(error)
    } finally {
      this.router.push('/')
    }
 }

  return { user, registerUser, logOutUser, loginUser, init, editUser }
})