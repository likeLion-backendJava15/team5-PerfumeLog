import React from 'react';

const ProductFilter = ({ onFilterChange }) => {
  const handleNoteClick = (note, type) => {
    onFilterChange(note, type);
  };

  return (
    <div className="product-filter">
    {/* TOP Notes */}
    <h4>Top Notes</h4>
    <button onClick={() => handleNoteClick("갈바늄", "TOP")}>갈바늄</button>
    <button onClick={() => handleNoteClick("그레이프프룻", "TOP")}>그레이프프룻</button>
    <button onClick={() => handleNoteClick("그린 노트", "TOP")}>그린 노트</button>
    <button onClick={() => handleNoteClick("넛메그", "TOP")}>넛메그</button>
    <button onClick={() => handleNoteClick("라벤더", "TOP")}>라벤더</button>
    <button onClick={() => handleNoteClick("라임", "TOP")}>라임</button>
    <button onClick={() => handleNoteClick("레몬", "TOP")}>레몬</button>
    <button onClick={() => handleNoteClick("로즈", "TOP")}>로즈</button>
    <button onClick={() => handleNoteClick("로즈마리", "TOP")}>로즈마리</button>
    <button onClick={() => handleNoteClick("만다린 오렌지", "TOP")}>만다린 오렌지</button>
    <button onClick={() => handleNoteClick("미르틀", "TOP")}>미르틀</button>
    <button onClick={() => handleNoteClick("바질", "TOP")}>바질</button>
    <button onClick={() => handleNoteClick("베르가못", "TOP")}>베르가못</button>
    <button onClick={() => handleNoteClick("사이프레스", "TOP")}>사이프레스</button>
    <button onClick={() => handleNoteClick("세이지", "TOP")}>세이지</button>
    <button onClick={() => handleNoteClick("시나몬", "TOP")}>시나몬</button>
    <button onClick={() => handleNoteClick("시더", "TOP")}>시더</button>
    <button onClick={() => handleNoteClick("시트러스", "TOP")}>시트러스</button>
    <button onClick={() => handleNoteClick("아르테미시아", "TOP")}>아르테미시아</button>
    <button onClick={() => handleNoteClick("안젤리카", "TOP")}>안젤리카</button>
    <button onClick={() => handleNoteClick("알데하이드", "TOP")}>알데하이드</button>
    <button onClick={() => handleNoteClick("애플", "TOP")}>애플</button>
    <button onClick={() => handleNoteClick("오렌지", "TOP")}>오렌지</button>
    <button onClick={() => handleNoteClick("자스민 오키드", "TOP")}>자스민 오키드</button>
    <button onClick={() => handleNoteClick("주니퍼", "TOP")}>주니퍼</button>
    <button onClick={() => handleNoteClick("주니퍼 베리즈", "TOP")}>주니퍼 베리즈</button>
    <button onClick={() => handleNoteClick("진저", "TOP")}>진저</button>
    <button onClick={() => handleNoteClick("카르다맘", "TOP")}>카르다맘</button>
    <button onClick={() => handleNoteClick("카모마일", "TOP")}>카모마일</button>
    <button onClick={() => handleNoteClick("코리안더", "TOP")}>코리안더</button>
    <button onClick={() => handleNoteClick("클라리 세이지", "TOP")}>클라리 세이지</button>
    <button onClick={() => handleNoteClick("타라곤", "TOP")}>타라곤</button>
    <button onClick={() => handleNoteClick("파인애플", "TOP")}>파인애플</button>
    <button onClick={() => handleNoteClick("페퍼", "TOP")}>페퍼</button>
    <button onClick={() => handleNoteClick("프리지아", "TOP")}>프리지아</button>
    <button onClick={() => handleNoteClick("핫코라 레몬", "TOP")}>핫코라 레몬</button>
  
    {/* HEART Notes */}
    <h4>Heart Notes</h4>
    <p style={{ fontSize: '0.9rem', color: '#888', marginLeft: '1rem' }}>
      아직 등록된 Heart 노트가 없습니다.
    </p>
  
    {/* BASE Notes */}
    <h4>Base Notes</h4>
    <button onClick={() => handleNoteClick("라다넘", "BASE")}>라다넘</button>
    <button onClick={() => handleNoteClick("레더", "BASE")}>레더</button>
    <button onClick={() => handleNoteClick("로즈", "BASE")}>로즈</button>
    <button onClick={() => handleNoteClick("릴리 오브 더 밸리", "BASE")}>릴리 오브 더 밸리</button>
    <button onClick={() => handleNoteClick("머스크", "BASE")}>머스크</button>
    <button onClick={() => handleNoteClick("미르라", "BASE")}>미르라</button>
    <button onClick={() => handleNoteClick("바닐라", "BASE")}>바닐라</button>
    <button onClick={() => handleNoteClick("베티버", "BASE")}>베티버</button>
    <button onClick={() => handleNoteClick("비즈왁스", "BASE")}>비즈왁스</button>
    <button onClick={() => handleNoteClick("사이클라멘", "BASE")}>사이클라멘</button>
    <button onClick={() => handleNoteClick("사이프레스", "BASE")}>사이프레스</button>
    <button onClick={() => handleNoteClick("샌달우드", "BASE")}>샌달우드</button>
    <button onClick={() => handleNoteClick("시더", "BASE")}>시더</button>
    <button onClick={() => handleNoteClick("아갈우드", "BASE")}>아갈우드</button>
    <button onClick={() => handleNoteClick("엠버", "BASE")}>엠버</button>
    <button onClick={() => handleNoteClick("엠버그리스", "BASE")}>엠버그리스</button>
    <button onClick={() => handleNoteClick("엠브레트", "BASE")}>엠브레트</button>
    <button onClick={() => handleNoteClick("오크모스", "BASE")}>오크모스</button>
    <button onClick={() => handleNoteClick("올리프밤", "BASE")}>올리프밤</button>
    <button onClick={() => handleNoteClick("카르다맘", "BASE")}>카르다맘</button>
    <button onClick={() => handleNoteClick("케스토리움", "BASE")}>케스토리움</button>
    <button onClick={() => handleNoteClick("파출리", "BASE")}>파출리</button>
  </div>  
  );
};

export default ProductFilter;
