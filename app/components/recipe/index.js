/* eslint global-require: "off" */
/* eslint quote-props: "off" */
/* eslint react/no-array-index-key: "off" */
import React, { PropTypes } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';

import { Colors } from 'constants/colors';

export default class Recipes extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    recipe: PropTypes.object.isRequired,
    recipeImages: PropTypes.object.isRequired,
    toggleOnShoppingList: PropTypes.func.isRequired,
  };

  handleBackButtonClick() {
    const backPath = this.props.navigation.state.params.referer;

    const setParamsAction = NavigationActions.setParams({
      params: { id: null, referer: null },
      key: 'Recipes',
      // not sure why, but this doesn't seem to work at all
      // If you can't figure this out, you might as well
      // make this back button always go to "Recipes, { id: null }"
      action: NavigationActions.navigate({ routeName: backPath }),
    });
    this.props.navigation.dispatch(setParamsAction);

    // this.props.navigation.navigate(backPath);
  }

  getRecipeIngredients() {
    return this.props.recipe.ingredients.map((ingredient, index) => {
      if (ingredient.section) {
        return (
          <Text key={ingredient.section} style={styles.ingredientSectionText}>
            {ingredient.section}
          </Text>
        );
      }
      return (
        <Text key={`${ingredient.name}-${index}`} style={styles.ingredient}>
          {ingredient.amount &&
            <Text style={styles.ingredientAmountText}>
              {ingredient.amount.toLowerCase()}{' '}
            </Text>
          }
          {ingredient.name &&
            <Text style={styles.ingredientText}>
              {ingredient.name.toLowerCase()}
            </Text>
          }
        </Text>
      );
    });
  }

  getRecipeInstructions() {
    return this.props.recipe.instructions.map((instruction, index) => (
      <Text key={`instruction-${index}`} style={styles.instructionText}>
        {instruction}
      </Text>
    ));
  }

  render() {
    const { recipe } = this.props;


    return (
      <ScrollView
        style={{ flex: 1 }}
        removeClippedSubviews={false}
      >
        <View style={styles.mainImageContainer}>
          <Text style={styles.backButton}>
            <View style={{ width: 40, height: 40 }}>
              <Icon
                size={32}
                color="white"
                name="ios-arrow-back"
                type="ionicon"
                onPress={() => this.handleBackButtonClick()}
                iconStyle={styles.iconOverImage}
              />
            </View>
          </Text>
          <Text style={styles.cartButton}>
            <View style={{ width: 40, height: 40 }}>
              <Icon
                size={32}
                color="white"
                name={this.props.recipe.onShoppingList ? 'remove-shopping-cart' : 'add-shopping-cart'}
                onPress={() => this.props.toggleOnShoppingList(recipe)}
                iconStyle={styles.iconOverImage}
              />
            </View>
          </Text>
          <Image
            source={this.props.recipeImages[recipe.id]}
            style={styles.mainImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.recipeContentContainer}>
          <Text style={styles.recipeTitle}>{recipe.title}</Text>
          <View style={styles.ingredientsContainer}>
            <Text style={styles.sectionHeader}>INGREDIENTS</Text>
            {this.getRecipeIngredients()}
          </View>
          <View style={styles.instructionsContainer}>
            <Text style={styles.sectionHeader}>DIRECTIONS</Text>
            {this.getRecipeInstructions()}
          </View>
        </View>
      </ScrollView>
    );
  }
}

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  mainImageContainer: {
    alignItems: 'center',
    height: 230,
    backgroundColor: '#333',
  },
  mainImage: {
    height: 230,
    width: deviceWidth,
    position: 'relative',
  },
  mainImageOverlay: {
    backgroundColor: 'rgba(0,0,0,0)',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: 'auto',
  },
  backButton: {
    color: 'white',
    position: 'absolute',
    top: 30,
    left: 0,
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  cartButton: {
    color: 'white',
    position: 'absolute',
    top: 35,
    right: 5,
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  iconOverImage: {
    shadowOffset: { width: 0, height: 0 },
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowRadius: 6,
  },
  recipeTitle: {
    fontSize: 22,
    color: '#222',
    fontWeight: '600',
    paddingVertical: 20,
    // textAlign: 'center',
  },
  recipeContentContainer: {
    paddingHorizontal: 20,
    flex: 1,
  },
  ingredientsContainer: {
    flex: 1,
    paddingBottom: 30,
  },
  instructionsContainer: {
    flex: 1,
    paddingBottom: 30,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '500',
    color: '#444',
    paddingVertical: 10,
  },
  ingredientSectionText: {
    fontWeight: '700',
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 16,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: '#000',
  },
  ingredient: {
    lineHeight: 24,
  },
  ingredientText: {
    fontSize: 16,
    fontWeight: '500',
  },
  ingredientAmountText: {
    marginRight: 10,
    fontSize: 16,
    color: '#333',
    fontWeight: '300',
  },
  instructionText: {
    lineHeight: 20,
    paddingVertical: 5,
    fontSize: 16,
  },

});

// const styles2 = StyleSheet.create({
//   mainImageContainer: {
//     alignItems: 'center',
//     height: 250,
//     backgroundColor: '#333',
//   },
//   mainImage: {
//     height: 250,
//     width: deviceWidth,
//     position: 'relative',
//   },
//   mainImageOverlay: {
//     backgroundColor: 'rgba(0,0,0,0)',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flex: 1,
//     width: 'auto',
//   },
//   backButton: {
//     color: 'white',
//     fontSize: 20,
//     position: 'absolute',
//     top: 25,
//     left: 15,
//     zIndex: 1,
//     backgroundColor: 'rgba(0,0,0,0)',
//   },
//   recipeTitle: {
//     fontSize: 24,
//     color: '#222',
//     fontWeight: '600',
//     paddingVertical: 20,
//     textAlign: 'center',
//   },
//   recipeContentContainer: {
//     paddingHorizontal: 10,
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   ingredientsContainer: {
//     flex: 1,
//     padding: 20,
//     marginBottom: 30,
//     backgroundColor: 'white',
//     shadowOffset: { width: 0, height: 0 },
//     shadowColor: '#aaa',
//     shadowOpacity: 1,
//     shadowRadius: 10,
//   },
//   instructionsContainer: {
//     flex: 1,
//     padding: 20,
//     marginBottom: 30,
//     backgroundColor: 'white',
//     shadowOffset: { width: 0, height: 0 },
//     shadowColor: '#aaa',
//     shadowOpacity: 1,
//     shadowRadius: 10,
//   },
//   sectionHeader: {
//     fontSize: 18,
//     fontWeight: '500',
//     color: '#444',
//     paddingBottom: 10,
//   },
//   ingredientSectionText: {
//     fontWeight: '700',
//     paddingTop: 10,
//     paddingBottom: 5,
//     fontSize: 16,
//     textDecorationLine: 'underline',
//     textDecorationStyle: 'solid',
//     textDecorationColor: '#000',
//   },
//   ingredient: {
//     lineHeight: 24,
//   },
//   ingredientText: {
//     fontSize: 16,
//     fontWeight: '400',
//   },
//   ingredientAmountText: {
//     marginRight: 10,
//     fontSize: 16,
//     color: '#333',
//     fontWeight: '300',
//   },
//   instructionText: {
//     lineHeight: 20,
//     paddingVertical: 5,
//     fontSize: 16,
//   },
//
// });
