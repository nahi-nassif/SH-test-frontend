import Numeral from 'react-numeral';

const ArtistCard = ({ name, followers, popularity, img, cardStyle, titleStyle, followerStyle, popularitStyle }) => {

    return <div title="card" className={`relative flex flex-1 flex-col ${cardStyle}`}>
            <img alt="artist-image" src={img || "/logo512.png"} className="mx-auto h-auto w-full flex-shrink-0 rounded-lg" />
            <h3 title="name" className={titleStyle}>{name || ""}</h3>
            <p title="followers" className={followerStyle}><Numeral value={followers || 0} format={"0,0a"}/> followers</p>
            <span className={'absolute ' + (popularitStyle || "bottom-4 right-4 bg-black")}>{popularity}</span>
    </div>

}

export default ArtistCard