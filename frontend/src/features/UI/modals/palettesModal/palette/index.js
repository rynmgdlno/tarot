import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setColor } from '../../../composer/color/editor/slider/channelEditorSlice'
import { currentUserSelector } from '../../../../DATA/currentUserSlice'
import { setSavedPalettes } from '../../../../DATA/savedPalettesSlice'
import { darkModeSelector } from '../../../darkMode/darkModeSlice'
import { menuToggle } from '../../../menu/menuSlider/menuSliderSlice'
import { palettesToggle } from '../palettesSlice'
import { deletePalette, renamePalette, updatePalettes } from '../../../../../firebase/firebasePalettes'

import CustomButton from '../../../../../components/custom-button'
import Dots from '../../../../../components/SVG/dots'
import FormInput from '../../../../../components/formInput'

// Individual color component
const Color = (values) => {
  const { red, green, blue } = values.values
  const bgColor = { backgroundColor: `rgb(${red}, ${green}, ${blue})` }
  return <div className='ind-color' style={bgColor} />
}

const Palette = ({ data }) => {
  const [showButtons, setShowButtons] = useState(false)
  const [showRename, setShowRename] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [newName, setNewName] = useState('')
  const [renameResponse, setRenameResponse] = useState(null)
  const [deleteResponse, setDeleteResponse] = useState(null)
  const buttonClass = showButtons ? '' : 'buttons-hidden'
  const deleteClass = showDelete ? '' : 'delete-hidden'
  const renameClass = showRename ? '' : 'rename-hidden'
  const dispatch = useDispatch()
  const darkMode = useSelector(darkModeSelector)
  const currentUser = useSelector(currentUserSelector)
  const fill = darkMode ? '#FAFAFA' : '#212121'
  const { name, palette } = data

  // opens selected palette in the composer
  const loadPalette = (palette) => {
    dispatch(setColor(palette))
    dispatch(menuToggle())
    dispatch(palettesToggle())
  }

  // opens up rename and delete modals
  const renameButton = () => {
    setShowRename(true)
    setShowButtons(false)
  }

  const deleteButton = () => {
    setShowDelete(true)
    setShowButtons(false)
  }

  // listener for new name field
  const handleChange = (e) => {
    setNewName(e.target.value)
  }

  // handles renaming and deletion of palettes and their responses
  const handleRename = async (e) => {
    const renameStatus = await renamePalette(name, currentUser.id, newName)
    setRenameResponse(renameStatus)
    updatePalettes(currentUser.id).then(palettes => dispatch(setSavedPalettes(palettes)))
  }

  const handleDelete = async () => {
    const deleteStatus = await deletePalette(name, currentUser.id)
    setDeleteResponse(deleteStatus)
  }

  // resets rename and delete visibility after successful responses and timeout
  useEffect(() => {
    const timeout = setTimeout(() => {
      setRenameResponse(null)
      setShowRename(false)
    }, 3000)
    return () => {
      clearTimeout(timeout)
    }
  }, [renameResponse])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDeleteResponse(null)
      setShowDelete(false)
    }, 3000)
    return () => {
      clearTimeout(timeout)
    }
  }, [deleteResponse])

  return (
    <div className='palette'>
      <span className='palette-top'>
        <p>{newName || name}</p>
        <CustomButton
          className='dots'
          onClick={() => setShowButtons(!showButtons)}>
          <Dots fill={fill} />
        </CustomButton>
      </span>
      <span className='colors'>
        {
          palette.map((color) => (
            <Color key={color.id} values={color} />
          ))
        }
        <div className={`${buttonClass} palette-buttons`}>
          <CustomButton className='palette-button' onClick={() => {
            loadPalette(palette)
            setShowButtons(false)
          }}>Open</CustomButton>
          <CustomButton
            className='palette-button'
            onClick={renameButton}>Rename</CustomButton>
          <CustomButton
            className='palette-button'
            onClick={deleteButton}>Delete</CustomButton>
        </div>
        <div className={`${renameClass} rename`}>
          {
            renameResponse !== "Success!" &&
            <>
              <FormInput
                placeholder='new name'
                value={newName && newName}
                onChange={handleChange}
              />
              <div className='rename-button-container'>
                <CustomButton className='rename-buttons' onClick={handleRename}>Rename</CustomButton>
                <CustomButton className='rename-buttons' onClick={() => setShowRename(false)}>Cancel</CustomButton>
              </div>
            </>
          }
          <p>{renameResponse}</p>
        </div>
        <div className={`${deleteClass} delete`}>
          {
            deleteResponse !== 'Success!' &&
            <>
              <h4>You are about to delete this palette.</h4>
              <div className='delete-button-container'>
                <CustomButton onClick={handleDelete}>Delete</CustomButton>
                <CustomButton onClick={() => setShowDelete(false)}>Cancel</CustomButton>
              </div>
            </>
          }
          <p>{deleteResponse}</p>
        </div>
      </span>
    </div>
  )
}

export default Palette