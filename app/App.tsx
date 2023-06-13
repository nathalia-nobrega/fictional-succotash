import { Jost_400Regular, useFonts } from '@expo-google-fonts/jost'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'

export default function App() {
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
  })

  if (!fontsLoaded) return null
  return (
    <View style={styles.container} className="bg-red-100">
      <Text
        style={{ fontFamily: 'Jost_400Regular', fontSize: 40 }}
        className="bg-red-800"
      >
        okay letsgoooooooooooooooooooooo!
      </Text>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
