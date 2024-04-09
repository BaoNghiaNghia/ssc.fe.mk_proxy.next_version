import { createContext, useState } from "react";

const NavContext = createContext()

export default NavContext

export const NavProvider = ({ children }) => {
    const [ipProxyTabToggle, setIpProxyToggle] = useState(true);
    const [socks5TabToggle, setSocks5Toggle] = useState(false);
    const [authTabToggle, setAuthTabToggle] = useState(false);

    return (
        <NavContext.Provider value={{ipProxyTabToggle, setIpProxyToggle, socks5TabToggle, setSocks5Toggle, authTabToggle, setAuthTabToggle}}>{children}</NavContext.Provider>
    )
}