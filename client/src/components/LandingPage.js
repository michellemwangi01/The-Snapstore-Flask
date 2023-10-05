import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function LandingPage() {
  const photoData = [
    {
      id: 1,
      imageUrl: 'https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg',
      category: 'A stunning view of a mountainous landscape with lush greenery and a flowing river',
    },
    {
      id: 2,
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsIeKaNeZmCbcqQuuTB7PmSWfUaGDKDezN0w&usqp=CAU',
      category: 'A cityscape with tall skyscrapers and a busy street filled with people and cars.',
    },
    {
      id: 25,
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR1pJog_G22VXN0T2JbehGd04hklrFBIImCg&usqp=CAU',
      category: 'A serene landscape with a tranquil lake surrounded by trees and mountains.',
      resolution: 'High',
    },
    {
      id: 26,
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw6WlyydlkyZo_kZd36TU3ZYjoG_vWpZxHUg&usqp=CAU',
      category: 'a tranquil lake surrounded by trees and mountains',
      resolution: 'High',
    },
    {
      id: 27,
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHxzM_e4qVtnPZttfPhbjcPssC78WndotRPg&usqp=CAU',
      category: 'skyscrapers and a busy street filled with people and cars',
    },
    {
      id: 28,
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcNPOPDCWiEvN0x11fc_02MzdhtzcLOwg-qg&usqp=CAU',
      category: 'A tranquil forest scene with sunlight filtering through the trees',
    },
   
    {
      id: 30,
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpFreAtrOzdfbsrEHLCtHyBDY4x80z6RBeVA&usqp=CAU',
      category: 'A traveler\'s backpack against the backdrop of a beautiful mountain range.',
    },
    {
      id: 31,
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_1bpO0XDD8fbmRvnbnkCoQNFFoH3AqofVTg&usqp=CAU',
      category: 'Delicious gourmet dishes beautifully arranged on a dining table.',
    },
    {
      id: 32,
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjl7xYqho8VFxvJSR9heh8UTerI6FW4KDbxA&usqp=CAU',
      category: 'A breathtaking view of a rocky coastline with crashing waves and dramatic cliffs.',
      resolution: 'High',
    },
    {
      id: 33,
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP4fNghY7Kx6eP79gmdp6YhesUm6GZGL53Rw&usqp=CAU',
      category: 'a rocky coastline with crashing waves and dramatic cliffs',
    },
    
  

  ];

  return (
    <div className="landing-page">
      {/* Existing code for navigation, hero section, categories, and other sections */}
      
      {/* New section for displaying free high-resolution photos */}
      <section className="photos-section">
        <div className="container">
          <h2>Free High-Resolution Photos</h2>
          <div className="row">
            {photoData.map((photo) => (
              <div key={photo.id} className="col-md-3 mb-4"> {/* Use Bootstrap classes to style columns */}
                <div className="photo-item">
                  <img src={photo.imageUrl} alt={photo.category} className="img-fluid" />
                  <div className="photo-details">
                    <h3>{photo.category}</h3> {/* Display the category as the title */}
                    <p>Resolution: {photo.resolution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
