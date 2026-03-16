export const sampleInvoice = {
  invoiceNo: 'INV-1001',
  invoiceDate: '2026-03-08',
  customer: {
    name: 'ABC Traders',
    gstNumber: '33ABCDE1234F1Z5',
    address: 'Chennai, Tamil Nadu',
  },
  items: [
    {
      productId: 1,
      productName: 'Laptop',
      hsnCode: '8471',
      quantity: 1,
      price: 50000,
      tax: {
        cgstPercent: 9,
        sgstPercent: 9,
        totalTaxPercent: 18,
      },
      taxAmount: {
        cgstAmount: 4500,
        sgstAmount: 4500,
      },
      totalAmount: 59000,
    },
    {
      productId: 2,
      productName: 'Wireless Mouse',
      hsnCode: '8471',
      quantity: 2,
      price: 500,
      tax: {
        cgstPercent: 9,
        sgstPercent: 9,
        totalTaxPercent: 18,
      },
      taxAmount: {
        cgstAmount: 90,
        sgstAmount: 90,
      },
      totalAmount: 1180,
    },
  ],
  summary: {
    subTotal: 51000,
    totalCGST: 4590,
    totalSGST: 4590,
    grandTotal: 60180,
  },
};
