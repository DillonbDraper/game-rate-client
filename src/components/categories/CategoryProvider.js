import React, { useState } from "react"

export const CategoryContext = React.createContext()

export const CategoryProvider = (props) => {
    const [categories, setCategories] = useState([])


    const getCategories = () => {
        return fetch("http://localhost:8000/categories", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(setCategories)
    }

    // const createcategory = (category) => {
    //     return fetch("http://localhost:8000/categorys", {
    //         method: "POST",
    //         headers: {
    //             "Authorization": `Token ${localStorage.getItem("lu_token")}`,
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(category),
    //     }).then(getcategorys)
    // }

    // const editcategory = category => {
    //     return fetch(`http://localhost:8000/categorys/${category.id}`, {
    //         method: "PUT",
    //         headers: {
    //             "Authorization": `Token ${localStorage.getItem("lu_token")}`,
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(category),
    //     }).then(getcategorys)
    // }

    // const getcategory = categoryId => {
    //     return fetch(`http://localhost:8000/categorys/${categoryId}`, {
    //         method: "GET",
    //         headers: {
    //             "Authorization": `Token ${localStorage.getItem("lu_token")}`
    //         }
    //     })
    //         .then(response => response.json())
    //         .then(setcategory)
    // }

    return (
        <CategoryContext.Provider value={{ categories, getCategories }} >
            { props.children}
        </CategoryContext.Provider>
    )
}