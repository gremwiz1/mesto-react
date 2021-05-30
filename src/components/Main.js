import React from 'react';
import api from '../utils/Api';
import Card from './Card';
function Main(props) {
    const [userName, setUserName] = React.useState("");
    const [userDescription, setUserDescription] = React.useState("");
    const [userAvatar, setUserAvatar] = React.useState("");
    const [cards, setCards] = React.useState([]);
    React.useEffect(() => {
        Promise.all([
            api.getUserProfile(),
            api.getInitialCards()
        ]).then(([result, cards]) => {
            setUserName(result.name);
            setUserDescription(result.about);
            setUserAvatar(result.avatar);
            setCards(cards);
        }).catch((err) => {
            console.log(err);
        })
    }, []);
    return (
        <main className="content">
            <section className="profile">
                <div className="profile__change-avatar" onClick={props.onEditAvatar}>
                    <img className="profile__avatar" src={`${userAvatar}`} />
                </div>
                <div className="profile__info">
                    <h1 className="profile__title">{userName}</h1>
                    <button onClick={props.onEditProfile} className="profile-button" type="button"></button>
                    <p className="profile__profession">{userDescription}</p>
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