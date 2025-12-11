"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, Users, Mail, Calendar } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface User {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    createdAt: string;
    updatedAt: string;
}

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
    });

    useEffect(() => {
        fetchUsers();
    }, [pagination.page]);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `/api/admin/users?page=${pagination.page}&limit=${pagination.limit}`
            );
            if (response.ok) {
                const data = await response.json();
                setUsers(data.users);
                setPagination((prev) => ({ ...prev, ...data.pagination }));
            }
        } catch (error) {
            console.error("Error fetching users:", error);
            toast.error("Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-4xl font-bold flex items-center gap-3">
                    <Users className="h-10 w-10 text-primary" />
                    Users Management
                </h1>
                <p className="text-muted-foreground mt-2">
                    View and manage all registered users
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Users ({pagination.total})</CardTitle>
                    <CardDescription>Browse registered user accounts</CardDescription>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="rounded-md border">
                            <table className="w-full">
                                <thead className="bg-muted/50">
                                    <tr className="border-b">
                                        <th className="p-4 text-left">
                                            <div className="h-4 w-24 bg-muted-foreground/20 animate-pulse rounded" />
                                        </th>
                                        <th className="p-4 text-left">
                                            <div className="h-4 w-32 bg-muted-foreground/20 animate-pulse rounded" />
                                        </th>
                                        <th className="p-4 text-left">
                                            <div className="h-4 w-20 bg-muted-foreground/20 animate-pulse rounded" />
                                        </th>
                                        <th className="p-4 text-left">
                                            <div className="h-4 w-24 bg-muted-foreground/20 animate-pulse rounded" />
                                        </th>
                                        <th className="p-4 text-right">
                                            <div className="h-4 w-16 bg-muted-foreground/20 animate-pulse rounded ml-auto" />
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                                        <tr key={i} className="border-b">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 bg-muted animate-pulse rounded-full" />
                                                    <div className="space-y-2">
                                                        <div className="h-4 w-32 bg-muted animate-pulse rounded" />
                                                        <div className="h-3 w-24 bg-muted animate-pulse rounded" />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="h-4 w-48 bg-muted animate-pulse rounded" />
                                            </td>
                                            <td className="p-4">
                                                <div className="h-6 w-16 bg-muted animate-pulse rounded-full" />
                                            </td>
                                            <td className="p-4">
                                                <div className="h-3 w-32 bg-muted animate-pulse rounded" />
                                            </td>
                                            <td className="p-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <div className="h-8 w-8 bg-muted animate-pulse rounded" />
                                                    <div className="h-8 w-8 bg-muted animate-pulse rounded" />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : users.length === 0 ? (
                        <div className="text-center py-12">
                            <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold mb-2">No users found</h3>
                            <p className="text-muted-foreground">
                                No registered users in the database
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="rounded-md border overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Joined</TableHead>
                                            <TableHead>Last Updated</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {users.map((user) => (
                                            <TableRow key={user.id}>
                                                <TableCell className="font-medium">
                                                    {user.name}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                                        {user.email}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <span
                                                        className={`px-2 py-1 rounded-full text-xs font-medium ${user.emailVerified
                                                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                                            }`}
                                                    >
                                                        {user.emailVerified ? "Verified" : "Unverified"}
                                                    </span>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                        <Calendar className="h-4 w-4" />
                                                        {new Date(user.createdAt).toLocaleDateString()}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-sm text-muted-foreground">
                                                    {new Date(user.updatedAt).toLocaleDateString()}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* Pagination */}
                            <div className="flex items-center justify-between mt-4">
                                <div className="text-sm text-muted-foreground">
                                    Page {pagination.page} of {pagination.totalPages}
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        onClick={() =>
                                            setPagination((prev) => ({
                                                ...prev,
                                                page: Math.max(1, prev.page - 1),
                                            }))
                                        }
                                        disabled={pagination.page === 1}
                                    >
                                        Previous
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() =>
                                            setPagination((prev) => ({
                                                ...prev,
                                                page: Math.min(prev.totalPages, prev.page + 1),
                                            }))
                                        }
                                        disabled={pagination.page === pagination.totalPages}
                                    >
                                        Next
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
