import AsyncStorage from '@react-native-community/async-storage'

type DatedKeys = 'DffooDb'

const saveDateFor = (key: DatedKeys) =>
  AsyncStorage.setItem(key, new Date())

const checkUpdatedFor = async (key: DatedKeys, maxDaysDiff: number) => {
  const updatedIn: Date = await AsyncStorage.getItem(key)
  const millisecondsToDays = (time: number) =>
    time / 1000 / 60 / 60 / 24
  return updatedIn && millisecondsToDays((new Date() - new Date(updatedIn))) <= maxDaysDiff
}

export {
  saveDateFor,
  checkUpdatedFor,
}
