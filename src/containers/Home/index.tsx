import React, {Component} from 'react'
import {
  Alert,
  Dimensions,
  Image,
  NativeEventEmitter,
  NativeModules,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native'

import AsyncStorage from '@react-native-community/async-storage'
import gql from 'graphql-tag'
import {useQuery} from 'react-apollo-hooks'
import Geolocation from 'react-native-geolocation-service'
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'

import BatteryGreenIcon from '../../../resources/battery_green.svg'
import BatteryOrangeIcon from '../../../resources/battery_orange.svg'
import CurrentPositionIcon from '../../../resources/current_location_marker.svg'
import MarkerIcon from '../../../resources/marker.svg'
import MovementIcon from '../../../resources/movement.svg'
import Header from '../../components/Header'
import Color from '../../variables/colors'
import styles from './styles'

const mapStyles = require('../../../resources/map_styles.json');
const menuIcon = require('../../../resources/menu.png');
const helpIcon = require('../../../resources/help.png');
const reportIcon = require('../../../resources/report.png');
const locationIcon = require('../../../resources/location.png');
// @ts-ignore
import { GOOGLE_MAPS_DIRECTIONS_API_KEY } from 'react-native-dotenv'
const directionAPIKey = GOOGLE_MAPS_DIRECTIONS_API_KEY;
const radius = 2;

const LOCATION_QUERY = gql`
  query CurrentUserLocationsQuery($lat: String!, $lng: String!, $radius: Int!) {
    currentUser {
      nearbyLocations(lat: $lat, lng: $lng, radius: $radius) {
        name
        powerStations {
          unitId
          placement
        }
        address {
          street1
          locality
          region
          postalCode
          lat
          lng
        }
      }
    }
  }
`;

interface MarkersProps {
    tracksViewChanges: boolean
    onShowDirection: (marker: any) => void
    origin: any
    showDirection: boolean
    currentDestination: any
}

const Markers = (props: MarkersProps) => {
    const {tracksViewChanges, onShowDirection, origin, showDirection, currentDestination} = props;

    const {latitude, longitude} = origin;
    const {data, error, loading} = useQuery(LOCATION_QUERY, {
        variables: {lat: `${latitude}`, lng: `${longitude}`, radius},
        // variables: { lat: '36.159032', lng: '-86.781006', radius },
    });

    if (loading || error || !data || !data.currentUser) {
        return <View/>
    }

    const {nearbyLocations} = data.currentUser;
    return (
        <View>
            {nearbyLocations.map((marker: any) => (
                <Marker
                    coordinate={{
                        latitude: parseFloat(marker.address.lat),
                        longitude: parseFloat(marker.address.lng),
                    }}
                    key={`${marker.name}${Date.now()}`}
                    onPress={() => onShowDirection(marker)}
                    tracksViewChanges={tracksViewChanges}
                >
                    <MarkerIcon width={32} height={44}/>
                    <Callout>
                        <View style={styles.mapInfoContainer}>
                            <View style={styles.nameDiv}>
                                <Text style={styles.nameText}>
                                    {marker.name}
                                    ,
                                    {' '}
                                    {marker.powerStations[0].placement}
                                </Text>
                                <TouchableHighlight
                                    style={styles.openBtnContainer}
                                >
                                    <Text style={styles.openText}>Open</Text>
                                </TouchableHighlight>
                            </View>
                            <Text style={styles.addressText}>
                                {marker.address.street1}
                                ,
                                {' '}
                                {marker.address.locality}
                                ,
                                {' '}
                                {marker.address.region}
                                {' '}
                                {marker.address.postalCode}
                            </Text>
                            <View style={{...styles.nameDiv, marginTop: 8}}>
                                <View style={styles.featureDiv}>
                                    <BatteryGreenIcon width={16} height={12}/>
                                    <Text style={styles.featureText}>3 Full</Text>
                                </View>
                                <View style={styles.featureDiv}>
                                    <BatteryOrangeIcon width={16} height={12}/>
                                    <Text style={styles.featureText}>4 Charging</Text>
                                </View>
                                <View style={styles.featureDiv}>
                                    <MovementIcon width={16} height={16}/>
                                    <Text style={{...styles.featureText, marginTop: 2}}>3 Empty</Text>
                                </View>
                            </View>
                            <View style={{...styles.nameDiv, marginTop: 12}}>
                                <Text style={styles.priceText}>Price</Text>
                                <Text style={styles.priceText}>$1 per hour</Text>
                            </View>
                        </View>
                    </Callout>
                </Marker>
            ))}
            {origin && showDirection && (
                <MapViewDirections
                    origin={origin}
                    destination={currentDestination}
                    apikey={directionAPIKey}
                    strokeWidth={3}
                    strokeColor={Color.GREEN}
                />
            )}
        </View>
    )
};

export interface Props {
    navigation: any
}

export interface State {
    currentLatitude: number
    currentLongitude: number
    currentDestination: any
    showDirection: boolean
    tracksViewChanges: boolean
    batteryStatus: number
    isCharging: boolean
}

export default class Home extends Component<Props, State> {
    static navigationOptions = {
        drawerLabel: (<Text style={styles.drawerLabel}>Find A Rabbit</Text>),
    };

    map: any;
    localNotification: any;

    constructor(props: Props) {
        super(props);

        this.state = {
            currentLatitude: 0.0,
            currentLongitude: 0.0,
            currentDestination: null,
            showDirection: false,
            tracksViewChanges: true,
            batteryStatus: 100,
            isCharging: false,
        }
    }

    async componentDidMount() {
        const isNotification = await AsyncStorage.getItem('isNotification');

        if (isNotification === 'true' && Platform.OS !== 'ios') {
            const deviceInfoEmitter = new NativeEventEmitter(NativeModules.BatteryManager);

            deviceInfoEmitter.addListener('BatteryStatus', info => {
                const {batteryStatus} = this.state;
                if (batteryStatus > 10 && info.level <= 10 && !info.isPlugged) {
                    Alert.alert(
                        'Warning',
                        `Battery is low. ${info.level}% remaining.`,
                        [
                            {
                                text: 'OK',
                            },
                        ],
                    )
                }
                this.setState({batteryStatus: info.level, isCharging: info.isPlugged})
            })
        }

        if (Platform.OS === 'ios') {
            Geolocation.requestAuthorization();
            this.getCurrentLocation()
        } else {
            await this.requestLocationPermission()
        }
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
                });

                const {width, height} = Dimensions.get('window');
                const currentLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1 * width / height,
                };

                this.map.animateToRegion(currentLocation, 1000)
            }, error => console.warn('error', error.message),
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000})
        // this.setState({
        //   currentLatitude: 36.159032,
        //   currentLongitude: -86.781006,
        // })
    }

    onShowDirection = (marker: any) => {
        this.setState({showDirection: true});
        const {width, height} = Dimensions.get('window');
        const newDestination = {
            latitude: parseFloat(marker.address.lat),
            longitude: parseFloat(marker.address.lng),
            latitudeDelta: 0.01,
            longitudeDelta: 0.01 * width / height,
        };

        this.setState({
            currentDestination: newDestination,
        });
        this.map.animateToRegion(newDestination, 1000)
    };

    async requestLocationPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
                    title: 'Rabbit',
                    message: 'Rabbit requires to access to your location',
                    buttonPositive: 'OK',
                },
            );

            if (granted) {
                this.getCurrentLocation()
            }
        } catch (err) {
            console.warn('errrorr', err)
        }
    }

    render() {
        const {
            currentLatitude, currentLongitude, showDirection, currentDestination, tracksViewChanges,
        } = this.state;
        const {navigation} = this.props;

        let origin: any = null;

        if (currentLatitude && currentLongitude) {
            origin = {latitude: currentLatitude, longitude: currentLongitude}
        }

        return (
            <SafeAreaView style={{flex: 1, backgroundColor: Color.BLACK}}>
                <View style={styles.viewContainer}>
                    <Header
                        title='Find A Rabbit'
                        leftIcon={menuIcon}
                        rightIcon={helpIcon}
                        onLeftBtnPress={() => navigation.openDrawer()}
                        onRightBtnPress={() => navigation.navigate('Help')}
                    />
                    <MapView
                        ref={(ref) => {
                            this.map = ref
                        }}
                        style={styles.mapView}
                        provider={PROVIDER_GOOGLE}
                        customMapStyle={mapStyles}
                        initialRegion={{
                            latitude: currentLatitude,
                            longitude: currentLongitude,
                            latitudeDelta: 0.0322,
                            longitudeDelta: 0.0121,
                        }}
                    >
                        {origin && <Markers
                            tracksViewChanges={tracksViewChanges}
                            onShowDirection={this.onShowDirection}
                            origin={origin}
                            showDirection={showDirection}
                            currentDestination={currentDestination}
                        />}
                        {origin && (
                            <Marker
                                coordinate={origin}
                            >
                                <CurrentPositionIcon width={20} height={20}/>
                            </Marker>
                        )}
                    </MapView>
                    <TouchableOpacity
                        style={{...styles.bottomIcon, left: 16}}
                        onPress={() => console.warn('Report!')}
                    >
                        <Image
                            source={reportIcon}
                            style={styles.image}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{...styles.bottomIcon, right: 16}}
                        onPress={() => {
                            this.map.animateCamera({center: origin}, {duration: 1000})
                        }}
                    >
                        <Image
                            source={locationIcon}
                            style={styles.image}
                        />
                    </TouchableOpacity>
                    <TouchableHighlight
                        style={styles.buttonContainer}
                        onPress={() => navigation.navigate('ScanQRCode')}
                    >
                        <Text style={styles.buttonText}>SCAN QR-CODE</Text>
                    </TouchableHighlight>
                </View>
            </SafeAreaView>
        )
    }
}
