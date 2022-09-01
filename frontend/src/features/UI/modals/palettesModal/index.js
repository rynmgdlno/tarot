import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { palettesToggledSelector } from './palettesSlice'
import { savedPalettesSelector } from '../../../DATA/savedPalettesSlice'
// import {
//   savedPalettesSelector
// } from '../../../DATA/DATAReducer'

import Palette from './palette'
import FormInput from '../../../../components/formInput'

import './palettesModal.scss'

const PalettesModal = () => {
  const palettesToggled = useSelector(palettesToggledSelector)
  const savedPalettes = useSelector(savedPalettesSelector)
  const [search, setSearch] = useState('')
  const modalInitialClass = palettesToggled == null ? 'modal-animate-off' : 'modal-animate-return'

  // search field 
  const handleChange = e => {
    setSearch(e.target.value)
  }

  // Filtering saved palettes by 'search' field
  const filteredPalettes = savedPalettes && savedPalettes.filter(palette =>
    palette.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className={palettesToggled ? 'modal modal-animate' : `modal ${modalInitialClass}`}>
      <div className='palettes-header'>
        <h4>Palettes Browser</h4>
        <FormInput
          onChange={handleChange}
          placeholder='search'
        />
      </div>
      <div className='palettes-window'>
        {filteredPalettes && filteredPalettes.map((palette, i) => (
          <Palette key={i} data={palette} />
        ))}
      </div>
    </div>
  )
}

export default PalettesModal
