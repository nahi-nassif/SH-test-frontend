import { useEffect } from "react";
import {
    useParams,
    useNavigate
  } from "react-router-dom";
import { useGetArtists } from "../../services/api/apiHooks";
import { toast } from "react-hot-toast";
import { useCookies } from "react-cookie";
import ArtistCard from "../../components/ArtistCard/ArtistCard";
import Header from "../../components/Header/Header"
import { useDispatch } from 'react-redux'
import { setSelectedArtist } from '../../redux/features/selectedArtistSlice'

//Styling
const cardStyle = "p-4 mx-auto rounded-xl w-full"
const titleStyle = "text-base mt-3 mb-1 text-left semi-bold"
const followerStyle = "text-left text-sm text-[#B3B3B3] font-bold"
const popularitStyle = "bottom-0 right-4 pb-4 px-1 pt-1 bg-[#0D3D45] text-[#69D8F7] text-sm font-bold rounded-t min-w-[39px]"

const Artists = () => {
    const { genre } = useParams();
    const [ cookies , ] = useCookies(["authToken"]);
    const token = cookies?.authToken;
    const { data, error } = useGetArtists(token, genre, 1);
    const dispatch = useDispatch()

    const navigate = useNavigate();

    const handleGenreClick = () => {
        navigate("/"); // Equivalent to a browser back action
    };
    const handleCardClick = (selectedArtist) => {
        dispatch(setSelectedArtist(selectedArtist));
        navigate("/chat");
    }

    useEffect(()=>{
        if(error){
            toast.error(error.response?.data?.message || error.message)
        }
    },[error])
    
    return <div className="text-white">
        <Header 
            headerStyle="h-16 bg-[#1A1A1A]"
            enableBackButton={true}
        >
            <h1 className="h-full flex items-center justify-center font-extrabold"><button onClick={handleGenreClick}>Genre</button> / {genre}</h1>
        </Header>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5  mt-[10%] mx-[12%]">
            { data && data.map( d => <li 
                key={d.id} 
                onClick={()=>{
                    handleCardClick({
                        name: d.name,
                        img: d.images?.length > 0 ? d.images[0].url : "",
                        popularity: d.popularity,
                        followers: d.followers?.total
                    })
                }}
                className="col-span-1 flex flex-col rounded-xl text-center border border-[#363636] bg-[#1A1A1A] hover:bg-[#363636] hover:scale-105 mx-auto"
            >
                    <ArtistCard
                        name = {d.name}
                        img = {d.images?.length > 0 ? d.images[0].url : ""}
                        popularity={d.popularity}
                        followers={d.followers?.total}
                        cardStyle={cardStyle}
                        titleStyle={titleStyle}
                        followerStyle={followerStyle}
                        popularitStyle={popularitStyle}
                    />
                </li>)
            }
        </ul>
        
    </div>

}

export default Artists;