import { useState, useEffect } from "react";

export default function PrecosDashboard() {
  const [nome, setNome] = useState("");
  const [buyDiv, setBuyDiv] = useState("");
  const [sellDiv, setSellDiv] = useState("");
  const [buyCh, setBuyCh] = useState("");
  const [sellCh, setSellCh] = useState("");
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("produtos");
    if (saved) setProdutos(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("produtos", JSON.stringify(produtos));
  }, [produtos]);

  function salvar() {
    const item = {
      nome,
      buyDiv: Number(buyDiv),
      sellDiv: Number(sellDiv),
      buyCh: Number(buyCh),
      sellCh: Number(sellCh),
    };

    setProdutos([...produtos, item]);

    // limpar inputs
    setNome("");
    setBuyDiv("");
    setSellDiv("");
    setBuyCh("");
    setSellCh("");
  }

  function melhorLucro(p) {
    const lucroDiv = p.sellDiv - p.buyDiv;
    const lucroCh = p.sellCh - p.buyCh;

    const lucroConvertDiv = p.sellDiv - p.buyCh; // comprar Chaos → vender Divine
    const lucroConvertCh = p.sellCh - p.buyDiv; // comprar Divine → vender Chaos

    return Math.max(lucroDiv, lucroCh, lucroConvertDiv, lucroConvertCh);
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Sistema de Preços – Divine / Chaos</h1>

      <div className="bg-white shadow p-6 rounded-xl mb-6">
        <h2 className="text-xl font-semibold mb-4">Cadastro de Produto</h2>

        {/* Nome do item */}
        <div className="mb-4">
          <label className="font-semibold">Nome do Item</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="border p-2 w-full rounded"
          />
        </div>

        {/* Divine */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="font-semibold">Compra (Divine)</label>
            <input
              type="number"
              value={buyDiv}
              onChange={(e) => setBuyDiv(e.target.value)}
              className="border p-2 w-full rounded"
            />
          </div>

          <div>
            <label className="font-semibold">Venda (Divine)</label>
            <input
              type="number"
              value={sellDiv}
              onChange={(e) => setSellDiv(e.target.value)}
              className="border p-2 w-full rounded"
            />
          </div>
        </div>

        {/* Chaos */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="font-semibold">Compra (Chaos)</label>
            <input
              type="number"
              value={buyCh}
              onChange={(e) => setBuyCh(e.target.value)}
              className="border p-2 w-full rounded"
            />
          </div>

          <div>
            <label className="font-semibold">Venda (Chaos)</label>
            <input
              type="number"
              value={sellCh}
              onChange={(e) => setSellCh(e.target.value)}
              className="border p-2 w-full rounded"
            />
          </div>
        </div>

        <button
          onClick={salvar}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Salvar
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-2">Produtos</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Item</th>
            <th className="border p-2">Compra (Div)</th>
            <th className="border p-2">Venda (Div)</th>
            <th className="border p-2">Compra (Ch)</th>
            <th className="border p-2">Venda (Ch)</th>
            <th className="border p-2">Melhor lucro</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((p, i) => {
            const melhor = melhorLucro(p);
            return (
              <tr key={i} className={melhor > 0 ? "bg-green-200" : ""}>
                <td className="border p-2 font-bold">{p.nome}</td>
                <td className="border p-2">{p.buyDiv}</td>
                <td className="border p-2">{p.sellDiv}</td>
                <td className="border p-2">{p.buyCh}</td>
                <td className="border p-2">{p.sellCh}</td>
                <td className="border p-2 font-semibold">{melhor.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
