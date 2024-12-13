import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
 
// get by id
export async function GET(request, { params }) {
    const id = parseInt(params.id);
    try {
        const users = await prisma.user.findUnique({
        where: {
            id: id,
        },
        })
        return NextResponse.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.error("Internal Server Error", 500);
    }
}
 
// edit
export async function PUT(request, { params }) {
    try {
        const data = await request.json();
        console.log(data);
        const { name, email } = data
        const id = parseInt(params.id);
 
        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                name,
                email
            }
        });
        return NextResponse.json(updatedUser);
    } catch (error) {
        console.log("Error updating user:", error)
        return NextResponse.error("Internal Server Error", 500)
    }
}
 
// delete
export async function DELETE(request, { params }) {
    try {
        const id = parseInt(params.id);
        const deleteUser = await prisma.user.delete({
            where: { id }
        });
        return NextResponse.json(deleteUser);
    } catch (error) {
        console.error("error deleting user:", error);
        return NextResponse.error("Internal server Error", 500);
    }
}