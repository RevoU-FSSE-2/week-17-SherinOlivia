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
  const apiUrl = "https://week-17-sherinolivia.up.railway.app/api/orders"

const handleLogOut = () => {
  navigate('/login');
} 

const getOrder = useCallback(
   async () => {

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      credentials: 'include',
    });
    const data = await response.json();
    console.log(data)
    
    if (data && data.data) {
      const datas = data.data.map((order: { id: string; }) => ({
        ...order,
        key: order.id
      }));
      setOrders(datas);
    } else {
      setOrders([]);
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
      dataIndex: 'product',
      key: 'product_name',
      render: (text) => text || 'N/A',  // Render 'N/A' if 'product' is falsy or undefined
    },
    {
      title: 'Qty',
      dataIndex: 'qty',
      key: 'qty',
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