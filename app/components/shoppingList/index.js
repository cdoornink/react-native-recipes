import React, { PropTypes } from 'react';
import {
  AsyncStorage,
  FlatList,
  SectionList,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import Swipeout from 'react-native-swipeout';
import { Button } from 'react-native-elements';

import { Aisles, AisleDesignations } from 'constants/aisles';
import RecipeListItem from 'components/recipes/recipe-list-item';
import { Colors } from 'constants/colors';

import { recipeImages } from 'app/lib/utils';

export default class ShoppingList extends React.Component {
  static propTypes = {
    handleDoneButtonPress: PropTypes.func.isRequired,
    handleRemoveItem: PropTypes.func.isRequired,
    handleRemoveRecipe: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    navigation: PropTypes.object.isRequired,
    recipes: PropTypes.array.isRequired,
  };

  constructor(...args) {
    super(...args);

    this.state = {
      checkedItems: [],
      sortedList: [],
      showRecipeList: false,
    };
  }

  componentWillMount() {
    this.syncCheckedItems();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.items !== this.props.items) {
      this.sortShoppingList(nextProps.items);
    }
  }

  handleDoneButtonPress() {
    AsyncStorage.removeItem('shoppingListCheckedItems');
    this.props.handleDoneButtonPress();
  }

  syncCheckedItems() {
    AsyncStorage.getItem('shoppingListCheckedItems').then((itemsString) => {
      const checkedItems = itemsString ? JSON.parse(itemsString) : [];
      this.setState({ checkedItems });
    });
  }

  toggleCheckedItem(itemKey) {
    const { checkedItems } = this.state;
    const itemIndex = checkedItems.indexOf(itemKey);
    if (itemIndex !== -1) {
      checkedItems.splice(itemIndex, 1);
    } else {
      checkedItems.push(itemKey);
    }

    AsyncStorage.setItem(
      'shoppingListCheckedItems',
      JSON.stringify(checkedItems),
      () => {
        this.syncCheckedItems();
        this.sortShoppingList(this.props.items);
      },
    );
  }

  toggleRecipeList() {
    this.setState({ showRecipeList: !this.state.showRecipeList });
  }

  sortShoppingList(list) {
    const ingredientKeys = Object.keys(AisleDesignations);
    const sortedShoppingList = Aisles.map(a => ({ name: a, key: a, data: [] }));

    // add list items to appropriate section in shopping list
    list.forEach((listItem) => {
      const item = listItem.title.toLowerCase();
      const itemChecked = this.state.checkedItems.includes(listItem.key);

      let matchingAisle = 'other';
      for (const key of ingredientKeys) {
        if (item.indexOf(key) !== -1) {
          matchingAisle = AisleDesignations[key];
          break;
        }
      }
      sortedShoppingList.find(i => i.name === matchingAisle).data.push({
        ...listItem,
        itemChecked,
      });
    });

    // remove sections that don't have any items
    const sortedAndFilteredShoppingList = sortedShoppingList.filter(section =>
      section.data.length > 0);

    sortedAndFilteredShoppingList.push({
      doneButton: true,
      data: [],
      key: 'done_button',
    });

    this.setState({ sortedList: sortedAndFilteredShoppingList });
  }

  renderShoppingListItem(item) {
    let rightSwipe = [];
    if (!item.recipeKey) {
      rightSwipe = [{
        backgroundColor: Colors.delete,
        onPress: () => { this.props.handleRemoveItem(item); },
        text: 'Delete',
      }];
    }
    return (
      <Swipeout
        backgroundColor={Colors.white}
        right={rightSwipe}
      >
        <Text
          style={{
            paddingHorizontal: 15,
            fontSize: 18,
            paddingTop: 6,
            paddingBottom: 8,
            textDecorationLine: item.itemChecked ? 'line-through' : 'none',
          }}
          onPress={() => this.toggleCheckedItem(item.key)}
        >
          {item.title.toLowerCase()} {' '}
          {item.recipeIndex &&
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                marginLeft: 10,
                color: Colors.primaryDark,
              }}
            >
              {item.recipeIndex}
            </Text>
          }
        </Text>
      </Swipeout>
    );
  }

  renderShoppingListAisleHeader(section) {
    if (section.doneButton) {
      return (

        <Button
          raised
          icon={{ name: 'shopping-cart', size: 32 }}
          buttonStyle={{ backgroundColor: Colors.complete }}
          textStyle={{ textAlign: 'center' }}
          title="Finished Shopping"
          onPress={() => this.props.handleDoneButtonPress()}
          style={{ marginVertical: 30 }}
        />
      );
    }
    return (
      <Text style={styles.aisleHeader}>
        {section.name.toUpperCase()}
      </Text>
    );
  }

  renderRecipeListItem(recipe) {
    return (
      <RecipeListItem
        navigation={this.props.navigation}
        navReferer="ShoppingList"
        recipe={recipe}
        onShoppingList={recipe.onShoppingList}
        imageSource={recipeImages[recipe.id]}
        handleActionButtonClick={this.props.handleRemoveRecipe}
        onlyShowRemoveButton
        stylesheet="small"
        numbered
      />
    );
  }

  render() {
    const emptyList = !this.props.recipes.length && !this.props.items.length;

    return (
      <View style={{ flex: 1, alignSelf: 'stretch' }}>

        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>
            Shopping List
          </Text>
          {!emptyList &&
            <TouchableHighlight
              style={styles.headerRightButton}
              onPress={() => this.toggleRecipeList()}
            >
              <Text style={{ color: 'white' }}>
                {this.state.showRecipeList ? 'Hide Recipes' : 'Show Recipes'}
              </Text>
            </TouchableHighlight>
          }
        </View>

        {this.state.showRecipeList && this.props.recipes.length > 0 &&
          <FlatList
            style={{ height: this.props.recipes.length * 60 }}
            data={this.props.recipes}
            renderItem={({ item }) => this.renderRecipeListItem(item)}
            removeClippedSubviews={false}
          />
        }

        {!emptyList &&
          <SectionList
            renderItem={({ item }) => this.renderShoppingListItem(item)}
            renderSectionHeader={({ section }) => this.renderShoppingListAisleHeader(section)}
            sections={this.state.sortedList}
            removeClippedSubviews={false}
          />
        }

        {emptyList &&
          <View>
            <Text style={styles.emptyMessage}>
              There is nothing on your shopping list. :(
            </Text>
            <Text style={styles.emptyMessage}>
              It’s okay though! You can add items by typing in that search field below.
              Or by picking some recipes from the Recipes section.
            </Text>
          </View>
        }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    shadowOffset: { width: 0, height: 0 },
    shadowColor: '#ccc',
    shadowOpacity: 1,
    shadowRadius: 6,
    flexDirection: 'row',
    alignContent: 'space-between',
    paddingBottom: 10,
    paddingTop: 22,
    backgroundColor: Colors.primary,
  },
  headerTitle: {
    fontSize: 20,
    flex: 1,
    paddingLeft: 15,
    color: 'white',
    fontWeight: '600',
  },
  headerRightButton: {
    paddingTop: 6,
    paddingRight: 17,
  },
  aisleHeader: {
    fontSize: 14,
    fontWeight: '700',
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: Colors.lightHeaderBG,
    color: Colors.text.dark,
  },
  aisleItem: {
    paddingHorizontal: 15,
    fontSize: 18,
    paddingTop: 6,
    paddingBottom: 8,
  },
  doneButton: {
    marginVertical: 30,
  },
  emptyMessage: {
    padding: 50,
    textAlign: 'center',
  },
});
