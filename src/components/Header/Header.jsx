import { useNavigate } from "react-router-dom";

const Header = ({headerStyle, enableBackButton, buttonStyle, children}) => {

    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1); // Equivalent to a browser back action
    };

    return <header className={"w-screen " + (headerStyle || "")}>
        {enableBackButton && <button className={"h-full float-start ml-5" + (buttonStyle || "")} onClick={handleBackClick}><img className="h-5" alt="back-button" src="/icons/arrowLeftIcon.png"/></button>}  
        {children}
    </header>

};

export default Header;