import * as Type from "../../types/post";

//전체조회
export const postdata: Type.PostsData[] = [
  {
    postId: 1,
    title: "타이틀1",
    content: "내용1",
    isLike: true,
    likeCount: 0,
    commentCount: 0,
  },
  {
    postId: 2,
    title: "타이틀2",
    content: "내용2",
    isLike: false,
    likeCount: 0,
    commentCount: 0,
  }, {
    postId: 3,
    title: "타이틀3",
    content: "내용3",
    isLike: true,
    likeCount: 3,
    commentCount: 3,
  },
  {
    postId: 4,
    title: "타이틀4",
    content: "내용4",
    isLike: false,
    likeCount: 4,
    commentCount: 4,
  },
  {
    postId: 5,
    title: "타이틀5",
    content: "내용5",
    isLike: true,
    likeCount: 0,
    commentCount: 0,
  }, {
    postId: 6,
    title: "타이틀6",
    content: "내용6",
    isLike: false,
    likeCount: 0,
    commentCount: 0,
  }, {
    postId: 7,
    title: "타이틀7",
    content: "내용7",
    isLike: true,
    likeCount: 0,
    commentCount: 0,
  }, {
    postId: 8,
    title: "타이틀8",
    content: "내용8",
    isLike: false,
    likeCount: 0,
    commentCount: 0,
  },
]

//상세조회
export const postDetailData: Type.PostsDetailData[] = [
  {
    postId: 1,
    title: "타이틀1",  
    content: "내용1", 
    isLike: true, 
    likeCount: 0,  
    imageUrls: ["https://hips.hearstapps.com/hmg-prod/images/2024-bmw-i7-m70-119-643d69e564b2a.jpg?crop=0.558xw:0.627xh;0.325xw,0.325xh&resize=640:*"],
    commentsList: [
      {
        commentId: 1,
        nickname: "댓글닉네임1",
        comment: "댓글내용1",
        createdAt: "2023-07 - 31",
        modifiedAt: "2023-07 - 31",
      },
      {
        commentId: 2,
        nickname: "댓글닉네임2",
        comment: "댓글내용2",
        createdAt: "2023-07 - 31",
        modifiedAt: "2023-07 - 31",
      }
    ]
  },
  {
    postId: 2,
    title: "타이틀2",  
    content: "내용2", 
    isLike: true, 
    likeCount: 0,  
    imageUrls: ["https://hips.hearstapps.com/hmg-prod/images/2024-bmw-i7-m70-119-643d69e564b2a.jpg?crop=0.558xw:0.627xh;0.325xw,0.325xh&resize=640:*"],
    commentsList: [
      {
        commentId: 1,
        nickname: "댓글닉네임1",
        comment: "댓글내용1",
        createdAt: "2023-07 - 31",
        modifiedAt: "2023-07 - 31",
      },
      {
        commentId: 2,
        nickname: "댓글닉네임2",
        comment: "댓글내용2",
        createdAt: "2023-07 - 31",
        modifiedAt: "2023-07 - 31",
      }
    ]
  },
  {
    postId: 3,
    title: "타이틀3",  
    content: "내용3", 
    isLike: true, 
    likeCount: 0,  
    imageUrls: ["https://hips.hearstapps.com/hmg-prod/images/2024-bmw-i7-m70-119-643d69e564b2a.jpg?crop=0.558xw:0.627xh;0.325xw,0.325xh&resize=640:*"],
    commentsList: [
      {
        commentId: 1,
        nickname: "댓글닉네임1",
        comment: "댓글내용1",
        createdAt: "2023-07 - 31",
        modifiedAt: "2023-07 - 31",
      },
      {
        commentId: 2,
        nickname: "댓글닉네임2",
        comment: "댓글내용2",
        createdAt: "2023-07 - 31",
        modifiedAt: "2023-07 - 31",
      }
    ]
  },
  {
    postId: 4,
    title: "타이틀4",  
    content: "내용4", 
    isLike: true, 
    likeCount: 0,  
    imageUrls: ["https://hips.hearstapps.com/hmg-prod/images/2024-bmw-i7-m70-119-643d69e564b2a.jpg?crop=0.558xw:0.627xh;0.325xw,0.325xh&resize=640:*"],
    commentsList: [
      {
        commentId: 1,
        nickname: "댓글닉네임1",
        comment: "댓글내용1",
        createdAt: "2023-07 - 31",
        modifiedAt: "2023-07 - 31",
      },
      {
        commentId: 2,
        nickname: "댓글닉네임2",
        comment: "댓글내용2",
        createdAt: "2023-07 - 31",
        modifiedAt: "2023-07 - 31",
      }
    ]
  },
  {
    postId: 5,
    title: "타이틀5",  
    content: "내용5", 
    isLike: true, 
    likeCount: 0,  
    imageUrls: ["https://hips.hearstapps.com/hmg-prod/images/2024-bmw-i7-m70-119-643d69e564b2a.jpg?crop=0.558xw:0.627xh;0.325xw,0.325xh&resize=640:*"],
    commentsList: [
      {
        commentId: 1,
        nickname: "댓글닉네임1",
        comment: "댓글내용1",
        createdAt: "2023-07 - 31",
        modifiedAt: "2023-07 - 31",
      },
      {
        commentId: 2,
        nickname: "댓글닉네임2",
        comment: "댓글내용2",
        createdAt: "2023-07 - 31",
        modifiedAt: "2023-07 - 31",
      }
    ]
  },
  {
    postId: 6,
    title: "타이틀6",  
    content: "내용6", 
    isLike: true, 
    likeCount: 0,  
    imageUrls: ["https://hips.hearstapps.com/hmg-prod/images/2024-bmw-i7-m70-119-643d69e564b2a.jpg?crop=0.558xw:0.627xh;0.325xw,0.325xh&resize=640:*"],
    commentsList: [
      {
        commentId: 1,
        nickname: "댓글닉네임1",
        comment: "댓글내용1",
        createdAt: "2023-07 - 31",
        modifiedAt: "2023-07 - 31",
      },
      {
        commentId: 2,
        nickname: "댓글닉네임2",
        comment: "댓글내용2",
        createdAt: "2023-07 - 31",
        modifiedAt: "2023-07 - 31",
      }
    ]
  },
  {
    postId: 7,
    title: "타이틀7",  
    content: "내용7", 
    isLike: true, 
    likeCount: 0,  
    imageUrls: ["https://hips.hearstapps.com/hmg-prod/images/2024-bmw-i7-m70-119-643d69e564b2a.jpg?crop=0.558xw:0.627xh;0.325xw,0.325xh&resize=640:*"],
    commentsList: [
      {
        commentId: 1,
        nickname: "댓글닉네임1",
        comment: "댓글내용1",
        createdAt: "2023-07 - 31",
        modifiedAt: "2023-07 - 31",
      },
      {
        commentId: 2,
        nickname: "댓글닉네임2",
        comment: "댓글내용2",
        createdAt: "2023-07 - 31",
        modifiedAt: "2023-07 - 31",
      }
    ]
  },
  {
    postId: 8,
    title: "타이틀8",  
    content: "내용8", 
    isLike: true, 
    likeCount: 0,  
    imageUrls: ["https://hips.hearstapps.com/hmg-prod/images/2024-bmw-i7-m70-119-643d69e564b2a.jpg?crop=0.558xw:0.627xh;0.325xw,0.325xh&resize=640:*"],
    commentsList: [
      {
        commentId: 1,
        nickname: "댓글닉네임1",
        comment: "댓글내용1",
        createdAt: "2023-07 - 31",
        modifiedAt: "2023-07 - 31",
      },
      {
        commentId: 2,
        nickname: "댓글닉네임2",
        comment: "댓글내용2",
        createdAt: "2023-07 - 31",
        modifiedAt: "2023-07 - 31",
      }
    ]
  }
]