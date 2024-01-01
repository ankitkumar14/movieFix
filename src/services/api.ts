import axiosInstance from "./config"

export const getGenres = async () => await axiosInstance.get('/genre/movie/list?language=en');

export const getMoviesList = async (year:number,genres:string) => await axiosInstance.get(`/discover/movie?sort_by=popularity.desc&primary_release_year=${year}&page=1&vote_count.gte=100&with_genres=${genres}`);

export const getSearchedMovie = (searchTerm:string,year:number) => axiosInstance.get(`/search/movie?query=${searchTerm}&primary_release_year=${year}`)