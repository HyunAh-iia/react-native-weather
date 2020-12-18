import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';

export default function Weather({temperature, condition, location}) {
    return (
        <View style={styles.container}>
            <Text>온도 : {temperature}</Text>
            <Text>날씨 상태 : {condition}</Text>
            <Text>위치 : {location}</Text>
        </View>
    );
}

Weather.propTypes = {
    temperature: PropTypes.number.isRequired,
    condition: PropTypes.oneOf([
        "Thunderstorm", // Group 2xx
        "Drizzle", // Group 3xx
        "Rain", // Group 5xx
        "Snow", // Group 6xx
        "Mist","Smoke","Haze","Dust","Fog","Sand","Dust","Ash","Squall","Tornado", // Group 7xx
        "Clear", // Group 8xx
        "Clouds" // Group 9xx
    ]).isRequired
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});