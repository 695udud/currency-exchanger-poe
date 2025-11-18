import { useState, useEffect } from "react";
import Button from "./components/ui/button";
import Card from "./components/ui/card";
import Input from "./components/ui/input";

export default function PrecosDashboard() {
  const [moeda1, setMoeda1] = useState(1);
  const [moeda2, setMoeda2] = useState(1);

  const [produtos, setProdutos] = useState([]);

  const [form, setForm] = useState({ nome: "", c1: "", v1: "", c2: "", v2: "" });

  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    const salvo = localStorage.getItem("produtos");
    if (salvo) setProdutos(JSON.parse(salvo));
  }, []);

  useEffect(() => {
    localStorage.setItem("produtos", JSON.stringify(produtos));
  }, [produtos]);

  const salvarProduto = () => {
    if (!form.nome) return;

    if (editandoId) {
      setProdutos(produtos.map(p => p.id === editandoId ? { ...p, ...form } : p));
      setEditandoId(null);
    } else {
      setProdutos([...produtos, { ...form, id: crypto.randomUUID() }]);
    }

    setForm({ nome: "", c1: "", v1: "", c2: "", v2: "" });
  };

  const editarProduto = (p) => {
    setForm(p);
    setEditandoId(p.id);
  };

  const excluirProduto = id => setProdutos(produtos.filter(p => p.id !== id));

  const calculados = produtos.map(p => ({
    ...p,
    ganho1: p.v1 - p.c1,
    ganho2: p.v2 - p.c2,
  })).sort((a, b) => b.ganho1 - a.ganho1);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Sistema de Preços</h1>

      <Card>
        <h2 className="text-xl font-bold mb-2">Moedas</h2>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Moeda 1" type="number" value={moeda1} onChange={(e) => setMoeda1(Number(e.target.value))} />
          <Input label="Moeda 2" type="number" value={moeda2} onChange={(e) => setMoeda2(Number(e.target.value))} />
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-bold mb-2">Cadastro de Produtos</h2>

        <div className="grid grid-cols-5 gap-3">
          <Input placeholder="Nome" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} />
          <Input placeholder="Compra M1" type="number" value={form.c1} onChange={(e) => setForm({ ...form, c1: Number(e.target.value) })} />
          <Input placeholder="Venda M1" type="number" value={form.v1} onChange={(e) => setForm({ ...form, v1: Number(e.target.value) })} />
          <Input placeholder="Compra M2" type="number" value={form.c2} onChange={(e) => setForm({ ...form, c2: Number(e.target.value) })} />
          <Input placeholder="Venda M2" type="number" value={form.v2} onChange={(e) => setForm({ ...form, v2: Number(e.target.value) })} />
        </div>

        <Button className="mt-4" onClick={salvarProduto}>
          {editandoId ? "Salvar Alterações" : "Adicionar Produto"}
        </Button>
      </Card>

      <Card>
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>

        {calculados.map(p => (
          <Card key={p.id} className={p.ganho1 > 0 ? "bg-green-50" : "bg-red-50"}>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold">{p.nome}</h3>
                <p>Ganho M1: <b>{p.ganho1}</b></p>
                <p>Ganho M2: <b>{p.ganho2}</b></p>
              </div>

              <div className="flex gap-2">
                <Button onClick={() => editarProduto(p)} className="bg-blue-600">Editar</Button>
                <Button onClick={() => excluirProduto(p.id)} className="bg-red-600">Excluir</Button>
              </div>
            </div>
          </Card>
        ))}
      </Card>
    </div>
  );
}
