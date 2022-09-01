import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'

import UIReducer from '../features/UI/UIReducer'
import DATAReducer from '../features/DATA/DATAReducer'

const env = process.env.REACT_APP_ENV

export const store = configureStore({
  reducer: {
    ui: UIReducer,
    data: DATAReducer,
  },
  middleware: env === 'development' && [logger],
});