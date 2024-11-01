import { useEffect } from "react";
import {
    useParams,
  } from "react-router-dom";
import { useGetArtists } from "../../services/api/apiHooks";
import { toast } from "react-hot-toast";
import { useCookies } from "react-cookie";
import ArtistCard from "../../components/ArtistCard/ArtistCard"

const Artists = () => {
    const { genre } = useParams();
    const [ cookies , ] = useCookies(["authToken"]);
    const token = cookies?.authToken;
    const { data, error } = useGetArtists(token, genre, 1)
    

    useEffect(()=>{
        if(error){
            toast.error(error.response?.data?.message || error.message)
        }
    },[error])
    
    return <div title="Artists List" className="text-white">
        { data && data.map( d => <div key={d.id}>
                <ArtistCard 
                    name = {d.name}
                    img = {d.images?.length > 0 ? d.images[0].url : ""}
                    popularity={d.popularity}
                    followers={d.followers?.total}
                />
                {d.name}
            </div>)
        }
    </div>

}

export default Artists;