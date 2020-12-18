import React from 'react';
import {Alert} from 'react-native'
import Loading from './Loading';
import * as Location from 'expo-location';

export default class extends React.Component {
  state = {
    isLoading: true,
  }

  getLocation = async() => {
    try {
      await Location.requestPermissionsAsync();
      const location = await Location.getCurrentPositionAsync();
      //console.log(location);
      const {
        coords: { latitude, longitude }
      } = location;
      this.setState({ isLoading: false });
    } catch (e) {
      Alert.alert("위치를 찾지 못하였습니다.", "흑흑");
    }
  };

  componentDidMount() {
    this.getLocation();
  }

  render() {
    const {isLoading} = this.state;
    return <Loading/>;
  }

}