/* eslint-disable @typescript-eslint/consistent-type-imports */

/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import("./src/server/api/auth/lucia.js").Auth;
  type DatabaseUserAttributes = {
    username: string;
  };
  // type DatabaseSessionAttributes = {};
}
