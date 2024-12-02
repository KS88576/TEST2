export default function Loading() {
    return (
      <div className="min-h-screen bg-[#37474F] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-[#00BCD4]/30 border-t-[#00BCD4] rounded-full animate-spin" />
          <p className="text-[#00BCD4] mt-4">Loading...</p>
        </div>
      </div>
    );
  }