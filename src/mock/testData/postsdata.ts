import * as Type from "../../types/post";

//전체조회
export const postdata: Type.PostsData[] = [
  {
    post_id: 1,
    title: "타이틀1",
    content: "내용1",
    is_like: true,
    like_count: 0,
    comment_count: 0,
  },
  {
    post_id: 2,
    title: "타이틀2",
    content: "내용2",
    is_like: false,
    like_count: 0,
    comment_count: 0,
  }, {
    post_id: 3,
    title: "타이틀3",
    content: "내용3",
    is_like: true,
    like_count: 3,
    comment_count: 3,
  },
  {
    post_id: 4,
    title: "타이틀4",
    content: "내용4",
    is_like: false,
    like_count: 4,
    comment_count: 4,
  },
  {
    post_id: 5,
    title: "타이틀5",
    content: "내용5",
    is_like: true,
    like_count: 0,
    comment_count: 0,
  }, {
    post_id: 6,
    title: "타이틀6",
    content: "내용6",
    is_like: false,
    like_count: 0,
    comment_count: 0,
  }, {
    post_id: 7,
    title: "타이틀7",
    content: "내용7",
    is_like: true,
    like_count: 0,
    comment_count: 0,
  }, {
    post_id: 8,
    title: "타이틀8",
    content: "내용8",
    is_like: false,
    like_count: 0,
    comment_count: 0,
  },
]

//상세조회
export const postDetailData: Type.PostsDetailData[] = [
  {
    post_id: 1,
    title: "타이틀1",  
    content: "내용1", 
    is_like: true, 
    like_count: 0,  
    image_urls: ["https://hips.hearstapps.com/hmg-prod/images/2024-bmw-i7-m70-119-643d69e564b2a.jpg?crop=0.558xw:0.627xh;0.325xw,0.325xh&resize=640:*"],
    comment: [
      {
        comment_id: 1,
        nickname: "댓글닉네임1",
        comment: "댓글내용1",
        created_at: "2023-07 - 31",
        modified_at: "2023-07 - 31",
      },
      {
        comment_id: 2,
        nickname: "댓글닉네임2",
        comment: "댓글내용2",
        created_at: "2023-07 - 31",
        modified_at: "2023-07 - 31",
      }
    ]
  },
  {
    post_id: 1,
    title: "타이틀1",  
    content: "내용1", 
    is_like: true, 
    like_count: 0,  
    image_urls: ["https://hips.hearstapps.com/hmg-prod/images/2024-bmw-i7-m70-119-643d69e564b2a.jpg?crop=0.558xw:0.627xh;0.325xw,0.325xh&resize=640:*"],
    comment: [
      {
        comment_id: 1,
        nickname: "댓글닉네임1",
        comment: "댓글내용1",
        created_at: "2023-07 - 31",
        modified_at: "2023-07 - 31",
      },
      {
        comment_id: 2,
        nickname: "댓글닉네임2",
        comment: "댓글내용2",
        created_at: "2023-07 - 31",
        modified_at: "2023-07 - 31",
      }
    ]
  },
  {
    post_id: 1,
    title: "타이틀1",  
    content: "내용1", 
    is_like: true, 
    like_count: 0,  
    image_urls: ["https://hips.hearstapps.com/hmg-prod/images/2024-bmw-i7-m70-119-643d69e564b2a.jpg?crop=0.558xw:0.627xh;0.325xw,0.325xh&resize=640:*"],
    comment: [
      {
        comment_id: 1,
        nickname: "댓글닉네임1",
        comment: "댓글내용1",
        created_at: "2023-07 - 31",
        modified_at: "2023-07 - 31",
      },
      {
        comment_id: 2,
        nickname: "댓글닉네임2",
        comment: "댓글내용2",
        created_at: "2023-07 - 31",
        modified_at: "2023-07 - 31",
      }
    ]
  },
  {
    post_id: 2,
    title: "타이틀2",  
    content: "내용2", 
    is_like: true, 
    like_count: 0,  
    image_urls: ["https://hips.hearstapps.com/hmg-prod/images/2024-bmw-i7-m70-119-643d69e564b2a.jpg?crop=0.558xw:0.627xh;0.325xw,0.325xh&resize=640:*"],
    comment: [
      {
        comment_id: 1,
        nickname: "댓글닉네임1",
        comment: "댓글내용1",
        created_at: "2023-07 - 31",
        modified_at: "2023-07 - 31",
      },
      {
        comment_id: 2,
        nickname: "댓글닉네임2",
        comment: "댓글내용2",
        created_at: "2023-07 - 31",
        modified_at: "2023-07 - 31",
      }
    ]
  },
  {
    post_id: 3,
    title: "타이틀3",  
    content: "내용3", 
    is_like: true, 
    like_count: 0,  
    image_urls: ["https://hips.hearstapps.com/hmg-prod/images/2024-bmw-i7-m70-119-643d69e564b2a.jpg?crop=0.558xw:0.627xh;0.325xw,0.325xh&resize=640:*"],
    comment: [
      {
        comment_id: 1,
        nickname: "댓글닉네임1",
        comment: "댓글내용1",
        created_at: "2023-07 - 31",
        modified_at: "2023-07 - 31",
      },
      {
        comment_id: 2,
        nickname: "댓글닉네임2",
        comment: "댓글내용2",
        created_at: "2023-07 - 31",
        modified_at: "2023-07 - 31",
      }
    ]
  },
  {
    post_id: 4,
    title: "타이틀4",  
    content: "내용4", 
    is_like: true, 
    like_count: 0,  
    image_urls: ["https://hips.hearstapps.com/hmg-prod/images/2024-bmw-i7-m70-119-643d69e564b2a.jpg?crop=0.558xw:0.627xh;0.325xw,0.325xh&resize=640:*"],
    comment: [
      {
        comment_id: 1,
        nickname: "댓글닉네임1",
        comment: "댓글내용1",
        created_at: "2023-07 - 31",
        modified_at: "2023-07 - 31",
      },
      {
        comment_id: 2,
        nickname: "댓글닉네임2",
        comment: "댓글내용2",
        created_at: "2023-07 - 31",
        modified_at: "2023-07 - 31",
      }
    ]
  },
  {
    post_id: 5,
    title: "타이틀5",  
    content: "내용5", 
    is_like: true, 
    like_count: 0,  
    image_urls: ["https://hips.hearstapps.com/hmg-prod/images/2024-bmw-i7-m70-119-643d69e564b2a.jpg?crop=0.558xw:0.627xh;0.325xw,0.325xh&resize=640:*"],
    comment: [
      {
        comment_id: 1,
        nickname: "댓글닉네임1",
        comment: "댓글내용1",
        created_at: "2023-07 - 31",
        modified_at: "2023-07 - 31",
      },
      {
        comment_id: 2,
        nickname: "댓글닉네임2",
        comment: "댓글내용2",
        created_at: "2023-07 - 31",
        modified_at: "2023-07 - 31",
      }
    ]
  },
  {
    post_id: 6,
    title: "타이틀6",  
    content: "내용6", 
    is_like: true, 
    like_count: 0,  
    image_urls: ["https://hips.hearstapps.com/hmg-prod/images/2024-bmw-i7-m70-119-643d69e564b2a.jpg?crop=0.558xw:0.627xh;0.325xw,0.325xh&resize=640:*"],
    comment: [
      {
        comment_id: 1,
        nickname: "댓글닉네임1",
        comment: "댓글내용1",
        created_at: "2023-07 - 31",
        modified_at: "2023-07 - 31",
      },
      {
        comment_id: 2,
        nickname: "댓글닉네임2",
        comment: "댓글내용2",
        created_at: "2023-07 - 31",
        modified_at: "2023-07 - 31",
      }
    ]
  },
  {
    post_id: 7,
    title: "타이틀7",  
    content: "내용7", 
    is_like: true, 
    like_count: 0,  
    image_urls: ["https://hips.hearstapps.com/hmg-prod/images/2024-bmw-i7-m70-119-643d69e564b2a.jpg?crop=0.558xw:0.627xh;0.325xw,0.325xh&resize=640:*"],
    comment: [
      {
        comment_id: 1,
        nickname: "댓글닉네임1",
        comment: "댓글내용1",
        created_at: "2023-07 - 31",
        modified_at: "2023-07 - 31",
      },
      {
        comment_id: 2,
        nickname: "댓글닉네임2",
        comment: "댓글내용2",
        created_at: "2023-07 - 31",
        modified_at: "2023-07 - 31",
      }
    ]
  },
  {
    post_id: 8,
    title: "타이틀8",  
    content: "내용8", 
    is_like: true, 
    like_count: 0,  
    image_urls: ["https://hips.hearstapps.com/hmg-prod/images/2024-bmw-i7-m70-119-643d69e564b2a.jpg?crop=0.558xw:0.627xh;0.325xw,0.325xh&resize=640:*"],
    comment: [
      {
        comment_id: 1,
        nickname: "댓글닉네임1",
        comment: "댓글내용1",
        created_at: "2023-07 - 31",
        modified_at: "2023-07 - 31",
      },
      {
        comment_id: 2,
        nickname: "댓글닉네임2",
        comment: "댓글내용2",
        created_at: "2023-07 - 31",
        modified_at: "2023-07 - 31",
      }
    ]
  }
]







// post_id: long,
// title: string,  //
// content: string, //
// is_like: boolean,
// like_count: long,  //
// image_urls: [string …….]  // https://hips.hearstapps.com/hmg-prod/images/2024-bmw-i7-m70-119-643d69e564b2a.jpg?crop=0.558xw:0.627xh;0.325xw,0.325xh&resize=640:*
// comment: [
//   {
//   comment_id: long,
//   nickname: string,
//   comment: string,
//   created_at: date,
//   modified_at: date,
//   }
// ……]
// }