import { useEffect, useState } from "react";
import {
    useNavigate
} from "react-router-dom";
import { useGetChatHistory } from "../../services/api/apiHooks";
import { toast } from "react-hot-toast";
import { useCookies } from "react-cookie";
import Header from "../../components/Header/Header";
import { FixedSizeList as List } from 'react-window';
import ArtistHeaderCard from "../../components/ArtistHeaderCard/ArtistHeaderCard";

//Styling
const cardStyle = "items-center h-full gap-3 pl-7"
const titleStyle = "text-left font-bold text-white"
const followerStyle = "text-left text-sm text-[#B3B3B3] font-semibold"
const popularitStyle = "ml-2 bg-[#0D3D45] text-[#69D8F7] text-sm font-bold rounded-sm min-w-[39px] inline-block text-center"


const ChatRoom = () => {  
    const [cookies,] = useCookies(["authToken","selectedArtist"]);
    const artist = cookies?.selectedArtist;
    const token = cookies?.authToken;
    const { data, error } = useGetChatHistory(token, artist?.id);
    const navigate = useNavigate();
    const oldMessages = data && data.length > 0 ? data : [];
    const [messages, setMessages] = useState(oldMessages)

    
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