import request from '@/util/request'

export const getArticleAPI = (channelID, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: channelID,
      timestamp
    }
  })
}
