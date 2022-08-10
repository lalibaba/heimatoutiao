import request from '@/util/request'

/**
 *
 * @param {String} mobile
 * @param {String} code
 * @returns Promise
 */
export const login = (mobile, code) =>
  request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: { mobile, code }
  })
export const getCodeAPI = (mobile) =>
  request({
    url: `/v1_0/sms/codes/${mobile}`
  })
//获取用户资料
export const getUserInfoAPI = () =>
  request({
    url: '/v1_0/user/profile'
  })
// 上传图片请求
export const uploadAvator = (file) => {
  const fm = new FormData() //上传的是表单数据
  fm.append('photo', file)
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: fm
  })
}

//修改用户资料
export const editUserInfoAPI = (data) =>
  request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data
  })
//关注用户
export const followingsAPI = (target) =>
  request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target
    }
  })
//取消关注用户
export const canFollowingsAPI = (target) =>
  request({
    url: '/v1_0/user/followings/' + target,
    method: 'DELETE'
  })
