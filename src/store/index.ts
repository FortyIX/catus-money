import {createStore} from 'vuex'

export default createStore({
    state:{
        user_token : "f"
    },

    mutations : {
        setUserToken(state,newValue){
            state.user_token = newValue;
        }
    },
    actions:{
        set_UserToken(context,value){
            context.commit('setUserToken',value)
        }
    }
})