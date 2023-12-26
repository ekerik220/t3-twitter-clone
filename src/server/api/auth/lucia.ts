/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { lucia } from "lucia";
import { env } from "~/env";
import { planetscale } from "@lucia-auth/adapter-mysql";
import { google } from "@lucia-auth/oauth/providers";
import { connection } from "~/server/db";
import { getBaseUrl } from "~/utils/api";
import { nextjs_future } from "lucia/middleware";

export const auth = lucia({
  env: env.NODE_ENV === "production" ? "PROD" : "DEV",
  adapter: planetscale(connection, {
    user: "t3-twitter-clone_user",
    key: "t3-twitter-clone_user_key",
    session: "t3-twitter-clone_user_session",
  }),
  middleware: nextjs_future(),
  getUserAttributes: (data) => {
    return {
      username: data.username,
    };
  },
});

export const googleAuth = google(auth, {
  clientId: env.GOOGLE_AUTH_CLIENT_ID,
  clientSecret: env.GOOGLE_AUTH_CLIENT_SECRET,
  redirectUri: `${getBaseUrl()}${env.GOOGLE_AUTH_REDIRECT_PATH}`,
});

export type Auth = typeof auth;
