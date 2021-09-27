import { takeEvery, put } from "redux-saga/effects";

import { setDatasetListToReducer } from "../reducers/actions";
import { ADD_MESSAGE_SAGA } from "../types";

function* addMessage(action: any) {
  const { payload } = action;
  const message = payload.message;
  console.log("addMessageSaga ===> ", action);
  yield put(setDatasetListToReducer(message, "messages"));
  /* try {
      yield put<InnerAction>({ type: 'START_FETCH_USER' });
      const response: Response = yield call(() => fetch(`https://reqres.in/api/users/${action.id}?delay=1`));
      yield put<InnerAction>({ type: 'CONTINUE_FETCH_USER' });
      const data: { data: Record<string, unknown> } = yield call(() => response.json());
      yield delay(500);
      const firstName = data.data.first_name;
      if (typeof firstName !== 'string') throw new Error();
      yield put<InnerAction>({ type: 'FINISH_FETCH_USER', firstName });
    } catch (e) {
      yield put<InnerAction>({ type: 'ERROR_FETCH_USER' });
    } */
}

export default function* addMessageSaga() {
  yield takeEvery(ADD_MESSAGE_SAGA, addMessage);
}
