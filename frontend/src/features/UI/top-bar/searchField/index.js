import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { setColor } from '../../composer/color/editor/slider/channelEditorSlice'
import {
  setIsLoading,
  setNoResults,
  setQuery,
  querySelector,
  setQueryResult,
  setQueryPages,
} from '../../../DATA/apiSlice'
import {
  setActiveResult,
  setCurrentPage,
  setResultLength
} from '../../swipe/swipeSlice'

import FormInput from '../../../../components/formInput'

const baseURLdev = process.env.REACT_APP_FETCH_URL_DEV
const baseURLprod = process.env.REACT_APP_FETCH_URL_PROD
const env = process.env.REACT_APP_ENV

const baseURL = env === "development" ? baseURLdev : baseURLprod

const SearchField = React.forwardRef(({ setSearchField, searchToggled }, ref) => {
  const dispatch = useDispatch()
  const query = useSelector(querySelector)
  // const [query, setQuery] = useState('')

  const onEnter = e => {
    if (e.key === 'Enter') {
      fetchQuery()
      dispatch(setSearchField())
      ref.current.blur()
    }
  }

  const fetchQuery = async () => {
    try {
      const encodedQuery = encodeURIComponent(query).replace(/%20/g, "+")
      dispatch(setIsLoading(true))
      dispatch(setCurrentPage(1))
      const result = await fetch(`${baseURL}/?query=${encodedQuery}&page=1`, {
        mode: "cors"
      })
      const data = await result.json()
      if (!data[2].length) {
        dispatch(setIsLoading(false))
        dispatch(setNoResults(true))
      } else {
        dispatch(setQueryResult(data[2]))
        dispatch(setQueryPages(data[1]))
        dispatch(setCurrentPage(data[0]))
        dispatch(setActiveResult(0))
        dispatch(setResultLength(data[2].length))
        dispatch(setColor(data[2][0]))
        dispatch(setIsLoading(false))
      }
    } catch (error) {
      return error
    }
  }

  const handleChange = e => {
    dispatch(setQuery(e.target.value))
  }

  return (
    <>
      <FormInput
        className={searchToggled ?
          'search' :
          'search search-active'}
        placeholder='search'
        onChange={handleChange}
        onKeyDown={onEnter}
        ref={ref}
      />
    </>
  )
})

export default SearchField