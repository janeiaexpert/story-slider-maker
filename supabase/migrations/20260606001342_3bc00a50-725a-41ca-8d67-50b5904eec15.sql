
CREATE TABLE public.carousels (
  id TEXT NOT NULL,
  space_id TEXT NOT NULL,
  name TEXT NOT NULL,
  slides JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (space_id, id)
);

CREATE INDEX idx_carousels_space_updated ON public.carousels (space_id, updated_at DESC);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.carousels TO anon, authenticated;
GRANT ALL ON public.carousels TO service_role;

ALTER TABLE public.carousels ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read carousels" ON public.carousels FOR SELECT USING (true);
CREATE POLICY "Anyone can insert carousels" ON public.carousels FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update carousels" ON public.carousels FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Anyone can delete carousels" ON public.carousels FOR DELETE USING (true);

CREATE OR REPLACE FUNCTION public.set_updated_at() RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER carousels_set_updated_at BEFORE UPDATE ON public.carousels
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
