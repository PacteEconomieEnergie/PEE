import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
interface userDetailsProps{
  userId:number;
  userType?:string
}
export const UserDetails:React.FC<userDetailsProps> = ({userId,userType}) => {
  // const {userType,userId}=useParams()
  console.log(userId);
  return (
    <div className="flex-1  mt-4 px-4 sm:px-28 overflow-x-auto">
      <h1 className="mb-6 text-xl font-bold">{userType} with the id {userId}</h1>
      </div>
  )
}
