import { useEffect, useState } from "react";
import {
    useNavigate
} from "react-router-dom";
import { useGetChatHistory } from "../../services/api/apiHooks";
import { toast } from "react-hot-toast";
import { useCookies } from "react-cookie";
import Header from "../../components/Header/Header";
import { FixedSizeList as List } from 'react-window';

const ChatRoom = () => {  
    const [cookies,] = useCookies(["authToken","selectedArtist"]);
    const artist = cookies?.selectedArtist;
    const token = cookies?.authToken;
    const { data, error } = useGetChatHistory(token, artist?.id);
    const navigate = useNavigate()
    const [messages, setMessages] = useState(data && data.length > 0 ? data : [])

    
    useEffect(()=>{
        if(!artist?.id)
            navigate("/")
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(() => {
        if (error) {
            toast.error(error.response?.data?.message || error.message)
            if(error.statusCode === 401 || error.statusCode === 403){
                console.log("Unauthorized")
            }
        }
    }, [error])

    return (
        <div>
            <Header
                headerStyle="h-16 bg-[#1A1A1A]"
                enableBackButton={true}
            >
                <h1 className="h-full flex items-center justify-center font-extrabold">Title</h1>
            </Header>
            <List
                height={500}
                itemCount={messages.length}
                itemSize={50}
                width={300}
                itemData={messages}
            >
                {({ index, style, data }) => (
                    <div style={style}>
                        <p>{data[index].text}</p>
                    </div>
                )}
            </List>
        </div>
    );

}

export default ChatRoom;