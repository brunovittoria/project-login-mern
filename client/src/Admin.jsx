import { useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"


export default function Admin() {
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:3001/home') //Ao fazer isso estamos protegendo a rota de quem nao esta logado
        .then(result => {
            console.log(result)
            if(result.data !== "Success"){
                navigate('/login')
            }
        })
        .catch(err => console.log(err))
    }, [])
    return(
        <h1>ADMIN PAGE</h1>
    )
}