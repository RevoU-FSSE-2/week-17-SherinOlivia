import { useNavigate, useParams } from "react-router-dom"
import { OrderInfo, OrderFormInfo as UpdateInfo } from "../../types";
import { OrderForm as OrderUpdateComponent } from "../../components";
import { useCallback, useEffect, useState } from "react";
import Cookies from 'js-cookie';

const UpdateOrder = () => {
    const navigate = useNavigate()
    const [orders, setOrders] = useState<OrderInfo>()
    const apiUrl = import.meta.env.VITE_REACT_APP_BASE_UPDATE_URL;
    const token = Cookies.get("access_token");
    const { id } = useParams()

    const getOrder = useCallback(
        async () => {

            if(!token){
                navigate('/login')
                return
              }
              
            try {
                const fetchUpdate = await fetch(apiUrl, {
                    headers: {
                        'Content-Type': 'application/json',
                    },

                });
                if (fetchUpdate.ok) {

                    const response: OrderInfo = await fetchUpdate.json()
                    setOrders(response)
                    
                } else {

                    console.log("Error getting data..")
                }
            } catch (error) {
                console.error(error)
            }
        },[]
    )

    useEffect(
        () => {
            getOrder()
        },[getOrder]
    )

    const handleUpdate = async (values: UpdateInfo) => {
        console.log(values)
        try {
            const response = await fetch (`${apiUrl}update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...values, id:id })
            })
            if (response.ok) {
                console.log(response)
                console.log("successs")
                navigate('/');  
            } else {
                console.log("Failed to edit Order")
                return
            }
   
        } catch (error) {
            console.error(error)
            alert("Failed to Edit Order...!")
        }  
      }

    if(orders) {
        return <OrderUpdateComponent onSubmit={handleUpdate} content={"Edit Order"} />
  
}
    return null 
}

export default UpdateOrder