import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../redux/favoritesSlice";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const CustomRecipesScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const recipe = route.params?.recipe;

  const favoriteRecipes = useSelector(
    (state) => state.favorites.favoriterecipes
  );

  const isFavorite = recipe
    ? favoriteRecipes.some((item) => item.recipeName === recipe.title)
    : false;

  const handleToggleFavorite = () => {
    if (!recipe) return;

    dispatch(
      toggleFavorite({
        idFood: recipe.title, // fallback ID
        recipeName: recipe.title,
        recipeImage: recipe.image,
        recipeInstructions: recipe.description,
        category: "My Food",
      })
    );
  };

  if (!recipe) {
    return (
      <View style={styles.emptyContainer}>
        <Text>No Recipe Details Available</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Bild */}
      <View style={styles.imageContainer} testID="imageContainer">
        {recipe.image ? (
          <Image
            source={{ uri: recipe.image }}
            style={styles.articleImage}
          />
        ) : null}
      </View>


      <View style={styles.topButtons} testID="topButtonsContainer">
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={handleToggleFavorite}
        >
          <Text style={styles.favoriteIcon}>{isFavorite ? "♥" : "♡"}</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.contentContainer} testID="contentContainer">
        <Text style={styles.title}>{recipe.title}</Text>

        <View style={{ marginTop: hp("2%") }}>
          <Text style={styles.sectionTitle}>Content</Text>
          <Text style={styles.contentText}>{recipe.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb" },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    width: "100%",
    height: hp("35%"),
    backgroundColor: "#e5e7eb",
  },
  articleImage: {
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
    backgroundColor: "#4b5563",
    borderRadius: 20,
  },
  backButtonText: {
    color: "#fff",
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
  contentContainer: {
    paddingHorizontal: wp("6%"),
    marginTop: hp("3%"),
  },
  title: {
    fontSize: hp("2.5%"),
    fontWeight: "700",
  },
  sectionTitle: {
    fontSize: hp("2%"),
    fontWeight: "600",
    marginBottom: hp("1%"),
  },
  contentText: {
    fontSize: hp("1.8%"),
    color: "#374151",
    lineHeight: 22,
  },
});

export default CustomRecipesScreen;
