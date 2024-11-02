import { useEffect, useState, useRef } from "react";
import {
    useNavigate
} from "react-router-dom";
import { useGetChatHistory } from "../../services/api/apiHooks";
import { toast } from "react-hot-toast";
import { useCookies } from "react-cookie";
import Header from "../../components/Header/Header";
import { FixedSizeList as List } from 'react-window'; //Used to Reduce Renders to the DOM for large chats
import ArtistHeaderCard from "../../components/ArtistHeaderCard/ArtistHeaderCard";
import TextArea from "../../components/Inputs/TextArea/TextArea";

//Styling
//headerCardStyle
const cardStyle = "items-center h-full gap-3 pl-7"
const titleStyle = "text-left font-bold text-white"
const followerStyle = "text-left text-sm text-[#B3B3B3] font-semibold"
const popularitStyle = "ml-2 bg-[#0D3D45] text-[#69D8F7] text-sm font-bold rounded-sm min-w-[39px] inline-block text-center"
//TextAreaStyle
const counterStyle = "text-sm right-24 text-[#A9ABB2]"
const textAreaStyle = "border border-[#E5E7EB] rounder-lg"
const textAreaContainerStyle = "mx-[10%]"

const ChatRoom = () => {  
    const [cookies,] = useCookies(["authToken","selectedArtist"]);
    const artist = cookies?.selectedArtist;
    const token = cookies?.authToken;
    const { data, error } = useGetChatHistory(token, artist?.id);
    const navigate = useNavigate();
    const oldMessages = data && data.length > 0 ? data : [];
    const [messages, setMessages] = useState(oldMessages)
    const [input, setInput] = useState("");

    const ref = useRef(null); //Used to Reference the user's inputs (To Reduce renders instead of using states)

    // Calculate window dimensions to use in Fixed List
    const [windowDimensions, setWindowDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
        setWindowDimensions({
            width: window.innerWidth,
            height: window.innerHeight,
        });
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    
    useEffect(()=>{
        if(!artist?.id)
            navigate("/")
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(() => {
        if (error) {
            toast.error(error.response?.data?.message || error.message)
            if(error.response?.status === 401 || error.response?.status === 403){
                console.log("Unauthorized")
            }
            console.log(error)
        }
    }, [error])

    return (
        <div>
            <Header
                headerStyle="h-16 bg-[#1A1A1A]"
                enableBackButton={true}
            >
                <ArtistHeaderCard 
                    name={artist.name}
                    img={artist.img}
                    followers={artist.followers}
                    popularity={artist.popularity}
                    cardStyle={cardStyle}
                    titleStyle={titleStyle}
                    followerStyle={followerStyle}
                    popularitStyle={popularitStyle}
                />
            </Header>
            {/*Used to Reduce Renders to the DOM for large chats*/}
            <List
                height={windowDimensions.height - 100}
                width={windowDimensions.width}
                itemCount={messages.length}
                itemSize={50}
                itemData={messages}
            >
                {({ index, style, data }) => (
                    <div style={style}>
                        <p>{data[index].text}</p>
                    </div>
                )}
            </List>
            <div className="absolute w-full">
                <TextArea 
                    name="message"
                    ref={ref}
                    onChange={() => setInput(input)}
                    placeholder={"Type text, or upload, paste, and drag an image here. "}
                    placeholderIcon={<img alt="icon" src="/icons/chatIcon.png"/>}
                    counterStyle={counterStyle}
                    textAreaContainerStyle={textAreaContainerStyle}
                    textAreaStyle={textAreaStyle}
                />
            </div>

        </div>
    );

}

export default ChatRoom;