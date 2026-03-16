export const LOAD_INVOICE_REQUEST = 'invoice/LOAD_INVOICE_REQUEST';
export const LOAD_INVOICE_SUCCESS = 'invoice/LOAD_INVOICE_SUCCESS';
export const LOAD_INVOICE_FAILURE = 'invoice/LOAD_INVOICE_FAILURE';
export const SET_REPORT_DESTINATION = 'invoice/SET_REPORT_DESTINATION';

export const loadInvoiceRequest = (payload) => ({
  type: LOAD_INVOICE_REQUEST,
  payload,
});

export const loadInvoiceSuccess = (invoice) => ({
  type: LOAD_INVOICE_SUCCESS,
  payload: invoice,
});

export const loadInvoiceFailure = (error) => ({
  type: LOAD_INVOICE_FAILURE,
  payload: error,
});

export const setReportDestination = (destination) => ({
  type: SET_REPORT_DESTINATION,
  payload: destination,
});
