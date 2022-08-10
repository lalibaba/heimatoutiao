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
//点赞文章
export const likingsAPI = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/article/likings',
    data: {
      target
    }
  })
}
//取消点赞文章
export const canLikingsAPI = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/likings/${target}`
  })
}
//不喜欢文章
export const dislikesAPI = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/article/dislikes',
    data: {
      target
    }
  })
}
//取消不喜欢文章
export const canDislikesAPI = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/dislikes/${target}`
  })
}
//收藏文章
export const collectionsAPI = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: {
      target
    }
  })
}
//取消收藏文章
export const canCollectionsAPI = (target) => {
  return request({
    method: 'DELETE',
    url: '/v1_0/article/collections/' + target
  })
}
