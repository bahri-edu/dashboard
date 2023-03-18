import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { collegeReducer } from "./college";
import { contactReducer } from "./contact";
import { eServiceReducer } from "./electronic-service";
import { newsReducer } from "./news";
import { relatedSiteReducer } from "./related-site";
import {
  visionMissionReducer,
  historicalBackgroundReducer,
  factAndFigureReducer,
} from "./university";

const store = configureStore({
  reducer: {
    college: collegeReducer,
    news: newsReducer,
    visionMission: visionMissionReducer,
    historicalBackground: historicalBackgroundReducer,
    factAndFigure: factAndFigureReducer,
    eService: eServiceReducer,
    relatedSite: relatedSiteReducer,
    contact: contactReducer,
  },
  devTools: true,
});

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
