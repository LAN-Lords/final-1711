// import React from 'react';
// import { useTranslation } from 'react-i18next';

// const languages = [
//   { code: 'en', name: 'English' },
//   { code: 'hi', name: 'Hindi' },
//   {code:'kn', name:'Kannada' },
// ];

// const LanguageSelector = () => {
//   const { i18n } = useTranslation();

//   const changeLanguage = (code) => {
//     i18n.changeLanguage(code); // Change the language when button is clicked
//   };

//   return (
//     <div className="btn-container">
//       {languages.map((lang) => (
//         <button
//           key={lang.code}
//           className={`btn ${i18n.language === lang.code ? 'btn-primary' : 'btn-secondary'}`} // Active button styling
//           onClick={() => changeLanguage(lang.code)} // Change language on click
//         >
//           {lang.name}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default LanguageSelector;






import React from 'react';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'kn', name: 'Kannada' },
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (code) => {
    i18n.changeLanguage(code); // Change the language when option is selected
  };

  return (
    <div className="dropdown">
      <button
        className="btn btn-outline-dark dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {languages.find(lang => lang.code === i18n.language)?.name || 'Language'}
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        {languages.map((lang) => (
          <li key={lang.code}>
            <button
              className="dropdown-item text-dark bg-white hover:bg-dark hover:text-white"
              onClick={() => changeLanguage(lang.code)}
            >
              {lang.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LanguageSelector;

