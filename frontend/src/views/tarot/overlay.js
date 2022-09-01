import React from 'react'
import { useSelector } from 'react-redux'

import { queryPagesSelector  } from '../../features/DATA/apiSlice'

import {
  activeResultSelector,
  currentPageSelector,
  resultLengthSelector,
} from '../../features/UI/swipe/swipeSlice'

import './overlay.scss'

const Overlay = () => {
  // const activeResult = useSelector(state => state.ui.swipe.activeResult)
  // const currentPage = useSelector(state => state.ui.swipe.currentPage)
  // const resultLength = useSelector(state => state.ui.swipe.resultLength)
  // const queryPages = useSelector(state => state.data.api.queryPages)

  const activeResult = useSelector(activeResultSelector)
  const currentPage = useSelector(currentPageSelector)
  const resultLength = useSelector(resultLengthSelector)
  const queryPages = useSelector(queryPagesSelector)

  return (
    <div className='overlay'>
      <p>Active Result: {activeResult}</p>
      <p>Current Page: {currentPage}</p>
      <p>Result Length: {resultLength}</p>
      <p>Query Pages: {queryPages}</p>
    </div>
  )
}

export default Overlay