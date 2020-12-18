import React from 'react';
import {Alert} from 'react-native'
import Loading from './Loading';
import * as Location from 'expo-location';
import axios from 'axios'
import API_KEY from './API_KEY.json'
import Weather from "./Weather";

const APP_ID = API_KEY.openWeather; // https://openweathermap.org/ 로그인해서 API Key 넣으면 됨

export default class extends React.Component {
  state = {
    isLoading: true,
  };

  getWeather = async (latitude, longitude) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?appid=${APP_ID}&units=metric&&lat=${latitude}&lon=${longitude}`;
    const {
      data: {
        main : {temp},
        weather,
        name
      }
    } = await axios.get(url);
    //console.log(data);

    this.setState({
      isLoading: false,
      temperature: temp,
      condition: weather[0].main,
      location: name,
    });
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
    } catch (e) {
      Alert.alert("위치를 찾지 못하였습니다.", "흑흑");
    }
  };

  componentDidMount() {
    this.getLocation();
  }
  render() {
    const {isLoading, temperature, condition, location} = this.state;
    return isLoading ?
        <Loading/> :
        <Weather
            temperature={Math.round(temperature)}
            condition="Clouds"//{condition}
            location={location}
        />;
  }

}