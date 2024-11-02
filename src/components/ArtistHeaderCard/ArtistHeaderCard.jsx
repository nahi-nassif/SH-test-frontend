import Numeral from 'react-numeral';

const ArtistHeaderCard = ({name, followers, popularity, img, cardStyle, titleStyle, followerStyle, popularitStyle}) => {

    return (
        <div className={"flex flex-row " + cardStyle}>
            <img className='h-11 rounded-md' alt="artist-image" src={img || "/logo512.png"}/>
            <div>
            <h1 title="name" className={titleStyle}>{name || ""}  <span className={popularitStyle}>{popularity}</span></h1>
            <p title="followers" className={followerStyle}><Numeral value={followers || 0} format={"0,0a"}/> followers</p>
            </div>
        </div>
    )
}

export default ArtistHeaderCard;