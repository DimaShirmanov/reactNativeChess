import React, {useEffect} from 'react';
import {
    StyleSheet,
    useWindowDimensions
} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from 'react-native-reanimated';
import {useDispatch} from 'react-redux';
import FIGURE_IMAGES from '../../../constants/FIGURE_IMAGES';
import actions from '../../../store/game/actions';

const Figure = ({x, y, player, type}) => {
    const width = useWindowDimensions().width;
    const height = useWindowDimensions().height;
    const WIDTH_FILED = width / 8;
    const WIDTH_IMAGE = WIDTH_FILED * 0.3;
    const HEIGHT_IMAGE = height / 8;

    const figureImage = FIGURE_IMAGES[`${player}-${type}`];

    const getAbsolutePositionX = x => (x - 1) * WIDTH_FILED + (WIDTH_FILED * 0.3);
    const getAbsolutePositionY = y => (y - 1) * HEIGHT_IMAGE;

    const dispatch = useDispatch();
    const translateX = useSharedValue(getAbsolutePositionX(x) || 0);
    const translateY = useSharedValue(getAbsolutePositionY(y) || 0);

    useEffect(() => {
        dispatch(actions.setFigureOnBoard({x, y, player, type}));
    }, []);

    const panGestureHandler = useAnimatedGestureHandler({
        onStart: (event, context) => {
            context.translateX = translateX.value;
            context.translateY = translateY.value;
        },
        onActive: (event, context) => {
            const {absoluteY, absoluteX} = event;
            translateX.value = event.translationX + context.translateX;
            translateY.value = event.translationY + context.translateY;
            context.absoluteX = absoluteX;
            context.absoluteY = absoluteY;
        },
        onEnd: ({absoluteX, absoluteY}) => {
            const x = Math.ceil(absoluteX / WIDTH_FILED) - 1;
            const y = Math.ceil(absoluteY / HEIGHT_IMAGE) - 1;
            const normalizeAbsoluteX = x * WIDTH_FILED;
            const normalizeAbsoluteY = y * HEIGHT_IMAGE;
            translateX.value = withTiming(normalizeAbsoluteX + WIDTH_FILED * 0.3);
            translateY.value = withTiming(normalizeAbsoluteY);
        },
    });

    const reanimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {translateX: translateX.value},
                {translateY: translateY.value},
            ]
        }
    }, []);

    return (
        <PanGestureHandler onGestureEvent={panGestureHandler}>
            <Animated.Image style={[styles.container, reanimatedStyle, {width: WIDTH_IMAGE, height: HEIGHT_IMAGE}]}
                            source={figureImage}/>
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
