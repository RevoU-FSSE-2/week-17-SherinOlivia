import { Button, Card, Col, Row, Input, Form as AntForm } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import styles from './Login.module.css'
import { Formik, Form, Field, ErrorMessage  } from 'formik';
import * as Yup from 'yup'
import { Link } from 'react-router-dom';
import { LoginInfo } from '../../types';


interface Props {
    onSubmit: (values: LoginInfo) => void
}

const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email!").required('Please Enter Your Email'),
    password: Yup.string().required('Please Enter Your Password')
})

const Login = ({ onSubmit }: Props) => {

  const handleLogin = async (values: LoginInfo) => {
    console.log(`Successfully logged in`, values)
    onSubmit(values)
  }
  
  return (
    <Row className={styles.wrapper}>
    <Col span={8}></Col>
    <Col span={8} className={styles.body}>
        <Card className={styles.card} title={"Login"}>
            <Formik 
            initialValues = {{ email: "testSh2@gmail.com", password: "testSh123"}}
            validationSchema={validationSchema}
            onSubmit={handleLogin}>
                <Form name="basic" autoComplete="off">
                     
                    <AntForm.Item label="Email" name="email">
                        <div>
                            <Field prefix={<UserOutlined className="site-form-item-icon" />} 
                        name="email" as={Input} placeholder="Enter Your Email" />
                        
                            <div className={styles.error}>
                                <ErrorMessage name="email" />
                            </div>
                        </div>
                    </AntForm.Item>
                
                    <AntForm.Item label="Password" name="password">
                        <div>
                            <Field prefix={<LockOutlined className="site-form-item-icon" />} 
                            name="password" as={Input} placeholder="Enter Your Password" 
                            />

                            <div className={styles.error}>
                                <ErrorMessage name="password" />
                            </div>
                        </div>
                    </AntForm.Item>
                
                    <AntForm.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <div>
                            <Button type="primary" htmlType="submit">
                            Log in
                            </Button>
                            Or <Link to={'/register'} className={styles.link}>register now!</Link>
                        </div>
                    </AntForm.Item>
                </Form>
            </Formik>
        </Card>
    </Col>
    </Row>

    )
};

export default Login;