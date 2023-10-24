import { Button, Card, Col, Select, Row, Input, Form as AntForm } from 'antd';
import styles from './OrderForm.module.css'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import { TextLevel } from "../../components";
import { OrderInfo, OrderFormInfo } from "../../types";
import { Link } from 'react-router-dom';

interface Props {
    onSubmit: (values: OrderFormInfo) => void;
    order?: OrderInfo
    content: string;
}

const initialValues = {
    product_name: "",
    order_qty: 1,
    status: "Pending", 
  };
  
  const validationSchema = Yup.object().shape({
    product_name: Yup.string().required('Please Enter the product'),
    order_qty: Yup.number().required('Please Enter the quantity'),
    status: Yup.string().required('Please Select the Status!'),
  });
  

const OrderForm = ({onSubmit, order, content}: Props) => {
    const handleOrder = async (values: OrderFormInfo) => {
        onSubmit(values)
    }
    
    return (
        <Row className={styles.wrapper}>
        <Col span={8}></Col>
        <Col span={8}>
            <Card className={styles.card}>
                <Formik 
                initialValues={order ?? initialValues}
                validationSchema={validationSchema}
                onSubmit={handleOrder}>
                    {(formikProps) => (
                    <Form name="basic" autoComplete="off" >
                        <div className={styles.middle}>
                            <TextLevel level={3} title={content} />
                            <Link to={'/dashboard'} className={styles.link}>Back</Link>
                        </div>


                        <AntForm.Item label="Product Name" htmlFor="product_name">
                            <div>
                                <Field id="product_name" name="product name" as={Input} placeholder="Enter Product Name" />
                        
                                <span className={styles.error}>
                                    <ErrorMessage name="product name" />
                                </span>
                            </div>

                        </AntForm.Item>

                        <AntForm.Item label="Order Qty" htmlFor="order_qty">
                            <div>
                                <Field id="order_qty" name="order qty" as={Input} placeholder="Enter Order Qty" />
                        
                                <span className={styles.error}>
                                    <ErrorMessage name="order qty" />
                                </span>
                            </div>

                        </AntForm.Item>

                        <AntForm.Item label="Status" htmlFor="status">
                            <div>
                                <Select id="status" placeholder="Select Status" onChange={(value) => {
                                formikProps.setFieldValue("status", value);
                                }} 
                                value={formikProps.values.status || undefined}
                                >
                                    <Select.Option value="Pending">Pending</Select.Option>
                                    <Select.Option value="Completed">Completed</Select.Option>
                                    <Select.Option value="Cancelled">Cancelled</Select.Option>
                                </Select>
                                
                                <div className={styles.error}>
                                    <ErrorMessage name="status" />
                                </div>
                            </div>
                        </AntForm.Item>

                        <AntForm.Item wrapperCol={{ offset: 8, span: 16 }} className={styles.button}>
                            <div>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Create
                                </Button>
                            </div>
                        </AntForm.Item>
                    </Form>
                    )}
                </Formik>
            </Card>
        </Col>
        </Row>
    
    )
      
}

export default OrderForm