// import { useState } from 'react'
// import { useParams, useNavigate } from 'react-router-dom'

// function BookingPage({ user, onCreateBooking }) {
//   const { facilityId } = useParams()
//   const navigate = useNavigate()
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')

//   const facilities = {
//     1: { name: 'Basketball Court A', sport: 'Basketball' },
//     2: { name: 'Tennis Court 1', sport: 'Tennis' },
//     3: { name: 'Football Field', sport: 'Football' },
//     4: { name: 'Swimming Pool', sport: 'Swimming' },
//     5: { name: 'Badminton Court', sport: 'Badminton' },
//     6: { name: 'Volleyball Court', sport: 'Volleyball' },
//   }

//   const facility = facilities[facilityId]

//   const [formData, setFormData] = useState({
//     sport: facility?.sport || '',
//     facility: facility?.name || '',
//     date: '',
//     timeSlot: '10:00 AM - 11:00 AM',
//   })

//   const timeSlots = [
//     '7:00 AM - 8:00 AM',
//     '8:00 AM - 9:00 AM',
//     '9:00 AM - 10:00 AM',
//     '10:00 AM - 11:00 AM',
//     '11:00 AM - 12:00 PM',
//     '1:00 PM - 2:00 PM',
//     '2:00 PM - 3:00 PM',
//     '3:00 PM - 4:00 PM',
//     '4:00 PM - 5:00 PM',
//     '5:00 PM - 6:00 PM',
//     '6:00 PM - 7:00 PM',
//   ]

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData(prev => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setError('')
//     setLoading(true)

//     try {
//       const result = await onCreateBooking(formData)
//       if (result.success) {
//         navigate('/my-bookings')
//       } else {
//         setError(result.error)
//       }
//     } finally {
//       setLoading(false)
//     }
//   }

//   if (!facility) {
//     return (
//       <div className="max-w-2xl mx-auto px-4 py-8 text-center">
//         <p className="text-red-600 text-lg">Facility not found</p>
//       </div>
//     )
//   }

//   return (
//     <div className="max-w-2xl mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold text-gray-900 mb-8">Book: {facility.name}</h1>

//       {error && (
//         <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
//           {error}
//         </div>
//       )}

//       <div className="bg-white p-8 rounded-lg shadow-md">
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Sport</label>
//             <input
//               type="text"
//               disabled
//               value={formData.sport}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Facility</label>
//             <input
//               type="text"
//               disabled
//               value={formData.facility}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
//             <input
//               type="date"
//               name="date"
//               value={formData.date}
//               onChange={handleChange}
//               min={new Date().toISOString().split('T')[0]}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Time Slot *</label>
//             <select
//               name="timeSlot"
//               value={formData.timeSlot}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//               required
//             >
//               {timeSlots.map((slot) => (
//                 <option key={slot} value={slot}>
//                   {slot}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 font-semibold"
//           >
//             {loading ? 'Booking...' : 'Book Now'}
//           </button>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default BookingPage


import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { bookingAPI } from '../services/api'

function BookingPage({ user, onCreateBooking }) {
  const { facilityId } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [bookedSlots, setBookedSlots] = useState([]) // ✅ Track booked slots

  const facilities = {
    1: { name: 'Basketball Court A', sport: 'Basketball' },
    2: { name: 'Tennis Court 1', sport: 'Tennis' },
    3: { name: 'Football Field', sport: 'Football' },
    4: { name: 'Swimming Pool', sport: 'Swimming' },
    5: { name: 'Badminton Court', sport: 'Badminton' },
    6: { name: 'Volleyball Court', sport: 'Volleyball' },
  }

  const facility = facilities[facilityId]

  const [formData, setFormData] = useState({
    sport: facility?.sport || '',
    facility: facility?.name || '',
    date: '',
    timeSlot: '10:00 AM - 11:00 AM',
  })

  const timeSlots = [
    '7:00 AM - 8:00 AM',
    '8:00 AM - 9:00 AM',
    '9:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '1:00 PM - 2:00 PM',
    '2:00 PM - 3:00 PM',
    '3:00 PM - 4:00 PM',
    '4:00 PM - 5:00 PM',
    '5:00 PM - 6:00 PM',
    '6:00 PM - 7:00 PM',
  ]

  // ✅ Fetch booked slots when date changes
  useEffect(() => {
    if (formData.date && facility?.name) {
      fetchBookedSlots()
    }
  }, [formData.date, facility?.name])

  const fetchBookedSlots = async () => {
    try {
      const response = await bookingAPI.getFacilityBookings(facility.name, formData.date)
      const booked = response.data.data.map(booking => booking.timeSlot)
      setBookedSlots(booked)
    } catch (error) {
      console.error('Error fetching booked slots:', error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    // ✅ Check if slot is already booked
    if (bookedSlots.includes(formData.timeSlot)) {
      setError('This time slot is already booked. Please choose another time.')
      return
    }

    setLoading(true)

    try {
      const result = await onCreateBooking(formData)
      if (result.success) {
        navigate('/my-bookings')
      } else {
        setError(result.error)
      }
    } finally {
      setLoading(false)
    }
  }

  // ✅ Check if a slot is booked
  const isSlotBooked = (slot) => bookedSlots.includes(slot)

  if (!facility) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 text-center">
        <p className="text-red-600 text-lg">Facility not found</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Book: {facility.name}</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="bg-white p-8 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sport</label>
            <input
              type="text"
              disabled
              value={formData.sport}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Facility</label>
            <input
              type="text"
              disabled
              value={formData.facility}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time Slot * 
              {formData.date && bookedSlots.length > 0 && (
                <span className="text-sm text-gray-500 ml-2">
                  ({bookedSlots.length} slots booked)
                </span>
              )}
            </label>
            <select
              name="timeSlot"
              value={formData.timeSlot}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            >
              {timeSlots.map((slot) => {
                const booked = isSlotBooked(slot)
                return (
                  <option 
                    key={slot} 
                    value={slot}
                    disabled={booked}
                    className={booked ? 'text-red-600 bg-red-50' : ''}
                  >
                    {slot} {booked ? '(Already Booked)' : ''}
                  </option>
                )
              })}
            </select>
            
            {/* ✅ Visual legend */}
            {formData.date && (
              <div className="mt-2 flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-green-500 rounded"></span>
                  Available
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-red-500 rounded"></span>
                  Booked
                </span>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || isSlotBooked(formData.timeSlot)}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            {loading ? 'Booking...' : 
             isSlotBooked(formData.timeSlot) ? 'Slot Not Available' : 
             'Book Now'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default BookingPage
