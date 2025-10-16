export default function Community(){
  return (
    <div className="max-w-6xl mx-auto px-5 py-8">
      <div className="card p-6">
        <div className="flex gap-2 mb-6">
          <select className="pill"><option>All</option></select>
          <div className="flex-1 flex items-center gap-2 rounded-full bg-white border border-skin-ring px-4 py-2">
            <img src="/img/search.png" className="w-4 h-4 opacity-60" alt="" />
            <input placeholder="Enter a search keyword" className="bg-transparent outline-none w-full"/>
          </div>
          <button className="btn btn-primary">View All</button>
        </div>
        <div className="text-slate-700">
          <div className="grid grid-cols-[60px_120px_1fr_160px] gap-4 py-2 border-b font-medium">
            <div>No</div><div>Division</div><div>Title</div><div>Registration Date</div>
          </div>
          {[...Array(10)].map((_,i)=>(
            <div key={i} className="grid grid-cols-[60px_120px_1fr_160px] gap-4 py-3 border-b">
              <div>{239-i}</div>
              <div><span className="pill">공지</span></div>
              <div className="truncate">2025년 학습자 만족도 설문조사 안내</div>
              <div>2025.06.27</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
