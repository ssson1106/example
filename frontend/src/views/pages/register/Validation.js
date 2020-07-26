import { 
    NAME_MIN_LENGTH, NAME_MAX_LENGTH, 
    USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH,
    EMAIL_MAX_LENGTH,
    PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH
  } from '../../../constants';
  
export function validateName(name) {
    if (name.length < NAME_MIN_LENGTH) {
        return {
            validatestatus: 'error',
            errorMsg: `Name is too short (Minimum ${NAME_MIN_LENGTH} characters needed.)`,
        };
    } else if (name.length > NAME_MAX_LENGTH) {
        return {
            validatestatus: 'error',
            errorMsg: `Name is too long (Maximum ${NAME_MAX_LENGTH} characters allowed.)`,
        };
    } else {
        return {
            validatestatus: 'success',
            errorMsg: null,
        };
    }
}

export const validateEmail = (email) => {
    if (!email) {
        return {
            validatestatus: 'error',
            errorMsg: 'Email may not be empty',
        };
    }

    const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
    if (!EMAIL_REGEX.test(email)) {
        return {
            validatestatus: 'error',
            errorMsg: 'Email not valid',
        };
    }

    if (email.length > EMAIL_MAX_LENGTH) {
        return {
            validatestatus: 'error',
            errorMsg: `Email is too long (Maximum ${EMAIL_MAX_LENGTH} characters allowed)`,
        };
    }

    return {
        validatestatus: null,
        errorMsg: null,
    };
};

export const validateUsername = (username) => {
    if (username.length < USERNAME_MIN_LENGTH) {
        return {
            validatestatus: 'error',
            errorMsg: `Username is too short (Minimum ${USERNAME_MIN_LENGTH} characters needed.)`,
        };
    } else if (username.length > USERNAME_MAX_LENGTH) {
        return {
            validatestatus: 'error',
            errorMsg: `Username is too long (Maximum ${USERNAME_MAX_LENGTH} characters allowed.)`,
        };
    } else {
        return {
            validatestatus: null,
            errorMsg: null,
        };
    }
};

export const validatePassword = (password) => {
    if (password.length < PASSWORD_MIN_LENGTH) {
        return {
            validatestatus: 'error',
            errorMsg: `Password is too short (Minimum ${PASSWORD_MIN_LENGTH} characters needed.)`,
        };
    } else if (password.length > PASSWORD_MAX_LENGTH) {
        return {
            validatestatus: 'error',
            errorMsg: `Password is too long (Maximum ${PASSWORD_MAX_LENGTH} characters allowed.)`,
        };
    } else {
        return {
            validatestatus: 'success',
            errorMsg: null,
        };
    }
};
