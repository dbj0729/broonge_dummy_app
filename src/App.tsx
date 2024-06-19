import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { useDeviceContext } from 'twrnc'
import tw from './lib/tailwind'
import Telnet from 'react-native-telnet-client'

const App = () => {
  useDeviceContext(tw)
  const [resultText, setResultText] = useState('')
  const [loading, setLoading] = useState(false)
  const [bikeId, setBikeId] = useState(0)
  const [targetServer, setTargetServer] = useState<'체리서버' | '알리사서버'>('체리서버')
  const [shortBikeId, setShortBikeId] = useState('')

  const test1 = async (order: string) => {
    // const res = await axios.get('http://192.168.0.57:5555')
    // console.log(res.data)
    if (shortBikeId.length === 0 && bikeId === 0) {
      Alert.alert('자전거 확인')
      return
    }

    setLoading(true)
    const connection = new Telnet()
    const host = targetServer === '체리서버' ? '15.165.112.232' : 'broonge.alisa.co.kr'

    const params = {
      // host: '192.168.0.57',
      host,
      port: 8000,
      negotiationMandatory: false,
      timeout: 10000,
    }

    try {
      await connection.connect(params)
    } catch (error) {
      console.log('timeout?')
    }

    let newBikeId

    if (shortBikeId.length !== 0) {
      newBikeId = '8686750600' + shortBikeId
    } else {
      newBikeId = bikeId
    }

    const res = await connection.send(`a001,${newBikeId},${order}`)
    console.log(res)
    setResultText(res)

    // await connection.end()
    setLoading(false)
  }

  const changeBikeID = (id: number) => {
    setBikeId(id)
  }

  useEffect(() => {
    if (shortBikeId.length !== 0) {
      setBikeId(0)
    }

    if (bikeId !== 0) {
      setShortBikeId('')
    }
  }, [shortBikeId, bikeId])

  return (
    <View style={tw`flex-1`}>
      <View style={tw`flex-1 justify-center items-center`}>
        {/* <Pressable
          style={tw`${
            bikeId === 868675060031184 ? 'bg-black' : 'bg-gray-400'
          }  p-2 mt-4 items-start`}
          onPress={() => changeBikeID(868675060031184)}>
          <Text style={tw`${bikeId === 868675060031184 ? 'text-yellow-500' : 'text-white'}`}>
            868675060031184
          </Text>
        </Pressable>
        <Pressable
          style={tw`${
            bikeId === 868675060029626 ? 'bg-black' : 'bg-gray-400'
          }  p-2 mt-4 items-start`}
          onPress={() => changeBikeID(868675060029626)}>
          <Text style={tw`${bikeId === 868675060029626 ? 'text-yellow-500' : 'text-white'}`}>
            868675060029626
          </Text>
        </Pressable>
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
        </Pressable> */}

        <TextInput
          style={tw`bg-white w-[200px] text-black mt-6`}
          keyboardType="decimal-pad"
          placeholderTextColor={'#0000007F'}
          placeholder="자전거번호 뒤 5자리 입력"
          maxLength={5}
          value={shortBikeId}
          onChangeText={text => setShortBikeId(text)}
        />

        <TextInput
          style={tw`bg-white w-[200px] text-black mt-6`}
          keyboardType="decimal-pad"
          placeholderTextColor={'#0000007F'}
          placeholder="자전거번호 입력"
          value={bikeId === 0 ? '' : String(bikeId)}
          onChangeText={text => setBikeId(Number(text))}
        />

        {/* <Text style={tw`font-bold text-3xl mt-4`}>테스트 중입니다</Text> */}

        <Text style={tw`font-bold text-3xl mt-4`}>서버 선택</Text>

        <TouchableOpacity
          style={tw`bg-gray-400 py-2 mt-4 w-24 items-center ${
            targetServer === '체리서버' ? 'bg-red-900' : 'bg-gray-400'
          }`}
          onPress={() => setTargetServer('체리서버')}
          hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}>
          <Text style={tw`text-white font-semibold`}>체리서버</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`bg-gray-400 py-2 mt-4 w-24 items-center ${
            targetServer === '알리사서버' ? 'bg-red-900' : 'bg-gray-400'
          }`}
          onPress={() => setTargetServer('알리사서버')}
          hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}>
          <Text style={tw`text-white font-semibold`}>알리사 서버</Text>
        </TouchableOpacity>

        <Text style={tw`font-bold text-3xl mt-4`}>동작 선택</Text>

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
