import React from 'react';
import { Alert, StyleSheet, ScrollView } from 'react-native';
import { Container, Text, Button, Card, CardItem, Icon, Header, Left, Body, Title, Content, Spinner} from 'native-base';
import { getResLogs } from '../hasuraApi';

export default class Response extends React.Component {
  constructor(props){
    super(props);
    this.state={
      articleObj: null,
      fontsAreLoaded: false,
    }
  }

  async componentDidMount(){
        let articleObj = await getResLogs();
        if(articleObj.status === 200){
          articleObjJson = await articleObj.json();
        this.setState({
            articleObj: articleObjJson[0]
        });
      }

     else {
      if (articleObj.status === 504) { //change from articleList
        Alert.alert('Network error', 'Check your internet connection');
      } else {
        Alert.alert('Cluster is waking please try again later', 'Something went wrong', 'Please check table permissions and your internet connection')
      }
    }

    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'Ionicons': require('native-base/Fonts/Ionicons.ttf')
    });
    this.setState({...this.state, fontsAreLoaded: true});
  }

  render() {
    if(this.state.articleObj !== null && this.state.fontsAreLoaded){
      return (
        <Content>
          <Header>
            <Body>
              <Title>Response Json</Title>
            </Body>
          </Header>
          <ScrollView contentContainerStyle={styles.contentContainer}>
              <Text style={styles.red}>Serial:</Text>
              <Text>    {this.state.articleObj.serial}</Text>
              <Text style={styles.red}>Response: </Text>
              <Text>    {this.state.articleObj.rjson}</Text>
              <Text style={styles.red}>Time: </Text>
              <Text>    {this.state.articleObj.time}</Text>
          </ScrollView>
          </Content>
      )

    }
    return (
      <Container>
        <Header />
        <Content>
          <Spinner color='black' />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    contentContainer: {
      paddingVertical: 30,
      paddingLeft: 10,
      paddingRight: 20,
      marginBottom: 20,
      borderColor: "#701c4f",
      borderWidth: 20,
      backgroundColor: "#d0d1db"

  },
  red: {
    color: 'red',
  },
});
