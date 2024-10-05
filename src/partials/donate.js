import React from 'react'
import donate from '../public/assets/images/donate.png';

const donationTypes = {
    name: "Dons Monétaires",
    subType: {
      name: "Dons de Biens",
      subType: {
        name: "Dons de Temps",
        subType: {
          name: "Dons de Services",
          subType:{
            name: "Dons Ecologiques" 
          }
        }
      }
    }
  }
  
  const renderDonationType=(type, depth = 0) =>{
    return (
      <li key={type.name} className={`mb-2 ${depth > 0 ? 'ms-4' : ''}`}>
        <div className="card border-2 border-orange-500 bg-violet-600 shadow-md transition-transform hover:scale-105">
          <div className="card-body donate-type">
            <p className="text-sm font-semibold text-white">{type.name}</p>
          </div>
        </div>
        {type.subType && (
          <ul className="list-unstyled mt-2">
            {renderDonationType(type.subType, depth + 1)}
          </ul>
        )}
      </li>
    )
  }
  
  const Donate = () => {
    return (
      <div className="col h-100 position-relative">
        <div className="position-relative">
          <img
            src={donate}
            alt="Charitable donations"
            className="w-100 h-auto "
          />
          <div className="position-absolute top-0 end-0 w-1/3 max-w-[200px]">
            <ul className="list-unstyled p-0">
              {renderDonationType(donationTypes)}
            </ul>
          </div>
        </div>
      </div>
    )
  }
  
  export default Donate;
  