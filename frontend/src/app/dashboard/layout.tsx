import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

export default function DashboardLayout({
children,
}:{
children:React.ReactNode
}){

return(

<div className="flex">

<Sidebar/>

<div className="flex-1 bg-slate-100 min-h-screen">

<Navbar/>

<div className="p-8">

{children}

</div>

</div>

</div>

)

}