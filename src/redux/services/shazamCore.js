import axios from "axios";
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const shazamCoreAPI = createApi ({
    reducerPath: 'shazamCoreAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam-core.p.rapidapi.com',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', import.meta.env.VITE_SHAZAM_CORE_API_KEY);
            // Should we set the headers HOST as well ?
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getTopCharts: builder.query({
            query: () => '/v1/charts/world'
        }),
        getSongsByGenre: builder.query({
            query: (genre) => `/v1/charts/genre-world?genre_code=${genre}`
        }),
        getSongDetails: builder.query({
            query: ({songId}) => `/v1/tracks/details?track_id=${songId}`
         }),
         getSongRelated: builder.query({
            query: ({songId}) => `/v1/tracks/related?track_id=${songId}`
         }),
         getArtistDetails: builder.query({
            query: ({artistId}) => `/v2/artists/details?artist_id=${artistId}`
         }),
         getSongsByCountry: builder.query({
            query: (countryCode) => `v1/charts/country?country_code=${countryCode}`
         }),
         getSongsBySearch: builder.query({
            query: (searchTerm) => `v1/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}`
         }),
    }),
});

export const {
    useGetTopChartsQuery,
    useGetSongsByGenreQuery,
    useGetSongDetailsQuery,
    useGetSongRelatedQuery,
    useGetArtistDetailsQuery,
    useGetSongsByCountryQuery,
    useGetSongsBySearchQuery,
} = shazamCoreAPI;