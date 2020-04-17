import {Dimensions, StyleSheet} from 'react-native'
import Color from '../../variables/colors'

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        width: Dimensions.get('window').width,
    },
    header: {
        width: '100%',
        height: 50,
        backgroundColor: Color.BLACK,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        borderTopWidth: 1,
        borderColor: Color.TABLE_BORDER_COLOR,
    },
    headerLabel: {
        fontSize: 14,
        color: Color.WHITE,
        fontWeight: '600',
        width: '33%',
        textAlign: 'center',
    },
});

export default styles
