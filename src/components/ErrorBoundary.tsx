import { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error Boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='h-[80dvh] flex flex-col justify-center items-center gap-10'>
          <div className='flex flex-col justify-center items-center gap-2'>
            <h2 className='text-4xl text-gray-300'>
              Произошла непредвиденная ошибка
            </h2>
            <p className='text-xl text-gray-500'>
              Попробуйте обновить страницу или вернуться позже
            </p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className='
            text-gray-400
            border-2
            border-gray-400
            p-3
            rounded-lg
            transition-colors duration-120 ease-linear
            hover:border-gray-200
            hover:text-gray-200
            '
          >
            Обновить страницу
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
