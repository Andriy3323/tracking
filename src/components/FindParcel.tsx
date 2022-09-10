import { useState, useEffect } from 'react';
import { getParcel } from '../api';
import './FindParcel.scss';

type Props = {
  handleAddHistory: (query: string) => void;
  requestFromHistory: string,
  history: string[];
}

export const FindParcel: React.FC<Props> = ({ handleAddHistory, requestFromHistory, history }) => {
  const [parcel, setParcel] = useState<ParcelData | null>();
  const [queryInput, setQueryInput] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isInputCorrect, setInputCorrect] = useState(true);

  useEffect(() => {
    if (requestFromHistory !== '') {
      setQueryInput(requestFromHistory);
      handleFindBy(null);
    }
  }, [requestFromHistory]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value.replace(/\D/g, '');
    setQueryInput(input);
    setInputCorrect(true);
  }

  const handleFindBy = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null) => {
    if (event) {
      event.preventDefault();
    }
    setLoading(true);
  
    setParcel(null);

    let data;

    if (requestFromHistory !== '') {
      setQueryInput(requestFromHistory);
      data = await getParcel(requestFromHistory);
    } else {
      data = await getParcel(queryInput);
    }

    const parcel = data.data[0];
  
    setParcel(parcel);
  
    if (parcel) {
      handleAddHistory(queryInput);
      setInputCorrect(true);
    } else {
      setInputCorrect(false);
    }
  
    setLoading(false);
  }

  return (
    <div className='findParcel-container'>
      <form action="" className='findParcel-form'>
        <input
          type="text"
          id="document-num"
          className='findParcel-input'
          placeholder="Введіть номер посилки"
          maxLength={14}
          value={queryInput}
          onChange={handleChange}
        />

        <div>
          <button
            type="submit"
            className='findParcel-search'
            disabled={!queryInput || isLoading}
            onClick={(event) => handleFindBy(event)}
          >
            Пошук
          </button>
        </div>
      </form>

      {isLoading
        && (
          <div className="loader"></div>
        )
      }

      {!isInputCorrect
        && (
          <p className='parcel-warning'>* Перевірте коректність вказаного номера</p>
        )
      }

      {parcel
        && (
        <div className='parcel-container'>
          <b>Статус посилки:</b>
          <p className='parcel-topic'>{parcel.Status}</p>
          <b>Відправлено з:</b>
          <p className='parcel-topic'>{parcel.CitySender} {parcel.WarehouseSender}</p>
          <b>Місце призначення:</b>
          <p className='parcel-topic'>{parcel.CityRecipient} {parcel.WarehouseRecipient}</p>
        </div>
        )}
    </div>
  )
}
