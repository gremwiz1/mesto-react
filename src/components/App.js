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
  function handleCardClick(props) {
    setSelectedCard(props);
  }
  return (
    <div className="page">
      <Header />
      <Main onAddPlace={handleAddPlaceClick} onEditProfile={handleEditProfileClick} onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick} />
      <Footer />
      <PopupWithForm isOpen={isAddPlacePopupOpen} name={'popup_add-card'} title={"Новое место"}
        onClose={closeAllPopups} children={
          <>
            <input className="popup-container__name" id="name-image-input" type="text" name="nameimage"
              placeholder="Название" minLength="2" maxLength="30" required />
            <span className="popup-container__error" id="name-image-input-error"></span>
            <input className="popup-container__name" id="url-image-input" type="url" name="path"
              placeholder="Ссылка на картинку" required />
            <span className="popup-container__error" id="url-image-input-error"></span>
          </>
        } />
      <PopupWithForm isOpen={isEditProfilePopupOpen} name={'popup_edit-profile'} title={'Редактировать профиль'}
        onClose={closeAllPopups} children={
          <>
            <input className="popup-container__name" id="name-input" type="text" name="name" placeholder="Имя"
              minLength="2" maxLength="40" required />
            <span className="popup-container__error" id="name-input-error"></span>
            <input className="popup-container__name" id="profession-input" type="text" name="about"
              placeholder="Вид деятельности" minLength="2" maxLength="200" required />
            <span className="popup-container__error" id="profession-input-error"></span>
          </>
        } />
      <PopupWithForm isOpen={isEditAvatarPopupOpen} name={'popup_change-avatar'} title={'Обновить аватар'}
        onClose={closeAllPopups} children={
          <>
            <input className="popup-container__name" id="url-avatar-input" type="url" name="path"
              placeholder="https://somewebsite.com/someimage.jpg" required />
            <span className="popup-container__error" id="url-avatar-input-error"></span>
          </>
        } />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </div>
  );
}


export default App;
