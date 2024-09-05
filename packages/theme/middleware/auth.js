export default ({ app, route, redirect }) => {
  if (route.path !== '/Login') {
    // we are on a protected route
    if (!app.$fire.auth.currentUser) {
      // take them to sign in page
      return redirect('/Login');
    }
  } else if (route.path === '/Login') {
    if (!app.$fire.auth.currentUser) {
      // leave them on the sign in page
    } else {
      return redirect('/');
    }
  }
};
