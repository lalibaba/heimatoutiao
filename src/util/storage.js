//封装getItem，让其直接得到原数据，并可以得到非JSON
//封装setItem函数
//封装removeItem函数
//JSON.parse只能封装JSON字符串
class Storage {
  get(key) {
    const value = localStorage.getItem(key)
    try {
      return JSON.parse(value)
    } catch {
      return value
    }
  }

  set(key, value) {
    if (typeof value === 'object' && value !== null) {
      value = JSON.stringify(value)
    }
    localStorage.setItem(key, value)
  }

  remove(key) {
    localStorage.removeItem(key)
  }
}

export default new Storage()
