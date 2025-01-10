import { useState, useEffect } from 'react';
import { addData, fetchData } from './firebase';
import { Logout, Modal } from './components';
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
    try {
      await addData(phrase);
      setPhrases((prev) => [...prev, phrase]);
    } catch (error) {
      console.error(error);
    }

    setPhrase('');
  };

  const handleRandom = () => {
    const phrase =
      phrases.length > 0
        ? phrases[Math.floor(Math.random() * phrases.length)]
        : '';
    setRandomPhrase(phrase);
    toggleModal('random');
  };

  const toggleModal = (type: ShowType) => {
    setShow((prev) => (prev === type ? null : type));
  };

  const closeModal = () => setShow(null);

  const error = 'List is empty.';

  return (
    <>
      <main className="w-[600px] h-[400px] pt-12 pb-10">
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
              onClick={() => toggleModal('list')}
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
        </div>
      </main>

      <Modal isOpen={show === 'list'} onClose={closeModal}>
        <>
          <h2 className="text-xs">List of Phrases</h2>
          <div className="py-2">
            {phrases.map((phrase, index) => (
              <p key={index}>
                {index + 1}. {phrase}
              </p>
            ))}
            {phrases.length === 0 && <p className="text-red-600">{error}</p>}
          </div>
        </>
      </Modal>

      <Modal isOpen={show === 'random'} onClose={closeModal}>
        <div className="w-full h-full flex flex-col">
          <h2 className="h-[20px] text-xs">Random Phrase</h2>
          <div className="w-full h-full flex justify-center items-center">
            {randomPhrase ? (
              <p className="text-3xl mb-[28px]">{randomPhrase}</p>
            ) : (
              <p className="text-red-600">{error}</p>
            )}
          </div>
        </div>
      </Modal>

      <div className="fixed top-0 right-0 w-[76px] h-[42px] flex justify-center items-center">
        <Logout />
      </div>
    </>
  );
}

export default App;
