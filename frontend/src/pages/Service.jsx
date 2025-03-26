import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../store/Auth";
// import { useNavigate } from 'react-router-dom'; 

export const Service = () => {

  const [servi, setservi] = useState([])
  const [loading, setloading] = useState(true)
  const { services } = useAuth();
  // const navigate = useNavigate();

  useEffect(() => {
    try {
      setservi(services || [])
    }
    catch (err) {
      console.log(err)
    }
    finally {
      setloading(false)
    }
  } , [services])


  const handleCardClick = (youtubelink) => {
    // Redirect to the YouTube link
    window.location.href = youtubelink; // Directly using window.location
    // Or using React Router's navigate
    // navigate(youtubelink);
  };

  if(loading){
    return (<p>loading...................</p>)
  }

  return (
    <section className="section-services">
      <div className="container">
        <h1 className="main-heading">Services </h1>
      </div>

      <div className="container grid grid-three-cols">
        {servi.map((curElem, index) => {
          const { price, description, provider, service, youtubelink } = curElem;

          return (
            <div className="card" key={index}   onClick={() => handleCardClick(youtubelink)}  style={{ cursor: 'pointer' }}>
              <div className="card-img">
                <img
                  src="/images/design.png"
                  alt="our services info"
                  width="200"
                />
              </div>

              <div className="card-details">
                <div className="grid grid-two-cols">
                  <p>{provider}</p>
                  <p>{price}</p>
                </div>
                <h2>{service}</h2>
                <p>{description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};