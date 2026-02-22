import http from "@/utils/http";

export function gerCategoryAPI() {
  return http({
    url: "/home/category/head",
  });
}
