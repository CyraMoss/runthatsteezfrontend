import { NextRequest, NextResponse } from "next/server";
import {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../../../services/userService";

export async function GET() {
  try {
    const users = await getAllUsers();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to get users", error },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await createUser(await req.json());
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create user", error },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 },
      );
    }
    const user = await updateUser(id, await req.json());
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update user", error },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 },
      );
    }
    const success = await deleteUser(id);
    if (!success) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete user", error },
      { status: 500 },
    );
  }
}
