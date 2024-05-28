import { defineStore, acceptHMRUpdate } from 'pinia'
import { reactive } from 'vue'
import { auth } from '@/js/firebase'
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from "firebase/auth"
import { useCartStore } from './CartStore';


export const useAuthUserStore = defineStore('AuthUserStore', () => {


  const userData = reactive({})

  function init() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        userData.id = user.uid
        userData.email = user.email
        userData.displayName = user.displayName
        userData.photoURL = user.photoURL
        this.router.push({ name: 'store' });  
      } else {
        userData.value = {}
      }
    });
  }

  function registerUser(credentials) {
    createUserWithEmailAndPassword(auth, credentials.email, credentials.password, credentials.name)
    .then((userCredential) => {
      userData = userCredential.user
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
      this.router.push({ name: 'store' });
    }).catch((error) => {
      console.log(error.message)
    });
  }

  function loginUser(credentials) {
    signInWithEmailAndPassword(auth, credentials.email, credentials.password)
    .then((userCredential) => {
      userData = userCredential.user
      console.log(userData)
    }).catch((error) => {
      console.log(error.message)
    });
  }

 async function editUser(name, img) {
  try {
    if(img) {
    const storage = getStorage();
    const storageRef = ref(storage, `perfiles/${userData.id}`)
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
      this.router.push({ name: 'store' });
    }
 }

  return { userData, registerUser, logOutUser, loginUser, init, editUser }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthUserStore, import.meta.hot))
}