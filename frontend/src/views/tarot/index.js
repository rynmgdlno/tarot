import React from 'react'

import { auth } from '../../firebase/firebaseConfig'
import { useFirebaseAuth } from '../../firebase/firebaseAuth'


import Composer from '../../features/UI/composer'
import Menu from '../../features/UI/menu'
import PalettesModal from '../../features/UI/modals/palettesModal'
import SaveModal from '../../features/UI/modals/saveModal'
import UserModal from '../../features/UI/modals/userModal'
import TopBar from '../../features/UI/top-bar'

import './tarot.scss'
// * local monitoring/testing widget:
// import Overlay from './overlay'

const Tarot = () => {
  useFirebaseAuth(auth)

  return (
    <div className='primary'>
      <TopBar />
      <div className='secondary'>
        <Composer />
        <Menu />
      </div>
      <PalettesModal />
      <SaveModal />
      <UserModal />
      {/* <Overlay /> */}
    </div>
  )
}

export default Tarot