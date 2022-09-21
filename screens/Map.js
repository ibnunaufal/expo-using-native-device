import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { getCurrentPositionAsync } from "expo-location";
import Button from "../components/ui/Button";
import { useNavigation } from "@react-navigation/native";

export default function Map() {
  const [locationDetail, setLocationDetail] = useState();
  const [marker, setMarker] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation()

  useEffect(() => {
    setIsLoading(true);
    async function getLocation() {
      const location = await getCurrentPositionAsync();
      console.log(location);
      console.log(`${location.coords.latitude} ${location.coords.longitude}`);
      var region = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      setLocationDetail(region);
      setIsLoading(false);
    }
    getLocation();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
        <Text style={{ color: "white", marginTop: 20 }}>
          Fetching Location...
        </Text>
      </View>
    );
  }

  function selectLocationHandler(event) {
    const lat = event.nativeEvent.coordinate.latitude;
    const long = event.nativeEvent.coordinate.longitude;
    setMarker({ lat: lat, long: long });
  }

  function saveLocation(){
    navigation.navigate("AddPlace", {marker: marker})
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        initialRegion={locationDetail}
        style={styles.map}
        onPress={selectLocationHandler}
      >
        {marker && (
          <Marker
            coordinate={{ latitude: marker.lat, longitude: marker.long }}
            title="Picked Location"
          />
        )}
      </MapView>
      {marker && (
        <View style={{ position: "absolute", top: 10, right: 10 }}>
          <Button style={styles.save} onPress={saveLocation} >Simpan Tempat</Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  save: {
    margin: 10,
  },
});
