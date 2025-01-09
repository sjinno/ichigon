import { useState } from 'react';
import './App.css';

function App() {
  const [phrase, setPhrase] = useState('');

  const placeholder = 'What legendary saying or phrase comes to mind?';

  const handleAdd = () => {
    if (phrase === '') return;

    console.log('shohei - add', phrase);

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
      </main>
    </>
  );
}

export default App;
