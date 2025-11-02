interface matome {
  kotosi: string;
  nengou: string;
  nenndo: string;
}

let zikan: matome = {
  kotosi: "今年は", // "今年は"
  nengou: "令和",   // "令和"
  nenndo: "年度",  // "7年度"
};

// テンプレートリテラル（バッククォート `）を使い、すべての文字列と変数を結合する
console.log(`今年は2025年
なので
${zikan.kotosi}${zikan.nengou}${7}${zikan.nenndo}`);

// 以前の出力（オブジェクトそのまま）は削除またはコメントアウト
// console.log(zikan);