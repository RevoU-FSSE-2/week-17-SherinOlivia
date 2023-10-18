import { useCallback, useEffect, useState } from 'react';
import { Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import { TextLevel, CategoryList as CategoryListComponent } from '../../components'
import styles from './CategoryList.module.css'

export interface CategoryInfo {
  id: string;
  name: string;
  is_active: boolean;
}

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<CategoryInfo[]>([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');

const handleLogOut = () => {
  localStorage.removeItem('authToken')
  navigate('/login');
} 

const getCategory = useCallback(
   async () => {

  if(!token){
    navigate('/login')
    return
  }

  console.log("Auth Token:", token);
  try {
    const response = await fetch('https://mock-api.arikmpt.com/api/category/', {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    const data = await response.json();
    console.log(data)
    
    if (data && data.data) {
      const datas = data.data.map((category: { id: string; }) => ({
        ...category,
        key: category.id
      }));
      setCategories(datas);
    } else {
      setCategories([]);
    }
  } catch (error) {
    console.error("ERROR:", error);
    alert("Failed to fetch Categories!");
  }
},[navigate]);

useEffect(() => {
  getCategory()
}, [getCategory])

  // remove/delete item
  const removeCategory = async (id: string) => {
    try {
        const response = await fetch(`https://mock-api.arikmpt.com/api/category/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        })
  
        if(response) {
          setCategories((prevCategories) =>
          prevCategories.filter((category) => category.id !== id)
        );
          navigate(0)
          console.log('Successfully Removed category');
        }
    } catch (error) {
        console.error(error)
    }
  }
  
  const columns: ColumnsType<CategoryInfo> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text) => text || 'N/A',  // Render 'N/A' if 'id' is falsy or undefined
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => text || 'N/A',  // Render 'N/A' if 'name' is falsy or undefined
    },
    {
      title: 'Status',
      dataIndex: 'is_active',
      key: 'is_active',
      render: (_, record) => (record.is_active ? 'Active' : 'Deactive')
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <>
          <Button type='primary' onClick={() => navigate(`/edit/${record.id}`)} className={styles.actionButton}>Edit</Button>
          <Button type='primary' onClick={() => removeCategory(record.id)} htmlType="button" danger>Delete</Button>
        </>
      ),
    },
  ];
  

  return (
    <>
    <div className={styles.categoryList}>
      <div className={styles.categoryTitle}>
        <span><Button type={'primary'} onClick={() => navigate('/add')}>Create New</Button></span>

        <TextLevel level={1} title={"List of Category"} />

        <div>
          <Button type={'primary'} onClick={() => navigate('/profile')} className={styles.userButton}>Profile</Button>
          <Button type={'primary'} onClick={handleLogOut} className={styles.logout} danger>Log Out</Button>
        </div>
      </div>
      <CategoryListComponent
      columns={columns} 
      data={categories || []}
      />
    </div>
    </>
  )
}

export default CategoryList;