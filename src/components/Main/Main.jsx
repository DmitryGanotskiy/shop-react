import React, { useContext } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Cont';

const Main = () => {
    const { darkMode, toggleDarkMode,
        onSent,
        recentPrompt,
        showResult,
        setInput, input, allInputs,
        openLog, setOpenLog, 
        currentUser, setCurrentUser,
        profileBar, setProfileBar } = useContext(Context);

    return (
        <div className={`main ${darkMode ? 'dark-mode' : 'light-mode'}`}>
            <div className="nav">
                {currentUser ? <img className='create' src={assets.create_icon} alt="Create" /> : null}
                <img
                    src={currentUser && currentUser.img ? currentUser.img : assets.user_icon}
                    onClick={() => !currentUser ? setOpenLog(openLog => !openLog) : setProfileBar(profileBar => !profileBar)}
                    alt='User'
                />
            </div>

            {/* Profile Bar */}
            {profileBar && currentUser && (
                <div className="profile-bar">
                    <div className="profile-bar-content">
                        <div className="profile-bar-details">
                            <p className="profile-bar-username">{currentUser.username}</p>
                            <div className="theme-switch"
                                onClick={toggleDarkMode} >
                                <img
                                    src={darkMode ? assets.moon_icon : assets.sun_icon}
                                    alt="Theme"
                                    className="theme-icon"
                                />
                                <p className="theme-text">{darkMode ? 'Dark Mode' : 'Light Mode'}</p>
                            </div>
                            <p className="profile-bar-button" onClick={() => setOpenLog(openLog => !openLog)}>Switch Account</p>
                            <p className="profile-bar-button" onClick={()=> {setCurrentUser(null); setProfileBar(false) }}>Log Out</p>
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

                {!showResult ? (
                    <>
                        <div className="greet">
                            <p><span>Greetings, my dear</span></p>
                            <p>How can I serve you?</p>
                        </div>
                        <div className="cards">
                            <div className="card">
                                <p>Suggest beautiful places to see</p>
                                <img src={assets.compass_icon} alt="Compass" />
                            </div>
                            <div className="card">
                                <p>Briefly summarise this concept: gothic architecture</p>
                                <img src={assets.bulb_icon} alt="Compass" />
                            </div>
                            <div className="card">
                                <p>Brainstorm team bonding activities for our work retreat</p>
                                <img src={assets.message_icon} alt="Compass" />
                            </div>
                            <div className="card">
                                <p>Improve the readability of the following code</p>
                                <img src={assets.code_icon} alt="Compass" />
                            </div>
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    );
};

export default Main;
