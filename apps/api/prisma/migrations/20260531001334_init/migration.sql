-- CreateTable
CREATE TABLE "discos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "artista" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "ano" INTEGER NOT NULL,
    "preco" REAL NOT NULL,
    "capa_url" TEXT,
    "descricao" TEXT,
    "estoque" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'disponivel',
    "destaque" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "discos_slug_key" ON "discos"("slug");
