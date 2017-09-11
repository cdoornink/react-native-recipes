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
    handleUpdateSortMethod: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
    recipes: PropTypes.array,
    sortMethod: PropTypes.string.isRequired,
    recipeImages: PropTypes.object.isRequired,
    toggleOnShoppingList: PropTypes.func.isRequired,
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

  toggleOnShoppingList(recipe) {
    this.props.toggleOnShoppingList(recipe);
  }

  renderRecipeListItem(recipe) {
    return (
      <RecipeListItem
        navigation={this.props.navigation}
        recipe={recipe}
        onShoppingList={recipe.onShoppingList}
        imageSource={this.props.recipeImages[recipe.id]}
        handleActionButtonClick={this.props.toggleOnShoppingList}
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
          extraData={this.props.sortMethod}
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
    backgroundColor: '#6696B0',
  },
  filterContainerTextInput: {
    flex: 1,
    height: 30,
    fontSize: 14,
    paddingVertical: 2,
    paddingHorizontal: 15,
    marginLeft: 10,
    backgroundColor: 'white',
    borderRadius: 15,
  },
  sortingInfoContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 6,
  },
  sortingInfoText: {
    color: 'white',
  },
  recipesListContainer: {
    paddingTop: 20,
    paddingHorizontal: 10,
  },
});
