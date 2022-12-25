import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setActiveSong } from "../redux/features/playerSlice";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { useGetArtistDetailsQuery, useGetSongsBySearchQuery } from "../redux/services/shazamCore";

const ArtistDetails = () => {

  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false))
  }

  const handlePlayClick = (song, i) => {
      dispatch(setActiveSong({song, data, i}));
      dispatch(playPause(true))
  }

    const {id: artistId} = useParams();
    
    const {activeSong, isPlaying} = useSelector((state) => state.player)

    const {data: artistData, isFetching: isFetchingArtistDetails} = useGetArtistDetailsQuery({artistId});
    
    const searchTerm = artistData?.data[0].attributes.name;

    const {data, isFetching, error} = useGetSongsBySearchQuery(searchTerm)

    const songs = data?.tracks?.hits?.map((song) => song.track)

    if (isFetchingArtistDetails) {
        return (
            <Loader title="Loading artist details"/>
        )
    }
    if (isFetching) {
      return (
          <Loader title="Loading artist related songs"/>
      )
  }

    if (error) {
        return (
            <Error />
        )
    }
    return (
        <div className="flex flex-col mt-7">
            <DetailsHeader artistId={artistId} artistData={artistData?.data[0]} />
            <div className="mb-10">
              <h1 className="font-bold text-2xl text-white">Artist's Information:</h1>
              <p className="text-gray-400 text-sm mt-2">{artistData?.data[0].attributes.artistBio || "Artist's Bio was not found in our database... "}</p>
              <div className="w-full flex sm:flex-row flex-col items-center justify-between gap-3 box-border mt-5">
                <div className="flex flex-col sm:flex-1 w-[70%] justify-center items-center border-[0.5px] border-stone-500 p-3 rounded-[8px] bg-indigo-800 sm:h-[120px] h-[90px]">
                  <h2 className="font-bold text-base text-white">Birthday</h2>
                  <p className="text-gray-300 text-sm mt-1 text-center">{artistData?.data[0].attributes.bornOrFormed || "Not Available"}</p>
                </div>
                <div className="flex flex-col sm:flex-1 w-[70%] justify-center items-center border-[0.5px] border-stone-500 p-3 rounded-[8px] bg-indigo-800 sm:h-[120px] h-[90px]" >
                  <h2 className="font-bold text-base text-white">Origins</h2>
                  <p className="text-gray-300 text-sm mt-1 text-center">{artistData?.data[0].attributes.origin || "Not Available"}</p>
                </div>
                <div className="flex flex-col sm:flex-1 w-[70%] justify-center items-center border-[0.5px] border-stone-500 p-3 rounded-[8px] bg-indigo-800 sm:h-[120px] h-[90px]">
                  <h2 className="font-bold text-base text-white">Genre</h2>
                  <p className="text-gray-300 text-sm mt-1 text-center">{artistData?.data[0].attributes.genreNames ?
                    artistData?.data[0].attributes.genreNames.map((genre,i)=>(
                    <>{genre},</>
                  ),) : <>Not Available</>
                  }</p>
                </div>
              </div>
            </div>
            <RelatedSongs 
                data={songs}
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePauseClick={handlePauseClick}
                handlePlayClick={handlePlayClick}
            />
        </div>
    )
}

export default ArtistDetails;
