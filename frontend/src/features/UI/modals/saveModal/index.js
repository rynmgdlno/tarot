import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updatePalettes } from '../../../../firebase/firebasePalettes'

import { colorDataSelector } from '../../composer/color/editor/slider/channelEditorSlice'
import { currentUserSelector } from '../../../DATA/currentUserSlice'
import { setSavedPalettes } from '../../../DATA/savedPalettesSlice'
// import { currentUserSelector, setSavedPalettes } from '../../../DATA/DATAReducer'
import { saveToggledSelector } from './saveSlice'
import { savePalette } from '../../../../firebase/firebasePalettes'

import FormInput from '../../../../components/formInput'
import CustomButton from '../../../../components/custom-button'

import './save-modal.scss'

const SaveModal = () => {
  const dispatch = useDispatch()
  const palette = useSelector(colorDataSelector)
  const currentUser = useSelector(currentUserSelector)
  const saveToggled = useSelector(saveToggledSelector)
  const [paletteName, setPaletteName] = useState('')
  const [saveResponse, setSaveResponse] = useState('')
  const modalInitialClass = saveToggled == null ? 'modal-animate-off' : 'modal-animate-return'

  const handleChange = e => {
    setPaletteName(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const save = await savePalette(currentUser.id, palette, paletteName)
    setSaveResponse(save)
    setPaletteName('')
    updatePalettes(currentUser.id).then(palettes => dispatch(setSavedPalettes(palettes)))
  }

  // clears input and resets response message after timeout
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSaveResponse(null)
    }, 3000)
    return () => {
      clearTimeout(timeout)
    }
  }, [saveResponse])

  return (
    <div className={saveToggled ? 'modal modal-animate' : `modal ${modalInitialClass}`}>
      <div className='save-header'>
        <h4>Save Palette</h4>
      </div>
      {
        saveResponse !== "Success!" &&
        <form className='save-form'>
          <FormInput
            onChange={handleChange}
            placeholder='palette name'
            value={paletteName}
          />
          <CustomButton
            onClick={handleSubmit}
            type='submit'>
            Save
          </CustomButton>
        </form>
      }
      <p>{saveResponse}</p>
    </div>
  )
}

export default SaveModal