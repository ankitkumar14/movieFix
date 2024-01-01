import React, { memo } from "react";
import { Button, Pressable, View, Text, StyleSheet } from "react-native";
import { IGenreData } from "../interfaces";

const GenreButton = ({ data, isActive, onClick }: { data: IGenreData, isActive: boolean, onClick: Function }) => {

    return (
        <View style={[styles.container,{ backgroundColor: isActive ? 'red' : '#88695F'}]}>
            <Pressable onPress={() => onClick(data.id)} >
                <Text style={styles.text}>{data.name}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {padding: 8, borderRadius: 4 },
    text: { color: 'white' }
})

export default memo(GenreButton);