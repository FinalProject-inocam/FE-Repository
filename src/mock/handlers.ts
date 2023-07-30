import { rest } from 'msw';
import { auth } from './testData';
import * as Type from '../types/auth';


export const handlers = [
  // Login
  rest.post<Type.User>('/api/auth/login',
    async (req, res, ctx) => {
      const request = req.body;
      const find = auth.find(user => user.email === request.email)

      if (find && request.email === find.email && request.password === find.password) {
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
  rest.post<Type.UserInfo>('/api/auth/signup',
    async (req, res, ctx) => {
      const request = req.body;
      auth.push(request)
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
  rest.get<Type.UserInfo>('/api/auth/email',
    async (req, res, ctx) => {
      const checkEmail = req.url.searchParams.get('email')
      const find = auth.find(user => user.email === checkEmail) || null
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
  rest.get<Type.UserInfo>('/api/auth/nickname',
    async (req, res, ctx) => {
      const checkNickName = req.url.searchParams.get('nickname')
      const find = auth.find(user => user.nickname === checkNickName) || null
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
  )

];


/*
  rest 메소드가 핵심이고, 이를 API 가로채서, Morking 
  첫번째 매개변수 API,
  두번째 매개변수 비동기처 함수를 넣는거죠
  req -> 클라이언트에서 받아온거
  res -> 돌려줄때 
         - ctx -> contenxt : status, data(JSON) ->  ctx.status(200) //  ctx.json({}: 타입이 필요하겠죠 )
*/