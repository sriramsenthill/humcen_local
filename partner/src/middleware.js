export { default } from "next-auth/middleware";

export const config = {
  // matcher: ["/"],
  matcher: ["/((?!authentication\\/sign-in|authentication\\/sign-up|images).*)"],
};