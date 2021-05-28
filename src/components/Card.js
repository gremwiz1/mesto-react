import React from 'react';
function Card(props) {
    function handleCardClick() {
        props.onCardClick(props.card);
    }
    return (
        <div className="element" key={props.key}>
            <button className="element__button-delete"></button>
            <img className="element__image" alt={`${props.card.name}`} src={props.card.link}
                onClick={handleCardClick} />
            <div className="element__description">
                <h2 className="element__title">{props.card.name}</h2>
                <div>
                    <button className="element__like" type="button"></button>
                    <p className="element__like-numbers">{(props.card.likes) ? props.card.likes.length : 0}</p>

                </div>

            </div>
        </div>
    );

}
export default Card;