import { useNavigate } from "react-router-dom"
import {  OrderFormInfo as CreateInfo } from "../../types";
import { OrderForm as CreateNewComponent } from "../../components";


const CreateNew = () => {
    const navigate = useNavigate()

    const handleCreate = async (values: CreateInfo) => {
        const apiUrl = "https://w17sh-backend-img-cifhetjmdq-uw.a.run.app/api/orders/new"
      
        try {
            const response = await fetch (apiUrl, {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(values)
            })
            if (response.ok) {
                console.log(response)
                await response.json()
                navigate('/dashboard');  
            } else {
                console.log("Failed to create new Order")
                return
            }
   
        } catch (error) {
            console.error(error)
            alert("Failed to Create New Order...!")
        }  
      }

    return (
        <CreateNewComponent onSubmit={handleCreate} content={"Create New Order"} />
    )    
}

export default CreateNew