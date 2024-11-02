import { useEffect, useState, useRef } from "react";
import {
    useNavigate
} from "react-router-dom";
import { useGetChatHistory, useGetResponse } from "../../services/api/apiHooks";
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
const counterStyle = "text-sm right-28 text-[#A9ABB2] bottom-7"
const textAreaStyle = "border border-[#E5E7EB] rounded-lg"
const textAreaContainerStyle = "mx-[5%] sm:mx-[10%] bg-[#F9F9F9] border border-[#E5E7EB] flex p-4 rounded-3xl"
const iconStyle = "left-7 top-9"

const ChatRoom = () => {  
    const [cookies,] = useCookies(["authToken","selectedArtist"]); //cokies
    const artist = cookies?.selectedArtist;
    const token = cookies?.authToken;
    const { data, error } = useGetChatHistory(token, artist?.id); //Get chat history if available
    const navigate = useNavigate();
    const oldMessages = data && data.length > 0 ? data : [];
    const [messages, setMessages] = useState(oldMessages) //State to hold chat

    const ref = useRef(null); //Used to Reference the user's inputs (To Reduce renders instead of using states)

    const getResponse = useGetResponse()

    const handleSend = () => {
        if(artist?.id && ref.current.value){
            console.log(token, artist.id, ref.current.value);
            ref.current.disabled = true;
            setMessages((prevMessages) => [...prevMessages, {isReply: false, fromId: artist.id, message: ref.current.value}])
            getResponse.mutate({token: token, artistId: artist.id,message: ref.current.value});

        }
        

    }
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

    useEffect(() => {
        if (getResponse.error) {
            toast.error(getResponse.error.response?.data?.message || getResponse.error.message)
            if(getResponse.error.response?.status === 401 || getResponse.error.response?.status === 403){
                console.log("Unauthorized")
            }
            console.log(getResponse.error)
        }
    }, [getResponse.error]);

    useEffect(() => {
        if (getResponse.data) {
            setMessages((prevMessages) => [...prevMessages, {isReply: getResponse.data.isReply, fromId:  getResponse.data.fromId, message: getResponse.data.message}])
        }
    }, [getResponse.data]);


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
                className="max-w-full text-white"
            >
                {({ index, style, data }) => (
                    <div style={style}>
                        <p>{data[index].message}</p>
                    </div>
                )}
            </List>
            <div className="absolute w-full bottom-[5%]">
                <div className="relative">
                    <TextArea 
                        name="message"
                        ref={ref}
                        placeholder={"Type text, or upload, paste, and drag an image here. "}
                        placeholderIcon={<img alt="icon" src="/icons/chatIcon.png"/>}
                        counterStyle={counterStyle}
                        textAreaContainerStyle={textAreaContainerStyle}
                        textAreaStyle={textAreaStyle}
                        iconStyle={iconStyle}
                        rows={3}
                    />
                    <button 
                        className="absolute bg-[#187180] rounded-3xl text-white text-sm px-3 py-1 mx-[5%] sm:mx-[10%] right-8 bottom-6"
                        style={{right: "calc(10%, 20px)"}}
                        disabled={getResponse.isPending}
                        onClick={handleSend}
                    >
                        Send <img className="inline-block" alt="sendIcon" src="/icons/sendIcon.png"/>
                    </button>
                </div>
                
            </div>
            

        </div>
    );

}

export default ChatRoom;