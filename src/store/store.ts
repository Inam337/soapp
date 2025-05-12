import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import authReducer from "./auth/auth.slice";
import drawerReducer from "./slices/drawerSlice";
import { authSaga } from "./auth/auth.saga";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

function* combinedSaga() {
  yield all([authSaga(), rootSaga()]);
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
    drawer: drawerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: {
        // Ignore the non-serializable values in drawer state
        ignoredActions: ["drawer/openDrawer"],
        ignoredPaths: ["drawer.contentProps.onSuccess", "drawer.content"],
      },
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(combinedSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
