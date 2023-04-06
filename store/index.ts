import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  currentAdministrationReducer,
  universityAdministrationReducer,
  viceChancellorMessageReducer,
} from "./administration";
import { collegeReducer } from "./college";
import { contactReducer } from "./contact";
import { eServiceReducer } from "./electronic-service";
import { newsReducer } from "./news";
import { relatedSiteReducer } from "./related-site";
import {
  visionMissionReducer,
  historicalBackgroundReducer,
  factAndFigureReducer,
  uploadFileReducer,
  councilReducer,
} from "./university";
import { logoReducer } from "./university/logo";

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
    logo: logoReducer,
    uploadFile: uploadFileReducer,
    viceChancellorMessage: viceChancellorMessageReducer,
    currentAdministration: currentAdministrationReducer,
    universityAdministration: universityAdministrationReducer,
    council: councilReducer,
  },
  devTools: true,
});

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
