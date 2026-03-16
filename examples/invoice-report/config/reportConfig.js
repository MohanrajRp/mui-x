export const REPORT_DESTINATIONS = {
  PRINT: 'print',
  PDF: 'pdf',
  EMAIL: 'email',
};

export const invoiceReportConfig = {
  pagination: {
    firstPageRows: 12,
    continuationPageRows: 18,
  },
  destination: REPORT_DESTINATIONS.PRINT,
};
