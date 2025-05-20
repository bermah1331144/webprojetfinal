'use client';
import StripeWrapper from './StripeWrapper';

export default function PaymentPage() {
    return <>
        <div className='container py-5 h-80 justify-content-center align-items-center'>
            <h1>Paiement</h1>
            <div className='row'>
                <div className="col-6">
                    <StripeWrapper />
                </div>
            </div>
        </div>
    </>
}
