import React, { PropTypes } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';

import ModalWithPicker from 'components/shared/modal-with-picker';
import RecipeListItem from 'components/recipes/recipe-list-item';

export default class Recipes extends React.Component {
  static propTypes = {
    // handleAddToShoppingList: PropTypes.func.isRequired,
    // handleRemoveFromShoppingList: PropTypes.func.isRequired,
    handleUpdateSortMethod: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
    recipes: PropTypes.array,
    sortMethod: PropTypes.string.isRequired,
    recipeImages: PropTypes.object.isRequired,
  };

  static defaultProps = {
    recipes: [],
  }

  /* eslint global-require: "off" */
  /* eslint quote-props: "off" */
  constructor(...args) {
    super(...args);
    this.state = {
      recipeFilterKey: '',
      modalVisible: false,
    };

    this.updateSortMethod = this.updateSortMethod.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
  }

  updateSortMethod(method) {
    this.props.handleUpdateSortMethod(method);
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.items !== this.props.items) {
  //     this.setState({ sortedList: this.sortShoppingList(nextProps.items) });
  //   }
  // }
  //
  renderRecipeListItem(recipe) {
    return (
      <RecipeListItem
        navigation={this.props.navigation}
        recipe={recipe}
        imageSource={this.props.recipeImages[recipe.id]}
      />
    );
  }

  render() {
    let filteredRecipes = this.props.recipes;

    if (filteredRecipes && this.state.recipeFilterKey) {
      filteredRecipes = filteredRecipes.filter(recipe =>
        recipe.title.toLowerCase().indexOf(this.state.recipeFilterKey.toLowerCase()) !== -1,
      );
    }

    return (
      <View>
        <View style={styles.filterContainer}>
          <TextInput
            style={styles.filterContainerTextInput}
            onChangeText={(text) => {
              this.setState({ recipeFilterKey: text });
            }}
            placeholder="Search for a recipe"
            value={this.state.newItemText}
          />
          <View style={styles.sortingInfoContainer}>


            <TouchableHighlight onPress={() => this.setModalVisible(true)}>
              <Text style={styles.sortingInfoText}>
                Sort by: {this.props.sortMethod}
              </Text>
            </TouchableHighlight>
          </View>
        </View>
        <FlatList
          style={styles.recipesListContainer}
          data={filteredRecipes}
          renderItem={({ item }) => this.renderRecipeListItem(item)}
          removeClippedSubviews={false}
          key={`sorted By ${this.props.sortMethod}`}
        />
        <ModalWithPicker
          visible={this.state.modalVisible}
          handlePickerSelect={this.updateSortMethod}
          toggleVisible={this.setModalVisible}
          selectedValue={this.props.sortMethod}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  filterContainer: {
    shadowOffset: { width: 0, height: 0 },
    shadowColor: '#ccc',
    shadowOpacity: 1,
    shadowRadius: 6,
    flexDirection: 'row',
    alignContent: 'space-between',
    paddingBottom: 10,
    paddingTop: 30,
  },
  filterContainerTextInput: {
    flex: 1,
    height: 30,
    fontSize: 14,
    paddingVertical: 2,
    paddingHorizontal: 15,
    marginLeft: 10,
    backgroundColor: '#eee',
    borderRadius: 15,
  },
  sortingInfoContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 6,
  },
  sortingInfoText: {
    color: '#999',
  },
  recipesListContainer: {
    paddingTop: 20,
    paddingHorizontal: 10,
  },
});
