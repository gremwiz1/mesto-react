import React from 'react';
function Card({card, onCardClick}) {
    function handleCardClick() {
        onCardClick(card);
    }
    return (
        <div className="element">
            <button className="element__button-delete"></button>
            <img className="element__image" alt={`${card.name}`} src={card.link}
                onClick={handleCardClick} />
            <div className="element__description">
                <h2 className="element__title">{card.name}</h2>
                <div>
                    <button className="element__like" type="button"></button>
                    <p className="element__like-numbers">{card.likes.length}</p>

                </div>

            </div>
        </div>
    );

}
export default Card;