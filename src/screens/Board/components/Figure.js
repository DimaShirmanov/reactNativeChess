import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    useWindowDimensions
} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue, withSpring,
    withTiming
} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import FIGURE_IMAGES from '../../../constants/FIGURE_IMAGES';
import actions from '../../../store/game/actions';
import {getCurrentMove} from "../../../store/game/selectors";
import canMoveToFigure from "../../../utils/canMoveToFigure";

const Figure = ({x, y, player, type}) => {
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
    const translateX = useSharedValue(getAbsolutePositionX(x) || 0);
    const translateY = useSharedValue(getAbsolutePositionY(y) || 0);

    useEffect(() => {
        dispatch(actions.setFigureOnBoard({x, y, player, type}));
    }, []);

    const [fromPosition, setFromPosition] = useState({x, y});
    const [toPosition, setToPosition] = useState({x: 0, y: 0});

    const panGestureHandler = useAnimatedGestureHandler({
        onStart: (event, context) => {
            context.translateX = translateX.value;
            context.translateY = translateY.value;
            const x = Math.ceil(context.translateX / WIDTH_FILED);
            const y = Math.ceil(context.translateY / HEIGHT_IMAGE);
            runOnJS(setFromPosition)({x, y: y + 1});
        },
        onActive: (event, context) => {
            const {absoluteY, absoluteX} = event;
            translateX.value = event.translationX + context.translateX;
            translateY.value = event.translationY + context.translateY;
            context.absoluteX = absoluteX;
            context.absoluteY = absoluteY;
        },
        onEnd: ({absoluteX, absoluteY}) => {
            const x = Math.ceil(absoluteX / WIDTH_FILED);
            const y = Math.ceil(absoluteY / HEIGHT_IMAGE);
            runOnJS(setToPosition)({x, y: y});

            const normalizeAbsoluteX = (x - 1) * WIDTH_FILED;
            const normalizeAbsoluteY = (y - 1) * HEIGHT_IMAGE;

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

    const handleEndMove = () => {
        const fieldsCanMoveFigureMove = canMoveToFigure({
            x: fromPosition.x,
            y: fromPosition.y,
            type,
            player
        });
        const isCanMoveToFigure = Boolean(fieldsCanMoveFigureMove.find(item => item.x === toPosition.x && item.y === toPosition.y));
        if ((fromPosition.x !== toPosition.x) || (fromPosition.y !== toPosition.y)) {
            if (isCanMoveToFigure) {
                dispatch(actions.changeMove());
            } else {
                translateX.value = withTiming(getAbsolutePositionX(fromPosition.x));
                translateY.value = withTiming(getAbsolutePositionY(fromPosition.y));
            }
        } else {
            translateX.value = withTiming(getAbsolutePositionX(fromPosition.x));
            translateY.value = withTiming(getAbsolutePositionY(fromPosition.y));
        }
    }

    return (
        <PanGestureHandler onEnded={handleEndMove} enabled={player !== currentMove} onGestureEvent={panGestureHandler}>
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
