import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { invoiceReportConfig } from './config/reportConfig';
import { InvoiceReport } from './components/InvoiceReport';
import { loadInvoiceRequest, setReportDestination } from './store/actions';
import {
  selectInvoice,
  selectInvoicePages,
  selectInvoiceState,
  selectReportDestination,
} from './store/selectors';
import { sampleInvoice } from './sampleInvoice';

export default function App() {
  const dispatch = useDispatch();
  const invoiceState = useSelector(selectInvoiceState);
  const invoice = useSelector(selectInvoice);
  const reportDestination = useSelector(selectReportDestination);
  const pages = useSelector((state) =>
    selectInvoicePages(state, {
      firstPageRows: invoiceReportConfig.pagination.firstPageRows,
      continuationPageRows: invoiceReportConfig.pagination.continuationPageRows,
    }),
  );

  useEffect(() => {
    dispatch(setReportDestination(invoiceReportConfig.destination));
    dispatch(loadInvoiceRequest(sampleInvoice));
  }, [dispatch]);

  if (invoiceState.loading) {
    return <div>Loading invoice...</div>;
  }

  if (invoiceState.error) {
    return <div role="alert">Unable to load invoice: {invoiceState.error}</div>;
  }

  return <InvoiceReport invoice={invoice} pages={pages} reportDestination={reportDestination} />;
}
