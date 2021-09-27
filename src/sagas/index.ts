import { all } from "redux-saga/effects";
import addMessageSaga from "./addMessageSaga";

const allSagas = [addMessageSaga()];

export default function* rootSaga() {
  yield all(allSagas);
}
