import React, { useState } from "react";
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Switch from '@mui/joy/Switch';
import axios from 'axios';
import "./inputarea.css";

function InputArea() {
    const [newUser, setNewUser] = React.useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [submitError, setSubmitError] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const userData = {email, password}
            if (password === confirmPass) {
                const response = await axios.post("http://localhost:3000/api/users", userData);
            } else {
                setSubmitError(true);
                throw new TypeError("Passwords do not match")
            }
        } catch (err) {
            console.error("Error adding user.", err);
        }
    }

    return (
        <div className="container">
            <form className="box" onSubmit={handleSubmit}>
                <h1>{newUser ? "Register user" : "Login"}</h1>
                <div className="input-container">
                    <Input className="emailInput" placeholder={newUser ? "New email..." : "Email..."} value={email} onChange={(e) => setEmail(e.target.value)} variant="soft" size="sm"/>
                    <Input className= "passwordInput" placeholder={newUser ? "New password..." : "Password..."} value={password} onChange={(e) => setPassword(e.target.value)} variant="soft" size="sm"/>
                    {newUser && <Input className= "passwordConfirm" placeholder="Confirm new password..." value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} variant="soft" size="sm" />}
                    {submitError && <p>Error adding user.</p>}
                </div>
                <div className="button-container">
                    <Button type="submit" className="inputButton" size="sm">{newUser ? "Register" : "Login"}</Button>
                    <Switch className="userSwitch" size="sm" checked={newUser} onChange={(event) => setNewUser(event.target.checked)}/>
                    <p>I'm a new user</p>
                </div>
            </form>
        </div>
    )
}

export default InputArea;