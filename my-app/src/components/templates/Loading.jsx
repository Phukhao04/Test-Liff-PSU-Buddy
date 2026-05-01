const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-4">
      <div className="w-12 h-12 border-4 border-psu-sritrang-200 border-t-psu-deep-blue-500 rounded-full animate-spin" />
      <p className="text-psu-deep-blue-500 text-sm font-medium tracking-wide">กำลังโหลด...</p>
    </div>
  );
};

export default Loading;