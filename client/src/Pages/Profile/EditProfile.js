import React, {useRef, useState } from "react";
import "../../styles/EditProfile.css";
import { ButtonBase, ClickAwayListener, IconButton } from "@material-ui/core";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import { useSelector, useDispatch } from "react-redux";
import { addAvatar } from "../../JS/actions/avatarActions";
import {
  nameAction,
  addressAction,
  phoneNumberAction,
} from "../../JS/actions/generalInfosActions";
import {
  facebookAction,
  instagramAction,
  twitterAction,
} from "../../JS/actions/socialInfosActions";
import { passwordAction , emailAction } from "../../JS/actions/securityInfosActions";
import LoadingPage from "../LoadingPage";

const EditProfile = () => {
  const [showButton, setShowButton] = useState({
    showFullName: false,
    showAddress: false,
    showPhoneNumber: false,
    showFacebook: false,
    showTwitter: false,
    showInstagram: false,
    showPassword: false,
    showEmail:false,
    ShowAvatarSubmitButton: false,
    showImagesSubmitButton: false,
  });

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const [avatar, setAvatar] = useState(null);
  const [updates, setUpdates] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    facebook: "",
    twitter: "",
    instagram: "",
    actualPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [err, setErr] = useState([]);

  const editAvatarPicture = useRef();

  const avatarHandleChange = (e) => {
    setAvatar(e.target.files[0]);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedAvatar(reader.result);
      setShowButton({ ...showButton, ShowAvatarSubmitButton: true });
    };
    reader.readAsDataURL(file);
  };

  if (auth.IsLoad){
        return (<LoadingPage/>)
    }

  return (
      <div className="editProfile">
        <div className="editProfile-image">
          <div className="image_outer_container">
            <div className="import-avatar">
              <IconButton onClick={() => editAvatarPicture.current.click()}>
                <PhotoCameraIcon color="secondary" />
              </IconButton>
              <label ref={editAvatarPicture} htmlFor="impotAvatar"></label>
              <input
                type="file"
                id="impotAvatar"
                onChange={avatarHandleChange}
                accept="image/*"
              />
            </div>
            <div className="image_inner_container">
              <img
                src={selectedAvatar ? selectedAvatar : auth.user.avatar}
                alt=""
              />
            </div>
          </div>
        </div>
        {showButton.ShowAvatarSubmitButton && (
          <div className="submit-information">
            <ButtonBase
              className="save"
              onClick={() => {
                dispatch(addAvatar(avatar));
                setShowButton({ ...showButton, ShowAvatarSubmitButton: false });
              }}
            >
              Save
            </ButtonBase>
            <ButtonBase
              className="cancel"
              onClick={() => {
                setShowButton({ ...showButton, ShowAvatarSubmitButton: false });
                setSelectedAvatar(auth.user.avatar);
              }}
            >
              Cancel
            </ButtonBase>
          </div>
        )}
{/*-------------------- general Infos ---------------------------*/}
        <div className="general">
          <h1>General Informations</h1>
          <div className="general-container">
            {/* fullName */}
            <ClickAwayListener
              onClickAway={() => {
                setShowButton({ ...showButton, showFullName: false });
                setUpdates({ ...updates, fullName: "" });
                setErr([]);
              }}
            >
              <div className="name info-display">
                <h3 className="item1">Full Name :</h3>
                <div className="name-container item1">
                  <div className="setting">{auth.user.fullName}</div>
                  <div
                    className={
                      showButton.showFullName ? "add-information" : "hidden-info"
                    }
                  >
                    {/* fullNAME */}
                    <input
                      type="text"
                      id="name-label"
                      placeholder="Full name"
                      value={updates.fullName}
                      name="fullName"
                      onChange={(e) =>
                        setUpdates({ ...updates, fullName: e.target.value })
                      }
                    />
                    {err.filter((el) => el.msg === "please check your fullName").length !==
                      0 && (
                      <p className="error_signIn">must contain only letters</p>
                    )}
                    <div className="submit-information">
                      <ButtonBase
                        className="save"
                        onClick={() =>
                          dispatch(
                            nameAction(
                              updates.fullName,
                              setErr,
                              showButton,
                              setShowButton,
                              updates,
                              setUpdates
                            )
                          )
                        }
                      >
                        Save
                      </ButtonBase>
                      <ButtonBase
                        className="cancel"
                        onClick={() => {
                          setShowButton({ ...showButton, showFullName: false });
                          setUpdates({ ...updates, fullName: "" });
                          setErr([]);
                        }}
                      >
                        Cancel
                      </ButtonBase>
                    </div>
                  </div>
                </div>
                <div
                  className="modify"
                  onClick={() =>
                    setShowButton({ ...showButton, showFullName: true })
                  }
                >
                  Modify
                </div>
              </div>
            </ClickAwayListener>

            {/* address */}
            <ClickAwayListener
              onClickAway={() => {
                setShowButton({ ...showButton, showAddress: false });
                setUpdates({ ...updates, address: "" });
                setErr([]);
              }}
            >
              <div className="address info-display">
                <h3 className="item1">Address :</h3>
                <div className="address-container item1">
                  <div className="setting">{auth.user.address}</div>
                  <div
                    className={
                      showButton.showAddress ? "add-information" : "hidden-info"
                    }
                  >
                    <input
                      type="text"
                      id="address-label"
                      placeholder="Address"
                      name="address"
                      value={updates.address}
                      onChange={(e) =>
                        setUpdates({ ...updates, address: e.target.value })
                      }
                    />
                    {err.filter((el) => el.msg === "please check your address").length !==
                      0 && <p className="error_signIn">required field</p>}
                    <div className="submit-information">
                      <ButtonBase
                        className="save"
                        onClick={() =>
                          dispatch(
                            addressAction(
                              updates.address,
                              setErr,
                              showButton,
                              setShowButton,
                              updates,
                              setUpdates
                            )
                          )
                        }
                      >
                        Save
                      </ButtonBase>
                      <ButtonBase
                        className="cancel"
                        onClick={() => {
                          setShowButton({ ...showButton, showAddress: false });
                          setUpdates({ ...updates, address: "" });
                          setErr([]);
                        }}
                      >
                        Cancel
                      </ButtonBase>
                    </div>
                  </div>
                </div>
                <div
                  className="modify"
                  onClick={() =>
                    setShowButton({ ...showButton, showAddress: true })
                  }
                >
                  Modify
                </div>
              </div>
            </ClickAwayListener>

            {/* phone number */}
            <ClickAwayListener
              onClickAway={() => {
                setShowButton({ ...showButton, showPhoneNumber: false });
                setUpdates({ ...updates, phoneNumber: "" });
                setErr([]);
              }}
            >
              <div className="professional-number info-display">
                <h3 className="item1">Phone number :</h3>
                <div className="professional-number-container item1">
                  <div className="setting">{auth.user.phoneNumber}</div>
                  <div
                    className={
                      showButton.showPhoneNumber
                        ? "add-information"
                        : "hidden-info"
                    }
                  >
                    <input
                      type="text"
                      id="professional-number-label"
                      placeholder="Phone number"
                      name="phoneNumber"
                      value={updates.phoneNumber}
                      onChange={(e) =>
                        setUpdates({ ...updates, phoneNumber: e.target.value })
                      }
                    />
                    {err.filter((el) => el.msg === "please check your phoneNumber").length !==
                      0 && (
                      <p className="error_signIn">
                        please enter a valid number
                      </p>
                    )}
                    <div className="submit-information">
                      <ButtonBase
                        className="save"
                        onClick={() =>
                          dispatch(
                            phoneNumberAction(
                              updates.phoneNumber,
                              setErr,
                              showButton,
                              setShowButton,
                              updates,
                              setUpdates
                            )
                          )
                        }
                      >
                        Save
                      </ButtonBase>
                      <ButtonBase
                        className="cancel"
                        onClick={() => {
                          setShowButton({
                            ...showButton,
                            showPhoneNumber: false,
                          });
                          setUpdates({ ...updates, phoneNumber: "" });
                          setErr([]);
                        }}
                      >
                        Cancel
                      </ButtonBase>
                    </div>
                  </div>
                </div>
                <div
                  className="modify"
                  onClick={() =>
                    setShowButton({ ...showButton, showPhoneNumber: true })
                  }
                >
                  Modify
                </div>
              </div>
            </ClickAwayListener>

          </div>
          <p className="error_register">*the fields above are required</p>
        </div>

{/* -------------------social infos--------------------------- */}
        {/* {auth.user.category === "professional" && ( */}
          <div className="social-link">
            <h1>Social Informations</h1>
            <div className="social-link-container">
              {/* facebook */}
              <ClickAwayListener
                onClickAway={() => {
                  setShowButton({ ...showButton, showFacebook: false });
                  setUpdates({ ...updates, facebook: "" });
                  setErr([]);
                }}
              >
                <div className="facebook-information info-display">
                  <h3 className="item1">Facebook link :</h3>
                  <div className="facebook-container item1">
                    <div className="setting">{auth.user.facebook}</div>
                    <div
                      className={
                        showButton.showFacebook ? "add-link" : "hidden-info"
                      }
                    >
                      <input
                        type="text"
                        id="facebook-label"
                        placeholder="Facebook link"
                        name="facebook"
                        value={updates.facebook}
                        onChange={(e) =>
                          setUpdates({ ...updates, facebook: e.target.value })
                        }
                      />
                      {err.filter((el) => el.msg === "Invalid website url")
                        .length !== 0 && (
                        <p className="error_signIn">invalid url</p>
                      )}
                      <div className="submit-information">
                        <ButtonBase
                          className="save"
                          onClick={() =>
                            dispatch(
                              facebookAction(
                                updates.facebook,
                                setErr,
                                showButton,
                                setShowButton,
                                updates,
                                setUpdates
                              )
                            )
                          }
                        >
                          Save
                        </ButtonBase>
                        <ButtonBase
                          className="cancel"
                          onClick={() => {
                            setShowButton({
                              ...showButton,
                              showFacebook: false,
                            });
                            setUpdates({ ...updates, facebook: "" });
                            setErr([]);
                          }}
                        >
                          Cancel
                        </ButtonBase>
                      </div>
                    </div>
                  </div>
                  <div
                    className="modify"
                    onClick={() =>
                      setShowButton({ ...showButton, showFacebook: true })
                    }
                  >
                    Modify
                  </div>
                </div>
              </ClickAwayListener>

              {/* twitter */}
              <ClickAwayListener
                onClickAway={() => {
                  setShowButton({ ...showButton, showTwitter: false });
                  setUpdates({ ...updates, twitter: "" });
                  setErr([]);
                }}
              >
                <div className="twitter-information info-display">
                  <h3 className="item1">Twitter link :</h3>
                  <div className="twitter-container item1">
                    <div className="setting">{auth.user.twitter}</div>
                    <div
                      className={
                        showButton.showTwitter ? "add-link" : "hidden-info"
                      }
                    >
                      <input
                        type="text"
                        id="twitter-label"
                        placeholder="Twitter link"
                        name="twitter"
                        value={updates.twitter}
                        onChange={(e) =>
                          setUpdates({ ...updates, twitter: e.target.value })
                        }
                      />
                      {err.filter((el) => el.msg === "Invalid website url")
                        .length !== 0 && (
                        <p className="error_signIn">invalid url</p>
                      )}
                      <div className="submit-information">
                        <ButtonBase
                          className="save"
                          onClick={() =>
                            dispatch(
                              twitterAction(
                                updates.twitter,
                                setErr,
                                showButton,
                                setShowButton,
                                updates,
                                setUpdates
                              )
                            )
                          }
                        >
                          Save
                        </ButtonBase>
                        <ButtonBase
                          className="cancel"
                          onClick={() => {
                            setShowButton({
                              ...showButton,
                              showTwitter: false,
                            });
                            setUpdates({ ...updates, twitter: "" });
                            setErr([]);
                          }}
                        >
                          Cancel
                        </ButtonBase>
                      </div>
                    </div>
                  </div>
                  <div
                    className="modify"
                    onClick={() =>
                      setShowButton({ ...showButton, showTwitter: true })
                    }
                  >
                    Modify
                  </div>
                </div>
              </ClickAwayListener>

              {/* instagram */}
              <ClickAwayListener
                onClickAway={() => {
                  setShowButton({ ...showButton, showInstagram: false });
                  setUpdates({ ...updates, instagram: "" });
                  setErr([]);
                }}
              >
                <div className="instagram-information info-display">
                  <h3 className="item1">Instagram link :</h3>
                  <div className="instagram-container item1">
                    <div className="setting">{auth.user.instagram}</div>
                    <div
                      className={
                        showButton.showInstagram ? "add-link" : "hidden-info"
                      }
                    >
                      <input
                        type="text"
                        id="instagram-label"
                        placeholder="Instagram link"
                        name="instagram"
                        value={updates.instagram}
                        onChange={(e) =>
                          setUpdates({ ...updates, instagram: e.target.value })
                        }
                      />
                      {err.filter((el) => el.msg === "Invalid website url")
                        .length !== 0 && (
                        <p className="error_signIn">invalid url</p>
                      )}
                      <div className="submit-information">
                        <ButtonBase
                          className="save"
                          onClick={() =>
                            dispatch(
                              instagramAction(
                                updates.instagram,
                                setErr,
                                showButton,
                                setShowButton,
                                updates,
                                setUpdates
                              )
                            )
                          }
                        >
                          Save
                        </ButtonBase>
                        <ButtonBase
                          className="cancel"
                          onClick={() => {
                            setShowButton({
                              ...showButton,
                              showInstagram: false,
                            });
                            setUpdates({ ...updates, instagram: "" });
                            setErr([]);
                          }}
                        >
                          Cancel
                        </ButtonBase>
                      </div>
                    </div>
                  </div>
                  <div
                    className="modify"
                    onClick={() =>
                      setShowButton({ ...showButton, showInstagram: true })
                    }
                  >
                    Modify
                  </div>
                </div>
              </ClickAwayListener>

              {/* youtube */}
              {/* youtube */}
            </div>
          </div>
        {/* )} */}
    {/*-----------------------Security Informations-----------------------  */}
        <div className="security">
          <h1>Security Informations</h1>
          <div className="security-container">
            {/* email update */}
            <ClickAwayListener
              onClickAway={() => {
                setShowButton({ ...showButton, showEmail: false });
                setUpdates({ ...updates, email: "" });
                setErr([]);
              }}
            >
              <div className="login-number info-display">
                <h3 className="item1">email :</h3>
                <div className="login-number-container item1">
                  <div className="setting">{auth.user.email}</div>
                  <div
                    className={
                      showButton.showEmail ? "add-information" : "hidden-info"
                    }
                  >
                    <input
                      type="text"
                      id="login-number-label"
                      placeholder="Login email"
                      name="email"
                      value={updates.email}
                      onChange={(e) =>
                        setUpdates({ ...updates, email: e.target.value })
                      }
                    />
                    {err.filter((el) => el.msg === "please check your email").length !==
                      0 && (
                      <p className="error_signIn">
                        please enter a valid email
                      </p>
                    )}
                    <div className="submit-information">
                      <ButtonBase
                        className="save"
                        onClick={() =>
                          dispatch(
                            emailAction(
                              updates.email,
                              setErr,
                              showButton,
                              setShowButton,
                              updates,
                              setUpdates
                            )
                          )
                        }
                      >
                        Save
                      </ButtonBase>
                      <ButtonBase
                        className="cancel"
                        onClick={() => {
                          setShowButton({ ...showButton, showEmail: false });
                          setUpdates({ ...updates, email: "" });
                          setErr([]);
                        }}
                      >
                        Cancel
                      </ButtonBase>
                    </div>
                  </div>
                </div>
                <div
                  className="modify"
                  onClick={() =>
                    setShowButton({ ...showButton, showEmail: true })
                  }
                >
                  Modify
                </div>
              </div>
            </ClickAwayListener>
            {/* password update */}
            <ClickAwayListener
              onClickAway={() => {
                setShowButton({ ...showButton, showPassword: false });
                setUpdates({
                  ...updates,
                  actualPassword: "",
                  newPassword: "",
                  confirmPassword: "",
                });
                setErr([]);
              }}
            >
              <div className="login-password info-display">
                <h3 className="item1">Change password :</h3>
                <div className="login-password-container item1">
                  <div
                    className={
                      showButton.showPassword
                        ? "add-information"
                        : "hidden-info"
                    }
                  >
                    <input
                      type="password"
                      id="actual-password-label"
                      placeholder="Actual password"
                      name="actualPassword"
                      value={updates.actualPassword}
                      onChange={(e) =>
                        setUpdates({
                          ...updates,
                          actualPassword: e.target.value,
                        })
                      }
                    />
                    {err.filter((el) => el.msg === "Wrong password").length !==
                      0 && <p className="error_signIn">Wrong password</p>}
                    <input
                      type="password"
                      id="new-password-label"
                      placeholder="New password"
                      name="newPassword"
                      value={updates.newPassword}
                      onChange={(e) =>
                        setUpdates({ ...updates, newPassword: e.target.value })
                      }
                    />
                    {err.filter((el) => el.msg === "Password error").length !==
                      0 && (
                      <p className="error_signIn">
                        Password must contain at least 6 characters
                      </p>
                    )}
                    <input
                      type="password"
                      id="confirm-password-label"
                      placeholder="Confirm password"
                      name="confirmPassword"
                      value={updates.confirmPassword}
                      onChange={(e) =>
                        setUpdates({
                          ...updates,
                          confirmPassword: e.target.value,
                        })
                      }
                    />
                    {err.filter((el) => el.msg === "Passwords don't match")
                      .length !== 0 && (
                      <p className="error_signIn">Passwords don't match</p>
                    )}
                    <div className="submit-information">
                      <ButtonBase
                        className="save"
                        onClick={() =>
                          dispatch(
                            passwordAction(
                              updates.actualPassword,
                              updates.newPassword,
                              updates.confirmPassword,
                              setErr,
                              showButton,
                              setShowButton,
                              updates,
                              setUpdates
                            )
                          )
                        }
                      >
                        Save
                      </ButtonBase>
                      <ButtonBase
                        className="cancel"
                        onClick={() => {
                          setShowButton({ ...showButton, showPassword: false });
                          setUpdates({
                            ...updates,
                            actualPassword: "",
                            newPassword: "",
                            confirmPassword: "",
                          });
                          setErr([]);
                        }}
                      >
                        Cancel
                      </ButtonBase>
                    </div>
                  </div>
                </div>
                <div
                  className="modify"
                  onClick={() =>
                    setShowButton({ ...showButton, showPassword: true })
                  }
                >
                  Modify
                </div>
              </div>
            </ClickAwayListener>
          </div>
        </div>
{/* 
        {GalleryReducer.galleryUploaded &&
          auth.user.category === "professional" && (
            <EditGallery
              err={err}
              setErr={setErr}
              img={GalleryReducer.images}
              setShowButton={setShowButton}
              showButton={showButton}
            />
          )} */}

        {/* <Footer /> */}
      </div>
  );
};

export default EditProfile;