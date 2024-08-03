import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  Modal,
  Pressable,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  decrementCart,
  incrementCart,
  setProducts,
} from '../redux/productsReducer';
import {RootState} from '../redux/store';
import {styles} from './styles';

export default function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const products = useSelector((state: RootState) => state.products.products);
  const dispatch = useDispatch();

  const fetchData = async () => {
    const url = 'https://fakestoreapi.com/products';
    try {
      let response = await axios.get(url);
      let data = response.data;
      dispatch(setProducts(data));
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
        <View style={styles.modalBackground}>
          <View style={styles.modal}>
            {selectedProduct && (
              <>
                <Image
                  style={styles.modalImg}
                  source={{uri: selectedProduct.image}}
                />
                <Text style={[styles.price, {color: 'black'}]}>
                  Rs. {selectedProduct.price}
                </Text>
                <View style={styles.row}>
                  <Text style={[styles.secondaryText, {marginRight: 10}]}>
                    Description:
                  </Text>
                  <View style={{width: 200}}>
                    <Text
                      style={{
                        color: 'black',
                      }}>
                      {selectedProduct.description}
                    </Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <Pressable
                    style={styles.addCartBtn}
                    onPress={() => {
                      dispatch(incrementCart(selectedProduct.id));
                      setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.row}>
                      <Image
                        source={require('../assets/shopping_cart.png')}
                        style={{width: 20, height: 20}}
                      />
                      <Text style={{color: 'white'}}>Add to Cart</Text>
                    </View>
                  </Pressable>
                  <Pressable
                    style={styles.modalDismissBtn}
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
            <View style={styles.listTile}>
              <Image
                style={{width: 80, height: 100, objectFit: 'contain'}}
                source={{uri: item.image}}
              />
              <View style={{flex: 1, marginLeft: 20}}>
                <Text style={[styles.title, {color: 'black'}]}>
                  {item.title}
                </Text>
                <View style={{flexDirection: 'row'}}>
                  {renderStars(Math.round(item.rating.rate))}
                  <Text style={[styles.secondaryText, {marginLeft: 10}]}>
                    {item.rating.count}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={[styles.price, {color: 'black'}]}>
                    Rs. {item.price}
                  </Text>
                  {item.cart > 0 && (
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Pressable
                        style={[styles.actionBtn]}
                        onPress={() => dispatch(decrementCart(item.id))}>
                        <Text style={{fontSize: 20, color: 'black'}}>-</Text>
                      </Pressable>
                      <View style={{width: 30}}>
                        <Text style={styles.cartText}>{item.cart}</Text>
                      </View>
                      <Pressable
                        style={[styles.actionBtn]}
                        onPress={() => dispatch(incrementCart(item.id))}>
                        <View>
                          <Text style={{fontSize: 20, color: 'black'}}>+</Text>
                        </View>
                      </Pressable>
                    </View>
                  )}
                </View>
                <Text style={[styles.secondaryText]}>
                  Category: {item.category}
                </Text>
              </View>
            </View>
          </Pressable>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}
