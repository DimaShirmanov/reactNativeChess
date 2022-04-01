import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    useWindowDimensions
} from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import FIGURE_IMAGES from '../../../constants/FIGURE_IMAGES';
import actions from '../../../store/game/actions';
import { getCurrentMove } from "../../../store/game/selectors";

const SCALE = 0.8;

const Figure = ({ position, player, type }) => {
    const currentMove = useSelector(getCurrentMove);
    const width = useWindowDimensions().width;
    const height = useWindowDimensions().height;
    const WIDTH_FILED = width / 8;
    const WIDTH_IMAGE = WIDTH_FILED * 0.3;
    const HEIGHT_IMAGE = height / 8;

    const figureImage = FIGURE_IMAGES[`${player}-${type}`];

    const getAbsolutePositionX = x => (x - 1) * WIDTH_FILED + (WIDTH_FILED * 0.3);
    const getAbsolutePositionY = y => (y - 1) * HEIGHT_IMAGE;

    const dispatch = useDispatch();
    const translateX = useSharedValue(getAbsolutePositionX(position.x));
    const translateY = useSharedValue(getAbsolutePositionY(position.y));

    const [toPosition, setToPosition] = useState({ x: 0, y: 0 });


    const panGestureHandler = useAnimatedGestureHandler({
        onStart: (event, context) => {
            context.translateX = translateX.value;
            context.translateY = translateY.value;
        },
        onActive: (event, context) => {
            const { absoluteY, absoluteX } = event;
            translateX.value = (event.translationX / SCALE) + context.translateX;
            translateY.value = (event.translationY / SCALE) + context.translateY;
            context.absoluteX = absoluteX / SCALE;
            context.absoluteY = absoluteY / SCALE;
        },
        onEnd: ({ absoluteX, absoluteY }) => {
            const x = Math.ceil(absoluteX / WIDTH_FILED);
            const y = Math.ceil(absoluteY / HEIGHT_IMAGE);
            runOnJS(setToPosition)({ x, y });

            const normalizeAbsoluteX = (x - 1) * WIDTH_FILED;
            const normalizeAbsoluteY = (y - 1) * HEIGHT_IMAGE;

            translateX.value = withTiming(normalizeAbsoluteX + WIDTH_FILED * 0.3);
            translateY.value = withTiming(normalizeAbsoluteY);
        },
    });

    const reanimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value },
                { scale: 0.9 }
            ],
        }
    }, []);

    const handleEndMove = () => {
        translateX.value = withTiming(getAbsolutePositionX(position.x), { duration: 500 });
        translateY.value = withTiming(getAbsolutePositionY(position.y), { duration: 500 });
        dispatch(actions.moveFigure({ fromPosition: position, toPosition, player }));
    }

    const handleActivatedFigure = () =>
        dispatch(actions.toIdentifyPossibleMoves({ fromPosition: position, player, figureType: type }));

    return (
        <PanGestureHandler onActivated={handleActivatedFigure} onEnded={handleEndMove} enabled={player !== currentMove} onGestureEvent={panGestureHandler}>
            <Animated.Image style={[styles.container, reanimatedStyle, { width: WIDTH_IMAGE, height: HEIGHT_IMAGE }]}
                source={figureImage} />
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
