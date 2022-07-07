import React from 'react'
import {useState} from 'react'
import {Link , Navigate, useNavigate} from 'react-router-dom'
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import {getAuth , signInWithEmailAndPassword} from 'firebase/auth'
import 'react-toastify/dist/ReactToastify.css'
import {toast} from 'react-toastify'
import Oauth from '../Component/Oauth'


function SignIn() {
  const [showPassword , setShowPassword] = useState(false)
  const [formData , setFormData] = useState({
    email: '' ,
    password: ''
  })
  const {email , password}  = formData
  const navigate = useNavigate()

  const handleChange = (e)=>{
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id] : e.target.value

    }))
    
    
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const auth =getAuth()
      const userCredential = await signInWithEmailAndPassword(auth ,email , password)
      if(userCredential.user){
        navigate('/')

      }
    } catch (error) {
      toast.error('Wrong User Credentials')
      
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
            <input onChange={handleChange} className='emailInput' type="email" placeholder='Email' id='email' value={email} />

            <div className="passwordInputDiv">
              <input onChange={handleChange} className='passwordInput' placeholder='Password' id='password' value={password} type= {showPassword ? 'text' : 'password'} />
              <img  onClick={()=> setShowPassword((prevState) => !prevState)} className='showPassword' src={visibilityIcon} alt="" />
            </div>
            <Link className='forgotPasswordLink' to='/forgot-password'>Forgot Password</Link>
            <div className="signInBar">
              <p className="signInText">Sign In</p>
              <button className='signInButton'>
                <ArrowRightIcon fill='#ffffff' width= '34px' height='34px'/>
              </button>
            </div>
          </form>

         <Oauth/>

          <Link className='registerLink' to= '/sign-up'>SignUp Instead</Link>
        </main>
      </div>
    </>
  )
}

export default SignIn