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
    product: "",
    qty: 1,
    status: "Pending", 
  };
  
  const validationSchema = Yup.object().shape({
    product: Yup.string().required('Please Enter the product'),
    qty: Yup.number().required('Please Enter the quantity'),
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
                            <Link to={'/'} className={styles.link}>Back</Link>
                        </div>


                        <AntForm.Item label="Name" name="name">
                            <div>
                                <Field name="name" as={Input} placeholder="Enter Name" />
                        
                                <span className={styles.error}>
                                    <ErrorMessage name="name" />
                                </span>
                            </div>

                        </AntForm.Item>

                        <AntForm.Item label="Status" name="status">
                            <div>
                                <Select placeholder="Select Status" onChange={(value) => {
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