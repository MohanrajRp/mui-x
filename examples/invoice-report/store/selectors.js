import { createInvoicePages } from '../utils/pagination';

export const selectInvoiceState = (state) => state.invoice;

export const selectInvoice = (state) => selectInvoiceState(state).invoice;

export const selectReportDestination = (state) => selectInvoiceState(state).reportDestination;

export const selectInvoicePages = (state, paginationOptions) => {
  const invoice = selectInvoice(state);
  if (!invoice) {
    return [];
  }

  return createInvoicePages(invoice.items, paginationOptions);
};
