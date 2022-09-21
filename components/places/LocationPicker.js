import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Button from "../ui/Button";
import IconButton from "../ui/IconButton";
import { Colors } from "../../constants/styles";
import {
  getCurrentPositionAsync,
  PermissionStatus,
  useForegroundPermissions,
} from "expo-location";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";

export default function LocationPicker({ onPickLocation }) {
  const [locationPermission, requestPermission] = useForegroundPermissions();
  const navigation = useNavigation();
  const route = useRoute();
  const isFocus = useIsFocused();
  const [region, setRegion] = useState();
  const [pickedLocation, setMapPickedLocation] = useState();

  useEffect(() => {
    if (isFocus && route.params) {
      const mapPickedLocation = route.params && {
        lat: route.params.marker.lat,
        long: route.params.marker.long,
      };
      setMapPickedLocation(mapPickedLocation);
      var regions = {
        latitude: mapPickedLocation.lat,
        longitude: mapPickedLocation.long,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      };
      setRegion(regions);
      console.log(mapPickedLocation);
    }
  }, [route, isFocus]);

  useEffect(() => {
    onPickLocation(pickedLocation)
  },[pickedLocation, onPickLocation]);

  async function verifiyPermission() {
    if (locationPermission.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (locationPermission.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient permissions!",
        "You need to granted the permission."
      );
      return false;
    }

    if (locationPermission.status === PermissionStatus.GRANTED) {
      return true;
    }
  }

  async function getLocationHandler() {
    const hasPermission = await verifiyPermission();

    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();
    console.log(location);
  }

  async function pickOnMapHandler() {
    const hasPermission = await verifiyPermission();

    if (!hasPermission) {
      return;
    }

    navigation.navigate("Map");
  }

  return (
    <View style={{ marginTop: 10 }}>
      <View style={styles.mapPreview}>
        {pickedLocation && (
          <MapView
            initialRegion={region}
            style={{ flex: 1 }}
            pitchEnabled={false}
            rotateEnabled={false}
            scrollEnabled={false}
            zoomEnabled={false}
          >
            <Marker
              coordinate={{
                latitude: pickedLocation.lat,
                longitude: pickedLocation.long,
              }}
            />
          </MapView>
        )}
      </View>
      <View style={styles.actions}>
        <Button onPress={pickOnMapHandler}>Pick on Map</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    // borderWidth: 1,
    // borderColor: Colors.primary200,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 20,
  },
});
