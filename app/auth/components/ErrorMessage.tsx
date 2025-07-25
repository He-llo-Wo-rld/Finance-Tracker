export const ErrorMessage = ({ error }: { error: string }) => {
  return (
    <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      {error}
    </div>
  );
};
