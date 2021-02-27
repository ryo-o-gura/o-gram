export declare interface Comment {
            userName: string,
            userId: number,
            commentText: string,
            updateDate: string,
}
export declare interface Post {
  userName: string
  // TODO:userIcon
  userId: number
  postId: number
  favoriteCount: number
  favoriteFlag: boolean
  bookmarkFlag: boolean
  postText: string
  updateDate: string
  pictures: any
  tags: string[]
  comments: Comment[]
}
