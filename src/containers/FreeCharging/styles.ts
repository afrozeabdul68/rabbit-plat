import {Dimensions, StyleSheet} from 'react-native'
import Color from '../../variables/colors'

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        width: Dimensions.get('window').width,
        display: 'flex',
    },
    emailImg: {
        width: '80%',
        height: '60%',
    },
    emailContainer: {
        flex: 3,
        backgroundColor: Color.BLACK,
        justifyContent: 'center',
        alignItems: 'center',
    },
    invitesContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    referText: {
        fontSize: 22,
        color: Color.WHITE,
        fontWeight: '600',
        marginTop: 30,
    },
    getText: {
        fontSize: 16,
        color: Color.WHITE,
        marginTop: 8,
        textAlign: 'center',
        marginHorizontal: 30,
    },
    shareText: {
        fontSize: 16,
        fontWeight: '600',
    },
    shareCode: {
        fontSize: 14,
        fontWeight: '600',
        marginTop: 16,
    },
});

export default styles
