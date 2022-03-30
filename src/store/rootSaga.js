import { call } from 'redux-saga/effects'

const rootSagas = [];

export default function* rootSaga() {
	yield all(rootSagas.map(saga => call(saga)));
}