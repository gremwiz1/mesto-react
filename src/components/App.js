import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
function App() {
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
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
  return (
    <div className="root">
      <div className="page">
        <Header />
        <Main onAddPlace={handleAddPlaceClick} onEditProfile={handleEditProfileClick} onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick} />
        <Footer />
        <PopupWithForm isOpen={isAddPlacePopupOpen} name={'popup_add-card'} title={"Новое место"}
          onClose={closeAllPopups} children={
            <>
              <input className="popup-container__name" type="text" name="nameimage"
                placeholder="Название" minLength="2" maxLength="30" required />
              <span className="popup-container__error"></span>
              <input className="popup-container__name" type="url" name="path"
                placeholder="Ссылка на картинку" required />
              <span className="popup-container__error"></span>
            </>
          } />
        <PopupWithForm isOpen={isEditProfilePopupOpen} name={'popup_edit-profile'} title={'Редактировать профиль'}
          onClose={closeAllPopups} children={
            <>
              <input className="popup-container__name" type="text" name="name" placeholder="Имя"
                minLength="2" maxLength="40" required />
              <span className="popup-container__error"></span>
              <input className="popup-container__name" type="text" name="about"
                placeholder="Вид деятельности" minLength="2" maxLength="200" required />
              <span className="popup-container__error"></span>
            </>
          } />
        <PopupWithForm isOpen={isEditAvatarPopupOpen} name={'popup_change-avatar'} title={'Обновить аватар'}
          onClose={closeAllPopups} children={
            <>
              <input className="popup-container__name" type="url" name="path"
                placeholder="https://somewebsite.com/someimage.jpg" required />
              <span className="popup-container__error"></span>
            </>
          } />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>

    </div>

  );
}


export default App;
