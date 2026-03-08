# Invoice Report Example (React + Redux + Redux-Saga)

This example demonstrates an invoice report renderer with automatic multi-page continuation for line items.

## Behavior

- Uses Redux for app state and Redux-Saga for async invoice loading.
- Automatically paginates items when they exceed row limits.
- Renders invoice header only on the first page.
- Renders invoice footer (totals) only on the last page.
- Exposes page metadata (`isFirstPage`, `isLastPage`, `serialOffset`, `totalPages`) from selector-level pagination.
- Recalculates invoice summary totals from `items` during saga normalization.
- Uses a centralized report configuration (`config/reportConfig.js`) for pagination and output destination.

## Files

- `config/reportConfig.js`: pagination and report destination defaults.
- `sampleInvoice.js`: sample JSON payload for invoice input.
- `store/*`: Redux actions/reducer/selectors and saga.
- `utils/pagination.js`: pagination, totals calculation, and currency utilities.
- `components/InvoiceReport.jsx`: paged report UI.
- `App.jsx`: loads invoice and renders report.
- `index.jsx`: React entrypoint.
