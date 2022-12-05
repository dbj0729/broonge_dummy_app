import React, { useState } from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import { useDeviceContext } from 'twrnc'
import tw from './lib/tailwind'
import Telnet from 'react-native-telnet-client'

const App = () => {
  useDeviceContext(tw)
  const [resultText, setResultText] = useState('')
  const [loading, setLoading] = useState(false)

  const test1 = async () => {
    // const res = await axios.get('http://192.168.0.57:5555')
    // console.log(res.data)
    setLoading(true)
    const connection = new Telnet()

    const params = {
      host: '192.168.0.57',
      port: 9090,
      negotiationMandatory: false,
      timeout: 10000,
    }

    try {
      await connection.connect(params)
    } catch (error) {
      console.log('timeout?')
    }

    const res = await connection.send('a001,1241212319,unlock')
    console.log(res)
    setResultText(res)

    await connection.end()
    setLoading(false)
  }

  return (
    <View style={tw`flex-1`}>
      <View style={tw`flex-1 justify-center items-center`}>
        <Text style={tw`font-bold text-3xl`}>테스트 중입니다</Text>

        <TouchableOpacity
          style={tw`bg-gray-400 py-2 mt-4 w-20 items-center`}
          onPress={() => test1()}
          hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}>
          {!loading && <Text style={tw`text-white font-semibold`}>잠금해제</Text>}

          {loading && <ActivityIndicator animating={loading} color="#fff" />}
        </TouchableOpacity>

        <View style={tw`mt-4`}>
          <Text
            style={tw`text-lg ${
              resultText.includes('success') ? 'text-green-500' : 'text-red-500'
            }`}>
            {resultText}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default App
