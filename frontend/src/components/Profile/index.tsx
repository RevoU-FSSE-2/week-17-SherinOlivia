import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import { ProfileInfo } from '../../types';
import styles from './Profile.module.css'

const Profile: React.FC<ProfileInfo> = ({username, email}) => (
<div className={styles.profilePage}>
    <Card title="Profile Page" bordered={false} className={styles.profile}>
        <p>Username: <span className={styles.profileData}>{username}</span></p>
        <p >Email: <span className={styles.profileData}>{email}</span></p>
        <Link to="/" className={styles.link}>Return</Link>
        <div className={styles.profileBody}></div>

    </Card>
</div>

);

export default Profile;