import CommentAction from '@/components/CommentAction'
import { findComment, resetCommentData } from '@/redux/slice/commentSlice'
import { Empty, Space } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CommentDetail from './CommentDetail'

const Comment = ({ userId, targetId }) => {
  const dispatch = useDispatch()
  const { comments, loading, successDetail } = useSelector((state) => state.comments)
  const [commentList, setCommentList] = useState([])
  useEffect(() => {
    if (targetId) {
      dispatch(
        findComment({
          filterQuery: {
            targetId,
            parentId: null,
          },
        }),
      )
    }
  }, [targetId, successDetail])

  useEffect(() => {
    if (comments.length > 0) {
      setCommentList(comments)
      dispatch(resetCommentData())
    }
  }, [comments])

  return (
    <Space direction='vertical' className='d-flex'>
      <h4>Bình luận</h4>
      <Space direction='vertical' className='d-flex'>
        <CommentAction type='create' userId={userId} targetId={targetId} />
        {commentList.length > 0 ? (
          commentList.map((comment) => <CommentDetail key={comment._id} data={comment} />)
        ) : (
          <Empty description='Không có bình luận nào' style={{ margin: 50 }}></Empty>
        )}
      </Space>
    </Space>
  )
}

export default Comment
