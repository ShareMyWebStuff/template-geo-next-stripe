import Landing from "@/components/landing/landing";
import { getServerSession } from "@/lib/get-server-session";
import { redirect } from "next/navigation";


const HomePage = async () => {

  const session = await getServerSession();
  const user = session?.user;
  
  if (user) redirect('/dashboard');

  return ( 
    <Landing />
   );
}
 
export default HomePage;