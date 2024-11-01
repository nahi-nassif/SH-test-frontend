import axios from "./axios.config";

//Get All Genres
export const getGenres = async (token) => {
    const response = await axios.get("/api/spotify/genres",
        {headers: { 'Authorization' : `Bearer ${token}` }}
    );
    return response.data;
}

//Get Artists Related to Genre
export const getArtists = async (token, genre, page) => {
    const response = await axios.get(`/api/spotify/artists?genre=${genre}&page=${page}`,
        {headers: { 'Authorization' : `Bearer ${token}` }}
    );
    return response.data;
}

//Register a new user
export const register = async () => {

    const response = await axios.patch("/api/auth/register");
    return response.data;
}

//Get Chat History related to a certain artist
export const getChatHistory = async (token, artistId) => {
    const response = await axios.get(`/api/chat/from/${artistId}`,
        {headers: { 'Authorization' : `Bearer ${token}` }}
    );
    return response.data;
}

//Get Response to a messageg
export const getResponse = async (token, artistId, message) => {
    const response = await axios.post(`/api/chat/with/${artistId}`,{ message: message},
        {headers: { 'Authorization' : `Bearer ${token}` }}
    );
    return response.data;
}