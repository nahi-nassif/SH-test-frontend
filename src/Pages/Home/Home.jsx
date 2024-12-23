import ButtonGroup from "../../components/ButtonGroup/ButtonGroup";
import { useGetGenres } from "../../services/api/apiHooks";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

//Styling
const buttonWrapperStyle = "flex-wrap rounded-md shadow-sm p-4 min-w-[50%] justify-center gap-2";
const buttonstyle = "rounded-xl bg-[#0D3D45] px-3 py-2 text-xs border border-[#69D8F7] text-[#69D8F7] hover:bg-[#69D8F7] hover:text-[#0D3D45]  hover:border-[#0D3D45]"
const containerStyle = "text-center bg-[#1A1A1A] p-5 rounded-xl m-5 max-w-2xl min-w-lg min-w-64 max-h-[60%] overflow-y-scroll"

const Home = () => {
    const [ cookies , ] = useCookies(["authToken"]);
    const token = cookies?.authToken;
    const { data, error } =  useGetGenres(token);
    const navigate = useNavigate();

    const handleGenreChange = (genre) => {
        navigate(`/artists/${genre}`)
    }

    useEffect(()=>{
        if(error){
            toast.error(error.response?.data?.message || error.message)
        }
    },[error])

    return <div className="h-screen w-full flex flex-wrap items-center justify-center">
        <ButtonGroup 
            title="Pick your genre" 
            data={data} buttonStyle={buttonstyle} 
            buttonWrapperStyle={buttonWrapperStyle} 
            containerStyle={containerStyle} 
            onGenreSelected={handleGenreChange}
        />
    </div>

}

export default Home;