import { FlatList, Text, View } from 'react-native'

type RecipeInfoProps = {
  infoTitle: string
  infoData: string | string[] | null
  infoItemCount: number | null
}

export default function RecipeInfo(props: RecipeInfoProps) {
  return (
    <View className="mb-8">
      <Text className="font-main text-3xl">{props.infoTitle}</Text>
      {typeof props.infoData === 'string' ? (
        <Text className="font-main text-lg">{props.infoData}</Text>
      ) : (
        <Text>
          {props.infoItemCount === 0 || props.infoItemCount === null ? (
            <>N/A</>
          ) : (
            <FlatList
              scrollEnabled={false}
              data={props.infoData}
              renderItem={({ item }) => (
                <Text className="font-main text-lg">{item}</Text>
              )}
            />
          )}
        </Text>
      )}
    </View>
  )
}
