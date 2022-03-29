import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    StyleSheet,
    View,
    Text
} from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { interpolate, runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

import Field from '../models/Field';
import Pawn from '../models/Pawn';

const { width, height } = Dimensions.get('screen');
const WIDTH_FIELD = width / 8;
const HEIGHT_FIELD = height / 8;

const initialPositions = {
    2: {
        1: player => new Pawn(player),
        2: player => new Pawn(player),
        3: player => new Pawn(player),
        4: player => new Pawn(player),
        5: player => new Pawn(player),
        6: player => new Pawn(player),
        7: player => new Pawn(player),
        8: player => new Pawn(player),
    },
    7: {
        1: player => new Pawn(player),
        2: player => new Pawn(player),
        3: player => new Pawn(player),
        4: player => new Pawn(player),
        5: player => new Pawn(player),
        6: player => new Pawn(player),
        7: player => new Pawn(player),
        8: player => new Pawn(player),
    }
};

const RenderField = ({ field, handleMoveElement }) => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const absoluteSharedX = useSharedValue(0);
    const absoluteSharedY = useSharedValue(0);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const panGestureEvent = useAnimatedGestureHandler({
        onStart: (event, context) => {
            context.translateX = translateX.value;
            context.translateY = translateY.value;
        },
        onActive: (event, context) => {
            const { absoluteY, absoluteX } = event;
            translateX.value = event.translationX + context.translateX;
            translateY.value = event.translationY + context.translateY;
            absoluteSharedX.value = absoluteX;
            absoluteSharedY.value = absoluteY;
        },
        onEnd: () => {
            runOnJS(setPosition)({ x: absoluteSharedX.value, y: absoluteSharedY.value });
        }
    });

    useEffect(() => {
        if (element && field && position.y !== 0 && position.x !== 0) {
            const element = field.getElement();

            for (let y = 1; y <= 8; y++) {
                const fromHeight = HEIGHT_FIELD * y - HEIGHT_FIELD;
                const toHeight = HEIGHT_FIELD * y;

                if (position.y > toHeight || position.y < fromHeight) {
                    continue;
                }
                for (let x = 1; x <= 8; x++) {
                    const fromWidth = WIDTH_FIELD * x - WIDTH_FIELD;
                    const toWidth = WIDTH_FIELD * x;

                    if (position.x >= fromWidth && position.x <= toWidth) {
                        if (element.canMoveToPosition(x, y)) {
                            handleMoveElement(element, x, y);
                        } else {
                            translateX.value = withSpring(element.getPosition().x, { overshootClamping: true, mass: 5 });
                            translateY.value = withSpring(element.getPosition().y - 7, { overshootClamping: true, mass: 5 });
                        }
                        break;
                    }
                }
            }
        }
    }, [position]);
    const opacity = useSharedValue(0);

    const reanimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: translateX.value
                },
                {
                    translateY: translateY.value
                }
            ],
            opacity: interpolate(opacity.value, [0, 0.5, 1], [0, 0, 1])

        }
    }, []);

    useEffect(() => {
        opacity.value = withTiming(1, {duration: 600});

        return () => {
            opacity.value = withTiming(0, {duration: 100});
        }
    }, []);

    const backgroundColor = field.getColor();
    const element = field.getElement();
    return (
        <View style={[styles.field, { backgroundColor }, element && { zIndex: 1 }]}>
            {element &&
                <PanGestureHandler onGestureEvent={panGestureEvent}>
                    <Animated.Image style={[styles.imageElement, reanimatedStyle]} source={element.getImage()} />
                </PanGestureHandler>
            }
        </View>
    );
};

const Board = () => {
    const [fields, setFields] = useState([]);


    useEffect(() => {
        // Генераия поля
        const FIELDS = [];
        let isWhite = false;
        for (let y = 1; y <= 8; y++) {
            const rows = [];
            isWhite = !isWhite;
            for (let x = 1; x <= 8; x++) {
                const field = new Field(x, y, isWhite ? '#E9E9DF' : '#BB9979');
                const cbElement = initialPositions[y] && initialPositions[y][x];
                const element = cbElement && cbElement(y > 4 ? 2 : 1);
                if (element) {
                    field.setElement(element);
                    element.setPosition(x, y);
                }
                rows.push(field);
                isWhite = !isWhite;
            }
            FIELDS.push(rows);
        }

        setFields(FIELDS);
    }, []);

    const handleMoveElement = (element, x, y) => {
        setFields(fields => {
            const lastElementX = element.getPosition().x;
            const lastElementy = element.getPosition().y;

            return fields.map(rows => {
                return rows.map(field => {
                    const currentFieldPosition = field.getPosition();

                    // Очистка старого поля
                    if (lastElementX === currentFieldPosition.x && lastElementy === currentFieldPosition.y) {
                        console.log('Remove element');
                        return new Field(lastElementX, lastElementy, field.getColor());
                    }

                    // Создание нового поля и элемента
                    if (currentFieldPosition.x === x && currentFieldPosition.y === y) {
                        const newField = new Field(x, y, field.getColor());
                        newField.setElement(element);
                        element.setPosition(x, y);
                        return newField;
                    }


                    return field;
                });
            });
        });
    }

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return <></>;
    }

    return (
        <View style={styles.container}>
            {fields.length > 0 && fields.map((rows, x) => rows.map((field, y) => {
                return <RenderField handleMoveElement={handleMoveElement} key={`${x}-${y}`} field={field} />;
            }))}
        </View>
    );
};

export default Board;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    field: {
        width: WIDTH_FIELD,
        height: HEIGHT_FIELD,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageElement: {
        width: WIDTH_FIELD / 3,
        height: HEIGHT_FIELD,
        marginBottom: 5
    }
});