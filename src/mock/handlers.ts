import { rest } from "msw";
import * as TestDB from "./testData";
import * as Type from "../types";

export const handlers = [
  // Login
  rest.post<Type.User>(
    `${process.env.REACT_APP_SERVER_KEY}/api/auth/login`,
    async (req, res, ctx) => {
      const request = req.body;
      const find = TestDB.logindata.find(
        (user) => user.email === request.email
      );

      if (find && request.password === find.password) {
        return res(
          ctx.status(200),
          ctx.json({
            success: true,
            status: 200,
            msg: "로그인성공",
          }),
          ctx.set(
            "authorization",
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5"
          )
        );
        // 배열에서 존재하지 않으면...
      } else if (find && request.password !== find.password) {
        return res(
          ctx.status(401), // 인증되지 않음
          ctx.json({
            error: true,
            status: 401,
            msg: "비밀번호가 틀렸습니다.",
          })
        );
        // 배열은 있는데 비밀번호가 틀린 경우
      } else {
        return res(
          ctx.status(401), // 인증되지 않음(리소스에 없음)
          ctx.json({
            error: true,
            status: 401,
            msg: "존재하지 않는 이메일 입니다.",
          })
        );
      }
    }
  ),

  // SNS-Login
  rest.get(
    `${process.env.REACT_APP_SERVER_KEY}/api/auth/kakao`,
    async (_, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          success: true,
          status: 200,
          msg: "소셜로그인 성공",
        })
      );
    }
  ),

  // Signup
  rest.post<Type.UserInfo>(
    `${process.env.REACT_APP_SERVER_KEY}/api/auth/signup`,
    async (req, res, ctx) => {
      const request = req.body;
      TestDB.logindata.push(request);
      return res(
        ctx.status(200),
        ctx.json({
          success: true,
          status: 200,
          msg: "회원가입성공",
        })
      );
    }
  ),

  // Signup-emailCheck
  rest.get<Type.UserInfo>(
    `${process.env.REACT_APP_SERVER_KEY}/api/auth/email`,
    async (req, res, ctx) => {
      const checkEmail = req.url.searchParams.get("email");
      const find =
        TestDB.logindata.find((user) => user.email === checkEmail) || null;
      if (!find) {
        return res(
          ctx.status(200),
          ctx.json({
            success: true,
            status: 200,
            msg: "사용 가능한 이메일 입니다.",
          })
        );
      } else {
        return res(
          ctx.status(409), // 이미 리소스 상에 존재하면
          ctx.json({
            error: true,
            status: 409,
            msg: "이미 존재하는 이메일 입니다.",
          })
        );
      }
    }
  ),

  // Signup-NickNameCheck
  rest.get<Type.UserInfo>(
    `${process.env.REACT_APP_SERVER_KEY}/api/auth/nickname`,
    async (req, res, ctx) => {
      const checkNickName = req.url.searchParams.get("nickname");
      const find =
        TestDB.logindata.find((user) => user.nickname === checkNickName) ||
        null;
      if (!find) {
        return res(
          ctx.status(200),
          ctx.json({
            success: true,
            status: 200,
            msg: "사용 가능한 닉네임 입니다.",
          })
        );
      } else {
        return res(
          ctx.status(409), // 이미 리소스 상에 존재하면
          ctx.json({
            error: true,
            status: 409,
            msg: "이미 존재하는 닉네임 입니다.",
          })
        );
      }
    }
  ),

  // getPosts - 차량출고 커뮤니티
  rest.get(
    `${process.env.REACT_APP_SERVER_KEY}/api/posts`,
    async (_, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          success: true,
          status: 200,
          msg: "게시글이 조회되었습니다.",
          data: TestDB.postdata,
        })
      );
    }
  ),

  // getPosts - 차량출고 커뮤니티 게시글 조회
  rest.get(
    `${process.env.REACT_APP_SERVER_KEY}/api/posts/`, // ${postId}
    async (_, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          success: true,
          status: 200,
          msg: "게시글이 조회되었습니다.",
          data: TestDB.postdata,
        })
      );
    }
  ),

  // getPostDeatil - 차량출고 커뮤니티 게시글 조회
  rest.get(
    `${process.env.REACT_APP_SERVER_KEY}/api/posts/:id`,
    async (req, res, ctx) => {
      const find = TestDB.postDetailData.find(
        (post) => post.postId === +req.params.id
      );
      return res(
        ctx.status(200),
        ctx.json({
          success: true,
          status: 200,
          msg: "게시글이 조회되었습니다.",
          data: [find],
        })
      );
    }
  ),

  // postPosts - 차량출고 커뮤니티
  rest.post(
    `${process.env.REACT_APP_SERVER_KEY}/api/posts`,
    async (_, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          success: true,
          status: 200,
          msg: "게시글이 등록이 등록되었습니다.",
        })
      );
    }
  ),

  // deletePosts - 차량출고 커뮤니티 게시글 삭제
  rest.delete(
    `${process.env.REACT_APP_SERVER_KEY}/api/posts/:id`,
    async (req, res, ctx) => {
      const findIndex = TestDB.postdata.findIndex(
        (post: Type.PostsData) => post.postId === +req.params.id
      );
      TestDB.postdata.splice(findIndex, 1);

      return res(
        ctx.status(200),
        ctx.json({
          success: true,
          status: 200,
          msg: "게시글이 삭제되었습니다.",
        })
      );
    }
  ),

  // patchPosts - 차량출고 커뮤니티 게시글 수정
  rest.patch(
    `${process.env.REACT_APP_SERVER_KEY}/api/posts/:id`,
    async (_, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          success: true,
          status: 200,
          msg: "게시글이 수정되었습니다.",
        })
      );
    }
  ),

  // postPostsComment - 차량출고 커뮤니티 게시글 댓글작성
  rest.post(
    `${process.env.REACT_APP_SERVER_KEY}/api/posts/:id/comments`,
    async (req, res, ctx) => {
      const { comment } = req.body as any;
      const newComment = {
        commentId: Date.now(),
        nickname: "테스트",
        comment,
        createdAt: "2023-08-01",
        modifiedAt: "2023-08-01",
      };
      const find = TestDB.postDetailData.find(
        (post) => post.postId === +req.params.id
      );
      find?.commentsList.push(newComment);

      return res(
        ctx.status(200),
        ctx.json({
          success: true,
          status: 200,
          msg: "댓글이 입력 되었습니다.",
        })
      );
    }
  ),

  // deletePostsComment - 차량출고 커뮤니티 게시글 댓글삭제
  rest.delete(
    `${process.env.REACT_APP_SERVER_KEY}/api/posts/:postid/comments/:commentid`,
    async (req, res, ctx) => {
      const { postid, commentid } = req.params;
      const find = TestDB.postDetailData.find(
        (post) => post.postId === +postid
      );
      const findIndex: any = find?.commentsList.findIndex(
        (comment) => comment.commentId === +commentid
      );
      find?.commentsList.splice(findIndex, 1);

      return res(
        ctx.status(200),
        ctx.json({
          success: true,
          status: 200,
          msg: "댓글이 삭제 되었습니다.",
        })
      );
    }
  ),

  // postPostsComment - 차량출고 커뮤니티 게시글 댓글수정
  rest.patch(
    `${process.env.REACT_APP_SERVER_KEY}/api/posts/:postid/comments/:commentid`,
    async (req, res, ctx) => {
      const { comment } = req.body as any;
      const { postid, commentid } = req.params;
      const find = TestDB.postDetailData.find(
        (post) => post.postId === +postid
      );
      const findcomment = find?.commentsList.find(
        (comment) => comment.commentId === +commentid
      );
      const findIndex: any = find?.commentsList.findIndex(
        (comment) => comment.commentId === +commentid
      );
      findcomment &&
        find?.commentsList.splice(findIndex, 1, { ...findcomment, comment });

      return res(
        ctx.status(200),
        ctx.json({
          success: true,
          status: 200,
          msg: "댓글이 수정 되었습니다.",
        })
      );
    }
  ),

  // postInoCarOrder - 차량출고 신청
  rest.post(
    `${process.env.REACT_APP_SERVER_KEY}/api/purchases`,
    async (req, res, ctx) => {
      console.log(req.body);

      return res(
        ctx.status(200),
        ctx.json({
          success: true,
          status: 200,
          msg: "차량출고 신청이 완료되었습니다.",
        })
      );
    }
  ),

  // getInoCarOrder - 차량출고 신청 정보 조회
  rest.get(
    `${process.env.REACT_APP_SERVER_KEY}/api/purchases`,
    async (_, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          success: true,
          status: 200,
          msg: "신청 차량 정보 조회 성공",
          data: TestDB.postCarOderData,
        })
      );
    }
  ),

  // deleteInoCarOrder = 차량출고 신청 삭제
  rest.delete(
    `${process.env.REACT_APP_SERVER_KEY}/api/purchases/:purchaseId`,
    async (req, res, ctx) => {
      const findindex = TestDB.postCarOderData.findIndex(
        (data) => data.purchaseId === +req.params.purchaseId
      );
      TestDB.postCarOderData.splice(findindex, 1);
      return res(
        ctx.status(200),
        ctx.json({
          success: true,
          status: 200,
          msg: "차량 신청이 취소되었습니다",
        })
      );
    }
  ),

  //  patchInoCarOrder = 차량출고 신청 수정
  rest.patch(
    `${process.env.REACT_APP_SERVER_KEY}/api/purchases/:purchaseId`,
    async (_, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          success: true,
          status: 200,
          msg: "차량 신청 정보가 수정되었습니다",
        })
      );
    }
  ),

  //  getPurchasesChar = 차량 통계 데이터
  rest.get(
    `${process.env.REACT_APP_SERVER_KEY}/api/stat/purchases/chart`,
    async (req, res, ctx) => {
      const term = req.url.search.split("&")[1].split("=")[1];
      return res(
        ctx.status(200),
        ctx.json({
          success: true,
          status: 200,
          msg: "연간 차량 신청 통계 조회 완료",
          data:
            term === "getYears"
              ? TestDB.purchasesChartYearData
              : term === "getMonth"
              ? TestDB.purchasesChartMonthData
              : TestDB.purchasesChartWeekData,
        })
      );
    }
  ),
];
