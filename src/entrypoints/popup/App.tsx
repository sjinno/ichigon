import { useState, useEffect } from 'react';
import './App.css';
import { addData, fetchData } from './firebase';

function App() {
  const [phrase, setPhrase] = useState('');
  const [phrases, setPhrases] = useState<string[]>([]);

  useEffect(() => {
    // Load phrases from db
    async function fetchPhrases() {
      try {
        const data = await fetchData();
        setPhrases(data);
      } catch (error) {
        console.error('Error fetching phrases:', error);
      }
    }

    fetchPhrases();
  }, []);

  const placeholder = 'What legendary saying or phrase comes to mind?';

  const handleAdd = async () => {
    if (phrase === '') return;

    console.log('shohei - add', phrase);

    try {
      await addData(phrase);
      setPhrases((prev) => [...prev, phrase]);
    } catch (error) {
      console.log('shohei - error', error);
    }

    setPhrase('');
  };

  const handleList = () => {
    console.log('shohei - list');
  };

  const handleRandom = () => {
    console.log('shohei - random');
  };

  return (
    <>
      <main className="w-[400px] h-[280px] py-6">
        <div className="w-[88%] h-[66%] m-auto">
          <div>
            <textarea
              name="phrase"
              id="phrase"
              placeholder={placeholder}
              value={phrase}
              className="w-full h-full text-2xl px-3 py-2 border-solid border-2 border-zinc-200 rounded-md"
              onChange={(e) => setPhrase(e.target.value)}
              onKeyDown={(e) => e.metaKey && e.key === 'Enter' && handleAdd()}
            />
            <div className="pl-0.5 py-4 flex gap-3 text-base">
              <button
                className="bg-sky-500 text-neutral-100 py-1 px-5 rounded-[2px]"
                onClick={handleAdd}
              >
                Add
              </button>
              <button
                className="bg-emerald-500 text-neutral-100 py-1 px-5 rounded-[2px]"
                onClick={handleList}
              >
                List
              </button>
              <button
                className="bg-amber-500 text-neutral-100 py-1 px-5 rounded-[2px]"
                onClick={handleRandom}
              >
                Random
              </button>
            </div>
          </div>
          {phrases.length > 0 && (
            <div className="pb-4">
              {phrases.map((phrase, key) => (
                <p key={key} className="pl-1">
                  {key + 1}. {phrase}
                </p>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
