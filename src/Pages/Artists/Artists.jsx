import { useEffect } from "react";
import {
    useParams,
  } from "react-router-dom";
import { useGetArtists } from "../../services/api/apiHooks";
import { toast } from "react-hot-toast";
import { useCookies } from "react-cookie";

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
                {d.name}
            </div>)
        }
    </div>

}

export default Artists;