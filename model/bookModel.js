import {Http} from '../utils/http.js'

class BookModel extends Http {
  

  getBook() {
    let params = {
      url: '/book/hot_list'
    }
    let pro = this.newHttp(params)
    
    return pro
  }
}

export {BookModel}