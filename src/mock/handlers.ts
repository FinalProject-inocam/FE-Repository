import { rest } from 'msw';
import * as TestDB from './testData';
import * as Type from '../types';


export const handlers = [
  // Login
  rest.post<Type.User>(`${process.env.REACT_APP_SERVER_KEY}/api/auth/login`,
    async (req, res, ctx) => {
      const request = req.body;
      const find = TestDB.logindata.find(user => user.email === request.email)

      if (find && request.password === find.password) {
        return res(
          ctx.status(200),
          ctx.json({
            success: true,
            status: 200,
            msg: '로그인성공',
          }),
          ctx.set(
            'authorization',
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5',
          ),
        );
        // 배열에서 존재하지 않으면...   
      } else if (find && request.password !== find.password) {
        return res(
          ctx.status(401), // 인증되지 않음
          ctx.json({
            error: true,
            status: 401,
            msg: '비밀번호가 틀렸습니다.',
          }),
        );
        // 배열은 있는데 비밀번호가 틀린 경우
      } else {
        return res(
          ctx.status(401), // 인증되지 않음(리소스에 없음) 
          ctx.json({
            error: true,
            status: 401,
            msg: '존재하지 않는 이메일 입니다.',
          }),
        );
      }
    },
  ),

  // Signup
  rest.post<Type.UserInfo>(`${process.env.REACT_APP_SERVER_KEY}/api/auth/signup`,
    async (req, res, ctx) => {
      const request = req.body;
      TestDB.logindata.push(request)
      return res(
        ctx.status(200),
        ctx.json({
          success: true,
          status: 200,
          msg: '회원가입성공',
        }),
      );
    }
  ),

  // Signup-emailCheck
  rest.get<Type.UserInfo>(`${process.env.REACT_APP_SERVER_KEY}/api/auth/email`,
    async (req, res, ctx) => {
      const checkEmail = req.url.searchParams.get('email')
      const find = TestDB.logindata.find(user => user.email === checkEmail) || null
      if (!find) {
        return res(
          ctx.status(200),
          ctx.json({
            success: true,
            status: 200,
            msg: '사용 가능한 이메일 입니다.'
          }),
        );
      } else {
        return res(
          ctx.status(409), // 이미 리소스 상에 존재하면
          ctx.json({
            error: true,
            status: 409,
            msg: '이미 존재하는 이메일 입니다.',
          }),
        );
      }
    }
  ),

  // Signup-NickNameCheck
  rest.get<Type.UserInfo>(`${process.env.REACT_APP_SERVER_KEY}/api/auth/nickname`,
    async (req, res, ctx) => {
      const checkNickName = req.url.searchParams.get('nickname')
      const find = TestDB.logindata.find(user => user.nickname === checkNickName) || null
      if (!find) {
        return res(
          ctx.status(200),
          ctx.json({
            success: true,
            status: 200,
            msg: '사용 가능한 닉네임 입니다.'
          }),
        );
      } else {
        return res(
          ctx.status(409), // 이미 리소스 상에 존재하면
          ctx.json({
            error: true,
            status: 409,
            msg: '이미 존재하는 닉네임 입니다.',
          }),
        );
      }
    }
  ),

  // getPosts - 차량출고 커뮤니티 
  rest.get(`${process.env.REACT_APP_SERVER_KEY}/api/posts`,
    async (_, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          success: true,
          status: 200,
          msg: '게시글이 조회되었습니다.',
          data: TestDB.postdata
        }),
      );
    }
  ),

  // getPosts - 차량출고 커뮤니티 게시글 조회 
  rest.get(`${process.env.REACT_APP_SERVER_KEY}/api/posts/`, // ${postId}
    async (_, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          success: true,
          status: 200,
          msg: '게시글이 조회되었습니다.',
          data: TestDB.postdata
        }),
      );
    }
  ),

  // getPostDeatil - 차량출고 커뮤니티 게시글 조회 
  rest.get(`${process.env.REACT_APP_SERVER_KEY}/api/posts/:id`,
    async (req, res, ctx) => {
      const find = TestDB.postDetailData.find(post => post.post_id === +req.params.id)
      return res(
        ctx.status(200),
        ctx.json({
          success: true,
          status: 200,
          msg: '게시글이 조회되었습니다.',
          data: [find]
        }),
      );
    }
  ),

  // postPosts - 차량출고 커뮤니티 
  rest.post(`${process.env.REACT_APP_SERVER_KEY}/api/posts`,
    async (_, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          success: true,
          status: 200,
          msg: '게시글이 등록이 등록되었습니다.'
        }),
      );
    }
  ),

  // deletePosts - 차량출고 커뮤니티 게시글 삭제
  rest.delete(`${process.env.REACT_APP_SERVER_KEY}/api/posts/:id`,
    async (req, res, ctx) => {
      const findIndex = TestDB.postdata.findIndex((post: Type.PostsData) => post.post_id === +req.params.id)
      TestDB.postdata.splice(findIndex, 1)

      return res(
        ctx.status(200),
        ctx.json({
          success: true,
          status: 200,
          msg: '게시글이 삭제되었습니다.'
        }),
      );
    }
  ),

// patchPosts - 차량출고 커뮤니티 게시글 수정
rest.patch(`${process.env.REACT_APP_SERVER_KEY}/api/posts/:id`,
async (req, res, ctx) => {
  console.log("patchPosts", req);
  return res(
    ctx.status(200),
    ctx.json({
      success: true,
      status: 200,
      msg: '게시글이 수정되었습니다.'
    }),
  );
}
),

];


/*
  rest 메소드가 핵심이고, 이를 API 가로채서, Morking 
  첫번째 매개변수 API,
  두번째 매개변수 비동기처 함수를 넣는거죠
  req -> 클라이언트에서 받아온거
  res -> 돌려줄때 
         - ctx -> contenxt : status, data(JSON) ->  ctx.status(200) //  ctx.json({}: 타입이 필요하겠죠 )
*/