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
