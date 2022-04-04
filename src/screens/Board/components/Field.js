import React, { memo } from 'react';
import {
    StyleSheet,
    View,
    useWindowDimensions, TouchableOpacity
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import actions from "../../../store/game/actions";

const Field = ({ field }) => {
    const dispatch = useDispatch();
    const activeFigure = useSelector(state => state.game.activeFigure);
    const width = useWindowDimensions().width / 8;
    const height = useWindowDimensions().height / 8;

    const activeFields = useSelector(state => state.game.activeFields || []);
    const isActive = activeFields.find(item => item.x === field.x && item.y === field.y);
    const isCurrentFieldActive = activeFigure?.x === field.x && activeFigure?.y === field.y;

    const handleFieldPress = () => {
        if (!isActive) {
            dispatch(actions.clearSelected())
        } else {
            dispatch(actions.moveFigure({
                toPosition: {
                    x: field.x,
                    y: field.y
                }
            }));
        }
    }

    return (
        <TouchableOpacity activeOpacity={1}  onPress={handleFieldPress} style={[
            styles.container,
            { backgroundColor: field.color, width, height },
        ]}>
            {isActive && <View style={{width: width / 2, height: width / 2, backgroundColor: 'green', borderRadius: 10, zIndex: 1}}/>}
        </TouchableOpacity>
    );
}

export default memo(Field);

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1
    }
})
