import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import UserContext from '../Context/Auth/UserContext'

export default function SignIn() {
    const context = useContext(UserContext)
    const { user, getUser, signIn, signOut, createUser } = context;
    let history = useHistory();
    const [userCredential, setUserCredential] = useState({email: "", password: ""})
    const [usere, setUsere] = useState({name: "",email: "", password: ""})

    const handleChange = (e)=> {
        setUserCredential({...userCredential, [e.target.name]: e.target.value})
    }

    const handle_Change = (e)=> {
        setUsere({...usere, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e)=> {
        e.preventDefault()
        const res = await signIn(userCredential);
        if (res.error) {
            alert(res.error)
        }
        else {
            history.push("/")
        }
    }

    const handle_Submit = async (e)=> {
        e.preventDefault()
        const res = await createUser(usere);
        if (res.error) {
            alert(res.error)
        }
        else {
            await signIn({email: usere.email, password: usere.password})
            history.push("/")
        }
    }

    useEffect(() => {
        if (localStorage.getItem('auth-token')) {
            getUser();
        }
        // eslint-disable-next-line
    }, [])

    if (user) {

        return (
            <div>
                <h1>logged in as {user.name}</h1>
                <button onClick={signOut}>SignOut</button>
            </div>
        )
    }

    return (
        <div>
            <h1>You Need to sign in first</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email : </label>
                <input name='email' type="email" value={userCredential.email} onChange={handleChange} /><br />
                <label htmlFor="password">Password : </label>
                <input name='password' type="password" value={userCredential.password} onChange={handleChange} /><br />
                <button type="submit">Submit</button>
            </form>
            <h1>Or, Sign Up</h1>
            <form onSubmit={handle_Submit}>
                <label htmlFor="name">Name : </label>
                <input name='name' type="name" value={usere.name} onChange={handle_Change} /><br />
                <label htmlFor="email">Email : </label>
                <input name='email' type="email" value={usere.email} onChange={handle_Change} /><br />
                <label htmlFor="password">Password : </label>
                <input name='password' type="password" value={usere.password} onChange={handle_Change} /><br />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
