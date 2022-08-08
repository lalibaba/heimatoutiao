import request from '@/util/request'
//获取文章新闻推荐
export const getArticleAPI = (channelID, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: channelID,
      timestamp
    }
  })
}
//获取新闻详情
export const getarticlesInfoAPI = (id) => {
  return request({
    url: '/v1_0/articles/' + id
  })
}
