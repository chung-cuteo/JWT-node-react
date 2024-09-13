
import { StatusCodes } from 'http-status-codes'

class DashboardController {
  static async access (req, res) {
    try {
      const user = {
        id: req.user.id,
        email: req.user.email
      }
      res.status(StatusCodes.OK).json(user)
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
  }
}

export default DashboardController
