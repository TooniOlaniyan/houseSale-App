import React from 'react'
import {useState , useEffect} from 'react'
import{Link , useNavigate , useParams} from 'react-router-dom'
import {getDoc , doc} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
import Spinner from '../Component/Spinner'
import {db} from '../firebase.config'
import shareIcon from '../assets/svg/shareIcon.svg'
import {MapContainer , Marker ,Popup , TileLayer} from 'react-leaflet'
import SwiperCore, {Navigation , Pagination , Scrollbar , A11y} from 'swiper'
import {Swiper , SwiperSlide} from 'swiper/react'
import 'swiper/swiper-bundle.css'
SwiperCore.use([Navigation , Pagination , Scrollbar , A11y])


function Listing() {
    const [listing , setListing] =useState(null)
    const [loading , setloading] =useState(true)
    const [shareLinkCopied , setShareLinkCopied] =useState(null)
    const navigate = useNavigate()
    const params = useParams()
    const auth = getAuth()



    useEffect(() => {
        const fetchListing = async () => {
            const docRef = doc(db , 'listings' , params.listingId)
            const docSnap = await getDoc(docRef)

            if(docSnap.exists()){
                setListing(docSnap.data())
                setloading(false)
            }


        }


        fetchListing()
      
    },[navigate , params.listingId])

    if(loading){
        return <Spinner/>
    }
    
  return (
    <main>
      <div
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareLinkCopied(true);
          setTimeout(() => {
            shareLinkCopied(false);
          }, 2000);
        }}
        className="shareIconDiv"
      >
        <img src={shareIcon} alt="" />
      </div>
      {shareLinkCopied && <p className="linkCopied">Link copied!</p>}

      <div className="listingDetails">
        <p className="listingName">
          {listing.name} -
          {listing.offer ? listing.discountedPrice : listing.regularPrice}{" "}
        </p>

        <p className="listingLocation">{listing.location}</p>
        <p className="listingType">
          For {listing.type === "rent" ? "Rent" : "Sale"}
        </p>
        {listing.offer && (
          <p className="discountPrice">
            $ {listing.regularPrice - listing.discountedPrice} discount
          </p>
        )}

        <ul className="listingDetailsList">
          <li>
            {listing.bedroom > 1
              ? `${listing.bedrooms} Bedrooms `
              : "1 Bedroom"}
          </li>
          <li>
            {listing.bathrooms > 1
              ? `${listing.bathrooms} Bathrooms `
              : "1 Bathroom"}
          </li>
          <li>{listing.parking && `Parking Spot`}</li>
          <li>{listing.furnished && `Furnished`}</li>
        </ul>

        <p className="listingLocationTitle">Location</p>
        <div className="leafletContainer">
          <MapContainer
            style={{ height: "100%", width: "100%" }}
            center={[51.505, -0.09]}
            zoom={13}
            scrollWheelZoom={true}
          >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
          </MapContainer>
        </div>

        {auth.currentUser?.uid !== listing.userRef && (
          <Link
            to={`/contact/${listing.userRef}?listingName=${listing.name}&listingLocation=${listing.location}`}
            className="primaryButton"
          >
            Contact Landlord
          </Link>
        )}
      </div>
    </main>
  );
}

export default Listing