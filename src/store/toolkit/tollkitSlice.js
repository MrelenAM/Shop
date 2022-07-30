import {createSlice} from "@reduxjs/toolkit";

const toolkitSlice = createSlice({
    name: "toolkit",
    initialState: {},
    reducers: {
        addData(state, action) {
            state.data = JSON.parse(localStorage.getItem("list"))
            state.data.push(action.payload)
            window.localStorage.setItem("list", JSON.stringify(state.data))
        },
        setStatus(state, action) {
            state.data = JSON.parse(localStorage.getItem("list"))
            state.data.map(datum => {
                if (datum.email === action.payload) {
                    datum.status = "Online"
                } else {
                    datum.status = "Offline"
                }
            })
           window.localStorage.setItem("list", JSON.stringify(state.data))
        },
        loginOut(state) {
            state.data = JSON.parse(localStorage.getItem("list"))
            state.data.map(datum => {
                datum.status = "Offline"
            })
            window.localStorage.setItem("list", JSON.stringify(state.data))
        },
        addProduct(state, action) {
            const product = action.payload
            state.data = JSON.parse(localStorage.getItem("list"))
            if (!Boolean(JSON.parse(localStorage.getItem("list")).find(
                datum => datum.status === "Online").carg)) {
                state.data.find(datum => datum.status === "Online").carg = []
                state.data.find(datum => datum.status === "Online").carg.push(product)
            } else {
                if (!Boolean(JSON.parse(localStorage.getItem("list")).find(
                    datum => datum.status === "Online").carg.find((value) => value.name === product.name))) {
                    state.data.find(datum => datum.status === "Online").carg.push(product)
                }
            }
            window.localStorage.setItem("list", JSON.stringify(state.data))
        },
        deleteProduct(state, action) {
            state.data = JSON.parse(localStorage.getItem("list"))
            state.data.find(datum => datum.status === "Online").carg = state.data.find(
                datum => datum.status === "Online").carg.filter(datum => datum.name !== action.payload)
            window.localStorage.setItem("list", JSON.stringify(state.data))
        },
        updateProduct(state, action) {
            state.data = JSON.parse(localStorage.getItem("list"))
            state.data.find(datum => datum.status === "Online").carg.map((datum) => {
                if (datum.name === action.payload.oldName) {
                    if (!Boolean(state.data.find(datum => datum.status === "Online").carg.find(
                        datum => datum.name === action.payload.newParams.name))) {
                        if (action.payload.newParams.name !== "") {
                            datum.name = action.payload.newParams.name
                        }
                        if (action.payload.newParams.price !== "") {
                            datum.price = action.payload.newParams.price
                        }
                        if (action.payload.newParams.color !== "") {
                            datum.color = action.payload.newParams.color
                        }
                    }
                }
            })
            window.localStorage.setItem("list", JSON.stringify(state.data))
        }
    }
})

export default toolkitSlice.reducer
export const {addData, setStatus, loginOut, addProduct, deleteProduct, updateProduct} = toolkitSlice.actions