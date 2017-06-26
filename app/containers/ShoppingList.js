import React, { PropTypes } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';

import firebaseApp from 'app/lib/firebase';

import AddWithSuggestions from 'components/shoppingList/add-with-suggestions';
import ShoppingList from 'components/shoppingList';

export default class ShoppingListContainer extends React.Component {
  static navigationOptions = {
    title: 'Shopping List',
  };

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  constructor(...args) {
    super(...args);

    this.itemsRef = firebaseApp.database().ref('items');
    this.shoppingListRef = firebaseApp.database().ref('shoppingList');

    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);

    this.state = {
      shoppingList: [],
      items: [],
      newItemText: '',
    };
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
    this.listenForShoppingList(this.shoppingListRef);
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {
      const items = [];
      snap.forEach((child) => {
        items.push({
          title: child.val().title,
          key: child.key,
        });
      });
      this.setState({
        items,
      });
    });
  }

  listenForShoppingList(itemsRef) {
    itemsRef.on('value', (snap) => {
      const items = [];
      snap.forEach((child) => {
        items.push({
          title: child.val().title,
          key: child.key,
        });
      });
      this.setState({
        shoppingList: items,
      });
    });
  }

  addItem(itemToAdd) {
    let itemExists = false;
    if (itemToAdd.length) {
      this.state.items.forEach((item) => {
        if (item.title.toLowerCase() === itemToAdd.toLowerCase()) {
          itemExists = true;
        }
      });
      if (!itemExists) {
        this.itemsRef.push({ title: itemToAdd });
      }
      this.shoppingListRef.push({ title: itemToAdd });
    }
  }

  removeItem(itemToRemove) {
    this.shoppingListRef.child(itemToRemove.key).remove();
  }

  render() {
    // const { navigate, state } = this.props.navigation;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <ShoppingList
          style={{ flex: 1, alignSelf: 'stretch' }}
          items={this.state.shoppingList}
          handleRemoveItem={this.removeItem}
        />

        <AddWithSuggestions
          style={{ flex: 1 }}
          items={this.state.items}
          handleAddItem={this.addItem}
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
});
