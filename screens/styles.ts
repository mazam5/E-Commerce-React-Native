import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  mainText: {
    color: 'black',
  },
  secondaryText: {
    color: 'grey',
  },
  container: {
    backgroundColor: '#f0f0f0',
    color: 'black',
  },
  //   modal: {
  //     flex: 1,
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     backgroundColor: 'rgba(0,0,0,0.5)',
  //   },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 10,
  },
  actionBtn: {
    backgroundColor: 'lightgrey',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 5,
  },
  cartText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
  listTile: {
    flex: 1,
    margin: 10,
    padding: 10,
    flexDirection: 'row',
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
  },
  addCartBtn: {
    backgroundColor: 'red',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  modal: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImg: {width: 200, height: 200, objectFit: 'contain'},
  modalDismissBtn: {
    backgroundColor: 'grey',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  row: {flexDirection: 'row'},
});
