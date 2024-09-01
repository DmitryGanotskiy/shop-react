import { createContext, useState, useEffect } from "react";

export const Context = createContext();
const initialData = {
    title: '',
    description: '',
    images: [],
    age: '',
    access: '',
    date: '',
    location: '',
    tickets: [],
    subscribers: [],
    subscriptions: [],
    posts: [],
    likes: 0,
    hates: 0,
    link: ''
  };
  const userData = {
    username: '', 
    password: '', 
    phone: '', 
    description: '',
    link: '', 
    email: '', 
    birthday: '', 
    photo: null,
    posts: [],
    followers: [],
    following: [],
    messages: [],
    notifications: [],
    settings: {},
    chatHistory: [],
    chat: [],
    chats: [],
    groups: [],
    chatsGroups: [],
    rating: 0,
    loggedIn: false
  };

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [showResult, setShowResult] = useState(false);
    const [darkMode, setDarkMode] = useState(true);
    //const [allInputs, setAllInputs] = useState({ user: [], bot: [] });
    const [users, setUsers] = useState([]);
    const [openLog, setOpenLog] = useState(false);
    const [currentUser, setCurrentUser] = useState(userData);
    const [openSettings, setOpenSettings] = useState(false);
    const [profileBar, setProfileBar] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const [openHelp, setOpenHelp] = useState(false);
    const [openStage1, setOpenStage1] = useState(false);
    const [openStage2, setOpenStage2] = useState(false);
    const [openStage3, setOpenStage3] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [upload, setUpload] = useState(initialData);

    const newChat = () => {

    };    

    const onSent = async (prompt) => {
        
    };

    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
    };

    const contextValue = {
        onSent,
        recentPrompt, setRecentPrompt,
        showResult,
        input,
        setInput,
        setShowResult,
        newChat,
        darkMode, toggleDarkMode,
        openLog, setOpenLog,
        openSettings, setOpenSettings,
        users, setUsers,
        currentUser, setCurrentUser,
        profileBar, setProfileBar,
        openCreate, setOpenCreate,
        openHelp, setOpenHelp,
        upload, setUpload,
        openStage1, setOpenStage1,
        openStage2, setOpenStage2,
        openStage3, setOpenStage3,
        isLogin, setIsLogin
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
