import React from 'react';
import {Alert} from 'react-native'
import Loading from './Loading';
import * as Location from 'expo-location';
import axios from 'axios'
import API_KEY from './API_KEY.json'

const APPID = API_KEY.openWeather; // https://openweathermap.org/ 로그인해서 API Key 넣으면 됨

export default class extends React.Component {
  state = {
    isLoading: true,
  };

  getWeather = async (latitude, longitude) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?appid=${APPID}&lat=${latitude}&lon=${longitude}`;
    const { data } = await axios.get(url);
    console.log(data);
  }

  getLocation = async() => {
    try {
      await Location.requestPermissionsAsync();
      const location = await Location.getCurrentPositionAsync();
      //console.log(location);
      const {
        coords: { latitude, longitude }
      } = location;

      this.getWeather(latitude, longitude);
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