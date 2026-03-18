import { useRouteError, isRouteErrorResponse } from 'react-router';

export function ErrorPage() {
  const error = useRouteError();

  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText || error.data?.message || 'Unknown error';
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else {
    errorMessage = 'Unknown error';
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold text-red-600 mb-4">エラーが発生しました</h1>
        <p className="text-gray-700 mb-4">申し訳ございません。問題が発生しました。</p>
        <p className="text-sm text-gray-500">{errorMessage}</p>
      </div>
    </div>
  );
}
