import { AntDesign } from '@expo/vector-icons'
import { Formik } from 'formik'
import React from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'

// TODO: Split links into components
export const NewRecipeController: React.FC = () => {
  return (
    <View className="m-6 flex justify-center">
      <Text className="font-secondary text-4xl text-[#432626]">
        Nova Receita
      </Text>
      <View>
        <Formik
          initialValues={{
            title: '',
            ingredients: '', // will be parsed to a string[] when making the request
            instructions: '',
            portionsQtd: '',
            timeToCook: '',
            mediaLinkOne: '',
            mediaLinkTwo: '',
          }}
          // onSubmit={}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View>
              <TextInput
                onChangeText={handleChange('title')}
                multiline={true}
                value={values.title}
                className="text-gray-50 h-16 border-b-2 p-0 font-main text-lg"
                placeholder="Nome da receita"
                placeholderTextColor={'#A99598'}
              />
              <TextInput
                onChangeText={handleChange('ingredients')}
                value={values.ingredients}
                multiline={true}
                className="text-gray-50 h-16 border-b-2 p-0 font-main text-lg"
                placeholder="Ingredientes (separados por vírgula) (opcional)"
                placeholderTextColor={'#A99598'}
              />

              <TextInput
                onChangeText={handleChange('instructions')}
                value={values.instructions}
                multiline={true}
                className="text-gray-50 h-16 border-b-2 p-0 font-main text-lg"
                placeholder="Instruções (opcional)"
                placeholderTextColor={'#A99598'}
              />
              <TextInput
                onChangeText={handleChange('portionsQtd')}
                value={values.portionsQtd}
                className="text-gray-50 h-16 border-b-2 p-0 font-main text-lg"
                placeholder="Número de porções geradas"
                placeholderTextColor={'#A99598'}
              />
              <TextInput
                onChangeText={handleChange('timeToCook')}
                value={values.timeToCook}
                className="text-gray-50 h-16 border-b-2 p-0 font-main text-lg"
                placeholder="Tempo de preparação"
                placeholderTextColor={'#A99598'}
              />
              <View className="my-6 flex">
                <Text className="font-secondary text-2xl">
                  Links úteis (blog, vídeo, etc)
                </Text>
                <View className="border-b-1 mt-6 flex-row items-center pb-2">
                  <AntDesign name="link" size={24} color="black" />
                  <TextInput
                    onChangeText={handleChange('mediaLinkOne')}
                    value={values.mediaLinkOne}
                    className="text-gray-50 m-2 h-12 flex-1 border-b-2 font-main text-lg"
                    placeholder="Link (opcional)"
                    placeholderTextColor={'#A99598'}
                  />
                </View>
                <View className="border-b-1 mt-6 flex-row items-center pb-2">
                  <AntDesign name="link" size={24} color="black" />
                  <TextInput
                    onChangeText={handleChange('mediaLinkTwo')}
                    value={values.mediaLinkTwo}
                    className="text-gray-50 m-2 h-12 flex-1 border-b-2 font-main text-lg"
                    placeholder="Link (opcional)"
                    placeholderTextColor={'#A99598'}
                  />
                </View>
              </View>
              <View className="my-10 flex items-center justify-center">
                <TouchableOpacity
                  className="w-[200] rounded-full bg-rose-600 p-3"
                  onPress={handleSubmit}
                >
                  <Text className="text-center font-secondary uppercase text-[#fff]">
                    Criar receita
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </View>
  )
}
