import React, { PropTypes } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import { Icon } from 'react-native-elements';

import firebaseApp from 'app/lib/firebase';

import AddWithSuggestions from 'components/shoppingList/add-with-suggestions';
import ShoppingList from 'components/shoppingList';

export default class ShoppingListContainer extends React.Component {
  static navigationOptions = {
    title: 'Shopping List',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="shopping-cart" color={tintColor} />
    ),
  };

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  constructor(...args) {
    super(...args);

    this.recipesRef = firebaseApp.database().ref('recipes');
    this.itemsRef = firebaseApp.database().ref('items');
    this.shoppingListRef = firebaseApp.database().ref('shoppingList');
    this.menuRef = firebaseApp.database().ref('menu');

    this.addItem = this.addItem.bind(this);
    this.clearShoppingList = this.clearShoppingList.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.removeRecipeFromShoppingList = this.removeRecipeFromShoppingList.bind(this);

    this.state = {
      shoppingList: [],
      items: [],
      recipes: [],
      recipesOnList: [],
      newItemText: '',
    };
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
    this.listenForShoppingList(this.shoppingListRef);
    this.listenForRecipes(this.recipesRef);
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
      const shoppingList = [];
      const recipesOnList = [];
      snap.forEach((child) => {
        if (child.val().title) {
          shoppingList.push({
            title: child.val().title,
            key: child.key,
          });
        } else {
          // If not an ingredient, its a recipe. Find the recipe and pull out the ingredients needed
          const recipe = this.state.recipes[child.val().recipeKey];
          recipesOnList.push({
            ...recipe,
            shoppingListKey: child.key,
          });

          let listIngredients = [];
          if (recipe && recipe.ingredients) {
            listIngredients = recipe.ingredients.filter(ingredient => !!ingredient.list);
          }

          listIngredients.forEach((ingredient) => {
            shoppingList.push({
              title: ingredient.name,
              key: `${ingredient.name}-${child.key}`,
              recipeKey: recipe.key,
            });
          });
        }
      });
      this.setState({
        shoppingList,
        recipesOnList,
      });
    });
  }

  listenForRecipes(recipesRef) {
    recipesRef.on('value', (snap) => {
      const recipes = [];
      snap.forEach((child) => {
        recipes.push({
          key: child.key,
          ...child.val(),
        });
      });
      this.setState({
        recipes,
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

  clearShoppingList() {
    this.shoppingListRef.remove();
    this.menuRef.remove();

    this.state.recipesOnList.forEach((recipe) => {
      this.menuRef.push({ recipeKey: recipe.key });

      firebaseApp.database().ref(`recipes/${recipe.key}`).set({
        ...recipe,
        onShoppingList: false,
        markAsMade: false,
      });
    });
  }

  removeItem(itemToRemove) {
    this.shoppingListRef.child(itemToRemove.key).remove();
  }

  removeRecipeFromShoppingList(recipe) {
    this.shoppingListRef.child(recipe.shoppingListKey).remove();

    firebaseApp.database().ref(`recipes/${recipe.key}`).set({
      ...recipe,
      onShoppingList: false,
    });
  }

  render() {
    // const { navigate, state } = this.props.navigation;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <ShoppingList
          handleDoneButtonPress={this.clearShoppingList}
          handleRemoveItem={this.removeItem}
          handleRemoveRecipe={this.removeRecipeFromShoppingList}
          items={this.state.shoppingList}
          navigation={this.props.navigation}
          recipes={this.state.recipesOnList}
          style={{ flex: 1 }}
        />

        <AddWithSuggestions
          handleAddItem={this.addItem}
          items={this.state.items}
          style={{ flex: 1 }}
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
    marginTop: 0,
  },
});
