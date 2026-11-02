import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const api = 'https://test-swagger-2ph6.onrender.com/auth/login'
    const navigate = useNavigate()
    async function proverke() {
        try {
           let {data} =  await axios.post(api,{email: email, password: password})

           if(data.token){
               localStorage.setItem('token', data.token)
            navigate('/')
           }
        } catch (error) {
            console.error("login problem");
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (token) {
            navigate('/')
        }
    }, [navigate])
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Modal</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>
            Enter your account details.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <Input type="email" placeholder="Email" value={email}
           onChange={(e) => setEmail(e.target.value)}
           />
          <Input type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
          <Button className="w-full" onClick={proverke}>Login</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default Login