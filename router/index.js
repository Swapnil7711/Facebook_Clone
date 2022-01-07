import express from "express"
import auth from "../middlewares/authMiddleware"
import { postController, registerController, loginController, profileController, refreshController } from "../controllers"
const router = express.Router()

router.post("/register", registerController.register)

router.post("/login", loginController.login)

router.post("/refreshtoken", refreshController.refresh)

router.get("/profile", auth, profileController.getProfile)

router.post("/logout", auth, loginController.logout)

router.post("/createPost", postController.createPost)

router.get("/getposts", postController.getPosts)

export default router