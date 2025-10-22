import { NextResponse } from "next/server";

console.log("API route file loaded");

export async function POST(request: Request) {
  console.log("API route POST handler called");
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }

    // Debug log to verify environment variable
    console.log("Expected password:", process.env.NEXT_PUBLIC_APP_PASSWORD);
    console.log("Received password:", password);

    // Check if the password matches the environment variable
    if (password !== process.env.NEXT_PUBLIC_APP_PASSWORD) {
      console.log("Invalid password attempt");
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // Create the response
    const response = NextResponse.json({ success: true });

    // Set the cookie in the response
    response.cookies.set("many_paths_auth", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60, // 1 hour in seconds
      path: "/",
    });

    console.log("Cookie set in response");
    return response;
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
