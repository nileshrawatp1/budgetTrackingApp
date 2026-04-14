export interface Transaction {
    txnId: string;
    txnDate: string;
    header: string;
    amount: string;
    txnType: string;
}

export interface Account {
    accountNum: string;
    type: string;
    currBalance: string;
    transactions: Transaction[];
}

export interface Contact {
    id: number;
    fullName: string;
    mobile: string;
    mailId: string;
    Accounts?: Account[];
}
