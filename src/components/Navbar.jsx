import React from 'react'

const Navbar = () => {
  return (
    <>
    <nav className="bg-blue-800 p-3 text-white flex justify-between ">
        <span className='font-extrabold font-mono text-2xl'>My Planner</span>
        <ul className='flex gap-6 font-mono'>
            <li className='cursor-pointer text-xl'>Home</li>
            <li className='cursor-pointer text-xl'>Your-Tasks</li>
        </ul>
    </nav>
    </>
  )
}

export default Navbar
