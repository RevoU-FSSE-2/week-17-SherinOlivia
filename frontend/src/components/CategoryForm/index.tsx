import { Button, Card, Col, Select, Row, Input, Form as AntForm } from 'antd';
import styles from './CategoryForm.module.css'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import { TextLevel } from "../../components";
import { CategoryInfo, CategoryFormInfo } from "../../types";
import { Link } from 'react-router-dom';

interface Props {
    onSubmit: (values: CategoryFormInfo) => void;
    category?: CategoryInfo
    content: string;
}
const initialValues = {
    name: '',
    is_active: false
}

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Please Enter the Name'),
    is_active: Yup.boolean().oneOf([true, false], 'Please Select the Status').required('Please Select the Status!')
})

const CategoryForm = ({onSubmit, category, content}: Props) => {
    const handleCategory = async (values: CategoryFormInfo) => {
        onSubmit(values)
    }
    
    return (
        <Row className={styles.wrapper}>
        <Col span={8}></Col>
        <Col span={8}>
            <Card className={styles.card}>
                <Formik 
                initialValues={category ?? initialValues}
                validationSchema={validationSchema}
                onSubmit={handleCategory}>
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

                        <AntForm.Item label="Status" name="is_active">
                            <div>
                                <Select placeholder="Select Status" onChange={(value) => {
                                formikProps.setFieldValue("is_active", value);
                                }} 
                                value={formikProps.values.is_active || undefined}
                                >
                                <Select.Option value="true">Active</Select.Option>
                                <Select.Option value="false">Deactive</Select.Option>
                                </Select>
                                
                                <div className={styles.error}>
                                    <ErrorMessage name="is_active" />
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

export default CategoryForm