import { rest } from "msw";
import { Login } from "./mock";

const auth: Login = {
  email: "test@test.com",
  password: "test"
}

export const handlers = [
  rest.post<Login>("http://localhose:3000/api/auth/login", async (req, res, ctx) => {
    const request = req.body
    if (request.email === auth.email && request.password === auth.password) {
      return res(
        ctx.status(200),
        ctx.json({
          success: true,
          info: "로그인성공",
          error: null
        }),
        ctx.set("authorization", `Bearer qewrqewrqewrqewaaasdfa.12341234.as1324324`)
      )
    } else if (request.email !== auth.email) {
      return res(
        ctx.status(400),
        ctx.json({
          success: false,
          info: "존재하지 않는 이메일 입니다. "
        })
      )
    } else {
      return res(
        ctx.status(400),
        ctx.json({
          success: false,
          info: "비밀번호가 틀렸습니다."
        })
      )
    }
  }
  )
]