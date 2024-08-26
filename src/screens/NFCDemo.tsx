import { View, StyleSheet, Button, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamsList } from '../App'
import { useEffect, useState } from 'react'
import nfcManager from 'react-native-nfc-manager'

const NFCDemo = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamsList>>()

  const [hasNfc, setHasNfc] = useState<boolean>(false)

  useEffect(() => {
    const checkIfNfcIsSupported = async () => {
      const nfcSupported = await nfcManager.isSupported()
      setHasNfc(nfcSupported)

      if (nfcSupported) {
        await nfcManager.start()
      }
    }

    checkIfNfcIsSupported()
  }, [])

  return (
    <View style={styles.container}>
      <Button title='Home' onPress={() => navigation.navigate('Home')} />
      { hasNfc && (<Text>NFC is supported on this device</Text>)}
      { !hasNfc && (<Text> NFC is not supported on this device</Text>)}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default NFCDemo