import { useNavigate } from "react-router-dom";
import { photoNotAvailable } from "../assets/constants";

const ArtistCard = ({track}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blue-sm animate-slideup rounded-lg cursor-pointer" onClick={() => navigate(`/artists/${track?.artists[0].adamid}`)}>
      <img 
        alt="artist"
        src={track?.images?.coverart || photoNotAvailable}
        className="w-full h-56 rounded-lg"
      />
      <p className="mt-4 font-semibold text-white text-lg truncate text-center">{track?.subtitle}</p>
    </div>
  )
};

export default ArtistCard;
