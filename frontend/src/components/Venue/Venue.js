import React from "react";
import "./Venue.css"
import { IoRestaurantSharp } from "react-icons/io5";
import { CiShop, CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { IoIosBeer, IoIosCafe } from "react-icons/io";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { MdLocalHotel } from "react-icons/md";
import { GiFruitBowl } from "react-icons/gi";
import CustomDate from "../../utils/CustomDate";
import { Link } from "react-router-dom";

const starStyle = {
    color: "#FFD700"
}

/**
 * VenueType component to display the icon of the venue category. 
 * @param {number} type - The ID of the venue category  
 * @returns : The icon of the venue category
 * 
 * @example
 * return <VenueType type={2} />
 * // returns <IoRestaurantSharp />
 * 
 * @example
 * return <VenueType type={4} />
 * // returns <CiShop />
 */
const VenueType = ({ type }) => {
    switch (type) {
        case 2:
            return <IoRestaurantSharp />
        case 3:
            return <IoIosCafe />
        case 4:
            return <CiShop />
        case "Grocery store":
            return <GiFruitBowl />
        case "Hotel":
            return <MdLocalHotel />
        case "Bar":
            return <IoIosBeer />
        default:
            return <CiShop />
    }
}

const randomVenueType = () => {
    const types = ["restaurant", "cafe", "store"]
    return types[Math.floor(Math.random() * types.length)]
}


function Venue({ id, venue }) {
    return (
        <Link to={`/venues/${venue.venueId}`} className={"col-3 card"} style={{ textDecoration: "none" }} >
            <div
                key={id}
                className="venue bg-light rounded"
                style={{ display: "inline-block", padding: 0, borderRadius: "0 0 10px 10px" }}
            >
                <img
                    src={venue.logo === "null" ? "https://cdn.gracestudio.io/jkpg-city/Jkpgcity_thumbnail_7c92fabae3/Jkpgcity_thumbnail_7c92fabae3.png" : venue.logo}
                    alt={`${venue.name} in ${venue.address} at Jönköping`}
                    className="img-cover"
                    style={{ width: "100%", height: "200px", objectFit: "contain", objectPosition: "center" }} // Adjust height as needed
                />

                <div
                    className="p-3"
                >
                    <h3><VenueType type={venue.venueCategoryId} /> {venue.name}</h3>
                    <hr />
                    <div
                        dangerouslySetInnerHTML={{ __html: venue.description }}
                    />

                    <hr />
                    <footer>
                        <span></span>
                        <address>
                            {venue.address}
                        </address>
                        {/* Add star reviews */}
                        <p>Rating: <span>
                            <FaStar style={starStyle} />
                            <FaStar style={starStyle} />
                            <FaStar style={starStyle} />
                            <FaStar style={starStyle} />
                            <CiStar />
                        </span></p>
                        <span
                            className="text-center d-block"
                            style={{
                                fontSize: "1.2rem"
                            }}
                        >

                            {
                                CustomDate.isOpenNow("10-19")
                            }
                        </span>
                    </footer>
                </div>
            </div>
        </Link>
    );
}

export default Venue;