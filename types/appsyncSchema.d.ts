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
  favoriteFlag: true
  bookmarkFlag: true
  postText: string
  updateDate: string
  pictures: any
  tags:string[]
  comments: Comment[]
}
