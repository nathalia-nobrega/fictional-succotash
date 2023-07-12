import React, { useState } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { AddNewButton } from './AddNewButton'
import { Task } from './Task'

export type Tasks = {
  title: string
  date: string
}
export default function TasksController() {
  const [tasks, setTasks] = useState<Tasks[]>([])
  console.info(tasks)

  return (
    <View>
      <Text className="m-5 font-secondary text-4xl text-[#432626]">
        Receitas a serem feitas
      </Text>
      <TouchableOpacity className="ml-5">
        <AddNewButton title="Adicionar novo a fazer" />
      </TouchableOpacity>
      <FlatList
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View style={{ height: 30 }} />}
        data={tasks}
        renderItem={({ item }) => <Task title={item.title} date={item.date} />}
      />
    </View>
  )
}
