import { ElMessage } from 'element-plus'

// 公共方法 utils/auth.js
const key = "userInfo";
export const saveAuthData = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('存储数据失败:', error);
      return false;
    }
  };
  
  export const getAuthData = (key) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('读取数据失败:', error);
      return null;
    }
  };
  
  export const clearAuthData = (key) => {
    localStorage.removeItem(key);
  };

export const saveUser = (userName, userPwd) => {
    try {
       
        var users = localStorage.getItem(key);
        if (!Boolean(users)) {
            //localStorage.setItem(key, JSON.stringify([]));
            users = [];
        } else {
            users = JSON.parse(users);
        }

        users.push({ "name": userName, 'pwd': userPwd });

        localStorage.setItem(key, JSON.stringify(users));

    } catch (error) {
        ElMessage({
            showClose: true,
            message: '保存用户失败',
            type: 'error',
          })

    }

}

export const verifyUser = (userName, userPwd) => {
    try {
        var users = localStorage.getItem(key);
        if (!Boolean(users)) {
            return false;
        } 

        var flag = false;
        users = JSON.parse(users);
        for(var idx in users){
            var item = users[idx];
            if(item.name == userName && item.pwd == userPwd){
                return true;
            }
        }

        return flag;
    } catch (error) {
        return false
    }

}

// 保存用户登录信息
// 内存登录，使用sessionStorage 
export const storeLoginFlag = () => {
  //console.log("storeLoginFlag................");
  //sessionStorage.setItem("loginFlag", '1');
  this.$store.commit('updateLoginInfo', info);
  
}

export const storeLoinInfo = () => {

}



