import React from 'react'
import { useEffect , useState } from 'react'
import { useParams} from 'react-router-dom'
import {collection , getDocs , query , where , orderBy , limit , startAfter} from 'firebase/firestore'
import {db} from '../firebase.config'
import {toast} from 'react-toastify'
import Spinner from '../Component/Spinner'
import ListingItem from '../Component/ListingItem'

function Offers() {
  const [listings , setListings] = useState(null)
  const [loading , setLoading] = useState(true)
  const params = useParams()

useEffect(()=>{
  const fetchListings = async () => {
    try {
      const listingRef = collection( db , 'listings')
      const q = query(listingRef , where('offer', '==' ,true))
      const querySnap = await getDocs(q)
      const listings = []

      querySnap.forEach((doc)=>{
       return listings.push({
        id: doc.id,
        data:doc.data()
       })
        
      })

      setListings(listings)

      setLoading(false)
      
    } catch (error) {
      toast.error('Could not Load Listings')
    }

  }
  fetchListings()
} , [])

  return (
    <div className='category'>
      <header>
        <p className="pageHeader">
          Offers
        </p>
      </header>
      {loading ? <Spinner/>: listings && listings.length > 0 ? 
      <>
      <main>
        <ul className='categoryListings'>
          {listings.map((listing)=>(
           <ListingItem listing={listing.data} id={listing.id} key={listing.id}/>

          ))}

        </ul>
      </main>

      
      
      </> : <p>No Available Offers At This Time </p> }

    </div>
  )
}

export default Offers