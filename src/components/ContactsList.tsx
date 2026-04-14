import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MsgBox from "./MsgBox";
import { Link } from "react-router";
import type { AppDispatch, RootState } from "../state/AppStore";
import { deleteContact, loadContacts } from "../state/ContactsSlice";
import type { Contact } from "../models/Contact";

const ContactsList = () => {

    const contacts: Contact[] = useSelector((state: RootState) => state.contactsSlice.contacts)
    const inProgress: boolean | undefined = useSelector((state: RootState) => state.contactsSlice.inProgress)
    const errMsg: string | undefined = useSelector((state: RootState) => state.contactsSlice.errMsg)
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(loadContacts())
    }, []);

    const del = (id: number) => dispatch(deleteContact(id));

    return (
        <section className="col-sm-10 mx-auto p-2 m-2">
            <h4>Contacts List</h4>

            {inProgress && <MsgBox msg="Please wait while loading" type="info" />}

            {errMsg && <MsgBox msg={errMsg} type="error" />}

            {
                contacts.length === 0 ?
                    <MsgBox msg="No records to display" type="info" /> :
                    <div className="accordion" id="contactsAccordion">
                        <table className="table table-bordered table-striped mb-0">
                            <thead>
                                <tr className="text-center" style={{ backgroundColor: '#FFA500', color: 'white' }}>
                                    <th>#</th>
                                    <th>Contact#</th>
                                    <th>Full Name</th>
                                    <th>Mobile</th>
                                    <th>Mail Id</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contacts.map(cx => (
                                    <React.Fragment key={cx.id}>
                                        <tr className="text-center align-middle">
                                            <td>
                                                <button
                                                    className="btn btn-sm"
                                                    type="button"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target={`#details-${cx.id}`}
                                                    aria-expanded="false"
                                                    aria-controls={`details-${cx.id}`}
                                                >
                                                    <i className="bi bi-chevron-down"></i>
                                                </button>
                                            </td>
                                            <td>{cx.id}</td>
                                            <td>{cx.fullName}</td>
                                            <td>{cx.mobile}</td>
                                            <td>{cx.mailId}</td>
                                            <td>
                                                <Link className="btn btn-sm me-1" to={`/edit/${cx.id}`}>
                                                    <i className="bi bi-pen text-secondary" />
                                                </Link>
                                                <button type="button" className="btn btn-sm" onClick={_e => del(cx.id)}>
                                                    <i className="bi bi-trash text-danger" />
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={6} className="p-0">
                                                <div
                                                    id={`details-${cx.id}`}
                                                    className="accordion-collapse collapse"
                                                    data-bs-parent="#contactsAccordion"
                                                >
                                                    <div className="accordion-body p-3">
                                                        {cx.Accounts && cx.Accounts.length > 0 ? (
                                                            <table className="table table-hover mb-0">
                                                                <thead>
                                                                <tr style={{ backgroundColor: '#e9ecef' }}>
                                                                    <th>Account#</th>
                                                                    <th>Type</th>
                                                                    <th>Current Balance</th>
                                                                    <th>Transactions</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {cx.Accounts.map(acc => (
                                                                    <tr key={acc.accountNum}>
                                                                        <td>{acc.accountNum}</td>
                                                                        <td>{acc.type}</td>
                                                                        <td>${acc.currBalance}</td>
                                                                        <td>
                                                                            {acc.transactions && acc.transactions.length > 0 ? (
                                                                                <table className="table table-sm mb-0">
                                                                                    <thead>
                                                                                        <tr style={{ backgroundColor: '#f8f9fa' }}>
                                                                                            <th>Txn ID</th>
                                                                                            <th>Date</th>
                                                                                            <th>Header</th>
                                                                                            <th>Amount</th>
                                                                                            <th>Type</th>
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody>
                                                                                        {acc.transactions.map(txn => (
                                                                                            <tr key={txn.txnId}>
                                                                                                <td>{txn.txnId}</td>
                                                                                                <td>{txn.txnDate}</td>
                                                                                                <td>{txn.header}</td>
                                                                                                <td>${txn.amount}</td>
                                                                                                <td>{txn.txnType}</td>
                                                                                            </tr>
                                                                                        ))}
                                                                                    </tbody>
                                                                                </table>
                                                                            ) : (
                                                                                <span className="text-muted">No transactions</span>
                                                                            )}
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    ) : (
                                                        <p className="text-muted p-3">No accounts found</p>
                                                    )}
                                                </div>
                                            </div>
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
            }
        </section>
    );
};

export default ContactsList;
