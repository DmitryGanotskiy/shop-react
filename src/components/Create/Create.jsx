import React, { useContext } from 'react';
import styles from './Create.module.css';
import { Context } from '../../context/Cont';
import { assets } from '../../assets/assets';

const Create = () => {
    const { currentUser, openCreate, setOpenCreate } = useContext(Context);

    if (!openCreate) return null;

    const handleClose = () => {
        setOpenCreate(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        const validFiles = Array.from(files).filter(file =>
            file.type.startsWith('image/') || file.type.startsWith('video/')
        );
        console.log('Dropped files:', validFiles);
        // Further processing can be done here, like uploading the files
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleFileChange = (e) => {
        const files = e.target.files;
        const validFiles = Array.from(files).filter(file =>
            file.type.startsWith('image/') || file.type.startsWith('video/')
        );
        console.log('Selected files:', validFiles);
        // Further processing can be done here, like uploading the files
    };

    const handleUploadBoxClick = () => {
        document.getElementById('fileInput').click();
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.create}>
                <div className={styles.sidebar}>
                    <div className={styles.profileContainer}>
                        <img
                            src={currentUser && currentUser.img ? currentUser.img : assets.user_icon}
                            alt="User"
                            className={styles.userImage}
                        />
                        <p className={styles.userName}>{currentUser ? currentUser.username : 'Guest'}</p>
                        <p className={styles.profileText}>Your profile</p>
                    </div>
                    <div className={styles.linkContainer}>
                        <img src={assets.user_icon} alt="User Icon" className={styles.linkIcon} />
                        <p className={styles.link}>Dashboard</p>
                    </div>
                    <div className={styles.linkContainer}>
                        <img src={assets.user_icon} alt="User Icon" className={styles.linkIcon} />
                        <p className={styles.link}>Content</p>
                    </div>
                    <div className={styles.linkContainer}>
                        <img src={assets.user_icon} alt="User Icon" className={styles.linkIcon} />
                        <p className={styles.link}>Analytics</p>
                    </div>
                    <div className={styles.linkContainer}>
                        <img src={assets.user_icon} alt="User Icon" className={styles.linkIcon} />
                        <p className={styles.link}>Comments</p>
                    </div>
                    <div className={styles.linkContainer}>
                        <img src={assets.user_icon} alt="User Icon" className={styles.linkIcon} />
                        <p className={styles.link}>Copyright</p>
                    </div>
                    <div className={styles.linkContainer}>
                        <img src={assets.user_icon} alt="User Icon" className={styles.linkIcon} />
                        <p className={styles.link}>Earn</p>
                    </div>
                </div>
                <div className={styles.dashboard}>
                    <img
                        src={assets.close_icon}
                        alt="Close"
                        className={styles.closeIcon}
                        onClick={handleClose}
                    />
                    <div
                        className={`${styles.section} ${styles.tile}`}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                    >
                        <h3>Upload your videos and images</h3>
                        <div
                            className={styles.uploadBox}
                            onClick={handleUploadBoxClick}
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                        >
                            Click or drop to Select
                            <input
                                id="fileInput"
                                type="file"
                                name="file"
                                accept="image/*,video/*"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                        </div>
                    </div>
                    <div className={`${styles.section} ${styles.tile}`}>
                        <h3>Profile Analytics</h3>
                        <div className={styles.analytics}>
                            <div>Current subscribers: 0</div>
                            <hr />
                            <div>Summary: Last 28 days</div>
                            <hr />
                            <div>Posts: 0</div>
                            <hr />
                            <div>Number of bookings: 0</div>
                        </div>
                    </div>
                    <div className={`${styles.section} ${styles.tile}`}>
                        <h3>What's new in Studio</h3>
                        <div className={styles.news}>
                            <p>Simplified channel page layout and optional "Home tab"</p>
                            <p>Expansion of channel permissions</p>
                            <p>Upcoming changes to Community Guidelines warnings</p>
                        </div>
                    </div>
                    <div className={`${styles.section} ${styles.tile}`}>
                        <h3>Recent subscribers</h3>
                        <div className={styles.subscribers}>No recent subscribers.</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Create;
