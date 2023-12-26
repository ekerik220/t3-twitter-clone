import { auth, googleAuth } from "~/server/api/auth/lucia";
import { OAuthRequestError } from "@lucia-auth/oauth";
import { parseCookie } from "lucia/utils";

import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") return res.status(405);
  const cookies = parseCookie(req.headers.cookie ?? "");
  const storedState = cookies.google_oauth_state;
  const state = req.query.state;
  const code = req.query.code;

  if (
    !storedState ||
    !state ||
    storedState !== state ||
    typeof code !== "string"
  ) {
    res.status(400).end();
    return;
  }
  try {
    const { getExistingUser, googleUser, createUser } =
      await googleAuth.validateCallback(code);

    const getUser = async () => {
      const existingUser = await getExistingUser();
      if (existingUser) return existingUser;
      const user = await createUser({
        attributes: {
          username: googleUser.name,
        },
      });
      return user;
    };

    const user = await getUser();
    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    });
    const authRequest = auth.handleRequest({ req, res });
    authRequest.setSession(session);
    return res.status(302).setHeader("Location", "/").end();
  } catch (e) {
    if (e instanceof OAuthRequestError) {
      // invalid code
      res.status(400).end();
      return;
    }
    res.status(500).end();
    return;
  }
};

export default handler;
