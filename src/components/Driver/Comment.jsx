import React from 'react'
import { inject, observer } from 'mobx-react'

const Comment = inject('inputsStore', 'driverStore', 'authenticationStore')(observer(({ inputsStore, driverStore, authenticationStore }) => {
    const { handleComment, comment, setShowComment, selectOrderId, closeOrder } = driverStore
    const { user, signInById } = authenticationStore

    const closeComment = function () {
        setShowComment(false)
        const target = { value: '' }
        handleComment({ target })
        selectOrderId('')
    }
    const orderDone = async function () {
        setShowComment(false)
        const res = await closeOrder(user._id)
        closeComment()
        signInById()
    }


    return (
        <div className="commentContainer">
            <div className="closeBtn white" onClick={closeComment}>X</div>
            <textarea placeholder="Write a comment" className="commentInput" type="text" onChange={handleComment} value={comment} />
            <div onClick={orderDone} className="deliveredBtn">Done</div>

        </div>
    )
}))

export default Comment
