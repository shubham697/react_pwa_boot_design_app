import { takeEvery, call, put, all } from "redux-saga/effects";
import user from './user';

export default function* watcherSaga() {
  yield all([call(user),]);
}
