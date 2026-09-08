import React from 'react';
import classes from './Register.module.css';
import qrCodeImage from '../../../assets/qrcode/qrcode.png';

const PaymentSection = ({ totalAmount }) => {
    const upiId = "aryacollege@icici";
    const [copied, setCopied] = React.useState(false);

    const handleCopy = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigator.clipboard.writeText(upiId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={classes.paymentWrapper}>
            <h2 className={classes.sectionTitle}>
                Complete Your Payment
                <span className={classes.titleUnderline}></span>
            </h2>

            <div className={classes.paymentDisplay}>
                <p className={classes.paymentLabel}>Total Amount to Pay:</p>
                <p className={classes.paymentAmount}>₹{totalAmount}</p>
            </div>

            <div className={classes.qrContainer}>
                <div className={classes.qrPlaceholder}>
                    <img
                        src={qrCodeImage}
                        alt="UPI QR Code"
                        className={classes.qrImage}
                    />
                </div>
                <p className={classes.upiId}>UPI ID: <span>{upiId}</span></p>
                <p className={classes.payInstruction}>Pay the exact amount shown above</p>
            </div>

            <div className={classes.orDivider}>OR</div>

            <div className={classes.upiButtonContainer}>
                <button
                    type="button"
                    onClick={handleCopy}
                    className={classes.upiButton}
                >
                    {copied ? 'UPI ID Copied!' : 'Copy UPI ID'}
                </button>
                <p className={classes.payInstruction} style={{ marginTop: '10px' }}>
                    Copy the UPI ID and pay ₹{totalAmount} in your UPI app.
                </p>
            </div>
        </div>
    );
};

export default PaymentSection;
