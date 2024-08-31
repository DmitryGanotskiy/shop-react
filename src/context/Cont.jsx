import { createContext, useState, useEffect } from "react";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [showResult, setShowResult] = useState(false);
    const [darkMode, setDarkMode] = useState(true);
    const [allInputs, setAllInputs] = useState({ user: [], bot: [] });
    const [users, setUsers] = useState([]);
    const [openLog, setOpenLog] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [openSettings, setOpenSettings] = useState(false);
    const [profileBar, setProfileBar] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const [openHelp, setOpenHelp] = useState(false);

    const newChat = () => {

    };    

    const onSent = async (prompt) => {
        
    };

    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
    };

    const contextValue = {
        onSent,
        recentPrompt,
        setRecentPrompt,
        showResult,
        input,
        setInput,
        setShowResult,
        newChat,
        darkMode,
        toggleDarkMode,
        allInputs,
        setAllInputs,
        openLog,
        setOpenLog,
        openSettings,
        setOpenSettings,
        users,
        setUsers,
        currentUser,
        setCurrentUser,
        profileBar,
        setProfileBar,
        openCreate,
        setOpenCreate,
        openHelp,
        setOpenHelp
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
