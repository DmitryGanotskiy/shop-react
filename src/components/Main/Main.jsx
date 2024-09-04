import React, { useContext, useEffect, useState } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Cont';

const Main = () => {
    const {
        darkMode,
        toggleDarkMode,
        onSent,
        input, setInput,
        openLog, setOpenLog,
        currentUser, setCurrentUser,
        profileBar, setProfileBar,
        setOpenCreate,
        isLogin, setIsLogin
    } = useContext(Context);

    const [allPosts, setAllPosts] = useState([]);
    const [allNames, setAllNames] = useState([]);

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        const posts = storedUsers.flatMap(user => user.posts ? user.posts.map(post => ({
            ...post,
            username: user.username // Include username in each post object
        })) : []);
        setAllPosts(posts);
    }, []);


    return (
        <div className={`main ${darkMode ? 'dark-mode' : 'light-mode'}`}>
            <div className="nav">
                {isLogin ? <img className='create' onClick={() => setOpenCreate(true)} src={assets.create_icon} alt="Create" /> : null}
                <img
                    src={currentUser && currentUser.img ? currentUser.img : assets.user_icon}
                    onClick={() => !isLogin ? setOpenLog(openLog => !openLog) : setProfileBar(profileBar => !profileBar)}
                    alt='User'
                />
            </div>

            {profileBar && isLogin && (
                <div className="profile-bar">
                    <div className="profile-bar-content">
                        <div className="profile-bar-details">
                            <p className="profile-bar-username">{currentUser.username}</p>
                            <div className="theme-switch" onClick={toggleDarkMode}>
                                <img
                                    src={darkMode ? assets.moon_icon : assets.sun_icon}
                                    alt="Theme"
                                    className="theme-icon"
                                />
                                <p className="theme-text">{darkMode ? 'Dark Mode' : 'Light Mode'}</p>
                            </div>
                            <p className="profile-bar-button" onClick={() => setOpenLog(openLog => !openLog)}>Switch Account</p>
                            <p className="profile-bar-button" onClick={() => { setCurrentUser(null); setProfileBar(false); setIsLogin(false) }}>Log Out</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="main-container">
                <div className="main-top">
                    <div className="search-box">
                        <textarea
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            placeholder="Enter a prompt here"
                            className="scrollable-input"
                        />
                        <div>
                            {input ? <img onClick={() => onSent()} src={assets.send_icon} alt="Send" /> : null}
                        </div>
                    </div>
                </div>

                <div className="posts-grid-container">
                    <div className="posts-grid">
                        {allPosts.length === 0 ? (
                            <p>No posts available. Start creating posts to see them here.</p>
                        ) : (
                            allPosts.map((post, index) => {
                                {if (post.access == "private") return null}
                                console.log(post); // Check if username is available here
                                return (
                                    <div key={index} className="post-card">
                                        {post.images && post.images.length > 0 ? (
                                            <img
                                                src={post.images[0]}
                                                alt="Post"
                                                className="post-image"
                                            />
                                        ) : (
                                            <p>No image available</p>
                                        )}
                                        <div className="post-header">
                                            <img
                                                src={post.userImage || assets.user_icon}
                                                alt="User"
                                                className="user-image"
                                            />
                                            <div className="post-info">
                                                <p className="post-title">{post.title}</p>
                                                <p className="post-username">{post.username || 'No Username'}</p>
                                            </div>
                                        </div>
                                        <div className="post-footer">
                                            <img src={assets.dot_icon} alt="Dot" className="dot-icon" />
                                            <p className="post-date">{new Date(post.date).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Main;
