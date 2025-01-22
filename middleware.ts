import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("authToken")?.value; // Cek token autentikasi dari cookie

    // Jika user belum login, arahkan ke login
    if (!token && req.nextUrl.pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

// Tentukan route yang akan menggunakan middleware
export const config = {
    matcher: ["/dashboard/:path*"],
};
