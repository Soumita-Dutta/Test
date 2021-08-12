import React,{useState, useEffect} from 'react';
import { Button,TouchableOpacity, View, FlatList, StyleSheet, Text } from 'react-native';

function screen2({ navigation }) {
  const [data, setData] = useState([]);
  const [values, setValues] = useState([]);
  const [name, setName] = useState([]);
  useEffect(()=>{
      fetchData();
      // console.log(data);
  },[])

  const fetchData=async()=>{
    let data = await fetch('http://test.oye.direct/players.json');
    let respJson = await data.json();
    setData(Object.entries(respJson));
  }

  const show=(value)=>{
    setValues(value);
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

  function sortValues(a,b) {
    return (a<b) ? -1 : (a>b) ? 1 : 0;
  }

  const fnSort=()=>{
    values.sort(function(a,b){
      return sortValues(a.name, b.name);
    })
    show();
  }

  const lnSort=()=>{
    values.sort(function(a,b){
      let aLn = a.name.split(' ').pop();
      let bLn = b.name.split(' ').pop();
      return sortValues(aLn, bLn);
    })
    show();
  }


    return (
      <View style={styles.container}>
      {
        data.map(([keys, value]) => 
            <>
              <TouchableOpacity key={keys.toString} onPress={()=> show(value)} style={styles.countryName}>
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
      <TouchableOpacity style={styles.btn} onPress={()=>fnSort()}>
        <Text>Sort with first name</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={()=>lnSort()}>
        <Text>Sort with last name</Text>
      </TouchableOpacity>
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
  },
  btn:{
    height:40,
    width:150,
    marginTop: 20,
    backgroundColor:'white',
    borderRadius:10,
    alignItems: 'center', 
    justifyContent: 'center'
  }
    
});


export default screen2;