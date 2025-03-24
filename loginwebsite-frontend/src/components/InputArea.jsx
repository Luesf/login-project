import React, { useState } from "react";
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Switch from '@mui/joy/Switch';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from "@mui/joy/ModalDialog";
import Typography from '@mui/joy/Typography';
import axios from 'axios';
import "./inputarea.css";

function InputArea() {
    const [newUser, setNewUser] = React.useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [submitMessage, setSubmitMessage] = useState("User registered successfully.");
    const [modalOpen, setModalOpen] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const userData = {email, password}
            if (newUser) {
                if (password === confirmPass) {
                    if (email.length === 0 || password.length === 0) {
                        setSubmitMessage("Email/Password can't be empty, please try again.");
                        throw new TypeError("Email/Password can't be empty, please try again.");
                    } else {
                        setSubmitMessage("User registered successfully.")
                        const response = await axios.post("http://localhost:3000/api/users", userData);
                    }
                } else {
                    setSubmitMessage("Passwords do not match.");
                    throw new TypeError("Passwords do not match.");
                }
            } else {
                setSubmitMessage("Logged in sucessfully.")
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
                    <Input className= "passwordInput" type="password" placeholder={newUser ? "New password..." : "Password..."} value={password} onChange={(e) => setPassword(e.target.value)} variant="soft" size="sm"/>
                    {newUser && <Input className= "passwordConfirm" type="password" placeholder="Confirm new password..." value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} variant="soft" size="sm" />}
                </div>
                <div className="button-container">
                    <Button type="submit" className="inputButton" size="sm" onClick={() => setModalOpen(true)}>{newUser ? "Register" : "Login"}</Button>
                    <Switch className="userSwitch" size="sm" checked={newUser} onChange={(event) => setNewUser(event.target.checked)}/>
                    <p>I'm a new user</p>
                </div>
            </form>
            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                <ModalDialog color="neutral" variant="soft" sx={{pr: 5}}>
                    <ModalClose />
                    <Typography fontSize={14}>{submitMessage}</Typography>
                </ModalDialog>
            </Modal>
        </div>
    )
}

export default InputArea;