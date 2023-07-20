import { AntDesign } from '@expo/vector-icons'
import { Formik } from 'formik'
import React, { useContext, useState } from 'react'
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { RecipiesContext } from '../src/components/context/RecipeContext'
import { api } from '../src/lib/api'
import { getUserToken } from '../src/lib/auth/AuthTokenProvider'
import { Recipe } from './RecipeController'

interface Values {
  title: string
  ingredients: string
  instructions: string
  portionsQtd: string
  timeToCook: string
  mediaLinkOne: string
  mediaLinkTwo: string
}

export const NewRecipeController: React.FC = () => {
  const [canShowAgain, setCanShowAgain] = useState(true)
  const { recipies, trigRequest, setTrigRequest } = useContext(RecipiesContext)

  const createThreeButtonAlert = () =>
    Alert.alert(
      '',
      'Lembre-se de separar os ingredientes por vírgula, assim: Leite, Trigo, Chocolate, etc.',
      [
        {
          text: 'Não mostrar novamente',
          onPress: () => setCanShowAgain(false),
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
    )

  async function sendRecipe(recipe: Recipe) {
    const token = await getUserToken()
    try {
      const response = await api.post(
        '/api/recipies/',
        {
          ...recipe,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      console.info('POST Recipe response: ', response.data)
      console.debug('Recipies before POST: ', recipies)
      setTrigRequest(!trigRequest)
      console.debug('Recipies after POST: ', recipies)
      // navigationRef?.current.navigate('Receitas', response.data)
    } catch (err) {
      console.error('Error POST Recipe: ', err)
      throw err
    }
  }

  function handleFormData(values: Values) {
    const ingredients =
      values.ingredients === null
        ? []
        : values.ingredients.split(',').map((ingr) => ingr.trim())
    // Checks which links are null, so that they don't go pushed into the 'mediaLinks' array
    const mediaLinksTest = [values.mediaLinkOne, values.mediaLinkTwo]
    const mediaLinks = []
    mediaLinksTest.forEach((link) =>
      link !== null ? (link.length !== 0 ? mediaLinks.push(link) : null) : null,
    )
    const instructions =
      values.instructions.length === 0 ? null : values.instructions
    const timeToCook = values.timeToCook.length === 0 ? null : values.timeToCook
    const portionsQtd =
      values.portionsQtd.length === 0 ? null : values.portionsQtd
    const title = values.title
    const createdRecipe: Recipe = {
      name: title,
      ingredients,
      instructions,
      portionsQtd,
      timeToCook,
      mediaLinks,
    }
    sendRecipe(createdRecipe)
  }

  function validate(values: Values) {
    const regexUrl =
      /(https:\/\/www.|http:\/\/www.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(.[a-zA-Z0-9]{2,})(.[a-zA-Z0-9]{2,})?\/[a-zA-Z0-9]{2,}/

    const errors = {
      title: null,
      mediaLinkOne: null,
      mediaLinkTwo: null,
    }
    if ({ ...values }.title.length === 0) {
      errors.title = 'O nome da receita é obrigatório!'
    } else if (
      { ...values }.title.length > 0 &&
      { ...values }.title.length < 2
    ) {
      errors.title = 'O nome da receita é muito pequeno!'
    }

    if ({ ...values }.mediaLinkOne !== null) {
      if ({ ...values }.mediaLinkOne.length !== 0)
        if (!regexUrl.test({ ...values }.mediaLinkOne)) {
          errors.mediaLinkOne = 'Link inválido!'
        }
    }

    if ({ ...values }.mediaLinkTwo !== null) {
      if ({ ...values }.mediaLinkTwo.length !== 0) {
        if (!regexUrl.test({ ...values }.mediaLinkTwo)) {
          errors.mediaLinkTwo = 'Link inválido!'
        }
      }
    }

    if (
      errors.title !== null ||
      errors.mediaLinkOne !== null ||
      errors.mediaLinkTwo != null
    ) {
      console.log(errors.mediaLinkOne)
      console.log(errors.mediaLinkTwo)
      return errors
    }
  }
  return (
    <View className="m-6 flex items-center">
      <Text className="font-secondary text-4xl text-[#432626]">
        Nova Receita
      </Text>
      <View>
        <Formik
          initialValues={{
            title: '',
            ingredients: null,
            instructions: '',
            portionsQtd: '',
            timeToCook: '',
            mediaLinkOne: null,
            mediaLinkTwo: null,
          }}
          onSubmit={(values: Values) => {
            handleFormData(values)
          }}
          validateOnChange={false}
          validate={validate}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            values,
            errors,
            isValid,
          }) => (
            <View>
              <TextInput
                onChangeText={handleChange('title')}
                multiline={true}
                value={values.title}
                className="text-gray-50 h-16 border-b-2 p-0 font-main text-lg"
                placeholder="Nome da receita"
                placeholderTextColor={'#A99598'}
              />
              {errors.title && (
                <View>
                  <Text className="text-[#ec0808]">{errors.title}</Text>
                </View>
              )}
              <TextInput
                onChangeText={handleChange('ingredients')}
                onFocus={() => (canShowAgain ? createThreeButtonAlert : null)}
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
                keyboardType="numeric"
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
                  {errors.mediaLinkOne && (
                    <Text style={{ fontSize: 10, color: 'red' }}>
                      {errors.mediaLinkOne}
                    </Text>
                  )}
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
                  {errors.mediaLinkTwo && (
                    <Text style={{ fontSize: 10, color: 'red' }}>
                      {errors.mediaLinkTwo}
                    </Text>
                  )}
                </View>
              </View>
              <View className="my-10 flex items-center justify-center">
                <TouchableOpacity
                  className="w-[200] rounded-full bg-rose-600 p-3"
                  onPress={() => handleSubmit()}
                >
                  <Text>Criar receita</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </View>
  )
}
