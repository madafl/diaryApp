import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    alert(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  const camera = async () =>{
      let photo = await ImagePicker.requestCameraPermissionsAsync({

      })
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button color="#34004b" title="Alege o poza din galerie" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 50, height: 50 }} />}
      <Button color="#34004b" title="Fa o poza" onPress={camera} />
      {image && <Image source={{ uri: image }} style={{ width: 50, height: 50 }} />}
    </View>
  );
}