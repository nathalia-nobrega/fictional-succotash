import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { NewRecipeInput } from '../src/components/NewRecipeInput'
import { RecipeLinkInput } from '../src/components/RecipeLinkInput'
// TODO: Split links into components
export const NewRecipeController: React.FC = () => {
  return (
    <View className="m-6 flex justify-center">
      <Text className="font-secondary text-4xl">Nova Receita</Text>
      <View>
        <NewRecipeInput placeholder="Nome da receita" />
        <NewRecipeInput placeholder="Ingredientes (separados por vírgula) (opcional)" />
        <NewRecipeInput placeholder="Instruções (opcional)" />
        <NewRecipeInput placeholder="Número de porções geradas" />
        <NewRecipeInput placeholder="Tempo de preparação" />
      </View>
      <View className="my-6 flex">
        <Text className="font-secondary text-2xl">
          Links úteis (blog, vídeo, etc)
        </Text>
        <RecipeLinkInput />
        <RecipeLinkInput />
      </View>
      <View className="my-10 flex items-center justify-center">
        <TouchableOpacity className="w-[200] rounded-full bg-rose-600 p-3">
          <Text className="text-center font-secondary uppercase text-[#fff]">
            Criar receita
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
