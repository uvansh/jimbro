import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher(['/welcome'])

export default clerkMiddleware(async (auth, request) => {
  
  // If the user is not authenticated and trying to access a protected route
  const authObject = await auth(); // Get the user's authentication status
  if (isPublicRoute(request)) {
    if (authObject.userId){
      const homeUrl = new URL('/',request.url).toString();
      return Response.redirect(homeUrl);
    }
    return;
  }

  // If the user is authenticated and trying to access the welcome page
  if (!authObject.userId) {
    const welcomeUrl = new URL('/welcome', request.url).toString();
    await auth.protect({
      unauthenticatedUrl: welcomeUrl,
    });
  }

});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}