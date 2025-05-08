import { Star } from "lucide-react";

function ProductDetail({ product, notes }) {
  const topNotes = notes.filter(note => note.type === "TOP").map(note => note.name);
  const baseNotes = notes.filter(note => note.type === "BASE").map(note => note.name);

  return (
    <div className="flex p-6 gap-6">
      <div className="w-1/3 bg-gray-200 h-64 flex justify-center items-center">
        <img 
          src={product.imageUrl}
          alt={product.name}
        />
      </div>
      <div className="w-2/3">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">{product.brand}</h2>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-1">
              <Star className="text-yellow-400 fill-current" />
              <span>{product.averageRating?.toFixed(1) || '0.0'}</span>
              <span className="text-gray-500">({product.reviewCount || 0})</span>
            </div>
          </div>
          <div className="text-2xl font-bold">{product.price?.toLocaleString() || '0'}</div>
        </div>

        <div className="my-4">
          <span className="bg-pink-200 text-pink-800 px-2 py-1 rounded">{product.family}</span>
        </div>

        <div className="my-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <h3 className="font-semibold">Top</h3>
              {topNotes.length > 0 ? (
                topNotes.map((note, index) => (
                  <span key={index} className="block">{note}</span>
                ))
              ) : (
                <span>없음</span>
              )}
            </div>
            <div>
              <h3 className="font-semibold">Base</h3>
              {baseNotes.length > 0 ? (
                baseNotes.map((note, index) => (
                  <span key={index} className="block">{note}</span>
                ))
              ) : (
                <span>없음</span>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-6 py-4">
          <button className="text-teal-500 font-semibold">리뷰 쓰기</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
