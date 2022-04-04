import React, {memo} from 'react';
import {
    StyleSheet,
    View,
    useWindowDimensions, TouchableOpacity
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import actions from "../../../store/game/actions";
import colors from "../../../constants/colors";
import USERS from "../../../constants/USERS";
import {getMode} from "../../../store/game/selectors";

const Field = ({field}) => {
    const dispatch = useDispatch();
    const width = useWindowDimensions().width / 8;
    const height = useWindowDimensions().height / 8;
    const mode = useSelector(getMode);
    const currentMove = useSelector(state => state.game.currentMove);

    const activeFields = useSelector(state => state.game.activeFields || []);
    const isActive = activeFields.find(item => item.x === field.x && item.y === field.y);
    const backgroundColor = field.isWhite ? colors.backgroundColorWhiteField : colors.backgroundColorBlackField;

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

            console.log('Timeout move bot!');
            dispatch(actions.moveBot());
        }
    }

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={handleFieldPress}
            style={[
                styles.container,
                {backgroundColor, width, height},
            ]}>
            {
                isActive &&
                <View style={{
                    width: 10,
                    height: 10,
                    backgroundColor: 'green',
                    borderRadius: 10,
                    zIndex: 1
                }}/>
            }
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
