import { useState } from 'react';
import { FindParcel } from './components/FindParcel';
import { ParcelHistory } from './components/ParcelHistory';
import './App.scss';

export const App = () => {
  const [history, setHistory] = useState<string[]>([]);
  const [currRequest, setCurrRequest] = useState<string>('');

  const handleAddHistory = (query: string) => {
    if (!history.some(currHistory => currHistory === query)) {
      setHistory(prevHistory => [query, ...prevHistory]);
    }
  }

  const handleMakeRequest = (query: string) => {
    setCurrRequest(query);
  }

  return (
    <div className='app-container'>
      <FindParcel handleAddHistory={handleAddHistory} requestFromHistory={currRequest} history={history} />
      <ParcelHistory history={history} handleMakeRequest={handleMakeRequest} />
    </div>
  )
}