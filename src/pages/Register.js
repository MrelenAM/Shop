import React, {useCallback, useEffect, useState} from 'react';
import {addData} from "../store/toolkit/tollkitSlice";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom"
import {InputGroup, Form, Button} from "react-bootstrap";

function Register(props) {
    const dispatch = useDispatch();
    const [regInfo, setRegInfo] = useState({email: "", password: "", name: ""})
    const navigate = useNavigate()

    useEffect(() => {
        window.localStorage.setItem("list", JSON.stringify([
            {name: "Test", email: "test12@te.st", password: "Test12"},
            {name: "Test2", email: "test122@te.st", password: "Test12"},
        ]))
        JSON.parse(localStorage.getItem("list"))
    }, [dispatch])


    const handelChange = useCallback((key, value) => {
        regInfo[key] = value
        setRegInfo(regInfo)
    }, [regInfo])

    const handelRegInfoClick = useCallback(() => {
        if (/^[a-zA-Z0-9.]{6,}@[a-z]+.[a-z]+$/g.test(regInfo.email) &&
            /^[A-Z][a-z\-A-Z]{4,}$/g.test(regInfo.name) &&
            /^[a-zA-Z0-9+@.]{6,}$/g.test(regInfo.password)
        ) {
            if (Boolean(JSON.parse(localStorage.getItem("list")).find((datum) => {
                return datum.email === regInfo.email
            }))) {
                alert("Email busy")
            } else {
                dispatch(addData(regInfo))
                navigate("/login", {repair: true})
            }
        } else {
            alert("Invalid Params")
        }
    }, [])

    return (
        <>
            <div style={{marginTop: "15px", maxWidth: "80%", minWidth: "80%"}}>
                <InputGroup className="mb-3">
                    <InputGroup.Text style={{maxWidth: "20%", minWidth: "17%", marginLeft: "3%"}}>Write your email</InputGroup.Text><Form.Control aria-label="First name"
                     onChange={(ev) => {handelChange("email", ev.target.value)}}
                    style={{maxWidth: "80%", minWidth: "80%"}}/><br/>
                    <InputGroup.Text style={{maxWidth: "20%", minWidth: "17%", marginLeft: "3%"}}>Write your name</InputGroup.Text><Form.Control aria-label="First name"
                    onChange={(ev) => {handelChange("name", ev.target.value)}}
                    style={{maxWidth: "80%", minWidth: "80%"}}/>
                    <InputGroup.Text style={{maxWidth: "20%", minWidth: "17%", marginLeft: "3%"}}>Write your password</InputGroup.Text><Form.Control aria-label="First name"
                    onChange={(ev) => {handelChange("password", ev.target.value)}}
                    style={{maxWidth: "80%", minWidth: "80%"}} type="password"/>
                </InputGroup>
            </div>
            <Button variant="outline-primary" onClick={handelRegInfoClick} style={{marginLeft: "20%", width: "300px"}}>Ready</Button>
        </>
    );
}

export default Register;