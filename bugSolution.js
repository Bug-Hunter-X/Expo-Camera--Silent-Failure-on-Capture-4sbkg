```javascript
import * as React from 'react';
import { Camera, CameraType } from 'expo-camera';
import { useState, useEffect } from 'react';
import { Button, Text, View } from 'react-native';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View/>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    try {
      let photo = await cameraRef.current.takePictureAsync();
      setPhoto(photo.uri);
    } catch (error) {
      console.error('Error taking picture:', error);
      // Alert the user or handle the error appropriately
      alert('Failed to take picture. Please try again.');
    }
  };

  const cameraRef = React.useRef(null);

  return (
    <View>
      <Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
        <Button title="Take Picture" onPress={takePicture} />
      </Camera>
      {photo && <Text>Photo taken!</Text>}
    </View>
  );
}
```