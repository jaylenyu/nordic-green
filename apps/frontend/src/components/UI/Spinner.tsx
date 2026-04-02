export default function SpinnerComponent() {
  return (
    <div className="flex justify-center items-center h-80">
      <div className="animate-spin rounded-full w-12 h-12 border-2 border-muted border-t-primary" />
    </div>
  );
}
