import { combineReducers } from "redux";
import authReducer from "./authReducer";
import OffreReducer from "./offerReducer";
import DemandReducer from "./demandReducer"
// import TestimonialReducer from "./testimonialReducer";
import CardsReducer from "./cardsReducer";
import ProfileReducer from "./profileReducer";
import CommentReducer from "./commentReducer";

export default combineReducers({
    auth: authReducer,
    OffreReducer,
    DemandReducer,
    // TestimonialReducer,
    CardsReducer,
    ProfileReducer,
    CommentReducer,
});
