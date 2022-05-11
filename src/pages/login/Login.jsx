import axios from 'axios'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import './login.css'
import { Link } from 'react-router-dom'

const Login = () => {
	const [credentials, setCredentials] = useState({
		username: undefined,
		password: undefined,
	})

	const { loading, error, dispatch } = useContext(AuthContext)

	const navigate = useNavigate()

	const handleChange = (e) => {
		setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }))
	}

	const handleClick = async (e) => {
		e.preventDefault()
		dispatch({ type: 'LOGIN_START' })
		try {
			const res = await axios.post('/auth/login', credentials)
			dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.details })
			navigate('/')
		} catch (err) {
			dispatch({ type: 'LOGIN_FAILURE', payload: err.response.data })
		}
	}

	return (
		<div className='login'>
			<div className='lContainer'>
				<input
					type='text'
					placeholder='username'
					id='username'
					onChange={handleChange}
					className='lInput'
				/>
				<input
					type='password'
					placeholder='password'
					id='password'
					onChange={handleChange}
					className='lInput'
				/>
				<button disabled={loading} onClick={handleClick} className='lButton'>
					Login
				</button>
				<p>
					Not registered ?{' '}
					<Link to='/register' className='reg-login-link'>
						register here
					</Link>{' '}
				</p>
				<p>
					<Link to='/' className='reg-login-link'>
						Go to home
					</Link>
				</p>
				{error && <span>{error.message}</span>}
			</div>
		</div>
	)
}

export default Login
