import request from '@/util/request'

/**
 *
 * @param {String} type  评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
 * @param {*} source id
 * @param {num} offset 表示从此id的数据向后取，不传表示从第一页开始读取数据
 * @param {num} limit 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
 * @returns
 */

//获取评论或评论回复
export const commentsAPI = (type, source, offset, limit) =>
  request({
    url: '/v1_0/comments',
    params: { type, source, offset, limit }
  })
// 对评论或评论回复点赞
export const commentLikeAPI = (target) =>
  request({
    url: '/v1_0/comment/likings', //要取消点赞的评论id或评论回复id
    method: 'POST',
    data: { target }
  })
// 取消对评论或评论回复点赞
export const canCommentLikeAPI = (target) =>
  request({
    url: '/v1_0/comment/likings/' + target, //要取消点赞的评论id或评论回复id
    method: 'DELETE'
  })
// 对文章或者评论进行评论
/**
 *
 * @param {String} target 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
 * @param {String} content 评论内容
 * @param {String} artid 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
 * @returns
 */
export const addCommentsAPI = (target, content, artid) =>
  request({
    url: '/v1_0/comments',
    method: 'POST',
    data: { target, content, art_id: artid }
  })
