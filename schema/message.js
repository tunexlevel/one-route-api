const message = () => {
    return {
        phone_no: {
            exists: {
                errorMessage: 'The phone number is required',
            },
        },
        message: {
            exists: {
                errorMessage: 'The message is required',
            },
        },
        key: {
            exists: {
                errorMessage: 'The api key  is required',
            },
        },
    }
}

export default message;