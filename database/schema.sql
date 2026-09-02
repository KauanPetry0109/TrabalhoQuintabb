CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS public.candidates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,

  age INTEGER,
  city TEXT,
  studied_before BOOLEAN DEFAULT FALSE,

  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  percentage NUMERIC(5, 2) NOT NULL,

  level TEXT NOT NULL,
  recommended_course TEXT NOT NULL,

  status TEXT NOT NULL DEFAULT 'novo',

  consent BOOLEAN NOT NULL DEFAULT TRUE,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT candidates_status_check
    CHECK (
      status IN (
        'novo',
        'contatado',
        'matriculado',
        'arquivado'
      )
    ),

  CONSTRAINT candidates_level_check
    CHECK (
      level IN (
        'A1',
        'A2',
        'B1',
        'B2'
      )
    ),

  CONSTRAINT candidates_percentage_check
    CHECK (
      percentage >= 0
      AND percentage <= 100
    ),

  CONSTRAINT candidates_score_check
    CHECK (
      score >= 0
      AND score <= total_questions
    )
);

CREATE INDEX IF NOT EXISTS candidates_created_at_idx
ON public.candidates(created_at DESC);

CREATE INDEX IF NOT EXISTS candidates_status_idx
ON public.candidates(status);

CREATE INDEX IF NOT EXISTS candidates_level_idx
ON public.candidates(level);

ALTER TABLE public.candidates ENABLE ROW LEVEL SECURITY;