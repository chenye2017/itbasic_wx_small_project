import { Http } from '../utils/http.js'

class LeaveModel extends Http {
  getMyLeave(page, status, token) {
    let params = {
      url: '/out/getMyLeave?page='+page+'&status='+status+'&token='+token,
    }
      let pro = this.newHttp(params)
    return pro
  }

  getAllLeave(data) {
    let params = {
      url: '/out/getAllLeave',
      data: data
    }
    let pro = this.newHttp(params)
    return pro
  }

  getWaitMeLeave(data) {
    let params = {
      url: '/out/getWaitMeLeave',
      data: data
    }
    let pro = this.newHttp(params)
    return pro
  }

  getOrgListForLeave(data) {
    let params = {
      url: '/out/getOrgListForLeave',
      data: data
    }
    let pro = this.newHttp(params)
    return pro
  }

  addLeave(data) {
    let params = {
      url: '/out/addLeave',
      data: data
    }
    let pro = this.newHttp(params)
    return pro
  }
}

export { LeaveModel }