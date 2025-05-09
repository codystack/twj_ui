

import { Component, ErrorInfo } from "react";

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  // This method is called when an error is thrown in a child component
  static getDerivedStateFromError(error: Error): State {
    // Log the error to an error tracking service or console
    console.error("Caught error in ErrorBoundary:", error);

    // Update state to indicate that an error occurred and store the error
    return { hasError: true, error };
  }

  // This method is called after an error has been caught
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error and error info to an external logging service
    console.log("Error caught in component:", error);
    console.log("Error information:", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can use the error stored in the state to display an error message
      return (
        <div>
          <h2>Something went wrong.</h2>
          <p>{this.state.error?.message}</p> {/* Show the error message */}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
