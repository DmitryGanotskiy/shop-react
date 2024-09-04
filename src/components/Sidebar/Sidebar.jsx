import React, { useContext, useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Cont';

const Sidebar = () => {

    const [extended, setExtended] = useState(false);
    const {darkMode, onSent, setRecentPrompt, newChat, setAllInputs, allInputs, save, openSettings, setOpenSettings,openHelp,
        setOpenHelp, setOpenLog,
        isLogin, setIsLogin} = useContext(Context);

    return (
        <div className={`sidebar ${darkMode ? 'dark-mode' : 'light-mode'}`}>
            <div className='top'>
                <img onClick={()=>setExtended(prev=>!prev)} className='menu' src={assets.menu_icon} alt='Kaputt' />
                <div onClick={()=>newChat()} className='bar-item'>
                    <img src={assets.plus_icon} alt='Chat' />
                    {extended ? <p>Home</p> : null}
                </div>
                <div onClick={()=>newChat()} className='bar-item'>
                    <img src={assets.plus_icon} alt='Chat' />
                    {extended ? <p>Subscriptions</p> : null}
                </div>
                <div onClick={()=>newChat()} className='bar-item'>
                    <img src={assets.plus_icon} alt='Chat' />
                    {extended ? <p>History</p> : null}
                </div>
                <div onClick={()=>newChat()} className='bar-item'>
                    <img src={assets.plus_icon} alt='Chat' />
                    {extended ? <p>Saved</p> : null}
                </div>
                

            </div>
            <div className='bottom'>
                <div className="bottom-item recent-entry" onClick={()=>setOpenHelp(openHelp => !openHelp)}>
                    <img src={assets.question_icon} alt="Question"/>
                    {extended? <p>Help & Support</p> :null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="history" />
                    {extended? <p>Activity</p> :null}
                </div>
                <div className="bottom-item recent-entry" onClick={ ()=> isLogin ? setOpenSettings(openSettings => !openSettings) : setOpenLog(true)}>
                    <img src={assets.setting_icon} alt="Question"/>
                    {extended? <p>Settings</p> :null}
                </div>
            </div>
        </div>
    )
}

export default Sidebar
