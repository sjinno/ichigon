import { useState, useEffect } from 'react';
import { addData, fetchData } from './firebase';
import Modal from './components/modal';
import './App.css';

type ShowType = 'list' | 'random' | null;

function App() {
  const [phrase, setPhrase] = useState('');
  const [phrases, setPhrases] = useState<string[]>([]);
  const [show, setShow] = useState<ShowType>();
  const [randomPhrase, setRandomPhrase] = useState('');

  useEffect(() => {
    // Load phrases from db
    async function fetchPhrases() {
      try {
        const data = await fetchData();
        setPhrases(data);
      } catch (error) {
        console.error('Error fetching phrases:', error);
      } finally {
        console.log('Done fetching phrases');
      }
    }

    fetchPhrases();
  }, []);

  const placeholder = 'What legendary saying or phrase comes to mind?';

  const handleAdd = async () => {
    if (phrase === '') return;

    try {
      await addData(phrase);
      setPhrases((prev) => [...prev, phrase]);
    } catch (error) {
      console.error(error);
    }

    setPhrase('');
  };

  const handleRandom = () => {
    if (phrases.length === 0) return;
    const phrase =
      phrases.length > 0
        ? phrases[Math.floor(Math.random() * phrases.length)]
        : '';
    if (phrase === '') return;
    setRandomPhrase(phrase);
    toggleModal('random');
  };

  const toggleModal = (type: ShowType) => {
    setShow((prev) => (prev === type ? null : type));
  };

  const closeModal = () => setShow(null);

  return (
    <>
      <main className="w-[600px] h-[400px] py-10">
        <div className="w-[76%] h-full m-auto">
          <textarea
            name="phrase"
            id="phrase"
            placeholder={placeholder}
            value={phrase}
            className="w-full h-[76%] text-sm px-3 py-2 border-solid border-[1px] border-zinc-200 rounded-md focus:border-[1px] focus:outline-none focus:border-blue-600"
            onChange={(e) => setPhrase(e.target.value)}
            onKeyDown={(e) => e.metaKey && e.key === 'Enter' && handleAdd()}
          />
          <div className="pl-0.5 py-5 flex gap-3 text-base">
            <button
              className="bg-sky-500 text-white py-1 px-4 text-xs rounded-md"
              onClick={handleAdd}
            >
              Add
            </button>
            <button
              className="bg-emerald-500 text-white py-1 px-4 text-xs rounded-md"
              onClick={() => {
                if (phrases.length === 0) return;
                toggleModal('list');
              }}
            >
              List
            </button>
            <button
              className="bg-amber-500 text-white py-1 px-4 text-xs rounded-md"
              onClick={handleRandom}
            >
              Random
            </button>
          </div>

          {/* {phrases.length > 0 && (
            <div>
              {phrases
                .slice(-3)
                .reverse()
                .map((value, index) => (
                  <p key={index}>{value}</p>
                ))}
            </div>
          )} */}
        </div>
      </main>

      <Modal isOpen={show === 'list'} onClose={closeModal}>
        <>
          <h2 className="text-base">List of Phrases</h2>
          {phrases.map((phrase, index) => (
            <p key={index}>{phrase}</p>
          ))}
        </>
      </Modal>

      <Modal isOpen={show === 'random'} onClose={closeModal}>
        <>
          <h2 className="text-base">Random Phrase</h2>
          <p>{randomPhrase || 'No phrases available'}</p>
        </>
      </Modal>
    </>
  );
}

export default App;
