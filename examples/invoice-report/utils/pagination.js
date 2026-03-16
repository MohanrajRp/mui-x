function normalizePositiveInteger(value, fallback) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback;
  }

  return Math.floor(parsed);
}

export function paginateInvoiceItems(items, options = {}) {
  const firstPageRows = normalizePositiveInteger(options.firstPageRows, 8);
  const continuationPageRows = normalizePositiveInteger(options.continuationPageRows, 12);

  if (!Array.isArray(items) || items.length === 0) {
    return [];
  }

  const pages = [];
  let cursor = 0;

  pages.push(items.slice(cursor, cursor + firstPageRows));
  cursor += firstPageRows;

  while (cursor < items.length) {
    pages.push(items.slice(cursor, cursor + continuationPageRows));
    cursor += continuationPageRows;
  }

  return pages;
}

export function createInvoicePages(items, options = {}) {
  const pagedItems = paginateInvoiceItems(items, options);
  const totalPages = pagedItems.length;
  let serialOffset = 0;

  return pagedItems.map((pageItems, pageIndex) => {
    const page = {
      pageNumber: pageIndex + 1,
      totalPages,
      isFirstPage: pageIndex === 0,
      isLastPage: pageIndex === totalPages - 1,
      serialOffset,
      items: pageItems,
    };

    serialOffset += pageItems.length;

    return page;
  });
}

export function calculateInvoiceSummary(items = []) {
  return items.reduce(
    (acc, item) => {
      const lineBase = Number(item.price) * Number(item.quantity);
      const cgstAmount = Number(item.taxAmount?.cgstAmount ?? 0);
      const sgstAmount = Number(item.taxAmount?.sgstAmount ?? 0);
      const lineTotal = Number(item.totalAmount ?? lineBase + cgstAmount + sgstAmount);

      acc.subTotal += lineBase;
      acc.totalCGST += cgstAmount;
      acc.totalSGST += sgstAmount;
      acc.grandTotal += lineTotal;

      return acc;
    },
    {
      subTotal: 0,
      totalCGST: 0,
      totalSGST: 0,
      grandTotal: 0,
    },
  );
}

export function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(Number(value ?? 0));
}
