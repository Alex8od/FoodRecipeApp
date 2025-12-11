import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const RecipesFormScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { recipeToEdit, recipeIndex, onrecipeEdited } = route.params || {};

  const [title, setTitle] = useState(recipeToEdit?.title || "");
  const [image, setImage] = useState(recipeToEdit?.image || "");
  const [description, setDescription] = useState(
    recipeToEdit?.description || ""
  );

  const saverecipe = async () => {
    try {
      const newrecipe = {
        title,
        image,
        description,
      };

      const stored = await AsyncStorage.getItem("customrecipes");
      let recipes = stored ? JSON.parse(stored) : [];

      if (recipeToEdit && typeof recipeIndex === "number") {
        // Bearbeiten
        recipes[recipeIndex] = newrecipe;
      } else {
        // Neu hinzufügen
        recipes.push(newrecipe);
      }

      await AsyncStorage.setItem("customrecipes", JSON.stringify(recipes));

      if (onrecipeEdited) {
        onrecipeEdited();
      }

      navigation.goBack();
    } catch (err) {
      console.log("Error saving recipe:", err);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>
        {recipeToEdit ? "Edit Recipe" : "Add New Recipe"}
      </Text>

      {/* Titel */}
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Recipe title"
        value={title}
        onChangeText={setTitle}
      />

      {/* Bild-URL */}
      <Text style={styles.label}>Image URL</Text>
      <TextInput
        style={styles.input}
        placeholder="https://example.com/image.jpg"
        value={image}
        onChangeText={setImage}
      />

      {/* Vorschau Bild */}
      {image ? (
        <Image source={{ uri: image }} style={styles.previewImage} />
      ) : (
        <Text style={styles.placeholderText}>Upload Image URL</Text>
      )}

      {/* Beschreibung */}
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Recipe description, steps, notes..."
        value={description}
        onChangeText={setDescription}
        multiline
      />

      {/* Speichern Button */}
      <TouchableOpacity style={styles.button} onPress={saverecipe}>
        <Text style={styles.buttonText}>Save Recipe</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp("5%"),
    paddingTop: hp("5%"),
    paddingBottom: hp("5%"),
  },
  heading: {
    fontSize: hp("3%"),
    fontWeight: "700",
    marginBottom: hp("3%"),
    textAlign: "center",
  },
  label: {
    fontSize: hp("1.9%"),
    fontWeight: "600",
    marginBottom: hp("0.5%"),
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    paddingHorizontal: wp("3%"),
    paddingVertical: hp("1%"),
    fontSize: hp("1.8%"),
    marginBottom: hp("2%"),
    backgroundColor: "#ffffff",
  },
  textArea: {
    height: hp("18%"),
    textAlignVertical: "top",
  },
  previewImage: {
    width: "100%",
    height: hp("25%"),
    borderRadius: 12,
    marginBottom: hp("2%"),
  },
  placeholderText: {
    color: "#9ca3af",
    fontStyle: "italic",
    marginBottom: hp("2%"),
  },
  button: {
    marginTop: hp("2%"),
    backgroundColor: "#fbbf24",
    paddingVertical: hp("1.5%"),
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    fontSize: hp("2%"),
    fontWeight: "600",
  },
});

export default RecipesFormScreen;
