"use server"

import { redirect } from "next/navigation";
import { auth } from "~/server/auth"
import type { ReactNode } from "react";
import { db } from "~/server/db";
import NavHeader from "~/components/nav-header";

export default async function DashboardLayout({
    children,
}: { 
    children: ReactNode 
}) {
    const session = await auth();

    if (!session?.user?.id) {
        redirect("/login");
    }

    const user = await db.user.findUniqueOrThrow({
        where: { id: session.user.id },
        select: {credits: true, email: true},
    });

    return (<div className="flex min-h-screen flex-col">
        <NavHeader credits={user.credits} email={user.email} />
        <main className="Container mx-auto flex-1 py-6">{children}</main>
        </div>
    );
}