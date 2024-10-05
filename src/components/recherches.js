import { useState, useRef, useEffect } from 'react';
import useSearchOpen from '../hooks/searchHook';
import { Modal, Button } from 'react-bootstrap'; // Assurez-vous d'importer Bootstrap

const searchCategories = [
  { title: 'Bénéficiaires', items: ['Alice Dupont', 'Bob Martin', 'Claire Leroy'] },
  { title: 'Dons', items: ['Don #1234', 'Don #5678', 'Don #9101'] },
  { title: 'Donateurs', items: ['Jean Dubois', 'Marie Lambert', 'Pierre Durand'] },
  { title: 'Projets', items: ['Projet Alpha', 'Projet Beta', 'Projet Gamma'] },
];

const Search = () => {
  const { isSearchOpen, openSearch, closeSearch } = useSearchOpen();
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredCategories = searchCategories.map(category => ({
    ...category,
    items: category.items.filter(item =>
      item.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  return (
    <div className="relative">
      <button
        className="b0-o0 bgV-cW"
        onClick={openSearch}
        aria-label="Ouvrir la recherche"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-600"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>

      <Modal show={isSearchOpen} onHide={closeSearch} centered>
        <Modal.Header closeButton>
          <Modal.Title>Recherche</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="search"
            placeholder="Rechercher..."
            className="form-control"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
          <div className="mt-3">
            {searchQuery && (
              <div>
                {filteredCategories.map((category, index) => (
                  <div key={index} className="mb-3">
                    <h5 className="font-weight-bold">{category.title}</h5>
                    <ul className="list-group">
                      {category.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="list-group-item list-group-item-action">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                {filteredCategories.length === 0 && (
                  <p className="text-center text-muted">Aucun résultat trouvé</p>
                )}
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeSearch}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Search;
