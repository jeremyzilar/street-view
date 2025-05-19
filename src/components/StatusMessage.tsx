type StatusMessageProps = {
  type: "success" | "error";
  message: string;
};

export function StatusMessage({ type, message }: StatusMessageProps) {
  if (!message) return null;

  const styles = {
    success:
      "bg-green-100 border-green-400 text-green-700 dark:bg-green-900 dark:border-green-700 dark:text-green-100",
    error:
      "bg-red-100 border-red-400 text-red-700 dark:bg-red-900 dark:border-red-700 dark:text-red-100",
  };

  return (
    <div className={`border px-4 py-3 rounded mb-4 ${styles[type]}`}>
      {message}
    </div>
  );
}
