import { all, delay, put, takeLatest } from 'redux-saga/effects';

import {
  LOAD_INVOICE_REQUEST,
  loadInvoiceFailure,
  loadInvoiceSuccess,
} from './actions';
import { sampleInvoice } from '../sampleInvoice';
import { calculateInvoiceSummary } from '../utils/pagination';

export function normalizeInvoice(invoicePayload) {
  const invoice = invoicePayload ?? sampleInvoice;
  const items = Array.isArray(invoice.items) ? invoice.items : [];

  return {
    ...invoice,
    items,
    summary: calculateInvoiceSummary(items),
  };
}

function* loadInvoiceWorker(action) {
  try {
    yield delay(150);
    const invoice = normalizeInvoice(action.payload);
    yield put(loadInvoiceSuccess(invoice));
  } catch (error) {
    yield put(loadInvoiceFailure(error instanceof Error ? error.message : 'Unknown error'));
  }
}

function* watchLoadInvoice() {
  yield takeLatest(LOAD_INVOICE_REQUEST, loadInvoiceWorker);
}

export function* invoiceRootSaga() {
  yield all([watchLoadInvoice()]);
}
