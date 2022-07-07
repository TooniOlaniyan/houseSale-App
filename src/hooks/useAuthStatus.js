import {useEffect , useState , useRef} from 'react'
import {getAuth , onAuthStateChanged} from 'firebase/auth'
 
export const useAuthStatus = () => {
  const [loggedIn , setLoggedIn] = useState(false)
  const [checkingStatus , setcheckingStatus] = useState(true)

  useEffect(() => {
    const auth = getAuth()
    onAuthStateChanged(auth , (user)=>{
      if(user){
        setLoggedIn(true)
        console.log(user);
      }
      setcheckingStatus(false)

    })
  
 
  } , [])

  return {loggedIn , checkingStatus}
}

