import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const { pathname,searchParams } = request.nextUrl
  if(searchParams.get('member')==process.env.NEXT_PUBLIC_uid){
    return NextResponse.next()
  }else{
    return NextResponse.redirect(new URL('/signin', request.url))
  }
}
 

export const config = {
  matcher: '/admin'
}