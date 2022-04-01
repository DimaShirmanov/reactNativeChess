import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';

const Home = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            title: 'Главная'
        });

        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT).then(() => {
            setIsLoading(false);
        });
    }, []);
    const handleGoToStart = () => {
        navigation.navigate('Game');
    }

    return (
        <View style={styles.container}>
            <Text>Версия шахмат 1.0.0</Text>

            <TouchableOpacity disabled={isLoading} onPress={handleGoToStart} style={styles.button}>
                <Text style={{
                    fontWeight: '600'
                }}>Начать</Text>
            </TouchableOpacity>
        </View>
    )
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        padding: 16,
        paddingHorizontal: 40,
        borderRadius: 16,
        backgroundColor: '#F0FFFF',
        marginTop: 40,
    }
})