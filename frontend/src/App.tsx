import { StocksList } from '@/components/StocksList';

function App() {
  return (
    <div className="flex-1 py-[24px] bg-blue-50 min-h-screen">
      <div className="flex flex-col items-center mb-6 space-y-3">
        <h1 className="text-4xl font-bold text-center text-gray-800">
          Stocker
        </h1>
        <span>Made with ❤️ by<br/>Divyansh Gupta</span>
        <div className="flex flex-row">
          <a
            href="https://divyansh21.vercel.app"
            className="mx-2 text-blue-500"
            target="_blank"
          >
            Portfolio
          </a>
          <a
            href="https://github.com/divyanshg"
            className="mx-2 text-blue-500"
            target="_blank"
          >
            Github
          </a>
          <a
            href="mailto://divyanshg809@gmail.com"
            className="mx-2 text-blue-500"
          >
            Mail
          </a>
        </div>
      </div>
      <div className="mx-auto bg-white border border-gray-300 rounded-lg shadow-md max-w-7xl">
        <StocksList />
      </div>
    </div>
  );
}

export default App
