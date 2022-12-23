import React, { useState } from 'react'
import { ActivityIndicator, Pressable, Text, TouchableOpacity, View } from 'react-native'
import { useDeviceContext } from 'twrnc'
import tw from './lib/tailwind'
import Telnet from 'react-native-telnet-client'

const App = () => {
  useDeviceContext(tw)
  const [resultText, setResultText] = useState('')
  const [loading, setLoading] = useState(false)
  const [bikeId, setBikeId] = useState(1241212319)

  const test1 = async (order: string) => {
    // const res = await axios.get('http://192.168.0.57:5555')
    // console.log(res.data)
    setLoading(true)
    const connection = new Telnet()

    const params = {
      // host: '192.168.0.57',
      host: 'broonge.co.kr',
      port: 8000,
      negotiationMandatory: false,
      timeout: 10000,
    }

    try {
      await connection.connect(params)
    } catch (error) {
      console.log('timeout?')
    }

    const res = await connection.send(`a001,${bikeId},${order}`)
    console.log(res)
    setResultText(res)

    // await connection.end()
    setLoading(false)
  }

  const changeBikeID = (id: number) => {
    setBikeId(id)
  }

  return (
    <View style={tw`flex-1`}>
      <View style={tw`flex-1 justify-center items-center`}>
        <Pressable
          style={tw`${bikeId === 1241212319 ? 'bg-black' : 'bg-gray-400'}  p-2 mt-4 items-start`}
          onPress={() => changeBikeID(1241212319)}>
          <Text style={tw`${bikeId === 1241212319 ? 'text-yellow-500' : 'text-white'}`}>
            1241212319
          </Text>
        </Pressable>

        <Pressable
          style={tw`${bikeId === 1223136568 ? 'bg-black' : 'bg-gray-400'} p-2 mt-4 items-center`}
          onPress={() => changeBikeID(1223136568)}>
          <Text style={tw`${bikeId === 1223136568 ? 'text-yellow-500' : 'text-white'}`}>
            1223136568
          </Text>
        </Pressable>

        <Text style={tw`font-bold text-3xl mt-4`}>테스트 중입니다</Text>

        <TouchableOpacity
          style={tw`bg-gray-400 py-2 mt-4 w-20 items-center`}
          onPress={() => test1('unlock')}
          hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}>
          {!loading && <Text style={tw`text-white font-semibold`}>잠금해제</Text>}

          {loading && <ActivityIndicator animating={loading} color="#fff" />}
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`bg-gray-400 py-2 mt-4 w-20 items-center`}
          onPress={() => test1('lock')}
          hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}>
          {!loading && <Text style={tw`text-white font-semibold`}>잠금</Text>}

          {loading && <ActivityIndicator animating={loading} color="#fff" />}
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`bg-gray-400 py-2 mt-4 w-20 items-center`}
          onPress={() => test1('page')}
          hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}>
          {!loading && <Text style={tw`text-white font-semibold`}>호출</Text>}

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
