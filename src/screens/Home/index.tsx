import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, FlatList, SectionList, TextInput, Pressable } from "react-native";
import { getGenres, getMoviesList, getSearchedMovie } from "../../services/api";
import GenreButton from "../../components/GenreButton";
import Card from "../../components/Card";
import { IGenreData, IMovie, IMovieList } from "../../interfaces";

interface ICurrent {
    year:number,
    id:number|null|undefined
}

const Home = () => {
    const [genre, setGenre] = useState<IGenreData[]>([]);
    const [movies, setMovies] = useState<IMovieList[]>([]);
    const [searchText, setSearchText] = useState<string>('');
    const [searchEnable, setSearchEnable] = useState<boolean>(false);
    const [current,setCurrent] =  useState<ICurrent>({year:2012,id:undefined});

    useEffect(() => {
        genres();
    }, [])

    useEffect(() => {
        searchEnable?searchMovie():moviesList()
    }, [current])

    const genres = async () => {
        try {
            const response = await getGenres();
            setGenre([{ "id": null, "name": "All" }, ...response.data.genres])
        } catch (error) {
            console.log("error : ", error)
        }
    }

    const moviesList = async () => {
        try {
            const response = await getMoviesList(current.year, "" + current.id);
            const res: IMovie[] = response.data.results;
            setMovies([...movies, { title: current.year, data: [{ list: res }] }]);
        } catch (error) {
            console.log("error : ", error)
        }
    }

    const searchMovie = async () => {
        try {
            const response = await getSearchedMovie(searchText,current.year);
            const res: IMovie[] = response.data.results;
            setMovies([...movies, { title: current.year, data: [{ list: res }] }]);
        } catch (error) {
            console.log("error : ", error)
        }
    }

    const genreButtonClicked = async (id: number | null) => {
        if (id === current.id) return;
        if(searchEnable){
            setSearchEnable(false)
            setSearchText('');
        }
        setMovies([])
        setCurrent({...current,id:id,year:2012})
    }

    const onSearch = async () => {
        try {
            setMovies([]);
            setSearchEnable(true);
            setCurrent({...current,year:2012,id:undefined})
        } catch (error) {
            console.log(error)
        }
    }

    const renderGenre = ({ item }: { item: IGenreData }) => {
        return (<View style={styles.genreItem}>
            <GenreButton data={item} isActive={current.id === item.id} onClick={genreButtonClicked} />
        </View>);
    }

    const renderMovieList = ({ item, section }: { item: {list: IMovie[]}, section: IMovieList }) => {
        return (
            <View style={styles.moviesDataCont}>
                <FlatList
                    key={section.title}
                    data={item.list}
                    numColumns={2}
                    renderItem={({ item }) => <View style={styles.cardContainer}>
                        <Card data={item} />
                    </View>}
                    keyExtractor={(item: IMovie, index: number) => `${section.title}_${index}`}
                />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.header} >
                    <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
                    <View style={styles.searchContainer} >
                        <TextInput
                            placeholder="Search..."
                            onChangeText={text => setSearchText(text)}
                            value={searchText}
                            style={styles.searchInput}
                        />
                        <Pressable style={styles.search} onPress={()=>onSearch()}>
                            <Image source={require('../../assets/images/search.png')} style={styles.searchIcon} />
                        </Pressable>
                    </View>
                </View>
                <View style={styles.genresCont}>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={genre}
                        renderItem={renderGenre}
                        keyExtractor={(item: IGenreData) => `${item.id}`}
                    />
                </View>
            </View>

            <View style={styles.moviesCont}>
                <SectionList
                    sections={movies}
                    keyExtractor={(item) => `${item.list}`}
                    renderItem={renderMovieList}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={styles.moviesHeader}>{title}</Text>
                    )}
                    onEndReached={async () => {
                        if (current.year == 2023) return;
                        setCurrent({...current,year:current.year+1});
                    }}
                    onEndReachedThreshold={0.5}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        paddingVertical: 15,
        backgroundColor: '#3A3736',
        top: 0,
        elevation: 8
    },
    header: {flexDirection:'row',justifyContent:'space-between',paddingHorizontal:15},
    searchContainer: {flexDirection:'row',justifyContent:'space-between',alignItems:'center'},
    searchInput: {backgroundColor:'#08ACFB',height:40,borderTopLeftRadius:20, borderBottomLeftRadius: 20, width: 100,paddingHorizontal:10},
    search: {backgroundColor:'green',paddingHorizontal:12,paddingVertical:10,borderTopRightRadius:20,borderBottomRightRadius:20},
    searchIcon: {width:20,height:20},
    container: {
        height: '100%'
    },
    logo: { width: 150, height: 30 },
    genresCont: { marginTop: 25 },
    moviesCont: { backgroundColor: 'black', paddingHorizontal: 15, paddingBottom: 120 },
    moviesHeader: { color: 'white', fontWeight: 'bold', fontSize: 20 },
    genreItem: { marginRight: 10 },
    moviesDataCont: { paddingBottom: 35, alignItems: 'center' },
    cardContainer: { width: 180, marginHorizontal: 8, marginVertical: 8 }
})

export default Home;