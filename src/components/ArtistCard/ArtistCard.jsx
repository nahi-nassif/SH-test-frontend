import Numeral from 'react-numeral';

const ArtistCard = ({ name, followers, popularity, img, cardStyle, titleStyle, followerStyle, popularitStyle }) => {

    return <div title="card" className={`relative flex flex-1 flex-col max-w-max ${cardStyle}`}>
            <img alt="artist-image" src={img || "/logo512.png"} className="mx-auto h-[200px] w-[200px]flex-shrink-0 rounded-lg" />
            <h3 title="name" className={titleStyle}>{name || ""}</h3>
            <p title="followers"><Numeral value={followers || 0} format={"0,0a"}/> followers</p>
    </div>

}

export default ArtistCard