import {
    useQuery,
    useMutation,
    useQueryClient
  } from '@tanstack/react-query'

import * as api from "./api";

export const useGetGenres = (token) => 
  useQuery({
    queryKey: ["genres", token],
    queryFn: () => api.getGenres(token),
});

export const useGetArtists = (token, genre, page) => 
  useQuery({
    queryKey: ["artists", {token: token, genre: genre, page: page}],
    queryFn: () => api.getArtists(token, genre, page),
});

export const useGetChatHistory = (token, artistId) => 
  useQuery({
    queryKey: ["chatHistory", {token: token, artistId: artistId}],
    queryFn: () => api.getChatHistory(token, artistId),
});

export const useGetResponse = () => {
    const queryClient = useQueryClient();
    return useMutation({
    mutationFn: (data) => api.getResponse(data.token, data.artistId, data.message),
    onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ['chatHistory'] })
    },
    })
}
