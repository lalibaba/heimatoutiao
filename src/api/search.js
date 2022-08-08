import request from '@/util/request'

export const getSearchSuggestionsAPI = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}
//获取搜索结果
export const getSearchResultAPI = (q, page, perPa) => {
  return request({
    url: '/v1_0/search',
    params: { q, page, per_pa: perPa }
    // { page,per_pa,q, }
  })
}
