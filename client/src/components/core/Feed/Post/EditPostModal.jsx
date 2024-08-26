import React, { memo, useRef, useState } from 'react'
import IconBtn from '../../../common/IconBtn'
import { useDispatch, useSelector } from 'react-redux';
import { editPost } from '../../../../services/operations/postAPI';
import useEscape from '../../../../hooks/useEscape';
import useOnClickOutside from '../../../../hooks/useOnClickOutside';

const EditPostModal = memo(function EditPostModal(props){
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    const [newDesc, setNewDesc] = useState(props?.description);
    const [isVisible, setIsVisible] = useState(true);
    const modalRef = useRef();
    
    const modalHandler = () => {
        setIsVisible(false);
        setTimeout(() => props.setModal(false), 300);
    };
    useOnClickOutside(modalRef, modalHandler);
    useEscape(modalRef, modalHandler);


    const editPostHandler = () => {
        if(newDesc !== props?.description){
            dispatch(editPost(token, {postId: props?._id, description: newDesc}));
        }
        modalHandler();
    }

  return (<>
    {
        isVisible &&
        (<div ref={modalRef}
            className='absolute text-black dark:text-white border-b border-b-1 border-b-white w-full cursor-pointerfixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-black bg-opacity-10 backdrop-blur-sm'>
        <div className='w-[80%] h-fit max-w-[500px] mx-auto items-center'>
        
        <p className='text-center'>Edit your description</p>
        <textarea
            type="text"
            // placeholder={props?.description}
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            className={"w-full h-fit py-auto my-3 rounded-[0.5rem] focus:ring-0 dark:focus:border-white focus:border-black dark:bg-[#2C333F] p-[12px] text-[16px] leading-[24px] font-[500] dark:text-[#999DAA]"}
            />
            <div className='text-center'>
            <IconBtn 
            text={"Save"}
            onclick={editPostHandler}
            />
            </div>
            
            </div>
            </div>)
        }
        </>
        )
    })
    
    export default EditPostModal