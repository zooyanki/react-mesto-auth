import React, {useState, useEffect} from 'react';
import {Switch, Route, useHistory} from 'react-router-dom';
import {withRouter} from 'react-router';

import {CurrentUserContext, CardContext} from '../contexts/CurrentUserContext';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ConfirmPopup from './ConfirmPopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import Login from './Login';
import Register from './Register';
import InfoToolTip from './InfoToolTip';
import ProtectedRoute from './ProtectedRoute';

import {api} from '../Utils/api';
import { apireg } from '../Utils/apireg';

function App() {
  const history = useHistory();
  const [userEmail, setUserEmail] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(false);
  const [isInfoToolTip, setIsInfoToolTip] = useState(false);  
  const [errorInfoToolTip, setErrorInfoToolTip] = useState(false);
  const [targetCard, setTargetCard] = useState();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(()=>{
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      
      apireg.usersme(token).then((res) => {
        if (res) {
          // setUserEmail(res.data.email);
          setLoggedIn(true);          
          history.push('/main');
        }
      })
    }

    api.getUserInfo().then((userInfo)=>{
      setCurrentUser(userInfo);
      }).catch((err) =>
        console.log("Упс... что-то пошло не так"));

    api.getInitialCards().then((item) => {
        setCards(item);
        }).catch((err) =>
          console.log("Упс... что-то пошло не так"));  
  },[])

//Удаление карты
  const handleCardDelete = () => {
    api.delInitialCards(targetCard._id).then(() => {
      const newCards = cards.filter(item => item._id !== targetCard._id);
      setCards(newCards);
      }).catch((err) =>
      console.log("Упс... что-то пошло не так"));
    }
//Добавление/удаление лайка
  const handleCardLike = (card) => {
      const isLiked = card.likes.some(item => item._id === currentUser._id);
      
      if (!isLiked) {api.addLikeCard(card._id).then((newCard) => {
          const newCards = cards.map((c) => c._id === card._id ? newCard : c);
          setCards(newCards);
        }).catch((err) =>
        console.log("Упс... что-то пошло не так"));
      } else {
        api.remLikeCard(card._id).then((newCard) => {
          const newCards = cards.map((c) => c._id === card._id ? newCard : c);
          setCards(newCards)
        }).catch((err) =>
        console.log("Упс... что-то пошло не так"));
      }
    } 

//Обновление пользователя на сервере  
  const handleUpdateUser = (infoUser) => {
    api.setUserInfo(infoUser.name, infoUser.about).then((name, about)=> {
      setCurrentUser(name, about);
    }).catch((err) =>
    console.log("Упс... что-то пошло не так"));
  }

//Смена аватара на сервере
  const handleUpdateAvatar = (avatar) => {
    api.setUserAvatar(avatar.avatar).then((a) => {
      setCurrentUser(a);
    }).catch((err) =>
    console.log("Упс... что-то пошло не так"));
  }

//Добавление картинки на сервере
  const handleAddPlaceSubmit = (image) => {
    api.setInitialCard(image.name, image.link).then((newCard) => {
      setCards([newCard, ...cards])
    }).catch((err) =>
    console.log("Упс... что-то пошло не так"));
  }

  //Проверка авторизации
const handleLogin = (email) => {
  setLoggedIn(true);
  setUserEmail(email);
}

  const signOut = () => {
    localStorage.removeItem('token');
    history.push('/signin');
  }

  const signIn = () => {
    history.push('/signin');
  }

  const signUp = () => {
    history.push('signUp')
  }

  const handleCardClick = (card) => {
    setSelectedCard(card); 
  } 
  
  const openPopupEditor = () => {
    setisEditProfilePopupOpen(true);
  }
  const openPopupNewForm = () => {
    setisAddPlacePopupOpen(true);
  }
  const openPopupAvatar = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const openPopupConfirm = (card) => {
    setIsConfirmPopupOpen(true);
    setTargetCard(card);
  }

  const openInfoToolTip = (err) => {
    setIsInfoToolTip(true);
    setErrorInfoToolTip(err);
  }

  const closeAllPopups = () => {
    setisAddPlacePopupOpen(false);
    setisEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard(false);
    setIsInfoToolTip(false);
  }  

        return (
            <CurrentUserContext.Provider value={currentUser}>
              <CardContext.Provider value={cards}>
                
                <div className="App">                
                  <div className="content">

                        <main>
                          <Switch>

                            <ProtectedRoute exact path="/" loggedIn={loggedIn} />

                            <Route exact path="/main">
                              <Header text="Выход" email={userEmail} onSign={signOut}/>  
                              <Main cards={cards} onConfirmPopup={openPopupConfirm} onEditProfile={openPopupEditor} onAddPlace={openPopupNewForm} onEditAvatar={openPopupAvatar} onCardClick={handleCardClick} onCardLike={handleCardLike}/>
                            </Route>

                            <Route exact path="/signin">
                              <Header text="Регистрация" onSign={signUp}/>
                              <Login handleLogin={handleLogin} onInfoToolTip={openInfoToolTip}/>
                            </Route>

                            <Route exact path="/signup" >
                              <Header text="Войти" onSign={signIn}/>
                              <Register onInfoToolTip={openInfoToolTip}/>
                            </Route>

                          </Switch>
                        </main>
                        <Footer/>

                  </div>
        
                    <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
              
                    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
                          
                    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
                    
                    <ConfirmPopup onClose={closeAllPopups} isOpen={isConfirmPopupOpen} onCardDelete={handleCardDelete}/>             
        
                    <ImagePopup onClose={closeAllPopups} isOpen={selectedCard}/>

                    <InfoToolTip isOpen={isInfoToolTip} onClose={closeAllPopups} onError={errorInfoToolTip}/>
                      
              </div>

              </CardContext.Provider>
            </CurrentUserContext.Provider>
        );
}

export default withRouter(App);


