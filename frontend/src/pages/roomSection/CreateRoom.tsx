import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const CreateRoom = () => {

  
  const navigate = useNavigate();

  const [name, setName] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');




async function handleCreateRoom(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setError("");
  setSuccess("");

  if (!name.trim()) {
    setError("Room name is required!");
    return;
  }

  setLoading(true);

  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      setError("You are not logged in! Please sign in first.");
      setTimeout(() => navigate('/auth/signin'), 1500);
      return;
    }

    // Direct Token Sending (Without 'Bearer ')
    const response = await axios.post(
      "http://localhost:12000/api/v1/create-room",
      {
        name: name.trim(),
      },
      {
        headers: {
          Authorization: token, 
        },
      }
    );

    setSuccess("Room created successfully! Redirecting...");
    setName("");

    // Backend se roomId extraction
    const createdRoomId = response.data.roomId 
    
    setTimeout(() => {
      if (createdRoomId) {
        navigate(`/room/${createdRoomId}`);
      } else {
        navigate('/room');
      }
    }, 1200);

  } catch (err: any) {
    console.error("Error creating room:", err);
    setError(err.response?.data?.message || "Error occurred while creating room.");
  } finally {
    setLoading(false);
  }
}

  return (
    <>
    <div className='text-red-600'>CreateRoom</div>
    <div>
      <form onSubmit={handleCreateRoom}>
        <div>
        <label htmlFor="roomName" className='text-red-500'>Room-Name ---</label>
        <input type="text" placeholder='enter the room name' value={name} onChange={(e)=>setName(e.target.value)} />
        </div>
        <div>
          <button disabled={loading} type='submit'>
            {loading ? "creating.. room":"create room"}
          </button>
        </div>
      </form>
    </div>
    </>
  )
}

export default CreateRoom
