
export function NavBar({username})
{
    
    return <div className="w-screen shadow-sm p-3 flex justify-between">
        <h1 className="text-2xl font-bold">Payment App</h1>
        <div className="flex p-1">
        <h1 className="text-xl font-medium">{username}</h1>
        <div className="text-center bg-gray-200 ml-2  rounded-full w-8 h-8"> <h1 className=" text-lg font-medium ">U</h1></div>
        </div>
    </div>
}