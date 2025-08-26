// src/types/paystack.d.ts
declare module "@paystack/inline-js" {
  export default class PaystackPop {
    newTransaction(options: PaystackOptions): void;
  }

  export interface PaystackTransaction {
    reference: string;
    status: string;
    message: string;
    trans: string;
    transaction: string;
    trxref: string;
}

export interface PaystackOptions {
    key: string;
    email: string;
    amount: number;
    name?: string;
    onSuccess: (transaction: PaystackTransaction) => void;
    onCancel: () => void;
}
}
