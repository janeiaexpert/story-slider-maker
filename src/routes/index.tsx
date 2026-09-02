import { createFileRoute } from "@tanstack/react-router";
import CarouselApp from "@/components/CarouselApp";

export const Route = createFileRoute("/")({
  component: CarouselApp,
});
