
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
  View,
  Alert
} from 'react-native';


import {useState,useEffect} from 'react';

type ItemProps = {
  item: JSON;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
};

const Item = ({item, onPress, backgroundColor, textColor}: ItemProps) => (
  <View style={[styles.item, {backgroundColor, flexDirection: 'row',
}]}>
    <Text style={[styles.title, {color: textColor,flex: 7}]}>{item.id+'. '+item.title}</Text>
    <TouchableOpacity onPress={onPress}>
  
    <Text style={[styles.title, {color: textColor}]}>Delete</Text>

    </TouchableOpacity>

  </View>
);

function App(): JSX.Element {
 
  const [bookData, setBookData] = useState([])
  const [selectedId, setSelectedId] = useState<string>();
  

  useEffect(() => {
    function fetchInfo() {
      fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(arr => {
          setBookData(() => {
            return arr
          })
        })
    }
    fetchInfo()
  }, [])

  function showConfirmationAlert(id: String){
    Alert.alert('Alert', 'Are you sure want to delete this item?', [
      {
        text: 'No',
        onPress: () => console.log('No Pressed'),
        style: 'cancel',
      },
      {text: 'Yes', onPress: () => deleteItemById(id)},
    ]);
  }

  function deleteItemById (id: String)  {
    console.log("to delete id :"+id)
    const filteredData = bookData.filter(item => item.id !== id);
    setBookData(filteredData);
  }
  

  const renderItem = ({item}: {item: []}) => {
    const backgroundColor = '#f9c2ff';
    const color = 'black';
    return (
      <Item
        item={item}
        onPress={() => {
          showConfirmationAlert(item.id)
        }}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };
  return (
    <SafeAreaView >
      <FlatList
  keyExtractor={(bookData) => bookData.id}
  data={bookData}
  renderItem={renderItem}
/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
  },
});

export default App;
