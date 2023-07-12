import React from 'react'
import { Text, View } from 'react-native'
import { Entypo } from '@expo/vector-icons'

type TaskProps = {
  title: string
  date: string
}

export const Task: React.FC<TaskProps> = ({ title, date }) => {
  return (
    <View className="m-8 rounded-lg bg-[#8d5356] p-8">
      <Text className="font-main text-2xl text-[#ffffff]">Bolo de cenoura</Text>
      <View className="mt-3 flex-row gap-x-2">
        <Entypo name="calendar" size={20} color="white" />
        <Text className="text-[#fff]">17/06/23</Text>
      </View>
    </View>
  )
}
