import { View, Text, StyleSheet, Image } from "react-native";
import { useState } from "react";

export default function NavBar() {


  return (
    <View style={styles.navBar}>
      <Image source={require("../public/imgs/estude-lab2.0.png")} style={styles.logo} resizeMode="contain"></Image>
      
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: "#1F2D61",
    alignItems: "center",
    width: "100dvw",
    paddingTop: 30,
  },
  logo: {
    width: 200,
    height: 50,
  },
  xp: {
    color: "#3481F5",
    fontSize: 14,
    padding:3
  }
});
