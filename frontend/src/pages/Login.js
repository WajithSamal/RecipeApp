import { useState } from "react"
import { useLogin } from "../hooks/useLogin";
import './form.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoaging} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password)
  }

  return (
      <form className="login auth-container" onSubmit={handleSubmit}>
          <h3>Log In</h3>

          <label>Email address:</label>
          <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
          />
          <label>Password:</label>
          <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
          />

          {error && <div className="error-message">{error}</div>}

          <button disabled={isLoaging}>Log in</button>

          <p className="form-link">Don't have an account? <a href="/signup">Create an account</a></p>
      </form>

  )
}

export default Login
