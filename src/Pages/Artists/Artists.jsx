import {
    useParams,
  } from "react-router-dom";

const Artists = () => {
    const { genre } = useParams();

    
    return <div>{genre}</div>

}

export default Artists;