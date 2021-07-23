import { observable, action, makeAutoObservable, runInAction } from "mobx"
import ApiManager from '../services/ApiManager'
const apiManager = new ApiManager()


class DriverStore {
    constructor() {
        this.showComment = false
        this.comment = ""
        this.selectedOrderId=""
        this.socket = apiManager.socket
        makeAutoObservable(this, {
            showComment: observable,
            selectedOrderId:observable,
            comment: observable,
           handleComment:action,
           selectOrderId:action
        })
    }

    closeOrder = async (driverId) => {
        const res = await apiManager.closeOrder(this.selectedOrderId, driverId, this.comment)
        if (res.error) {
            alert(res.status)
        }
    }
    setShowComment = value => this.showComment = value
    handleComment = ({target})=>this.comment = target.value
    selectOrderId = (id)=>this.selectedOrderId = id



}
export default DriverStore