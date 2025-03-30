import './FAQ.css';
import {useState} from 'react';

const FAQ = () => {
    const faqs = [
        { question: "What is this platform about?" , answer: "This platform is a community-driven marketplace for HPVP employees to buy, sell, and request items within their network. Employees can list items for sale, browse available products, and post wishlists for things they need. It’s a simple, secure, and efficient way to connect buyers and sellers within the organization."},
        { question: "Who can use it?", answer: "This platform is exclusively for HPVP employees. Only registered employees with access to the organization's authentication system can use it to buy, sell, or request items. There’s no need for a separate sign-up, as authentication is handled internally."},
        { question: "How do I buy an item?", answer: "You can browse available items in the Buy section. Once you find something you need, contact the seller directly through the provided details to finalize the transaction."},
        { question: "How do I list an item for sale?", answer: "Go to the Sell section and post your item with a description, price, and contact details. Interested buyers will reach out to you to proceed with the purchase."},
        { question: "What is this wishlisting feature?", answer: "The Wishlist feature allows you to request specific items you’re looking for. If someone has that item available, they can contact you to offer it or post it in the sell section. It helps sellers find potential buyers and offer relevant goods"}
    ];

    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    }

    return(
        <div className="faq-section">
            <h1 className="faq-heading">Frequently Asked Questions</h1>
            <div className="faq-container">
                {faqs.map((faq, index) => (
                    <div key = {index} className="faq-item">
                        <div className="faq-question" onClick={() => toggleFAQ(index)}>
                            {faq.question}
                        </div>
                        {openIndex === index && <div className='faq-answer'>{faq.answer}</div>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;