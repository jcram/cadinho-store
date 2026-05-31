import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const discos = [
  {
    titulo: "Quem É Quem",
    artista: "João Donato",
    genero: "MPB",
    ano: 1973,
    preco: 129,
    estoque: 4,
    destaque: true,
    descricao:
      "Obra-prima do piano brasileiro: groove, síntese e sofisticação em estado puro.",
  },
  {
    titulo: "Promises",
    artista: "Floating Points & Pharoah Sanders",
    genero: "Jazz",
    ano: 2021,
    preco: 189,
    estoque: 3,
    destaque: true,
    descricao:
      "Encontro entre eletrônica contemplativa e o sopro lendário de Pharoah Sanders.",
  },
  {
    titulo: "Surrender",
    artista: "RÜFÜS DU SOL",
    genero: "Eletrônica",
    ano: 2021,
    preco: 179,
    estoque: 5,
    destaque: true,
    descricao: "Eletrônica melódica e atmosférica para ouvir do início ao fim.",
  },
  {
    titulo: "Azymuth",
    artista: "Azymuth",
    genero: "Jazz",
    ano: 1975,
    preco: 149,
    estoque: 2,
    destaque: true,
    descricao: "Samba-jazz-fusion brasileiro que atravessou gerações.",
  },
  {
    titulo: "Donuts",
    artista: "J Dilla",
    genero: "Hip Hop",
    ano: 2006,
    preco: 159,
    estoque: 6,
    destaque: true,
    descricao: "O testamento de J Dilla: 31 faixas que redefiniram o beatmaking.",
  },
];

const eventos = [
  {
    nome: "Open Deck",
    tipo: "Open Deck",
    descricao:
      "Noite aberta de discotecagem: traga seus discos e assuma as pickups. Terças e quintas.",
    destaque: true,
    link: "https://www.instagram.com/cadinhocultural",
  },
  {
    nome: "Listening Session",
    tipo: "Listening Session",
    descricao:
      "Escuta coletiva de um álbum na íntegra, no sistema de som da casa, sem pressa.",
    destaque: true,
    link: null,
  },
  {
    nome: "Live Set",
    tipo: "Live Set",
    descricao:
      "Apresentações ao vivo de artistas convidados — do jazz à música eletrônica.",
    destaque: true,
    link: null,
  },
  {
    nome: "Workshop de Beatmaking",
    tipo: "Workshop",
    descricao:
      "Produção e beatmaking com convidados: do sampler ao groove final.",
    destaque: true,
    link: null,
  },
];

async function main() {
  for (const d of discos) {
    const slug = slugify(`${d.titulo} ${d.artista}`);
    await prisma.disco.upsert({
      where: { slug },
      update: { ...d },
      create: { ...d, slug },
    });
    console.log(`✔ disco: ${d.artista} — ${d.titulo}`);
  }

  for (const e of eventos) {
    const slug = slugify(e.nome);
    await prisma.evento.upsert({
      where: { slug },
      update: { ...e },
      create: { ...e, slug },
    });
    console.log(`✔ encontro: ${e.nome}`);
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
