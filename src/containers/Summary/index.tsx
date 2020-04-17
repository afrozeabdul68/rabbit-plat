import React, {Component} from 'react'
import {Image, ScrollView, Text, View,} from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import Color from '../../variables/colors'
import styles from './styles'

import CurrentPositionIcon from '../../../resources/current_location_marker.svg'
import MarkerIcon from '../../../resources/marker.svg'

const mapStyles = require('../../../resources/map_styles.json');
const amexIcon = require('../../../resources/amex.png');
const cardHiddenNumber = require('../../../resources/card_hidden_number.png');

const directionAPIKey = 'AIzaSyDPXYW1UPNCvktOALJb3Lgztqch-cVMpXw';
const destination = {
    latitude: 36.169672,
    longitude: -86.7799467,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
};

export interface Props {
    navigation: any
}

export interface State {
    marker: any
    currentLatitude: number
    currentLongitude: number
    tracksViewChanges: boolean
}

export default class Summary extends Component<Props, State> {
    static navigationOptions = {
        title: 'Summary',
    };

    map: any;

    constructor(props: Props) {
        super(props);

        this.state = {
            marker: {
                coordinate: {
                    latitude: 36.169672,
                    longitude: -86.7799467,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                },
            },
            currentLatitude: 0.0,
            currentLongitude: 0.0,
            tracksViewChanges: true,
        }
    }

    async componentDidMount() {
        this.getCurrentLocation()
    }

    componentDidUpdate() {
        const {tracksViewChanges} = this.state;

        if (tracksViewChanges) {
            /* eslint-disable react/no-did-update-set-state */
            this.setState({
                tracksViewChanges: false,
            })
            /* eslint-enable react/no-did-update-set-state */
        }
    }

    getCurrentLocation() {
        Geolocation.getCurrentPosition((position) => {
                this.setState({
                    currentLatitude: position.coords.latitude,
                    currentLongitude: position.coords.longitude,
                })
            }, error => console.warn('error', error.message),
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000})
    }

    render() {
        const {
            marker, currentLatitude, currentLongitude, tracksViewChanges,
        } = this.state;
        const {navigation} = this.props;
        const item = navigation.getParam('item', {});

        let origin = null;

        if (currentLatitude && currentLongitude) {
            origin = {latitude: currentLatitude, longitude: currentLongitude}
        }

        return (
            <ScrollView>
                <View style={styles.viewContainer}>
                    <MapView
                        ref={(ref) => {
                            this.map = ref
                        }}
                        style={styles.mapView}
                        provider={PROVIDER_GOOGLE}
                        customMapStyle={mapStyles}
                        region={origin ? {
                                latitude: (36.169672 + origin.latitude) / 2,
                                longitude: (-86.7799467 + origin.longitude) / 2,
                                latitudeDelta: Math.abs(origin.latitude - 36.169672) + 0.01,
                                longitudeDelta: Math.abs(origin.longitude + 86.7799467) + 0.01,
                            }
                            : {
                                latitude: 36.169672,
                                longitude: -86.7799467,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                        scrollEnabled={false}
                    >
                        <Marker
                            coordinate={marker.coordinate}
                            key={marker}
                            tracksViewChanges={tracksViewChanges}
                        >
                            <MarkerIcon width={28} height={40}/>
                        </Marker>
                        {origin && (
                            <Marker
                                coordinate={origin}
                                tracksViewChanges={tracksViewChanges}
                            >
                                <CurrentPositionIcon width={20} height={20}/>
                            </Marker>
                        )}
                        {origin && (
                            <MapViewDirections
                                origin={origin}
                                destination={destination}
                                apikey={directionAPIKey}
                                strokeWidth={3}
                                strokeColor={Color.GREEN}
                            />
                        )}
                    </MapView>
                    <View style={styles.summaryContainer}>
                        <Text style={styles.paymentMethod}>Payment Method</Text>
                        <View style={{...styles.row, marginTop: 30}}>
                            <Text style={styles.cardNumber}>
                                <Image
                                    source={amexIcon}
                                    style={styles.amexIcon}
                                />
                                &nbsp;
                                <Image
                                    source={cardHiddenNumber}
                                    style={styles.cardHiddenNumber}
                                />
                                &nbsp;
                                3456
                            </Text>
                            <Text style={styles.paymentMethod}>{item.cost}</Text>
                        </View>
                        <View style={{...styles.row, marginTop: 40}}>
                            <Text style={styles.infoLabel}>Date</Text>
                            <Text style={styles.infoLabel}>{item.date}</Text>
                        </View>
                        <View style={{...styles.row, marginTop: 10}}>
                            <Text style={styles.infoLabel}>Use Time</Text>
                            <Text style={styles.infoLabel}>{item.time}</Text>
                        </View>
                        <View style={{...styles.row, marginTop: 40}}>
                            <Text style={styles.infoLabel}>Price</Text>
                            <Text style={styles.infoLabel}>{item.cost}</Text>
                        </View>
                        <View style={{...styles.row, marginTop: 10}}>
                            <Text style={styles.cardNumber}>Discounts</Text>
                            <Text style={styles.cardNumber}>$0.0</Text>
                        </View>
                        <View style={{...styles.row, marginTop: 40}}>
                            <Text style={styles.paymentMethod}>Total</Text>
                            <Text style={styles.paymentMethod}>{item.cost}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}
