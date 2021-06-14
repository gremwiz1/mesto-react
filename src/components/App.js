import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
function App() {
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  React.useEffect(() => {
    Promise.all([
      api.getUserProfile(),
      api.getInitialCards()
    ]).then(([result, cards]) => {
      setCurrentUser(result);
      setCards(cards);
    }).catch((err) => {
      console.log(err);
    })
  }, []);

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function handleUpdateUser(item) {

    api.editUserProfile(item)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      }).catch((err) => {
        console.log(err);
      });
  }
  function handleUpdateAvatar(avatar) {
    console.log(avatar);
    api.changeAvatarImage(avatar.avatar)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      }).catch((err) => {
        console.log(err);
      });
  }
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (isLiked) {
      api.deleteLikeClick(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        }).catch((err) => {
          console.log(err);
        })
    }
    else {
      api.putLikeClick(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        }).catch((err) => {
          console.log(err);
        })
    }
  }
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then((newCard) => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      }).catch((err) => {
        console.log(err);
      })
  }
  function handleAddPlaceSubmit(card) {
    api.addItem(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      }).catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="root">
      <div className="page">
        <Header />
        <CurrentUserContext.Provider value={currentUser}>
          <Main cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} onAddPlace={handleAddPlaceClick} onEditProfile={handleEditProfileClick} onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick} />
          <Footer />
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        </CurrentUserContext.Provider>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>

    </div>

  );
}


export default App;
