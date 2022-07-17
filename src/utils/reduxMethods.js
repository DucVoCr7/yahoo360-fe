import { useSelector } from 'react-redux'

export const useReduxUserId = () => {
    const userId = useSelector(state=> state.user.userInfo?.id)
  return userId
}
export const useReduxValueGender = (key) => {
    const valueGender = useSelector(state=> state.app.gender.find(item => item.key === key).value)
    return valueGender
}
export const useReduxValueCategory = (key) => {
    const valueCategory = useSelector(state=> state.app.category.find(item => item.key === key)?.value)
    return valueCategory
}
export const useReduxValuePosition = (key) => {
    const valuePosition = useSelector(state=> state.app.position.find(item => item.key === key).value)
    return valuePosition
}
export const useReduxCategoryList = ()=> {
    const categoryList = useSelector(state=> state.app.category)
    return categoryList
}
