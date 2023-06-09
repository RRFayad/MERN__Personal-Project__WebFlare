import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext from '../../shared/context/AuthContext';
import Navbar from '../../shared/navigation/Navbar';
import Footer from '../../shared/navigation/Footer';
import Form from '../../shared/ui-ux/Form';
import FormInput from '../../shared/ui-ux/FormInput';
import FormButton from '../../shared/ui-ux/FormButton';
import useFormValidation from '../../shared/custom-hooks/useFormValidation';
import {
  minLengthValidator,
  fullNameValidator,
  urlValidator,
  emailValidator,
  passwordValidator,
} from '../../shared/util/validators-and-formatters';

import classes from './EditProfile.module.css';

function EditProfile() {
  const history = useHistory();
  const { userData, updateProfileHandler } = useContext(AuthContext);

  const profileInputs = ['name', 'country', 'email', 'description'];
  const passwordInputs = ['password', 'new-password'];

  const [formIsValid, inputValidationChangeHandler, setFormData] =
    useFormValidation();
  const [passwordIsBeingChanged, setPasswordIsBeingChanged] = useState(false);

  useEffect(() => {
    passwordIsBeingChanged
      ? setFormData(passwordInputs)
      : setFormData(profileInputs);
  }, [passwordIsBeingChanged]);

  return (
    <>
      <Navbar />
      <main className={classes.content}>
        <Form>
          <div className={classes.form__inputs}>
            {!passwordIsBeingChanged && (
              <>
                <FormInput
                  labelValue="Full Name"
                  HTMLElement="input"
                  type="text"
                  name="name"
                  validation={fullNameValidator}
                  onValidationChange={inputValidationChangeHandler}
                  errorMessage="Please insert your Full Name"
                  defaultValue={userData.name}
                />
                <FormInput
                  labelValue="Image URL"
                  HTMLElement="input"
                  type="url"
                  name="image"
                  validation={urlValidator}
                  onValidationChange={inputValidationChangeHandler}
                  errorMessage="Please a valid url"
                  defaultValue={userData.imageUrl}
                />
                <FormInput
                  labelValue="Linkedin Account"
                  HTMLElement="input"
                  type="url"
                  name="linkedinUrl"
                  validation={urlValidator}
                  onValidationChange={inputValidationChangeHandler}
                  errorMessage="Please insert your linkedin account URL"
                  defaultValue={userData.linkedinUrl}
                />

                <FormInput
                  labelValue="Country"
                  HTMLElement="input"
                  type="text"
                  name="country"
                  validation={minLengthValidator}
                  onValidationChange={inputValidationChangeHandler}
                  errorMessage="Please insert a valid country"
                  defaultValue={userData.country}
                />

                <FormInput
                  labelValue="E-mail"
                  HTMLElement="input"
                  type="email"
                  name="email"
                  validation={emailValidator}
                  onValidationChange={inputValidationChangeHandler}
                  errorMessage="Please insert a valid e-mail"
                  defaultValue={userData.email}
                />
                <FormInput
                  labelValue="Your personal and professional description"
                  HTMLElement="textarea"
                  type="text"
                  name="description"
                  validation={(value) => minLengthValidator(value, 6)}
                  onValidationChange={inputValidationChangeHandler}
                  errorMessage="Description must contain at least 6 characters"
                  defaultValue={userData.description}
                />
              </>
            )}
            {passwordIsBeingChanged && (
              <>
                <FormInput
                  labelValue="Current Password"
                  HTMLElement="input"
                  type="password"
                  name="password"
                  validation={passwordValidator}
                  onValidationChange={inputValidationChangeHandler}
                  errorMessage="Password must contain at least: 6 to 20 characters, Uppercase, Lowercase, Number and a Special Character "
                />
                <FormInput
                  labelValue="New Password"
                  HTMLElement="input"
                  type="password"
                  name="new-password"
                  validation={passwordValidator}
                  onValidationChange={inputValidationChangeHandler}
                  errorMessage="Password must contain at least: 6 to 20 characters, Uppercase, Lowercase, Number and a Special Character "
                />
              </>
            )}
          </div>
          <div className={classes.form__buttons}>
            <FormButton
              disabled={!formIsValid}
              onClick={() => {
                updateProfileHandler();
                history.goBack();
              }}
            >
              Update Profile
            </FormButton>
          </div>
          <button
            className={classes['form__buttons--toggle-login-state']}
            type="button"
            onClick={() => setPasswordIsBeingChanged((state) => !state)}
          >
            {!passwordIsBeingChanged
              ? 'CLICK HERE TO UPDATE YOUR PASSWORD'
              : 'CLICK HERE TO UPDATE YOUR PERSONAL INFO'}
          </button>
        </Form>
      </main>
      <Footer />
    </>
  );
}

export default EditProfile;
