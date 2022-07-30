import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {loginOut, addProduct, deleteProduct, updateProduct} from "../store/toolkit/tollkitSlice";
import Modal from "react-modal"
import _ from "lodash"
import {Button, Card, Form, InputGroup} from "react-bootstrap";

function Home(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [modal, setModal] = useState(false)
    const [paramsNewProduct, setParamsNewProduct] = useState({name: "", price: "", color: ""})
    const [reload, setreload] = useState("")
    const [clickType, setClickType] = useState({type: "", oldName: ""})

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    const handelAddProductClick = useCallback((type, name) => {
        setClickType({type: type, oldName: name})
        setModal(true)
    }, [])

    const handelLogOutCLick = useCallback(() => {
        dispatch(loginOut())
        navigate("/login", {replace: true})
    }, [])

    const handelChange = useCallback((key, value) => {
        paramsNewProduct[key] = value
        setParamsNewProduct(paramsNewProduct)
    }, [paramsNewProduct])

    const handelSetProduct = useCallback(() => {
            if (clickType.type === "add") {
                if ((/^[A-Z][a-z]+$/ig.test(paramsNewProduct.name)) &&
                    (/^[0-9]+[$£€¥₴₸₹₩₽֏]+$/ig.test(paramsNewProduct.price)) &&
                    (/^[A-Z][a-z]+$/ig.test(paramsNewProduct.color))){
                    dispatch(addProduct(paramsNewProduct))
                    setParamsNewProduct({name: "", price: "", color: ""})
                    setModal(false)
                }else{
                    alert("invalid values")
                }
            } else {
                if ((/^[A-Z][a-z+]+$/ig.test(paramsNewProduct.name) || paramsNewProduct.name === "") &&
                    (/^[0-9]+[$£€¥₴₸₹₩₽֏]+$/ig.test(paramsNewProduct.price)|| paramsNewProduct.price === "") &&
                    (/^[A-Z][a-z]+$/ig.test(paramsNewProduct.color) || paramsNewProduct.color === "")){
                    dispatch(updateProduct({newParams: paramsNewProduct, oldName: clickType.oldName}))
                    setParamsNewProduct({name: "", price: "", color: ""})
                    setModal(false)
                }else{
                    alert("invalid values")
                }
            }
        }, [modal])

    const handelClickDelete = useCallback((name) => {
        dispatch(deleteProduct(name))
        setreload(Math.random() * 100)
    }, [])

    const handelClouseSetProduct = useCallback(() => {
        setModal(false)
    }, [])

    return (
        <>
            <div style={{display: "flex"}}>
                {JSON.parse(localStorage.getItem("list"))?.find(datum => datum.status === "Online")?.carg?.map(datum => {
                    return (
                        <div style={{margin: "20px 0px 15px 50px"}} key={_.uniqueId()}>
                            <Card border="primary" style={{width: '18rem'}}>
                                <Card.Header>Product</Card.Header>
                                <Card.Body>
                                    <Card.Title>Product name - {datum.name}</Card.Title>
                                    <Card.Text>Product color - {datum.price}</Card.Text>
                                    <Card.Text>Product price - {datum.color}</Card.Text>
                                </Card.Body>
                            </Card>
                            <Button variant="outline-primary"
                                    onClick={() => handelAddProductClick("update", datum.name)}
                                    style={{width: "120px", margin: "0px 5px 0px 15px"}}>Update</Button>
                            <Button variant="outline-primary" onClick={() => handelClickDelete(datum.name)}
                                    style={{width: "120px", margin: "0px 5px 0px 15px"}}>Delete</Button>
                        </div>
                    )
                })}
                <Modal
                    isOpen={modal}
                    style={customStyles}
                    contentLabel="Example Modal"
                    appElement={document.getElementById('root')}
                >
                    <InputGroup className="mb-3">
                        <InputGroup.Text style={{
                            maxWidth: "17%",
                            minWidth: "17%",
                            marginLeft: "3%",
                            marginBottom: "15px",
                            borderBottomLeftRadius: "0px"
                        }}>
                            Write your product name</InputGroup.Text><Form.Control aria-label="First name"
                            onChange={(ev) => {handelChange("name", ev.target.value)}}
                            style={{maxWidth: "80%", minWidth: "80%", marginBottom: "15px", borderTopRightRadius: "10px"}}/><br/>
                        <InputGroup.Text style={{maxWidth: "17%", minWidth: "17%", marginLeft: "3%", marginBottom: "15px"}}>Write your product price</InputGroup.Text><Form.Control aria-label="First name"
                        onChange={(ev) => {handelChange("price", ev.target.value)}}
                        style={{maxWidth: "80%", minWidth: "80%", marginBottom: "15px"}}/>
                        <InputGroup.Text style={{
                            maxWidth: "17%",
                            minWidth: "17%",
                            marginLeft: "3%",
                            marginBottom: "15px",
                            borderBottomLeftRadius: "5px"
                        }}>
                            Write your product color</InputGroup.Text><Form.Control aria-label="First name"
                                                                                    onChange={(ev) => {
                                                                                        handelChange("color", ev.target.value)
                                                                                    }}
                                                                                    style={{
                                                                                        maxWidth: "80%",
                                                                                        minWidth: "80%",
                                                                                        marginBottom: "15px",
                                                                                        borderTopRightRadius: "0px"
                                                                                    }}/>
                    </InputGroup>
                    <div style={{display: "flex"}}>
                        <Button variant="outline-primary" onClick={handelSetProduct}
                                style={{marginLeft: "28%", width: "300px"}}>Add</Button>
                        <Button variant="outline-primary" onClick={handelClouseSetProduct}
                                style={{marginLeft: "5px", width: "300px"}}>Clouse</Button>
                    </div>
                </Modal>
            </div>
            <div>
                <Button variant="outline-primary" onClick={() => handelAddProductClick("add")}
                        style={{width: "300px", marginTop: "50px"}}>Add product</Button>
                <Button variant="outline-primary" onClick={handelLogOutCLick}
                        style={{width: "300px", marginTop: "50px"}}>Login out</Button>
            </div>
        </>
    );
}

export default Home;