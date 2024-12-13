import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
 
// create
export async function POST(request) {
    try {
        const data = await request.json();
        console.log(data);
        const { name, email } = data
 
        const newUser = await prisma.user.create({
            data: {
                name,
                email
            }
        });
        return NextResponse.json(newUser);
    } catch (error) {
        console.log("Error creating user:", error)
        return NextResponse.error("Internal Server Error", 500)
    }
}
 
// get all
export async function GET() {
    try {
        const users = await prisma.user.findMany();
        return NextResponse.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.error("Internal Server Error", 500);
    }
}