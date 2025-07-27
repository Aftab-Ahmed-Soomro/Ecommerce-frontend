import { IoMdClose } from 'react-icons/io'

const DisplayImage = ({imgUrl,onClose}) => {
  return (
    <div className='bg-slate-200/35 fixed bottom-0 top-0 left-0 right-0 flex justify-center items-center'>
        <div className='bg-white shadow-lg rounded max-w-5xl mx-auto p-4'>
            <div onClick={onClose} className='w-fit ml-auto cursor-pointer text-2xl hover:text-red-600'>
                <IoMdClose />
            </div>
            <div className='flex justify-center p-4 max-w-[80vh] max-h-[80vh]'>
                <img src={imgUrl} className='w-full h-full' />
            </div>
        </div>
    </div>
  )
}

export default DisplayImage
