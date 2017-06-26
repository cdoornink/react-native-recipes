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
  View,
} from 'react-native';

export default class Recipes extends React.Component {
  static propTypes = {
    handleAddToShoppingList: PropTypes.func.isRequired,
    handleRemoveFromShoppingList: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
    recipe: PropTypes.object.isRequired,
    recipeImages: PropTypes.object.isRequired,
  };

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
          <Text
            onPress={() => this.props.navigation.navigate('Recipes', { id: null })}
            style={styles.backButton}
          >Back</Text>
          <Image
            source={this.props.recipeImages[recipe.id]}
            style={styles.mainImage}
            resizeMode="cover"
          >
            <View style={styles.mainImageOverlay} />
          </Image>
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
    fontSize: 20,
    position: 'absolute',
    top: 25,
    left: 15,
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
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
    fontWeight: '400',
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

const styles2 = StyleSheet.create({
  mainImageContainer: {
    alignItems: 'center',
    height: 250,
    backgroundColor: '#333',
  },
  mainImage: {
    height: 250,
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
    fontSize: 20,
    position: 'absolute',
    top: 25,
    left: 15,
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  recipeTitle: {
    fontSize: 24,
    color: '#222',
    fontWeight: '600',
    paddingVertical: 20,
    textAlign: 'center',
  },
  recipeContentContainer: {
    paddingHorizontal: 10,
    flex: 1,
    backgroundColor: '#fff',
  },
  ingredientsContainer: {
    flex: 1,
    padding: 20,
    marginBottom: 30,
    backgroundColor: 'white',
    shadowOffset: { width: 0, height: 0 },
    shadowColor: '#aaa',
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  instructionsContainer: {
    flex: 1,
    padding: 20,
    marginBottom: 30,
    backgroundColor: 'white',
    shadowOffset: { width: 0, height: 0 },
    shadowColor: '#aaa',
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '500',
    color: '#444',
    paddingBottom: 10,
  },
  ingredientSectionText: {
    fontWeight: '700',
    paddingTop: 10,
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
    fontWeight: '400',
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
