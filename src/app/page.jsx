import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation";
import  Link  from "next/link";
import Socket from "@/components/Socket";


export default async function Home() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect("/register")
  }
  

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
      <h1 className="text-4xl font-bold">Welcome to the home page</h1>
      <h2 className="flex justify-center m-10">Hi {session?.user.name} </h2>
      <h2 className="m-10">online players:</h2>

      </div>
      <Socket />
      <Link href="/add-word">Add word</Link>
      
      
        
     
    </main>
  );
}
