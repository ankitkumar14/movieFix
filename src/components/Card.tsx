import React, { memo, useState } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { IMG_URL } from '../constants'
import { IMovie } from "../interfaces";

const Card = ({data}:{data:IMovie}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <>
      <Pressable style={styles.container} onHoverIn={(e) => setIsHovered(true)} onHoverOut={() => setIsHovered(false)} >
        <Image source={{ uri: `${IMG_URL}${data.poster_path}` }} style={styles.image} />
        <View style={styles.moviesInfo}  >
          <View>
            <Text style={styles.text}>{data.title}</Text>
            <Text style={styles.text}>{data.vote_average}</Text>
          </View>
        </View>
        <View style={styles.discription}>
          {isHovered && <Text>{data.overview}</Text>}
        </View>
      </Pressable>
    </>
  )
}

const styles = StyleSheet.create({
  container: { height: 250, width: 180, overflow: 'hidden' },
  image: { width: 180, height: 250 },
  moviesInfo: { position: 'absolute', bottom: 0, marginHorizontal: 10 },
  text: { color: '#E2FB08', fontSize:18 },
  discription: {
    position: 'absolute', 
    bottom: 0, 
    backgroundColor: '#fff', 
    maxHeight: '100%'
  }
})

export default memo(Card);