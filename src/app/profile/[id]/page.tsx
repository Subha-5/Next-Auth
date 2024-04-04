export default function ProfileDetailsPage ({params}: any){
    return (
      <div className="flex flex-col justify-center items-center min-h-screen py-4 p-2">
        <h1 className="text-lg font-semibold">Profile Page</h1>
        <h2 className="p-4 bg-green-500 rounded text-black">{params.id}</h2>
      </div>
    )
}