import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/Api';
import Card from './Card';
function Main(props) {
    const [cards, setCards] = React.useState([]);
    const user = React.useContext(CurrentUserContext);
    React.useEffect(() => {
        api.getInitialCards()
        .then((cards) => {
           setCards(cards);
        }).catch((err) => {
            console.log(err);
        })
    }, []);
    return (
        <main className="content">
            <section className="profile">
                <div className="profile__change-avatar" onClick={props.onEditAvatar}>
                    <img className="profile__avatar" src={`${user.avatar}`} />
                </div>
                <div className="profile__info">
                    <h1 className="profile__title">{user.name}</h1>
                    <button onClick={props.onEditProfile} className="profile-button" type="button"></button>
                    <p className="profile__profession">{user.about}</p>
                </div>
                <button onClick={props.onAddPlace} className="add-button" type="button"></button>
            </section>
            <section className="elements">
                {cards.map(item => (
                    <Card card={item} key={item._id} onCardClick={props.onCardClick} />

                ))}
            </section>
        </main>
    );
}

export default Main;