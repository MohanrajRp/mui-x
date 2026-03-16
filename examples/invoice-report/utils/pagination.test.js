import { describe, expect, it } from 'vitest';

import { calculateInvoiceSummary, createInvoicePages, paginateInvoiceItems } from './pagination';

describe('paginateInvoiceItems', () => {
  it('creates one page when under first-page limit', () => {
    const items = Array.from({ length: 4 }, (_, idx) => ({ id: idx + 1 }));
    const pages = paginateInvoiceItems(items, { firstPageRows: 5, continuationPageRows: 5 });

    expect(pages).toHaveLength(1);
    expect(pages[0]).toHaveLength(4);
  });

  it('creates continuation pages with the configured size', () => {
    const items = Array.from({ length: 23 }, (_, idx) => ({ id: idx + 1 }));
    const pages = paginateInvoiceItems(items, { firstPageRows: 8, continuationPageRows: 10 });

    expect(pages).toHaveLength(3);
    expect(pages[0]).toHaveLength(8);
    expect(pages[1]).toHaveLength(10);
    expect(pages[2]).toHaveLength(5);
  });

  it('falls back to defaults when invalid limits are provided', () => {
    const items = Array.from({ length: 13 }, (_, idx) => ({ id: idx + 1 }));
    const pages = paginateInvoiceItems(items, { firstPageRows: 0, continuationPageRows: -2 });

    expect(pages).toHaveLength(2);
    expect(pages[0]).toHaveLength(8);
    expect(pages[1]).toHaveLength(5);
  });
});

describe('createInvoicePages', () => {
  it('adds first/last page flags and serial offset', () => {
    const items = Array.from({ length: 15 }, (_, idx) => ({ id: idx + 1 }));
    const pages = createInvoicePages(items, { firstPageRows: 5, continuationPageRows: 5 });

    expect(pages).toHaveLength(3);
    expect(pages[0]).toMatchObject({
      isFirstPage: true,
      isLastPage: false,
      serialOffset: 0,
      pageNumber: 1,
      totalPages: 3,
    });
    expect(pages[2]).toMatchObject({
      isFirstPage: false,
      isLastPage: true,
      serialOffset: 10,
      pageNumber: 3,
      totalPages: 3,
    });
  });
});

describe('calculateInvoiceSummary', () => {
  it('calculates invoice totals from items', () => {
    const summary = calculateInvoiceSummary([
      { quantity: 2, price: 100, taxAmount: { cgstAmount: 18, sgstAmount: 18 }, totalAmount: 236 },
      { quantity: 1, price: 400, taxAmount: { cgstAmount: 36, sgstAmount: 36 }, totalAmount: 472 },
    ]);

    expect(summary).toEqual({
      subTotal: 600,
      totalCGST: 54,
      totalSGST: 54,
      grandTotal: 708,
    });
  });

  it('handles missing tax amounts and total amounts', () => {
    const summary = calculateInvoiceSummary([{ quantity: 3, price: 200 }]);

    expect(summary).toEqual({
      subTotal: 600,
      totalCGST: 0,
      totalSGST: 0,
      grandTotal: 600,
    });
  });
});
