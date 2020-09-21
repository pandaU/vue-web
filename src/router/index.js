import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/Login'
import home from '@/components/Home'
import peer from '@/components/PeerList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/peerInfo',
      name: 'peerInfo',
      component: peer
    },
    {
      path: '/channelInfo',
      name: 'channelInfo',
      component: () => import('@/components/ChannelList')
    },
    {
      path: '/blockInfo',
      name: 'blockInfo',
      component: () => import('@/components/BlockList')
    }
  ]
})