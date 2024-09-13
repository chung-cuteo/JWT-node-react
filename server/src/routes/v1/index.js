
import express from 'express'
import { StatusCodes } from 'http-status-codes'
import  userRoute  from '~/routes/v1/userRoute'
import  dashboardRoute from '~/routes/v1/dashboardRoute'

const router = express.Router()

/** Check APIs v1/status */
router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'APIs V1 are ready to use.' })
})

/** User APIs */
router.use('/user', userRoute)

/** Dashboard APIs */
router.use('/dashboard', dashboardRoute)

export default router
