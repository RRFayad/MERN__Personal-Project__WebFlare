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

import classes from './Auth.module.css';

function Auth() {
  const history = useHistory();
  const { loginHandler, signUpHandler } = useContext(AuthContext);

  const [userHasAccount, setUserHasAccount] = useState(true);

  const loginInputs = ['email', 'password'];
  const signUpInputs = ['name', 'country', 'email', 'password', 'description'];

  const toggleUserHasAccount = () => {
    setUserHasAccount((prevState) => !prevState);
  };

  const [formIsValid, inputValidationChangeHandler, setFormData] =
    useFormValidation();

  useEffect(() => {
    userHasAccount ? setFormData(loginInputs) : setFormData(signUpInputs);
  }, [userHasAccount]);

  return (
    <>
      <Navbar />
      <main className={classes.content}>
        <Form>
          <div className={classes.form__inputs}>
            {!userHasAccount && (
              <FormInput
                labelValue="Full Name"
                HTMLElement="input"
                type="text"
                name="name"
                validation={fullNameValidator}
                onValidationChange={inputValidationChangeHandler}
                errorMessage="Please insert your Full Name"
              />
            )}
            {!userHasAccount && (
              <FormInput
                labelValue="Image URL"
                HTMLElement="input"
                type="url"
                name="image"
                validation={urlValidator}
                onValidationChange={inputValidationChangeHandler}
                errorMessage="Please a valid url"
              />
            )}
            {!userHasAccount && (
              <FormInput
                labelValue="Linkedin Account"
                HTMLElement="input"
                type="url"
                name="linkedinUrl"
                validation={urlValidator}
                onValidationChange={inputValidationChangeHandler}
                errorMessage="Please insert your linkedin account URL"
              />
            )}
            {!userHasAccount && (
              <FormInput
                labelValue="Country"
                HTMLElement="input"
                type="text"
                name="country"
                validation={minLengthValidator}
                onValidationChange={inputValidationChangeHandler}
                errorMessage="Please insert a valid country"
              />
            )}
            <FormInput
              labelValue="E-mail"
              HTMLElement="input"
              type="email"
              name="email"
              validation={emailValidator}
              onValidationChange={inputValidationChangeHandler}
              errorMessage="Please insert a valid e-mail"
            />
            <FormInput
              labelValue="Password"
              HTMLElement="input"
              type="password"
              name="password"
              validation={passwordValidator}
              onValidationChange={inputValidationChangeHandler}
              errorMessage="Password must contain at least: 6 to 20 characters, Uppercase, Lowercase, Number and a Special Character "
            />
            {!userHasAccount && (
              <FormInput
                labelValue="Your personal and professional description"
                HTMLElement="textarea"
                type="text"
                name="description"
                validation={(value) => minLengthValidator(value, 6)}
                onValidationChange={inputValidationChangeHandler}
                errorMessage="Description must contain at least 6 characters"
              />
            )}
          </div>
          <div className={classes.form__buttons}>
            {userHasAccount && (
              <FormButton
                disabled={!formIsValid}
                onClick={() => {
                  loginHandler();
                  history.goBack();
                }}
              >
                Login
              </FormButton>
            )}
            {!userHasAccount && (
              <FormButton
                disabled={!formIsValid}
                onClick={() => {
                  signUpHandler();
                  history.goBack();
                }}
              >
                Sign Up
              </FormButton>
            )}
          </div>
          <button
            className={classes['form__buttons--toggle-login-state']}
            type="button"
            onClick={toggleUserHasAccount}
          >
            {userHasAccount
              ? "Don't have an account? Click here!"
              : 'Got an account already? Click here!'}
          </button>
        </Form>
      </main>
      <Footer />
    </>
  );
}

export default Auth;
