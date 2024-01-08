import { useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"


export default function Admin() {
    const navigate = useNavigate()

    axios.defaults.withCredentials = true
    useEffect(() => {
        axios.get('http://localhost:3001/check-auth') //Ao fazer isso estamos protegendo a rota de quem nao esta logado
        .then(result => {
            console.log(result)
            if(result.data !== "Success"){
                navigate('/login')
            }
        })
        .catch(err => {
            console.log(err)
            navigate('/login')
        })
    },[])
    return(
        <h1>ADMIN PAGE</h1>
    )
}