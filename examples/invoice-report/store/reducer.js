import {
  LOAD_INVOICE_FAILURE,
  LOAD_INVOICE_REQUEST,
  LOAD_INVOICE_SUCCESS,
  SET_REPORT_DESTINATION,
} from './actions';
import { invoiceReportConfig } from '../config/reportConfig';

const initialState = {
  loading: false,
  error: null,
  invoice: null,
  reportDestination: invoiceReportConfig.destination,
};

export function invoiceReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_INVOICE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOAD_INVOICE_SUCCESS:
      return {
        ...state,
        loading: false,
        invoice: action.payload,
      };
    case LOAD_INVOICE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SET_REPORT_DESTINATION:
      return {
        ...state,
        reportDestination: action.payload,
      };
    default:
      return state;
  }
}
