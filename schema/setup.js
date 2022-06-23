const setup = () => {
    return {
        phone_no: {
            exists: {
                errorMessage: 'The phone number is required',
            },
        },
        key: {
            exists: {
                errorMessage: 'The api key  is required',
            },
        },
    }
}

const setupDelete = () => {
    return {
        phone_no: {
            exists: {
                errorMessage: 'The phone number is required',
            },
        },
    }
}

const setupGet = () => {
    return {
        phone_no: {
            exists: {
                errorMessage: 'The phone number is required',
            },
        },
    }
}

export { setup, setupDelete, setupGet };