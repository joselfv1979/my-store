export const validateUser = ({ username, email, password }) => {

    let response = {
        valid: false,
        message: ''
    };

    if (username.length < 3) {
        response.message = 'username must contain 3 characters at least';
        return response;
    }

    const pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

    if (!pattern.test(email)) {
        response.message = "Please enter valid email address.";
        return response;
    }

    if (password.length < 4) {
        response.message = 'password must contain 4 characters at least';
        return response;
    }
    
    response.valid = true;
    return response;
}
