import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../redux/favoritesSlice";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const RecipeDetailScreen = (props) => {

  const recipe = props.route.params;

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const favoriteRecipes = useSelector(
    (state) => state.favorites.favoriterecipes
  );

  const isFavorite = favoriteRecipes.some(
    (item) => item.idFood === recipe.idFood
  );

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(recipe));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer} testID="imageContainer">
        <Image
          source={{ uri: recipe.recipeImage }}
          style={styles.recipeImage}
        />
      </View>

      <View style={styles.topButtons}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={handleToggleFavorite}
        >
          <Text style={styles.favoriteIcon}>{isFavorite ? "♥" : "♡"}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.titleContainer} testID="recipeTitle">
        <Text style={styles.title}>{recipe.recipeName}</Text>
      </View>

      <View style={styles.categoryContainer} testID="recipeCategory">
        <Text style={styles.categoryText}>
          {recipe.category ? recipe.category : "Recipe"}
        </Text>
      </View>

      <View style={styles.miscContainer} testID="miscContainer">
        <View style={styles.miscItem}>
          <Text style={styles.miscLabel}>Time</Text>
          <Text style={styles.miscValue}>{recipe.time || "35 Mins"}</Text>
        </View>
        <View style={styles.miscItem}>
          <Text style={styles.miscLabel}>Servings</Text>
          <Text style={styles.miscValue}>{recipe.servings || "3 Servings"}</Text>
        </View>
        <View style={styles.miscItem}>
          <Text style={styles.miscLabel}>Calories</Text>
          <Text style={styles.miscValue}>{recipe.calories || "103 Cal"}</Text>
        </View>
        <View style={styles.miscItem}>
          <Text style={styles.miscLabel}>Level</Text>
          <Text style={styles.miscValue}>{recipe.level || "Medium"}</Text>
        </View>
      </View>


      <View style={styles.sectionContainer} testID="sectionContainer">
        <Text style={styles.sectionTitle}>Ingredients</Text>
        <View style={styles.ingredientsList} testID="ingredientsList">
          {(recipe.ingredients || []).length > 0 ? (
            recipe.ingredients.map((ing, index) => (
              <View key={index} style={styles.ingredientItem}>
                <View className="bullet" style={styles.bullet} />
                <Text style={styles.ingredientText}>
                  {ing.measure ? `${ing.measure} ` : ""}
                  {ing.ingredient || ing}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.ingredientText}>
              Ingredients information not available.
            </Text>
          )}
        </View>
      </View>

      <View style={styles.sectionContainer} testID="sectionContainer">
        <Text style={styles.sectionTitle}>Instructions</Text>
        <Text style={styles.instructionsText}>
          {recipe.recipeInstructions}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  imageContainer: {
    width: "100%",
    height: hp("35%"),
    overflow: "hidden",
  },
  recipeImage: {
    width: "100%",
    height: "100%",
  },
  topButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: wp("5%"),
    marginTop: hp("1.5%"),
  },
  backButton: {
    paddingHorizontal: wp("4%"),
    paddingVertical: hp("1%"),
    backgroundColor: "#e5e7eb",
    borderRadius: 20,
  },
  backButtonText: {
    fontWeight: "600",
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fbbf24",
    alignItems: "center",
    justifyContent: "center",
  },
  favoriteIcon: {
    fontSize: 20,
  },
  titleContainer: {
    marginTop: hp("2%"),
    alignItems: "center",
  },
  title: {
    fontSize: hp("3%"),
    fontWeight: "700",
  },
  categoryContainer: {
    marginTop: hp("0.5%"),
    alignItems: "center",
  },
  categoryText: {
    color: "#6b7280",
    fontSize: hp("1.8%"),
  },
  miscContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: hp("2%"),
  },
  miscItem: {
    backgroundColor: "#f3f4f6",
    borderRadius: 16,
    paddingVertical: hp("1%"),
    paddingHorizontal: wp("3%"),
    alignItems: "center",
    minWidth: wp("18%"),
  },
  miscLabel: {
    fontSize: hp("1.5%"),
    color: "#6b7280",
  },
  miscValue: {
    fontSize: hp("1.8%"),
    fontWeight: "600",
    marginTop: hp("0.5%"),
  },
  sectionContainer: {
    marginTop: hp("3%"),
    paddingHorizontal: wp("6%"),
  },
  sectionTitle: {
    fontSize: hp("2.1%"),
    fontWeight: "600",
    marginBottom: hp("1%"),
  },
  ingredientsList: {},
  ingredientItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("0.8%"),
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#fbbf24",
    marginRight: 8,
  },
  ingredientText: {
    fontSize: hp("1.8%"),
    color: "#374151",
  },
  instructionsText: {
    fontSize: hp("1.8%"),
    color: "#374151",
    lineHeight: 22,
  },
});

export default RecipeDetailScreen;
