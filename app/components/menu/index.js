import React, { PropTypes } from 'react';
import {
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import RecipeListItem from 'components/recipes/recipe-list-item';
import { Colors } from 'constants/colors';

export default class Menu extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    recipes: PropTypes.array,
    recipeImages: PropTypes.object.isRequired,
    toggleMarkAsMade: PropTypes.func.isRequired,
  };

  static defaultProps = {
    recipes: [],
  }

  toggleMarkAsMade(recipe) {
    this.props.toggleMarkAsMade(recipe);
  }

  getMenuSections() {
    const menuSections = [
      { name: 'Ready to make', key: 'unmade', data: [] },
      { name: 'Completed', key: 'made', data: [] },
    ];

    // add recipes appropriate section in menu
    this.props.recipes.forEach((recipe) => {
      if (recipe.markAsMade) {
        menuSections.find(i => i.name === 'Completed').data.push(recipe);
      } else {
        menuSections.find(i => i.name === 'Ready to make').data.push(recipe);
      }
    });

    return menuSections;
  }

  renderMenuHeader(section) {
    if (section.name === 'Ready to make') {
      return false;
    }

    if (!section.data.length) {
      return false;
    }

    return (
      <Text style={styles.menuSectionHeader}>
        {section.name.toUpperCase()}
      </Text>
    );
  }

  renderRecipeListItem(recipe) {
    return (
      <View style={styles.recipePadding}>
        <RecipeListItem
          handleActionButtonClick={this.props.toggleMarkAsMade}
          imageSource={this.props.recipeImages[recipe.id]}
          navigation={this.props.navigation}
          navReferer="Menu"
          onMenu
          recipe={recipe}
        />
      </View>
    );
  }

  render() {
    const emptyMenu = !this.props.recipes.length;

    return (
      <View style={{ flex: 1, alignSelf: 'stretch' }}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>
            Menu
          </Text>
        </View>

        {emptyMenu &&
          <Text style={styles.emptyMessage}>
            Damn. There is nothing on the menu. Order in?
          </Text>
        }

        <SectionList
          renderItem={({ item }) => this.renderRecipeListItem(item)}
          renderSectionHeader={({ section }) => this.renderMenuHeader(section)}
          sections={this.getMenuSections()}
          removeClippedSubviews={false}
        />
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
  filterContainer: {
    shadowOffset: { width: 0, height: 0 },
    shadowColor: '#ccc',
    shadowOpacity: 1,
    shadowRadius: 6,
    flexDirection: 'row',
    alignContent: 'space-between',
    paddingBottom: 10,
    paddingTop: 30,
    backgroundColor: Colors.primary,
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
  menuSectionHeader: {
    fontSize: 14,
    fontWeight: '700',
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: Colors.primary,
    color: Colors.text.light,
    marginBottom: 8,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: '#ccc',
    shadowOpacity: 1,
    shadowRadius: 6,
  },
  recipesListContainer: {
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  recipePadding: {
    marginHorizontal: 10,
  },
  emptyMessage: {
    padding: 50,
    textAlign: 'center',
  },
});
