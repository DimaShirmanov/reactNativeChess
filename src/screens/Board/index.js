import React, {useEffect} from 'react';
import {
    Image,
    Modal,
    StyleSheet, Text, TouchableOpacity,
    View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import gameActions from '../../store/game/actions';
import Field from './components/Field';
import Figure from './components/Figure';
import FIGURES from "../../constants/FIGURES";
import actions from "../../store/game/actions";

const Board = () => {
    const dispatch = useDispatch();
    const {isLoading, fields, isLastPosition} = useSelector(state => state.game);
    const figuresOnBoard = useSelector(state => {
        const obj = state.game.figuresOnBoard;
        return Object.keys(obj).map(key => obj[key]);
        å
    });

    useEffect(() => {
        dispatch(gameActions.initGame());

        return () => {
            dispatch(gameActions.clearGame());
        }
    }, []);

    if (!fields || isLoading) {
        return null;
    }

    const IMAGES = [
        {
            type: FIGURES.rook,
            image: require('../../assets/black-rook.png')
        },
        {
            type: FIGURES.officer,
            image: require('../../assets/black-officer.png')
        },
        {
            type: FIGURES.horse,
            image: require('../../assets/black-horse.png'),
        },
        {
            type: FIGURES.queen,
            image: require('../../assets/black-queen.png'),
        },
    ];

    const handleSwapFigurePress = (type) => {
        dispatch(actions.swapFigure(type))
    }


    return (
        <View style={{flex: 1}}>
            <View style={styles.container}>
                {fields.map(rows => rows.map(field => <Field field={field} key={`${field.x}-${field.y}`}/>))}
                {figuresOnBoard.map(item => <Figure key={`${item.x}-${item.y}-${item.player}`} {...item}
                                                    position={{x: item.x, y: item.y}}/>)}
            </View>

            {isLastPosition && (
                <Modal animationType="fade"
                       transparent={true}
                       visible={isLastPosition}
                       supportedOrientations={['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}
                       onRequestClose={() => {
                       }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text>Выберите фигуру на которую хотите заменить.</Text>

                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                marginTop: 30,
                                justifyContent: 'space-between'
                            }}>
                                {
                                    IMAGES.map(item => <TouchableOpacity
                                        onPress={() => handleSwapFigurePress(item.type)}><Image
                                        style={{width: 100, height: 100}}
                                        source={item.image}/></TouchableOpacity>)
                                }
                            </View>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

export default Board;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        transform: [{
            scale: 0.8
        }]
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        position: 'relative',
    },
    modalView: {
        flex: 1,
        position: 'absolute',
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
});
