import userSlice from "./redux/userSlice";
import imagesSlice from "./redux/imagesSlice";
import { configureStore } from "@reduxjs/toolkit";


export default configureStore({
    reducer: {
        users: userSlice,
        images: imagesSlice
    }
})

