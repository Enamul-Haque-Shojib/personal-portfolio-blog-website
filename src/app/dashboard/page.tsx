import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-lg p-6 shadow-lg rounded-lg bg-white">
        <CardHeader className="text-center">
          <Avatar className="w-20 h-20 mx-auto">
            <AvatarImage src={session?.user?.image || "/default-avatar.png"} alt="User Avatar" />
            <AvatarFallback>{session?.user?.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <CardTitle className="mt-4 text-2xl font-semibold text-gray-800">
            Welcome to Dashboard, {session?.user?.name || "Guest"}!
          </CardTitle>
        </CardHeader>
        
        <CardContent className="text-center space-y-3">
          <p className="text-gray-600">{session?.user?.email || "No email available"}</p>

        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
