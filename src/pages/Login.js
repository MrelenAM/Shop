import React, {useCallback, useState} from 'react';
import {useDispatch} from "react-redux";
import {setStatus} from "../store/toolkit/tollkitSlice";
import {useNavigate} from "react-router-dom";
import {Button, Form, InputGroup} from "react-bootstrap";

function Login(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loginInfo, setLoginInfo] = useState({email: "", password: ""})

    const handelChange = useCallback((key, value) => {
        loginInfo[key] = value
        setLoginInfo(loginInfo)
    }, [loginInfo])

    const handelClick = useCallback(() => {
        if (/^[a-zA-Z0-9.]{6,}@[a-z]+.[a-z]+$/g.test(loginInfo.email) &&
            /^[a-zA-Z0-9+@.]{6,}$/g.test(loginInfo.password)) {
            if (JSON.parse(localStorage.getItem("list")).find(
                (datum) => {
                    return datum.email === loginInfo.email &&
                        datum.password === loginInfo.password
                })) {
                dispatch(setStatus(loginInfo.email))
                navigate("/home", {replace: true})
            } else {
                alert("Invalid User")
            }
        }
    }, [])

    return (
            <div style={{marginTop: "15px", maxWidth: "90%", minWidth: "90%"}}>
                <InputGroup className="mb-3">
                    <InputGroup.Text style={{maxWidth: "20%", minWidth: "17%", marginLeft: "3%"}}>Write your email</InputGroup.Text><Form.Control aria-label="First name"
                    onChange={(ev) => {handelChange("email", ev.target.value)}}
                    style={{maxWidth: "80%", minWidth: "80%"}}/><br/>
                    <InputGroup.Text style={{maxWidth: "20%", minWidth: "17%", marginLeft: "3%"}}>Write your password</InputGroup.Text><Form.Control aria-label="First name"
                    onChange={(ev) => {handelChange("password", ev.target.value)}}
                    style={{maxWidth: "80%", minWidth: "80%"}} type="password"/>
                </InputGroup>
            <Button variant="outline-primary" onClick={handelClick} style={{marginLeft: "35%", width: "300px"}}>Ready</Button>
        </div>
    );
}

export default Login;