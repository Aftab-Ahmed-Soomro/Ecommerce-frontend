import React, { useEffect, useState } from 'react'
import summaryApi from '../common'
import { toast } from 'react-toastify'
import moment from 'moment'
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole'

const AllUsers = () => {
  const [allUser,setAllUser] = useState([])
  const [openUpdateRole,setOpenUpdateRole] = useState(false)
  const [updateUserDetails,setUpdateUserDetails] = useState({
    name : "",
    email : "",
    role : "",
    _id : ""
  })

  const fetchAllUsers = async() => {
    const fetchData = await fetch(summaryApi.allUser.url,{
      method : summaryApi.allUser.method,
      credentials : 'include'
    })

    const dataResponse = await fetchData.json();

    if (dataResponse.success) {
      setAllUser(dataResponse.data);
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }

    console.log(dataResponse);
  }

  useEffect(()=> {
    fetchAllUsers();
  },[]);

  return (
    <div className='bg-white pb-4'>
      <table className='w-full userTable'>
        <thead>
          <tr className='bg-black text-white'>
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
          {
            allUser.map((item,index)=> {
              return (
                <tbody key={index}>
                  <tr>
                    <td>
                      {index + 1}
                    </td>
                    <td>
                      {item.name}
                    </td>
                    <td>
                      {item.email}
                    </td>
                    <td>
                      {item.role}
                    </td>
                    <td>
                      {/* Moment.js */}
                      {moment(item.createdAt).format('ll')}
                    </td>
                    <td>
                      <button 
                      onClick={()=>{
                        setOpenUpdateRole(true)
                        setUpdateUserDetails(item)
                      }
                      } 
                      className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white'
                      >
                        <MdModeEdit />
                      </button>
                    </td>
                  </tr>
                </tbody>
              )
            })
          }
      </table>

      {
        openUpdateRole && (
          <ChangeUserRole 
          onClose={()=>setOpenUpdateRole(false)} 
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callFunc={fetchAllUsers} />
        )
      }
    </div>
  )
}

export default AllUsers
