import React, {Component} from 'react'
import {Image, Text, TouchableOpacity, View,} from 'react-native'
import {ScrollView} from 'react-native-gesture-handler'
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps'
import Dialog, {DialogButton, DialogContent, DialogFooter} from 'react-native-popup-dialog'
import ScaleAnimation from 'react-native-popup-dialog/dist/animations/ScaleAnimation'
import DialogTitle from 'react-native-popup-dialog/dist/components/DialogTitle'
import {NavigationActions, StackActions} from 'react-navigation'
import RabbitButton from '../../components/RabbitButton'
import Color from '../../variables/colors'
import styles from './styles'

const mapStyles = require('../../../resources/map_styles.json');
const hourglassIcon = require('../../../resources/hourglass.gif');
const markerIcon = require('../../../resources/marker.png');

const marker = {
    latitude: 45.5209087,
    longitude: -122.6705107,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
};

export interface Props {
    navigation: any
}

export interface State {
    count: number
    isGrabbing: boolean
    clearId: any
}

export default class Confirmations extends Component<Props, State> {
    static navigationOptions = {
        title: 'Confirmations',
    };

    constructor(props: Props) {
        super(props);

        this.state = {
            count: 1,
            isGrabbing: false,
            clearId: null,
        }
    }

    onMinus = () => {
        const {count} = this.state;
        if (count > 1) {
            this.setState({count: count - 1})
        }
    };

    onPlus = () => {
        const {count} = this.state;
        this.setState({count: count + 1})
    };

    render() {
        const {count, clearId, isGrabbing} = this.state;
        const {navigation} = this.props;

        return (
            <ScrollView>
                <Dialog
                    visible={isGrabbing}
                    dialogTitle={<DialogTitle title='Grab Your Carrot™'/>}
                    dialogAnimation={new ScaleAnimation({
                        initialValue: 0,
                        useNativeDriver: true,
                    })}
                    width='80%'
                    footer={(
                        <DialogFooter>
                            <DialogButton
                                textStyle={styles.cancelBtn}
                                text='Cancel'
                                onPress={() => {
                                    this.setState({isGrabbing: false});
                                    if (clearId) {
                                        clearTimeout(clearId)
                                    }
                                }}
                            />
                        </DialogFooter>
                    )}
                >
                    <DialogContent style={styles.dialogContent}>
                        <Image
                            source={hourglassIcon}
                            style={styles.hourglass}
                        />
                    </DialogContent>
                </Dialog>
                <View style={styles.viewContainer}>
                    <View style={styles.nameDiv}>
                        <Text style={styles.locationText}>Location</Text>
                        <View style={styles.openBtnContainer}>
                            <Text style={styles.openText}>Open</Text>
                        </View>
                    </View>
                    <Text style={styles.nameText}>Kim Bar, 2nd floor</Text>
                    <Text style={styles.addressText}>401 Cowan St, Nashville, TN 37207</Text>
                    <View style={{...styles.nameDiv, marginTop: 8}}/>
                    <View style={styles.mapContainer}>
                        <MapView
                            style={styles.mapView}
                            provider={PROVIDER_GOOGLE}
                            customMapStyle={mapStyles}
                            initialRegion={marker}
                        >
                            <Marker
                                coordinate={marker}
                                image={markerIcon}
                            />
                        </MapView>
                    </View>
                    <View style={{...styles.nameDiv, marginTop: 60}}>
                        <Text style={styles.featureLabel}>Date and Time</Text>
                        <Text style={styles.featureLabel}>Sep 21, 2019 4:34 PM</Text>
                    </View>
                    <View style={{...styles.nameDiv, marginTop: 18}}>
                        <Text style={styles.featureLabel}>Name of power bank</Text>
                        <Text style={styles.featureLabel}>ER3467</Text>
                    </View>
                    <View style={{...styles.nameDiv, marginTop: 18}}>
                        <Text style={styles.featureLabel}>How many would you like?</Text>
                        <View style={{...styles.nameDiv, justifyContent: 'center'}}>
                            <TouchableOpacity
                                onPress={() => this.onMinus()}
                                style={{
                                    ...styles.buttonContainer,
                                    borderColor: count > 1 ? Color.YELLOW : Color.LIGHTGREY,
                                }}
                            >
                                <Text
                                    style={{
                                        ...styles.minusText,
                                        color: count > 1 ? Color.BLACK : Color.LIGHTGREY,
                                    }}
                                >
                                    -
                                </Text>
                            </TouchableOpacity>
                            <Text style={styles.count}>{count}</Text>
                            <TouchableOpacity
                                style={styles.buttonContainer}
                                onPress={() => this.onPlus()}
                            >
                                <Text style={styles.plusText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{...styles.priceDiv}}>
                        <Text style={styles.unitText}>$</Text>
                        <Text style={styles.priceText}>
                            1
                            <Text style={styles.perHourText}>/h</Text>
                        </Text>
                    </View>
                    <Text style={{...styles.locationText, textAlign: 'center'}}>Maximum daily rate $5</Text>
                    <Text style={{...styles.locationText, textAlign: 'center', marginTop: 12}}>Or buy the Carrot™
                        anytime for $40.00</Text>
                    <RabbitButton
                        onPress={() => {
                            this.setState({isGrabbing: true});
                            const clearIdTemp = setTimeout(() => {
                                this.setState({isGrabbing: false});
                                navigation.dispatch(StackActions.reset({
                                    index: 0,
                                    actions: [
                                        NavigationActions.navigate({routeName: 'Drawer'}),
                                    ],
                                }))
                            }, 6000);
                            this.setState({clearId: clearIdTemp})
                        }}
                        title='CONFIRM'
                        color={Color.WHITE}
                        backgroundColor={Color.BLACK}
                        borderColor={Color.BLACK}
                    />
                </View>
            </ScrollView>
        )
    }
}
