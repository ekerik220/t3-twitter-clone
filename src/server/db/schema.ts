import { bigint, mysqlTableCreator, varchar } from "drizzle-orm/mysql-core";

export const mysqlTable = mysqlTableCreator(
  (name) => `t3-twitter-clone_${name}`,
);

export const users = mysqlTable("user", {
  id: varchar("id", {
    length: 15,
  }).primaryKey(),
  username: varchar("username", { length: 255 }).notNull(),
});

export const userKeys = mysqlTable("user_key", {
  id: varchar("id", {
    length: 255,
  }).primaryKey(),
  userId: varchar("user_id", {
    length: 15,
  }).notNull(),
  hashedPassword: varchar("hashed_password", {
    length: 255,
  }),
});

export const userSessions = mysqlTable("user_session", {
  id: varchar("id", {
    length: 128,
  }).primaryKey(),
  userId: varchar("user_id", {
    length: 15,
  }).notNull(),
  activeExpires: bigint("active_expires", {
    mode: "number",
  }).notNull(),
  idleExpires: bigint("idle_expires", {
    mode: "number",
  }).notNull(),
});
