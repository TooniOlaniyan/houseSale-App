import React from 'react'
import {useState} from 'react'
import {Link , useNavigate} from 'react-router-dom'
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import {doc , setDoc , serverTimestamp} from 'firebase/firestore'
import {getAuth , createUserWithEmailAndPassword , updateProfile} from 'firebase/auth'
import { db } from '../firebase.config'
import 'react-toastify/dist/ReactToastify.css'
import {toast} from 'react-toastify'
import Oauth from '../Component/Oauth'



function SignUp() {
  const [showPassword , setShowPassword] = useState(false)
  const [formData , setFormData] = useState({
    email: '' ,
    password: '',
    name : ''
  })
  const {email , password , name}  = formData
  const navigate = useNavigate()
  

  const handleChange = (e)=>{
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id] : e.target.value

    }))
    
    
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()
    try {
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(auth , email , password)
      const user = userCredential.user
      updateProfile(auth.currentUser , {
        displayName: name
      })

      const formDataCopy = {...formData}
      delete formDataCopy.password 
      formDataCopy.timestamp = serverTimestamp()

      await setDoc(doc(db , 'users' , user.uid), formDataCopy)

      navigate('/')

    } catch (error) {
      toast.error('Someting went wrong')
      
    }
  }

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back!</p>
        </header>
        <main>
          <form onSubmit={handleSubmit}>
            <input onChange={handleChange} className='emailInput' type="text" placeholder='Name' id='name' value={name} />
            <input onChange={handleChange} className='emailInput' type="email" placeholder='Email' id='email' value={email} />

            <div className="passwordInputDiv">
              <input onChange={handleChange} className='passwordInput' placeholder='Password' id='password' value={password} type= {showPassword ? 'text' : 'password'} />
              <img  onClick={()=> setShowPassword((prevState) => !prevState)} className='showPassword' src={visibilityIcon} alt="" />
            </div>
            <Link className='forgotPasswordLink' to='/forgot-password'>Forgot Password</Link>
            <div className="signUpBar">
              <p className="signUpText">Sign Up</p>
              <button className='signInButton'>
                <ArrowRightIcon fill='#ffffff' width= '34px' height='34px'/>
              </button>
            </div>
          </form>
          <Oauth/>
          <Link className='registerLink' to= '/sign-in'>Sign-In Instead</Link>
        </main>
      </div>
    </>
  )
}

export default SignUp