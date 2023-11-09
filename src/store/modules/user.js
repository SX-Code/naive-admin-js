import { storage } from '@/utils/Storage';
import { defineStore } from 'pinia';
import { store } from '@/store';
import { ACCESS_TOKEN, CURRENT_USER } from '../mutation-types';

export const useUserStore = defineStore({
  id: 'app-user',
  state: () => ({
    token: storage.get(ACCESS_TOKEN, ''),
    username: '',
    welcome: '',
    avatar: '',
    permissions: [],
    info: storage.get(CURRENT_USER, {}),
  }),
  getters: {
    getToken() {
      return this.token;
    },
    getAvatar() {
      return this.avatar;
    },
    getNickname() {
      return this.username;
    },
    getPermissions() {
      return this.permissions;
    },
    getUserInfo() {
      return this.info;
    },
  },
  actions: {
    setToken(token) {
      this.token = token;
    },
    setAvatar(avatar) {
      this.avatar = avatar;
    },
    setPermissions(permissions) {
      this.permissions = permissions;
    },
    setUserInfo(info) {
      this.info = info;
    },
    // 登录
    async login(userInfo) {
      try {
        return Promise.resolve(userInfo);
      } catch (e) {
        return Promise.reject(e);
      }
    },

    // 获取用户信息
    GetInfo() {
      const that = this;
      return {}
    },

    // 登出
    async logout() {
      this.setPermissions([]);
      this.setUserInfo('');
      storage.remove(ACCESS_TOKEN);
      storage.remove(CURRENT_USER);
      return Promise.resolve('');
    },
  },
});

// Need to be used outside the setup
export function useUserStoreWidthOut() {
  return useUserStore(store);
}