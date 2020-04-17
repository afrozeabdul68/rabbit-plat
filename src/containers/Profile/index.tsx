import React, {Component} from 'react'
import {Image, Text, TouchableOpacity, View,} from 'react-native'

import gql from 'graphql-tag'
import {useQuery} from 'react-apollo-hooks'
import styles from './styles'

const rightArrowIcon = require('../../../resources/right_arrow.png');

const PROFILE_QUERY = gql`
  query ProfileQuery {
    currentUser {
      fullName
      email
      phone {
        phoneNumber
      }
    }
  }
`;

const ProfileInfo = () => {
    const {data, error, loading} = useQuery(PROFILE_QUERY);

    if (loading) {
        return <Text style={styles.text}>Loading...</Text>
    }

    if (error) {
        return <Text style={styles.text}>Profile info doesn&apos;t exist.</Text>
    }

    const {fullName, email, phone} = data.currentUser;
    return (
        <View>
            <Text style={styles.label}>Name</Text>
            <TouchableOpacity>
                <View style={styles.row}>
                    <Text style={styles.text}>{fullName}</Text>
                    <Image style={styles.rightArrowIcon} source={rightArrowIcon}/>
                </View>
            </TouchableOpacity>
            <Text style={styles.label}>Email</Text>
            <TouchableOpacity>
                <View style={styles.row}>
                    <Text style={styles.text}>{email}</Text>
                    <Image style={styles.rightArrowIcon} source={rightArrowIcon}/>
                </View>
            </TouchableOpacity>
            <Text style={styles.label}>Phone</Text>
            <TouchableOpacity>
                <View style={styles.row}>
                    <Text style={styles.text}>{phone.phoneNumber}</Text>
                    <Image style={styles.rightArrowIcon} source={rightArrowIcon}/>
                </View>
            </TouchableOpacity>
        </View>
    )
};

export default class Profile extends Component {
    static navigationOptions = {
        title: 'Profile',
    };

    render() {
        return (
            <View style={styles.viewContainer}>
                <ProfileInfo/>
            </View>
        )
    }
}
