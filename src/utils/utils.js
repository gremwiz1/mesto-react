/*const popupWithImage = document.querySelector('.popup_image');
const popupImage = document.querySelector('.popup__image');
const popupText = document.querySelector('.popup__text');
const keyCodeEscape = 27;
export const openImagePopup = (item, text) => {
    openPopup(popupWithImage);  
    popupImage.src = item.src;
    popupImage.alt = item.alt;
    popupText.textContent = text.textContent;
    }
    function openPopup(popup) {
        popup.classList.add('popup_opened');
        document.body.addEventListener('keydown', closePopupEsc);
    }
    function closePopupEsc(evt) {
        if(evt.keyCode === keyCodeEscape) {
            const activePopup = document.querySelector('.popup_opened');
            closePopup(activePopup);
        }
    }
    function closePopup(popup) {
        document.body.removeEventListener('keydown', closePopupEsc);
        popup.classList.remove('popup_opened');
    }*/