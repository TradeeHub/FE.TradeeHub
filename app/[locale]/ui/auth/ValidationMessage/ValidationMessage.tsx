import { ApolloError, ServerError } from '@apollo/client';

const ValidationMessage = ({
  validationMessage,
}: {
  validationMessage: string | undefined | null | ApolloError;
}) => {
  const renderErrorMessage = () => {
    if (!validationMessage) {
      return null;
    }

    if (typeof validationMessage === 'string') {
      // Handles string type
      return <p className='text-sm text-secondary'>{validationMessage}</p>;
    }

    if (validationMessage instanceof ApolloError) {
      const networkError = validationMessage.networkError as ServerError;

      if (
        typeof networkError.result === 'object' &&
        networkError.result !== null
      ) {
        if (Array.isArray(networkError.result.errors)) {
          const errorMessages = networkError.result.errors.map(
            (error, index) => (
              <p key={index} className='text-sm text-secondary'>
                {error.message}
              </p>
            ),
          );
          return errorMessages.length > 0 ? (
            errorMessages
          ) : (
            <p className='text-sm text-secondary'>An error occurred!</p>
          );
        }
      }
    }

    return <p className='text-sm text-secondary'>Unknown error</p>;
  };

  return (
    <span
      className='text-center'
      style={{ marginTop: '2px', marginBottom: '0px' }}
    >
      {renderErrorMessage()}
    </span>
  );
};

export default ValidationMessage;
