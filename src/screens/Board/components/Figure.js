import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    useWindowDimensions
} from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import FIGURE_IMAGES from '../../../constants/FIGURE_IMAGES';
import actions from '../../../store/game/actions';
import canMoveToFigure from '../../../utils/canMoveToFigure';


const Figure = ({ x, y, player, type }) => {
    const width = useWindowDimensions().width;
    const height = useWindowDimensions().height;

    const WIDTH_FILED = width / 8;
    const HEIGHT_FIELD = height / 8;

    const WIDTH = WIDTH_FILED * 0.3;
    const HEIGHT = HEIGHT_FIELD;

    const dispatch = useDispatch();
    const activeFields = useSelector(state => state.game.activeFields);
    const [beforePosition, setBeforePosition] = useState({ x, y });
    const [position, setPosition] = useState({ x, y });
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const figureImage = FIGURE_IMAGES[`${player}-${type}`];

    const panGestureHandler = useAnimatedGestureHandler({
        onStart: (event, context) => {
            context.translateX = translateX.value;
            context.translateY = translateY.value;
        },
        onActive: (event, context) => {
            const { absoluteY, absoluteX } = event;
            translateX.value = event.translationX + context.translateX;
            translateY.value = event.translationY + context.translateY;
            context.absoluteX = absoluteX;
            context.absoluteY = absoluteY;
        },
        onEnd: ({ absoluteX, absoluteY }) => {
            const newX = (Math.ceil(absoluteX / WIDTH_FILED) - 1) * WIDTH_FILED;
            const newY = (Math.ceil(absoluteY / HEIGHT_FIELD) - 1) * HEIGHT_FIELD;
            translateX.value = withTiming(newX + WIDTH_FILED * 0.3);
            translateY.value = withTiming(newY);
            runOnJS(setPosition)({ x: Math.ceil(absoluteX / WIDTH_FILED), y: Math.ceil(absoluteY / HEIGHT_FIELD) });
        },
    });

    const reanimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value },
            ]
        }
    }, []);

    useEffect(() => {
        dispatch(actions.setFigureOnBoard({x, y, player, type}));
        translateX.value = withTiming((x - 1) * WIDTH_FILED + (WIDTH_FILED * 0.3), {duration: 500});
        translateY.value = withTiming((y - 1) * HEIGHT_FIELD, {duration: 500});
    }, [x, y]);



    return (
        <PanGestureHandler key={`${x}-${y}-${type}-${player}`} onActivated={() => {
            setBeforePosition({
                x: position.x,
                y: position.y
            })
            const array = canMoveToFigure({
                x: position.x, y: position.y, type, player
            });
            dispatch(actions.canMoveFields(array));
        }} onEnded={() => {
            if (beforePosition.x === position.x && position.y === beforePosition.y) {
                dispatch(actions.clearMove());
                return;
            }
            if (!activeFields.find(item => item.x === position.x && item.y === position.y)) {
                translateX.value = withTiming((beforePosition.x - 1) * WIDTH_FILED + (WIDTH_FILED * 0.3));
                translateY.value = withTiming((beforePosition.y - 1) * HEIGHT_FIELD);
            }
            dispatch(actions.clearMove());
        }} onGestureEvent={panGestureHandler}>
            <Animated.Image style={[styles.container, reanimatedStyle, {width: WIDTH, height: HEIGHT}]} source={figureImage} />
        </PanGestureHandler>
    );
};

export default Figure;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 1,
    }
});
