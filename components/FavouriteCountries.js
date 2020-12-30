import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Button,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function FavouriteStats(props) {
  return (
    <View>
      <Text style={{ fontSize: 20, textAlign: 'Center', fontWeight: 'bold' }}>
        {props.info.Country} Covid Statistics
      </Text>
      <Text style={{ fontSize: 15, textAlign: 'Center', fontWeight: 'bold' }}>
        Confirmed Cases
      </Text>
      <Text style={{ fontSize: 15, textAlign: 'Center' }}>
        {props.info.TotalConfirmed}
      </Text>
      <Text style={{ fontSize: 15, textAlign: 'Center', fontWeight: 'bold' }}>
        Recovered Cases
      </Text>
      <Text style={{ fontSize: 15, textAlign: 'Center' }}>
        {props.info.TotalRecovered}
      </Text>
      <Text style={{ fontSize: 15, textAlign: 'Center', fontWeight: 'bold' }}>
        Total Deaths
      </Text>
      <Text style={{ fontSize: 15, textAlign: 'Center' }}>
        {props.info.TotalDeaths}
      </Text>
      <Text style={{ fontSize: 15, textAlign: 'Center', fontWeight: 'bold' }}>
        Last Updated
      </Text>
      <Text style={{ fontSize: 15, textAlign: 'Center' }}>
        {props.info.Date.substring(0, 10)}
      </Text>
      <Button
        onPress={() => {
          props.childHandler();
        }}
        title="Back to favourites"
        color="#841584"
        accessibilityLabel="Go Back to favourites"
      />
    </View>
  );
}
/*
export default class CountryStatistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favourites: [],
      showInfo: false,
      infoObject: {},
    };
  }

  getDataFromStorage = async () => {
    try {
      const myArray = await AsyncStorage.getItem('@fav_countries');
      if (myArray !== null) {
        this.setState({
          favourites:JSON.parse(myArray)
        });
        console.log('Reached');
        //setfavourites(JSON.parse(myArray));
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  componentDidUpdate() {
    this.getDataFromStorage();
  }
  componentDidMount() {
    this.getDataFromStorage();
  }
  showStats = (data) => {
    this.setState({
      infoObject: data,
      showInfo: true,
    });
    //setinfoObject(data);
    //setshowInfo(true);
  };
  handler = () => {
    this.setState({
      showInfo: false,
    });
    //setshowInfo(false);
  };
  render() {
    const Item = ({ title }) => (
      <TouchableOpacity style={styles.item} onPress={() => this.showStats(title)}>
        <Text style={styles.title}>{title.Country}</Text>
      </TouchableOpacity>
    );

    const renderItem = ({ item }) => {
      //console.log(item);
      return <Item title={item} />;
    };

    return (
      <View>
        {this.state.showInfo == false ? (
          <SafeAreaView style={styles.container}>
            <FlatList
              data={this.state.favourites}
              renderItem={renderItem}
              keyExtractor={(item) => item.Slug}
            />
          </SafeAreaView>
        ) : (
          <FavouriteStats
            info={this.state.infoObject}
            childHandler={this.handler}
          />
        )}
      </View>
    );
  }
}
*/
export default function CountryStatistics({ navigation }) {
  const [favourites, setfavourites] = useState([]);
  const [showInfo, setshowInfo] = useState(false);
  const [infoObject, setinfoObject] = useState({});

  const getDataFromStorage = async () => {
    try {
      const myArray = await AsyncStorage.getItem('@fav_countries');
      if (myArray !== null) {
        setfavourites(JSON.parse(myArray));
        console.log('Reached');
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    getDataFromStorage();
  }, []);
  const Item = ({ title }) => (
    <TouchableOpacity style={styles.item} onPress={() => showStats(title)}>
      <Text style={styles.title}>{title.Country}</Text>
    </TouchableOpacity>
  );
  const showStats = (data) => {
    setinfoObject(data);
    setshowInfo(true);
  };
  const renderItem = ({ item }) => {
    //console.log(item);
    return <Item title={item} />
  };
  const handler = () => {
    setshowInfo(false);
  };
  return (
    <View>
      {showInfo == false ? (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={favourites}
            renderItem={renderItem}
            keyExtractor={(item) => item.Slug}
          />
        </SafeAreaView>
      ) : (
        <FavouriteStats info={infoObject} childHandler={handler} />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#abc20f',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 12,
  },
  title: {
    fontSize: 22,
  },
});
