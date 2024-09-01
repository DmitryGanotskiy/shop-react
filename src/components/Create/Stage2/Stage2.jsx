import React, { useContext, useState, useEffect } from 'react';
import styles from './Stage2.module.css';
import { Context } from '../../../context/Cont';
import { assets } from '../../../assets/assets';

const PricingCard = ({ index, card, handleCardChange, handleDeleteCard }) => {
    return (
        <div className={styles.pricingCard}>
            <div className={styles.cardHeader}>
                <input
                    type="text"
                    value={card.name}
                    onChange={(e) => handleCardChange(index, 'name', e.target.value)}
                    placeholder="Name"
                    className={styles.cardName}
                />
                <img onClick={() => handleDeleteCard(index)} src={assets.close_icon} className={styles.deleteButton}/>
            </div>
            <textarea
                value={card.description}
                onChange={(e) => handleCardChange(index, 'description', e.target.value)}
                placeholder="Description"
                className={styles.cardDescription}
            />
            <div className={styles.cardFooter}>
                <input
                    type="number"
                    value={card.number}
                    onChange={(e) => handleCardChange(index, 'number', e.target.value)}
                    placeholder="Number"
                    className={styles.cardNumber}
                />
                <select
                    value={card.currency}
                    onChange={(e) => handleCardChange(index, 'currency', e.target.value)}
                    className={styles.cardCurrency}
                >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    {/* Add other currencies as needed */}
                </select>
            </div>
        </div>
    );
};

const Stage2 = () => {
    const { openStage2, setOpenStage2, openStage3, setOpenStage3, upload, setUpload } = useContext(Context);
    const [isFree, setIsFree] = useState(true);
    const [pricingCards, setPricingCards] = useState([{ name: 'Normal', description: '', number: '', currency: 'USD' }]);

    useEffect(() => {
        if (!isFree && pricingCards.length === 0) {
            setPricingCards([{ name: 'Normal', description: '', number: '', currency: 'USD' }]);
        }
    }, [isFree]);

    if (!openStage2) return null;

    const handleCardChange = (index, field, value) => {
        const updatedCards = pricingCards.map((card, i) => 
            i === index ? { ...card, [field]: value } : card
        );
        setPricingCards(updatedCards);
    };

    const handleAddCard = () => {
        setPricingCards([...pricingCards, { name: 'Normal', description: '', number: '', currency: 'USD' }]);
    };

    const handleDeleteCard = (index) => {
        const newCards = pricingCards.filter((_, i) => i !== index);
        // Ensure at least one card remains
        if (newCards.length === 0) {
            newCards.push({ name: 'Normal', description: '', number: '', currency: 'USD' });
        }
        setPricingCards(newCards);
    };

    const handleSubmit = () => {
        let tickets;
    
        if (isFree) {
            // If it's free, only include one basic ticket with price 0
            tickets = [{
                name: 'Basic',
                description: 'Free entry',
                currency: 'USD',
                price: 0,
                free: true
            }];
        } else {
            tickets = pricingCards.map(card => ({
                name: card.name,
                description: card.description,
                currency: card.currency,
                price: card.number,
                free: false
            }));
        }
    
        setUpload(prevState => ({
            ...prevState,
            tickets: tickets,
        }));
    
        console.log(upload)
        setOpenStage3(true);
    };    

    const requiredFields = !isFree ? pricingCards.some(card => !card.name || !card.number) : false;

    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <img src={assets.close_icon} alt="Close" className={styles.closeIcon} onClick={()=>setOpenStage2(false)} />
                <h2 className={styles.title}>Tickets and Pricing</h2>
                <div className={styles.formGroup}>
                    <label className={styles.freeLabel}>Free
                        <input
                            type="checkbox"
                            checked={isFree}
                            onChange={(e) => setIsFree(e.target.checked)}
                            className={styles.freeCheckbox}
                        />
                    </label>
                </div>
                {!isFree && (
                    <div className={styles.cardsContainer}>
                        {pricingCards.map((card, index) => (
                            <PricingCard
                                key={index}
                                index={index}
                                card={card}
                                handleCardChange={handleCardChange}
                                handleDeleteCard={handleDeleteCard}
                            />
                        ))}

                        <img src={assets.plus_icon} alt="Add" onClick={handleAddCard} className={styles.plusIcon} />
                    </div>
                )}
                <div className={styles.bottomBar}>
                    <span className={styles.formStatus}>
                        {requiredFields ? 'Please fill all pricing fields' : ''}
                    </span>
                    <button
                        className={styles.submitButton}
                        onClick={handleSubmit}
                        disabled={requiredFields}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Stage2;
