export function authMiddleware(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  next();
}
export default authMiddleware;