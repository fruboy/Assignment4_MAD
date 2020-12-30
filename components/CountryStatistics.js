import React, { Component } from 'react';
import {
  ActivityIndicator,
  Button,
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class CountryStatistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      countries: [],
      countryData: {},
      worldData: 0,
      favCountries: [],
    };
  }
  componentDidMount() {
    this.getCovidData();
  }
  getCovidData() {
    fetch('https://api.covid19api.com/summary', { method: 'GET' })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          countries: responseJson.Countries,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  getCountryData(country) {
    fetch(
      'https://world-population.p.rapidapi.com/population?country_name=' +
        country,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key':
            'ed66219b9bmsh76d615dbd7c125cp1432c2jsn159dfa7b9af8',
          'x-rapidapi-host': 'world-population.p.rapidapi.com',
        },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          worldData: responseJson.body.population,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }
  createItemData() {
    var items = [];
    this.state.countries.map((country) => {
      //console.log(country.Country)
      items = [...items, { label: country.Country, value: country }];
    });
    return items;
  }
  async addToFavourites(value) {
    try {
      await AsyncStorage.setItem('@fav_countries', JSON.stringify(value));
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator size="large" color="blue" />
          <Text>Loading Data from JSON Placeholder API ...</Text>
        </View>
      );
    }
    let totalPopulation = this.state.worldData;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <DropDownPicker
          items={this.createItemData()}
          defaultIndex={0}
          containerStyle={{
            height: 40,
            width: 200,
            position: 'absolute',
            top: '10%',
          }}
          searchable={true}
          searchablePlaceholder="Search for a country"
          searchablePlaceholderTextColor="gray"
          seachableStyle={{}}
          searchableError={() => <Text>Not Found</Text>}
          onChangeItem={(item) => {
            this.setState({
              isLoading: false,
              countryData: item.value,
              showCountry: true,
            });
            this.getCountryData(item.label);
          }}
        />
        {this.state.showCountry === true ? (
          <View style={{ marginTop: 20 }}>
            <Text
              style={{
                fontSize: 20,
                textAlign: 'Center',
                fontWeight: 'bold',
                position: 'absolue',
                top: '7%',
              }}>
              {this.state.countryData.Country} Covid Statistics
            </Text>
            <Text
              style={{ fontSize: 15, textAlign: 'Center', fontWeight: 'bold' }}>
              Confirmed Cases
            </Text>
            <Text style={{ fontSize: 15, textAlign: 'Center' }}>
              {JSON.stringify(this.state.countryData.TotalConfirmed)}
            </Text>
            <Text style={{ fontSize: 15, textAlign: 'Center' }}>
              {JSON.stringify(
                (this.state.countryData.TotalConfirmed / totalPopulation) * 100
              ).substring(0, 4)}
              %
            </Text>
            <Text
              style={{ fontSize: 15, textAlign: 'Center', fontWeight: 'bold' }}>
              Recovered Cases
            </Text>
            <Text style={{ fontSize: 15, textAlign: 'Center' }}>
              {JSON.stringify(this.state.countryData.TotalRecovered)}
            </Text>
            <Text style={{ fontSize: 15, textAlign: 'Center' }}>
              {JSON.stringify(
                (this.state.countryData.TotalRecovered / totalPopulation) * 100
              ).substring(0, 4)}
              %
            </Text>
            <Text
              style={{ fontSize: 15, textAlign: 'Center', fontWeight: 'bold' }}>
              Total Deaths
            </Text>
            <Text style={{ fontSize: 15, textAlign: 'Center' }}>
              {JSON.stringify(this.state.countryData.TotalDeaths)}
            </Text>
            <Text style={{ fontSize: 15, textAlign: 'Center' }}>
              {JSON.stringify(
                (this.state.countryData.TotalDeaths / totalPopulation) * 100
              ).substring(0, 7)}
              %
            </Text>
            <Text
              style={{ fontSize: 15, textAlign: 'Center', fontWeight: 'bold' }}>
              Last Updated
            </Text>
            <Text style={{ fontSize: 15, textAlign: 'Center' }}>
              {JSON.stringify(this.state.countryData.Date).substring(1, 11)}
            </Text>
            <Button
              onPress={() => {
                this.state.favCountries = [
                  ...this.state.favCountries,
                  this.state.countryData,
                ];
                this.addToFavourites(this.state.favCountries);
              }}
              title="Add to favourites"
              color="#841584"
              accessibilityLabel="Add this country to favourites"
            />
          </View>
        ) : (
          <View></View>
        )}
      </View>
    );
  }
}
