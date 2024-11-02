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
    useMutation({
    mutationFn: (token, artistId, message) => api.getResponse(token, artistId, message),
    onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ['chatHistory'] })
    },
    })
}
