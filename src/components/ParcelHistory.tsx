import { useState, useEffect } from 'react';
import './ParcelHistory.scss';

const useLocaleStorage = (key: string, initialValue: string) => {
  const [value, setValue] = useState(() => {
    const AcceptableKey = localStorage.getItem(key);

    if (AcceptableKey) {
      return JSON.parse(AcceptableKey);
    }

    return initialValue;
  });

  const save = (newValue: string) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, save];
}

type Props = {
  history: string[];
  handleMakeRequest: (query: string) => void;
}

export const ParcelHistory: React.FC<Props> = ({ history, handleMakeRequest }) => {
  const [documentNumber, setDocumentNumber] = useLocaleStorage('documents Numbers', '');

  useEffect(() => {
    if (!documentNumber.includes(history[0]) && history.length > 0) {
      setDocumentNumber([ history[0], ...documentNumber]);
    }
  }, [history]);

  return (
    <>
      {documentNumber
        &&
        (
          <div className='history-container'>
            <div className="history-title-container">
              <p id="elm" className='history-title'>Історія пошуку</p>
              <div
                className="history-clear"
                onClick={() => {setDocumentNumber([])}}
              ></div>
            </div>
            {documentNumber.map((historyElm: string) => {
              return (
                <>
                  <a
                    href="#elm"
                    className='history-link'
                    onClick={() => {handleMakeRequest(historyElm)}}
                  >
                    {historyElm}
                  </a>
                  <br></br>
                </>
              )})}
          </div>
        )
      }
    </>
  )
}