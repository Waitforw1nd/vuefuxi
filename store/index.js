import {createStore} from 'vuex';

const store = createStore({
    state: {
        // 1表示 已登录
        loginFlag: -1,

        // 登录的用户名
        userName: ''

    },

    mutations:{
        // 登录成功后，修改标识
        updateLoginFlag(state){
            state.loginFlag = 1;
        },

        // 退出登录，修改标识
        updateLogoutFlag(state){
            state.loginFlag = 0;
        },

        // 登录成功后，更新用户名
        updateLoginUserName(state, userName){
            state.userName = userName;
        },

        // 更新登录标识和用户信息
        updateLoginInfo(state, info){
            state.loginFlag = info.flag;
            state.userName = info.userName;
        }


    },

    actions:{},

    actions: {},

    modules: {}
});

export default store;