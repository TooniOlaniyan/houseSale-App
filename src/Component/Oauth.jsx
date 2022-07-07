import React from 'react'
import {useLocation , useNavigate} from 'react-router-dom'
import {getAuth , signInWithPopup , GoogleAuthProvider  } from 'firebase/auth'
import {doc , setDoc , getDoc , serverTimestamp} from 'firebase/firestore'
import {db} from '../firebase.config'
import googleIcon from '../assets/svg/googleIcon.svg'
import {toast} from 'react-toastify'

const  Oauth = () => {
    const onClick = async () =>{
        try {
            const auth = getAuth()
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth , provider)
            const user = result.user

            const docRef = doc(db , 'users' , user.uid)
            const docSnap = await getDoc(docRef)
            if(!docSnap.exists){
                await setDoc(doc(db , 'users' , user.uid) , {
                    name:user.displayName,
                    email: user.email,
                    timeStamp: serverTimestamp()

                })
            }
            navigate('/')
            
        } catch (error) {
            toast.error('Could Not Sign up With goggle')
            
        }


    }
    const navigate = useNavigate()
    const location = useLocation()
  return (
    <div className='socialLogin'>
        <p>Sign {location.pathname=== '/sign-in' ? 'up' : 'in'} with</p>
        <button onClick={onClick} className="socialIconDiv">
            <img className='socialIconImg' src={googleIcon} alt="" />
        </button>
    </div>
  )
}

export default Oauth