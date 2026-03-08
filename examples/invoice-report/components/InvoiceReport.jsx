import React from 'react';

import { formatCurrency } from '../utils/pagination';

const reportStyles = {
  page: {
    minHeight: '95vh',
    padding: 16,
    border: '1px solid #ddd',
    marginBottom: 16,
    breakInside: 'avoid',
  },
  printLastPage: {
    breakAfter: 'auto',
  },
  printContinuePage: {
    breakAfter: 'page',
  },
};

function InvoiceHeader({ invoice }) {
  return (
    <header style={{ marginBottom: 16 }}>
      <h2 style={{ margin: 0 }}>Tax Invoice</h2>
      <div>Invoice No: {invoice.invoiceNo}</div>
      <div>Invoice Date: {invoice.invoiceDate}</div>
      <div style={{ marginTop: 8 }}>
        <strong>Customer</strong>
        <div>{invoice.customer.name}</div>
        <div>GST: {invoice.customer.gstNumber}</div>
        <div>{invoice.customer.address}</div>
      </div>
    </header>
  );
}

function InvoiceFooter({ summary, reportDestination }) {
  return (
    <footer style={{ marginTop: 16 }}>
      <div>Sub Total: {formatCurrency(summary.subTotal)}</div>
      <div>Total CGST: {formatCurrency(summary.totalCGST)}</div>
      <div>Total SGST: {formatCurrency(summary.totalSGST)}</div>
      <strong>Grand Total: {formatCurrency(summary.grandTotal)}</strong>
      <div style={{ marginTop: 8 }}>Destination: {String(reportDestination || 'print').toUpperCase()}</div>
    </footer>
  );
}

function ItemsTable({ items, serialOffset, pageNumber }) {
  return (
    <table width="100%" cellPadding="6" style={{ borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th align="left">#</th>
          <th align="left">Product</th>
          <th align="left">HSN</th>
          <th align="right">Qty</th>
          <th align="right">Price</th>
          <th align="right">Tax %</th>
          <th align="right">CGST</th>
          <th align="right">SGST</th>
          <th align="right">Total</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => {
          const rowNumber = serialOffset + index + 1;

          return (
            <tr key={`${rowNumber}-${item.productId ?? item.productName ?? 'item'}-p${pageNumber}`}>
              <td>{rowNumber}</td>
              <td>{item.productName}</td>
              <td>{item.hsnCode}</td>
              <td align="right">{item.quantity}</td>
              <td align="right">{formatCurrency(item.price)}</td>
              <td align="right">{item.tax?.totalTaxPercent ?? 0}%</td>
              <td align="right">{formatCurrency(item.taxAmount?.cgstAmount)}</td>
              <td align="right">{formatCurrency(item.taxAmount?.sgstAmount)}</td>
              <td align="right">{formatCurrency(item.totalAmount)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export function InvoiceReport({ invoice, pages, reportDestination }) {
  if (!invoice || pages.length === 0) {
    return null;
  }

  return (
    <div>
      {pages.map((page) => (
        <section
          key={page.pageNumber}
          style={{
            ...reportStyles.page,
            ...(page.isLastPage ? reportStyles.printLastPage : reportStyles.printContinuePage),
          }}
        >
          {page.isFirstPage && <InvoiceHeader invoice={invoice} />}
          <ItemsTable
            items={page.items}
            serialOffset={page.serialOffset}
            pageNumber={page.pageNumber}
          />
          {page.isLastPage && (
            <InvoiceFooter summary={invoice.summary} reportDestination={reportDestination} />
          )}
          <div style={{ marginTop: 12 }}>
            Page {page.pageNumber} of {page.totalPages}
          </div>
        </section>
      ))}
    </div>
  );
}
