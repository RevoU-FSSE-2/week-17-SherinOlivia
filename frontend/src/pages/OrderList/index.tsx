import { useCallback, useEffect, useState } from 'react';
import { Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import { TextLevel, OrderList as OrderListComponent } from '../../components'
import styles from './OrderList.module.css'
export interface OrderInfo {
  id: string;
  product: string;
  qty: number;
  status: string;
}

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<OrderInfo[]>([]);
  const navigate = useNavigate();
  const apiUrl = "https://w17sh-backend-img-cifhetjmdq-uw.a.run.app/api/orders"

const handleLogOut = async () => {
  const apiUrlLogout = "https://w17sh-backend-img-cifhetjmdq-uw.a.run.app/api/users/logout"

  try {
    const response = await fetch (apiUrlLogout, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    console.log(response)
    navigate('/login');
    
  } catch (error) {
      console.error(error)
      alert("Login Failedddd...!")
  }
} 

const getOrder = useCallback(
   async () => {

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      credentials: 'include',
    });      if (response.ok) {
      const result = await response.json();

      if (result && result.data && Array.isArray(result.data.data)) {
        // Access the nested data array and map it to your state
        const datas = result.data.data.map((order: OrderInfo) => ({
          ...order,
          key: order.id,
        }));
        setOrders(datas);
      } else {
        setOrders([]); // Handle the case where the structure doesn't match the expected format
      }
    } else {
      // Handle the case when the response status is not OK (e.g., 4xx or 5xx errors)
      console.error("Request failed with status:", response.status);
      alert("Failed to fetch Orders!");
    }
  } catch (error) {
    console.error("ERROR:", error);
    alert("Failed to fetch Orders!");
  }
},[navigate]);

useEffect(() => {
  getOrder()
}, [getOrder])

  // remove/delete item
  const removeOrder = async (id: string) => {
    try {
        const response = await fetch(apiUrl, {
          method: 'DELETE',
        })
  
        if(response) {
          setOrders((prevOrders) =>
          prevOrders.filter((order) => order.id !== id)
        );
          navigate(0)
          console.log('Successfully Removed Order');
        }
    } catch (error) {
        console.error(error)
    }
  }
  
  const columns: ColumnsType<OrderInfo> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text) => text || 'N/A',  // Render 'N/A' if 'id' is falsy or undefined
    },
    {
      title: 'Product',
      dataIndex: 'product_name',
      key: 'product_name',
      render: (text) => text || 'N/A',  // Render 'N/A' if 'product' is falsy or undefined
    },
    {
      title: 'Qty',
      dataIndex: 'order_qty',
      key: 'order_qty',
      render: (number) => number || 'N/A',  // Render 'N/A' if 'product' is falsy or undefined
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (number) => number || 'N/A',  // Render 'N/A' if 'product' is falsy or undefined
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => {
        if (record.status === 'Completed') {
          return 'Completed';
        } else if (record.status === 'Cancelled') {
          return 'Cancelled';
        } else {
          return 'Pending';
        }
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <>
          <Button type='primary' onClick={() => navigate(`/edit/${record.id}`)} className={styles.actionButton}>Edit</Button>
          <Button type='primary' onClick={() => removeOrder(record.id)} htmlType="button" danger>Delete</Button>
        </>
      ),
    },
  ];
  

  return (
    <>
    <div className={styles.orderList}>
      <div className={styles.orderTitle}>
        <span><Button type={'primary'} onClick={() => navigate('/add')}>Create New</Button></span>

        <TextLevel level={1} title={"List of Order"} />

        <div>
          <Button type={'primary'} onClick={() => navigate('/profile')} className={styles.userButton}>Profile</Button>
          <Button type={'primary'} onClick={handleLogOut} className={styles.logout} danger>Log Out</Button>
        </div>
      </div>
      <OrderListComponent
      columns={columns} 
      data={orders || []}
      />
    </div>
    </>
  )
}

export default OrderList;