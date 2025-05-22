-- Primero comprobamos si la extensión uuid-ossp está instalada
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Crear la tabla refresh_tokens si no existe
CREATE TABLE IF NOT EXISTS "refresh_tokens" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "token" text NOT NULL,
    "expiresAt" TIMESTAMP NOT NULL,
    "isRevoked" boolean NOT NULL DEFAULT false,
    "userId" integer NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
    CONSTRAINT "UQ_refresh_tokens_token" UNIQUE ("token"),
    CONSTRAINT "PK_refresh_tokens" PRIMARY KEY ("id")
);

-- Añadir la clave foránea
ALTER TABLE "refresh_tokens" 
    DROP CONSTRAINT IF EXISTS "FK_refresh_tokens_user";

ALTER TABLE "refresh_tokens" 
    ADD CONSTRAINT "FK_refresh_tokens_user"
    FOREIGN KEY ("userId") 
    REFERENCES "users"("id") 
    ON DELETE CASCADE;
