import React,{useState, useEffect} from 'react';
import { Button, TouchableOpacity, View, FlatList, StyleSheet, Text } from 'react-native';

function screen1({ navigation }) {
  const [data, setData] = useState([]);
  const [values, setValues] = useState([]);
  useEffect(()=>{
      fetchData();
      // console.log(data);
  },[])

  const fetchData=async()=>{
    let data = await fetch('http://test.oye.direct/players.json');
    let respJson = await data.json();
    // setKey(Object.entries(respJson));
    setData(Object.entries(respJson));
  }
    
  const show=(value)=>{
    setValues(value)
  }

  const _renderItem = ({item, index}) => {
    return (
      <>
      {item.captain === true ? 
      <Text style={styles.boldText}>{item.name}</Text>
      : 
      <Text style={styles.normalText}>{item.name}</Text>
      }
      </>
    );
  };

  return (
    <View style={styles.container}>
      {
        data.map(([keys, value]) => 
            <>
              <TouchableOpacity key={keys} onPress={()=> show(value)} style={styles.countryName}>
                <Text>{keys}</Text>
              </TouchableOpacity>
              {value===values?(
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={values}
                  renderItem={_renderItem}
                  keyExtractor={(item, index) => index.toString()}
                  contentContainerStyle={styles.flatList}
                />
              ):null}
            </>
        )
      }
      <Button title="Screen 2" onPress={()=> navigation.navigate("screen2")}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center'
  },
  countryName:{
    width:'90%' ,
    alignItems: 'flex-start', 
    justifyContent: 'center',
    marginBottom:10,
    padding: 10,
    backgroundColor: '#d3d3d3'
  },
  flatList:{
    width: 300
  },
  boldText: {
    fontWeight: 'bold',
    paddingTop:10,
  },
  normalText:{
    paddingTop:10
  }
    
});

export default screen1;