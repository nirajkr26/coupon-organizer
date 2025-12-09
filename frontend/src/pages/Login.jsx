import axios from 'axios'
import LogoIcon from "../icons/LogoIcon"
import { BASE_URL } from '../config/config'
import { useEffect, useState } from 'react'
import { usePasswordValidation } from "../hooks/usePasswordValidation"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const { password, setPassword, validation } = usePasswordValidation();
  const showValidation = password.length >= 1;
  const { user, setUser } = useAuth()

  const handleLogin = async () => {
    if (!email || !password) {
      toast.warning("Email and Password are required");
      return
    }
    if (!isLogin && (!firstName || !lastName)) {
      toast.warning("Please fill all fields to sign up!")
      return
    }

    if (Object.values(validation).includes(false)) {
      toast.warning("Please enter a strong password!")
      return;
    }

    try {
      const endpoint = isLogin ? "/login" : "/signup";
      const payload = isLogin ? { email, password } : { firstName, lastName, email, password };

      const response = await axios.post(BASE_URL + endpoint, payload, {
        withCredentials: true
      })
      console.log(response)
      if (response.status === 200) {
        toast.success(response.data.message)
        navigate("/dashboard")
      }

    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  const redirect = async () => {
    try {

      const response = await axios.get(BASE_URL + "/verify", {
        withCredentials: true
      })

      if (response.status === 200) {
        setUser(response.data.data)
        navigate("/dashboard")
      }
    } catch (err) {

    }
  }

  useEffect(() => {
    redirect()

  }, [])

  useEffect(() => {
    const inputs = document.querySelectorAll("input")
    const preventSpace = (e) => {
      if (e.key === " ") {
        e.preventDefault();
      }
    }

    inputs.forEach((input) => document.addEventListener("keydown", preventSpace));

    return () => {
      inputs.forEach((input) => document.removeEventListener("keydown", preventSpace));
    }
  }, [])

  return (
    <div className='h-screen bg-slate-800 flex flex-col gap-10 justify-center items-center'>
      <div className='text-3xl font-bold text-white items-center hap-3 pt-4 flex'>{<LogoIcon />} CUPPU</div>
      <div className='bg-white w-80 p-8 rounded-md border border-gray-400 flex flex-col gap-2'>
        {!isLogin && <>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className='border rounded-md p-2' placeholder='First Name' />
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className='border rounded-md p-2' placeholder='Last Name' /></>
        }
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='border rounded-md p-2' placeholder='Email' />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='border rounded-md p-2' placeholder='Password' />

        <button onClick={handleLogin} className={` hover:bg-black bg-slate-700 text-white rounded-md p-2 ${(!email || !password) ? "opacity-85 cursor-not-allowed":"cursor-pointer"}`}>{isLogin ? "Log In" : "Sign Up"}</button>
        <p onClick={() => setIsLogin(!isLogin)} className='font-mono cursor-pointer text-center text-sm text-gray-600'>{isLogin ? "New User? Sign Up Here" : "Already Have Account? Log In"}</p>

        {showValidation && <div className='text-sm text-center'>
          <p className={validation.upper ? "text-green-600" : "text-red-600"}>• Contains uppercase</p>
          <p className={validation.lower ? "text-green-600" : "text-red-600"}>
            • Contains lowercase
          </p>
          <p className={validation.number ? "text-green-600" : "text-red-600"}>
            • Contains number
          </p>
          <p className={validation.length ? "text-green-600" : "text-red-600"}>
            • Minimum 8 characters
          </p>
        </div>
        }
      </div>

    </div>
  )
}

export default Login