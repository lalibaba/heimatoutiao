import request from '@/util/request'
import storage from '@/util/storage'

export const getMyChannel = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
export const getAllChannel = () => {
  return request({
    url: '/v1_0/channels'
  })
}

//删除用户指定频道
export const delChannel = (target) => {
  return request({
    url: '/v1_0/user/channels/' + target,
    method: 'DELETE'
  })
}
/**
 *
 * @param {*} id 频道id
 * @param {*} seq 添加频道的索引值
 * @returns Promise
 */
//添加用户指定频道
export const addChannel = (id, seq) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
      channels: [{ id, seq }]
    }
  })
}

//未登录用户的mychannel 存储
const HEIMA_TOUTIAO_MYHCANNEL = 'HEIMA_TOUTIAO_MYHCANNEL'
export const setMyChannelToLocal = (mychannel) => {
  return storage.set(HEIMA_TOUTIAO_MYHCANNEL, mychannel)
}
export const getMyChannelByLocal = () => {
  return storage.get(HEIMA_TOUTIAO_MYHCANNEL)
}
