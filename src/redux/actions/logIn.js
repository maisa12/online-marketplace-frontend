export const logIn = (status, name) => {
    return {
        type: 'LOGIN',
        payload: {
            status: status,
            name: name
        }
    }
}