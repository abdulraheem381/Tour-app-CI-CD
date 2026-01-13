import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

export function useTours() {
  return useQuery({
    queryKey: [api.tours.list.path],
    queryFn: async () => {
      const res = await fetch(api.tours.list.path);
      if (!res.ok) throw new Error("Failed to fetch tours");
      return api.tours.list.responses[200].parse(await res.json());
    },
  });
}

export function useTour(id: number) {
  return useQuery({
    queryKey: [api.tours.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.tours.get.path, { id });
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch tour");
      return api.tours.get.responses[200].parse(await res.json());
    },
    enabled: !isNaN(id),
  });
}
