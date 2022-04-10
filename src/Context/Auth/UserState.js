import { useState } from "react";
import UserContext from "./UserContext";

export default function NoteState(props) {

    const host = "http://localhost:5000";
    const [user, setUser] = useState(null);

    const getUser = async () => {
        const response = await fetch(`${host}/api/auth/getuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('auth-token')
            }
        });
        const json = await response.json();
        setUser(json);
    }

    const signIn = async (userCredential) => {
        const res = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userCredential)
        });
        const json = await res.json()

        if (json.error) {
            return json.error;
        }

        else {
            localStorage.setItem('auth-token', json.authtoken);
            getUser();
            return json.authtoken;
        }
    }

    const signOut = async () => {
        setUser(null)
        localStorage.removeItem('auth-token');
    }

    const createUser = async (user) => {
        const res = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        });
        const json = await res.json()

        if (json.error) {
            return json.error;
        }

        else {
            localStorage.setItem('auth-token', json.authtoken);
            getUser();
            return json.authtoken;
        }
    }

    return (
        <UserContext.Provider value={{ user, getUser, signIn, signOut, createUser }}>
            {props.children}
        </UserContext.Provider>
    )
}