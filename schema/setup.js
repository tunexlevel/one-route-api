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




export default setup ;