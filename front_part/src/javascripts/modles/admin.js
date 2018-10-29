

const signup = (data) => {
    return $.ajax({
        url: '/api/v1/admin/signup',
        type: 'POST',
        data,
        success: (results) => {
            return results;
        }
    })
}

const signin = (data) => {
    return $.ajax({
        url: '/api/v1/admin/signin',
        type: 'POST',
        data,
        success: (results) => {
            return results
        }
    })
}
export default {
    signup,
    signin
}