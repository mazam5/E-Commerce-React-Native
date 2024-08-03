import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  Alert,
  Modal,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchData = async () => {
    const url = 'https://fakestoreapi.com/products';
    try {
      let response = await axios.get(url);
      let data = response.data;
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderStars = rating => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Image
          key={i}
          source={
            i <= rating
              ? require('../assets/star_filled.png')
              : i - rating === 0.5
              ? require('../assets/star_half.png')
              : require('../assets/star_empty.png')
          }
          style={{width: 20, height: 20}}
        />,
      );
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            width: '100%',
            flex: 2,
            flexDirection: 'row',
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '80%',
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 20,
              borderRadius: 10,
            }}>
            {selectedProduct && (
              <>
                <Image
                  style={{width: 200, height: 200, objectFit: 'contain'}}
                  source={{uri: selectedProduct.image}}
                />
                <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 10}}>
                  Rs. {selectedProduct.price}
                </Text>
                <Text>{selectedProduct.description}</Text>
                <View style={{flexDirection: 'row'}}>
                  <Pressable
                    style={{
                      backgroundColor: 'red',
                      padding: 10,
                      margin: 10,
                      borderRadius: 5,
                    }}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <View style={{flexDirection: 'row'}}>
                      <Image
                        source={require('../assets/shopping_cart.png')}
                        style={{width: 20, height: 20}}
                      />
                      <Text style={{color: 'white'}}>Add to Cart</Text>
                    </View>
                  </Pressable>
                  <Pressable
                    style={{
                      backgroundColor: 'grey',
                      padding: 10,
                      margin: 10,
                      borderRadius: 5,
                    }}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={{color: 'white'}}>Close</Text>
                  </Pressable>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
      <FlatList
        data={products}
        renderItem={({item}) => (
          <Pressable
            onPress={() => {
              setSelectedProduct(item);
              setModalVisible(true);
            }}>
            <View
              style={{
                flex: 1,
                margin: 10,
                padding: 10,
                flexDirection: 'row',
                borderColor: 'black',
                borderRadius: 10,
                borderWidth: 1,
              }}>
              <Image
                style={{width: 80, height: 100, objectFit: 'contain'}}
                source={{uri: item.image}}
              />
              <View style={{flex: 1, marginLeft: 20}}>
                <Text
                  style={{
                    fontSize: 16,
                    color: 'black',
                    fontWeight: 'bold',
                  }}>
                  {item.title}
                </Text>
                <View style={{flexDirection: 'row'}}>
                  {renderStars(Math.round(item.rating.rate))}
                  <Text style={{color: 'grey', marginLeft: 10}}>
                    {item.rating.count}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: 'black',
                      fontWeight: '700',
                      marginVertical: 10,
                    }}>
                    Rs. {item.price}
                  </Text>
                  {/* <Pressable
                    style={{
                      // marginLeft: 10,
                      backgroundColor: 'lightblue',
                      padding: 5,
                      height: 50,
                      width: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 5,
                    }}
                    onPress={() => {
                      Alert.alert('Item added to cart');
                    }}>
                    <Image
                      source={require('../assets/add_shopping_cart.png')}
                      style={{width: 20, height: 20}}
                    />
                  </Pressable> */}
                </View>
                <Text style={{color: 'gray'}}>Category: {item.category}</Text>
              </View>
            </View>
          </Pressable>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
