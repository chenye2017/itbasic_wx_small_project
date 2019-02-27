import { Http } from '../utils/http.js'

class InfoModel extends Http
{
  bookDetail(id) 
  {
      let params = {
        url: '/book/'+id+'/detail'
      }
      let pro = this.newHttp(params)
      return pro
  }
}

export {InfoModel}