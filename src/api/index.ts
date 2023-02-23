import { Router } from "express"

export default () => {
  const router = Router()

  router.get("/", (req, res) => {
    res.json({
      message: "y r u here."
    })
  })

  return router;
}