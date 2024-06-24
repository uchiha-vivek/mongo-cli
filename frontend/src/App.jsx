import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [command, setCommand] = useState('');
  const [collection, setCollection] = useState('');
  const [document, setDocument] = useState('');
  const [response, setResponse] = useState('');

  const handleCommand = async () => {
    try {
      let res;
      if (command === 'insert') {
        res = await axios.post('http://localhost:5000/command', { command, collection, document });
      } else if (command === 'find') {
        res = await axios.post('http://localhost:5000/command', { command, collection });
      }
      setResponse(JSON.stringify(res.data,null,2));
    } catch (error) {
      console.error('Error executing command:', error);
      setResponse('Error in executing command')
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <header className="bg-white shadow w-full">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center">MongoDB Atlas CLI</h1>
        </div>
      </header>
      <main className="flex-grow flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="rounded-lg bg-white shadow-lg p-4 sm:p-6 lg:p-8">
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              placeholder="Enter command (insert/find)"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              value={collection}
              onChange={(e) => setCollection(e.target.value)}
              placeholder="Enter collection name"
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            {command === 'insert' && (
              <textarea
                value={document}
                onChange={(e) => setDocument(e.target.value)}
                placeholder="Enter document as JSON"
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
                rows="4"
              />
            )}
            <button
              onClick={handleCommand}
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              Execute
            </button>
          </div>
          <div className="rounded-lg bg-white shadow-lg p-4 sm:p-6 lg:p-8">
            <h2 className="text-xl font-bold mb-4 text-center">Response</h2>
            <pre className="whitespace-pre-wrap">{response}</pre>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
