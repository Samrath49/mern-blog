const initialState = {
    name: 'Sam'
}

const globalReducer = (state = initialState, action) => {
    if(action.type === 'UPDATE_NAME') {
        return {
            ...state,
            name: 'Sam'
        }
    }
    return state;
}

export default globalReducer;