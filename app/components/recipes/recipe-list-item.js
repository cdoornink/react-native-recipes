import React, { PropTypes } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';


const RecipeListItem = props => (
  <View style={styles.recipeListItemContainer}>
    <Text
      onPress={() => props.navigation.navigate('Recipes', { id: props.recipe.key })}
      style={styles.recipeTitle}
    >
      {props.recipe.title}
    </Text>
    <TouchableHighlight
      onPress={() => props.navigation.navigate('Recipes', { id: props.recipe.key })}
      style={styles.mainImageContainer}
    >
      <Image
        source={props.imageSource}
        style={styles.mainImage}
        resizeMode="cover"
      />
    </TouchableHighlight>
  </View>
);


RecipeListItem.propTypes = {
  navigation: PropTypes.object.isRequired,
  recipe: PropTypes.object.isRequired,
  imageSource: PropTypes.number,
};

RecipeListItem.defaultProps = {
  imageSource: null,
};

export default RecipeListItem;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  recipeListItemContainer: {
    flex: 1,
    padding: 8,
    marginBottom: 8,
    backgroundColor: 'white',
    shadowOffset: { width: 0, height: 0 },
    shadowColor: '#ccc',
    shadowOpacity: 1,
    shadowRadius: 6,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 1,
    paddingBottom: 8,
    color: '#333',
  },
  mainImageContainer: {
    // alignItems: 'center',
    // height: 80,
    // width: deviceWidth - 40,
    // backgroundColor: '#333',
  },
  mainImage: {
    width: deviceWidth - 40,
    height: 100,
    position: 'relative',
  },
  mainImageOverlay: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: 'auto',
  },
});
