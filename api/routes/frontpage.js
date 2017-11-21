exports.get = async function(ctx, next) {
  ctx.render("test");
  // if (ctx.isAuthenticated()) {
  //   ctx.body = ctx.render('chat');
  // } else {
  //   ctx.body = ctx.render('login');
  // }

};
